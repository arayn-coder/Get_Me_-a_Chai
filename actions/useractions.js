"use server"

import Razorpay from "razorpay"
import bcrypt from "bcryptjs"

import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"


// ========================================
// RAZORPAY PAYMENT
// ========================================

export const initiate = async (amount, to_username, paymentform) => {

    await connectDb()

    // Find the user who will receive the payment
    const user = await User.findOne({
        username: to_username
    })

    // Check if user exists
    if (!user) {
        return {
            success: false,
            error: "User not found."
        }
    }

    const secret = user.razorpaysecret
    const key_id = user.razorpayid

    // Check Razorpay credentials
    if (!key_id || !secret) {
        return {
            success: false,
            error: "This user has not configured Razorpay yet."
        }
    }

    // Create Razorpay instance
    const instance = new Razorpay({
        key_id: key_id,
        key_secret: secret
    })

    const options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    // Create Razorpay order
    const x = await instance.orders.create(options)

    // Create pending payment in database
    await Payment.create({
        oid: x.id,
        amount: amount / 100,
        to_username: to_username,
        name: paymentform.name,
        message: paymentform.message
    })

    return {
        success: true,
        order: x
    }
}
// ========================================
// FETCH USER
// ========================================

export const fetchuser = async (email) => {

    try {

        await connectDb()

        console.log("Fetching user with email:", email)

        const user = await User.findOne({
            email
        }).lean()

        console.log("MongoDB user:", user)

        if (!user) {
            return null
        }

        return {

            email: user.email || "",

            name: user.name || "",

            username: user.username || "",

            profilepic: user.profilepic || "",

            coverpic: user.coverpic || "",

            razorpayid: user.razorpayid || "",

            razorpaysecret: user.razorpaysecret || ""

        }

    } catch (error) {

        console.error("fetchuser error:", error)

        return null

    }

}

// ========================================
// FETCH CREATOR BY USERNAME
// ========================================

export const fetchcreator = async (username) => {
    try {
        await connectDb()

        const user = await User.findOne({
            username: username
        }).lean()

        if (!user) {
            return null
        }

        return {
            name: user.name || "",
            username: user.username || "",
            email: user.email || "",
            profilepic: user.profilepic || "",
            coverpic: user.coverpic || "",
            razorpayid: user.razorpayid || "",
            razorpaysecret: user.razorpaysecret || "",
            isCreator: user.isCreator || false
        }

    } catch (error) {
        console.error("fetchcreator error:", error)
        return null
    }
}


// ========================================
// FETCH PAYMENTS
// ========================================

export const fetchpayments = async (username) => {

    await connectDb()

    let p = await Payment.find({
        to_username: username,
        done: true
    })
        .sort({
            amount: -1
        })
        .limit(10)
        .lean()


    return p.map(payment => ({
        ...payment,
        _id: payment._id.toString(),
    }))

}


// ========================================
// UPDATE PROFILE
// ========================================

export const updateProfile = async (data, oldusername) => {

    try {

        await connectDb()

        const ndata = Object.fromEntries(data)

        // Check username
        if (!ndata.username) {
            return {
                error: "Username is required"
            }
        }

        // Check creator profile information
        const isCreator =
            Boolean(ndata.name?.trim()) &&
            Boolean(ndata.username?.trim()) &&
            Boolean(ndata.razorpayid?.trim()) &&
            Boolean(ndata.razorpaysecret?.trim())

        // Add creator status
        ndata.isCreator = isCreator


        // If username is changed
        if (oldusername !== ndata.username) {

            const existingUser = await User.findOne({
                username: ndata.username
            })

            if (existingUser) {
                return {
                    error: "Username already exists"
                }
            }

            await User.updateOne(
                {
                    username: oldusername
                },
                {
                    $set: ndata
                }
            )

            // Update username in all payments
            await Payment.updateMany(
                {
                    to_username: oldusername
                },
                {
                    $set: {
                        to_username: ndata.username
                    }
                }
            )

        } else {

            await User.updateOne(
                {
                    username: oldusername
                },
                {
                    $set: ndata
                }
            )

        }

        return {
            success: true,
            message: "Profile updated successfully"
        }

    } catch (error) {

        console.error(
            "Update Profile Error:",
            error
        )

        return {
            error: "Something went wrong while updating profile"
        }

    }

}
// ========================================
// CREATE NEW USER
// ========================================

export const createUser = async (data) => {

    try {

        await connectDb()



        const ndata = Object.fromEntries(data)


        const name = ndata.name?.trim()

        const email = ndata.email
            ?.trim()
            .toLowerCase()

        const username = ndata.username
            ?.trim()

        const password = ndata.password


        // ========================================
        // REQUIRED FIELDS
        // ========================================

        if (
            !name ||
            !email ||
            !username ||
            !password
        ) {

            return {
                error: "All fields are required"
            }

        }


        // ========================================
        // PASSWORD VALIDATION
        // ========================================

        if (password.length < 6) {

            return {
                error: "Password must be at least 6 characters"
            }

        }


        // ========================================
        // CHECK EMAIL
        // ========================================

        const existingEmail = await User.findOne({
            email: email
        })


        if (existingEmail) {

            return {
                error: "Email already exists"
            }

        }


        // ========================================
        // CHECK USERNAME
        // ========================================

        const existingUsername = await User.findOne({
            username: username
        })


        if (existingUsername) {

            return {
                error: "Username already exists"
            }

        }


        // ========================================
        // HASH PASSWORD
        // ========================================

        const hashedPassword = await bcrypt.hash(
            password,
            10
        )


        // ========================================
        // CREATE USER
        // ========================================

        await User.create({

            name: name,

            email: email,

            username: username,

            password: hashedPassword,

            profilepic: "",

            coverpic: "",

            razorpayid: "",

            razorpaysecret: ""

        })



        return {

            success: true,

            message: "Account created successfully"

        }


    } catch (error) {

        console.error(
            "Create User Error:",
            error
        )

        return {

            error: "Something went wrong while creating account"

        }

    }

}