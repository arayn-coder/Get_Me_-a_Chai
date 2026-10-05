import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


import connectDb from "@/db/connectDb";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({

  secret: process.env.NEXTAUTH_SECRET,


  providers: [
    //gooogle login

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),


    // =========================
    // GITHUB LOGIN
    // =========================

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),


    // =========================
    // EMAIL + PASSWORD LOGIN
    // =========================

    CredentialsProvider({

      name: "Credentials",

      credentials: {

        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },

      },


      async authorize(credentials) {

        console.log("========== LOGIN START ==========");

        await connectDb();

        console.log("Credentials received:", {
          email: credentials?.email,
          passwordReceived: !!credentials?.password
        });


        if (!credentials?.email || !credentials?.password) {

          console.log("❌ Email or password missing");

          return null;
        }


        const email = credentials.email
          .trim()
          .toLowerCase();


        const user = await User.findOne({
          email: email
        });


        console.log("User found:", !!user);


        if (!user) {

          console.log("❌ User not found:", email);

          return null;
        }


        console.log("User email:", user.email);
        console.log("User username:", user.username);
        console.log("Password exists:", !!user.password);
        console.log("Password length:", user.password?.length);


        if (!user.password) {

          console.log("❌ User has no password");

          return null;
        }


        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );


        console.log("Password match:", passwordMatch);


        if (!passwordMatch) {

          console.log("❌ Password does NOT match");

          return null;
        }


        console.log("✅ LOGIN SUCCESS");

        console.log("========== LOGIN END ==========");


        return {

          id: user._id.toString(),

          name: user.username,

          email: user.email,

        };

      },
    }),

  ],


  callbacks: {

    // =========================
    // SIGN IN
    // =========================

    async signIn({ user, account }) {

  // Google + GitHub login
  if (account.provider === "google" || account.provider === "github") {

    await connectDb();

    if (!user.email) {
      return false;
    }

    // Find user by email
    let currentUser = await User.findOne({
      email: user.email.toLowerCase(),
    });

    // If user doesn't exist, create user
    if (!currentUser) {

      let username = user.email
        .split("@")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

      // Make sure username is unique
      let usernameExists = await User.findOne({
        username: username,
      });

      if (usernameExists) {

        username = `${username}${Date.now()}`;

      }

      currentUser = await User.create({
        email: user.email.toLowerCase(),
        name: user.name,
        username: username,
        profilepic: user.image,
      });

      console.log("✅ New social user created:", username);

    }

    // Existing user but username is missing
    if (!currentUser.username) {

      let username = user.email
        .split("@")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

      let usernameExists = await User.findOne({
        username: username,
        _id: { $ne: currentUser._id },
      });

      if (usernameExists) {
        username = `${username}${Date.now()}`;
      }

      currentUser.username = username;

      await currentUser.save();

      console.log("✅ Username added:", username);
    }
  }

  return true;
},

    // =========================
    // SESSION
    // =========================

    async session({ session }) {

      await connectDb();


      const dbUser = await User.findOne({
        email: session.user.email,
      });


      if (dbUser) {

        session.user.name = dbUser.username;

      }


      return session;
    },

  },

});


export { handler as GET, handler as POST };