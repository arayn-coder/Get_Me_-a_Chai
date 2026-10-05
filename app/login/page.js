"use client"

import React, { useEffect, useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"


const Login = () => {



  const { data: session, status } = useSession()

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)


  // ==========================================
  // EMAIL / PASSWORD STATES
  // ==========================================

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)


  // ==========================================
  // REDIRECT IF ALREADY LOGGED IN
  // ==========================================

  useEffect(() => {

    if (status === "authenticated") {
      router.push("/dashboard")
    }

  }, [status, router])


  // ==========================================
  // EMAIL / PASSWORD LOGIN
  // ==========================================

  const handleLogin = async () => {

    if (!email.trim()) {
      alert("Please enter your email")
      return
    }

    if (!password.trim()) {
      alert("Please enter your password")
      return
    }


    try {

      setLoading(true)


      const result = await signIn("credentials", {

        email: email.trim().toLowerCase(),

        password: password,

        redirect: false

      })


      // ==========================================
      // LOGIN FAILED
      // ==========================================

      if (result?.error) {

        alert("Invalid email or password")

        return
      }


      // ==========================================
      // LOGIN SUCCESS
      // ==========================================

    } catch (error) {

      console.error("Login error:", error)

      alert("Something went wrong while logging in")

    } finally {

      setLoading(false)

    }

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <main className="min-h-screen bg-[#030712] text-white flex justify-center items-center overflow-hidden relative px-4 py-10">


      {/* ==========================================
                    BACKGROUND EFFECTS
          ========================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Purple glow */}

        <div className="
          absolute
          -top-40
          -left-40
          w-[500px]
          h-[500px]
          bg-purple-600/20
          rounded-full
          blur-[140px]
        " />


        {/* Blue glow */}

        <div className="
          absolute
          -bottom-40
          -right-40
          w-[500px]
          h-[500px]
          bg-blue-600/20
          rounded-full
          blur-[140px]
        " />


        {/* Center glow */}

        <div className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[300px]
          h-[300px]
          bg-indigo-600/10
          rounded-full
          blur-[120px]
        " />


        {/* Small decorative circles */}

        <div className="
          absolute
          top-[15%]
          right-[15%]
          w-2
          h-2
          bg-purple-400
          rounded-full
          shadow-[0_0_20px_rgba(168,85,247,0.8)]
        " />

        <div className="
          absolute
          bottom-[20%]
          left-[15%]
          w-2
          h-2
          bg-blue-400
          rounded-full
          shadow-[0_0_20px_rgba(96,165,250,0.8)]
        " />

      </div>


      {/* ==========================================
                    MAIN CARD
          ========================================== */}

      <div className="
        relative
        z-10
        w-full
        max-w-[440px]
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-2xl
        shadow-[0_25px_80px_rgba(0,0,0,0.5)]
        px-6
        sm:px-8
        py-9
      ">


        {/* ==========================================
                    TOP ICON
          ========================================== */}

        <div className="flex justify-center mb-6">

          <div className="
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            text-4xl
            bg-gradient-to-br
            from-purple-500/20
            to-blue-500/20
            border
            border-white/10
            shadow-lg
            shadow-purple-500/10
          ">
            ☕
          </div>

        </div>


        {/* ==========================================
                    TITLE
          ========================================== */}

        <div className="text-center mb-8">

          <h1 className="
            text-3xl
            sm:text-4xl
            font-extrabold
            tracking-tight
            bg-gradient-to-r
            from-white
            via-purple-200
            to-blue-300
            bg-clip-text
            text-transparent
          ">
            Welcome Back
          </h1>


          <p className="
            text-gray-400
            text-sm
            sm:text-base
            mt-3
          ">
            Login to continue supporting creators
          </p>

        </div>


        {/* ==========================================
                    EMAIL + PASSWORD
          ========================================== */}

        <div className="w-full">


          {/* EMAIL */}

          <div className="mb-5">

            <label className="
              block
              text-sm
              font-medium
              text-gray-300
              mb-2
            ">
              Email Address
            </label>


            <div className="relative">

              {/* Email icon */}

              <span className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
                pointer-events-none
              ">
                ✉
              </span>


              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full
                  bg-white/[0.06]
                  text-white
                  placeholder:text-gray-600
                  rounded-xl
                  pl-11
                  pr-4
                  py-3.5
                  outline-none
                  border
                  border-white/10
                  focus:border-purple-500/70
                  focus:bg-white/[0.09]
                  focus:ring-4
                  focus:ring-purple-500/10
                  transition-all
                  duration-300
                "
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div className="mb-6">

            <label className="
              block
              text-sm
              font-medium
              text-gray-300
              mb-2
            ">
              Password
            </label>


            <div className="relative">

              {/* Lock icon */}

              <span className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
                pointer-events-none
              ">
                🔒
              </span>


              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {

                  if (e.key === "Enter") {
                    handleLogin()
                  }

                }}
                placeholder="Enter your password"
                className="
                  w-full
                  bg-white/[0.06]
                  text-white
                  placeholder:text-gray-600
                  rounded-xl
                  pl-11
                  pr-4
                  py-3.5
                  outline-none
                  border
                  border-white/10
                  focus:border-purple-500/70
                  focus:bg-white/[0.09]
                  focus:ring-4
                  focus:ring-purple-500/10
                  transition-all
                  duration-300
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={20} strokeWidth={1.8} />
                ) : (
                  <Eye size={20} strokeWidth={1.8} />
                )}
              </button>

            </div>

          </div>


          {/* ==========================================
                    LOGIN BUTTON
              ========================================== */}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className={`
              group
              relative
              overflow-hidden
              w-full
              py-3.5
              rounded-xl
              text-white
              font-bold
              text-base
              transition-all
              duration-300
              shadow-lg
              ${loading
                ? `
                  bg-gray-600/80
                  cursor-not-allowed
                  opacity-70
                `
                : `
                  bg-gradient-to-r
                  from-purple-600
                  via-indigo-600
                  to-blue-600
                  hover:from-purple-500
                  hover:via-indigo-500
                  hover:to-blue-500
                  hover:scale-[1.02]
                  hover:shadow-purple-500/25
                  hover:shadow-2xl
                  active:scale-[0.98]
                  cursor-pointer
                `
              }
            `}
          >

            {/* Shine animation */}

            {!loading && (

              <span className="
                absolute
                inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
                group-hover:translate-x-full
                transition-transform
                duration-700
              " />

            )}


            <span className="
              relative
              flex
              items-center
              justify-center
              gap-2
            ">

              {loading ? (

                <>

                  <svg
                    className="w-5 h-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >

                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <path
                      className="opacity-90"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
                    />

                  </svg>

                  Logging in...

                </>

              ) : (

                <>

                  Login

                  <span className="
                    text-xl
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  ">
                    →
                  </span>

                </>

              )}

            </span>

          </button>

        </div>


        {/* ==========================================
                    DIVIDER
          ========================================== */}

        <div className="
          flex
          items-center
          gap-4
          w-full
          my-7
        ">

          <div className="h-px bg-white/10 flex-1" />

          <span className="
            text-gray-600
            text-xs
            font-medium
            tracking-widest
          ">
            OR CONTINUE WITH
          </span>

          <div className="h-px bg-white/10 flex-1" />

        </div>


        {/* ==========================================
                    SOCIAL LOGIN BUTTONS
          ========================================== */}

        <div className="
          w-full
          flex
          flex-col
          gap-3
          items-center
        ">


          {/* GOOGLE */}

          <button
            onClick={() => signIn("google", {
              callbackUrl: "/dashboard"
            })}
            className="
              group
              flex
              items-center
              justify-center
              w-full
              bg-white
              text-black
              border
              border-gray-200
              rounded-xl
              shadow-md
              px-5
              py-3
              text-sm
              font-semibold
              transition-all
              duration-300
              hover:bg-gray-100
              hover:-translate-y-0.5
              hover:shadow-xl
              focus:outline-none
              focus:ring-2
              focus:ring-white/30
              cursor-pointer
            "
          >

            <svg className="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="-0.5 0 48 48" version="1.1">

              <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                  <g id="Google" transform="translate(401.000000, 860.000000)">
                    <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path>
                    <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path>
                    <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323183,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path>
                    <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path>
                  </g>
                </g>
              </g>

            </svg>

            <span>Continue with Google</span>

          </button>



          {/* GITHUB */}

          <button
            onClick={() => { signIn("github") }}
            className="
              group
              flex
              items-center
              justify-center
              w-full
              bg-white
              text-black
              border
              border-gray-200
              rounded-xl
              shadow-md
              px-5
              py-3
              text-sm
              font-semibold
              transition-all
              duration-300
              hover:bg-gray-100
              hover:-translate-y-0.5
              hover:shadow-xl
              focus:outline-none
              focus:ring-2
              focus:ring-white/30
              cursor-pointer
            "
          >

            <svg className="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 73 73" version="1.1">

              <g id="team-collaboration/version-control/github" stroke="none" strokeWidth="1" fill="none"
                fillRule="evenodd">

                <g id="container" transform="translate(2.000000, 2.000000)" fillRule="nonzero">

                  <rect id="mask" stroke="#000000" strokeWidth="2" fill="#000000" x="-1"
                    y="-1" width="71" height="71" rx="14">
                  </rect>

                  <path d="M58.3067362,21.4281798 C55.895743,17.2972267 52.6253846,14.0267453 48.4948004,11.615998 C44.3636013,9.20512774 39.8535636,8 34.9614901,8 C30.0700314,8 25.5585181,9.20549662 21.4281798,11.615998 C17.2972267,14.0266224 14.0269912,17.2972267 11.615998,21.4281798 C9.20537366,25.5590099 8,30.0699084 8,34.9607523 C8,40.8357654 9.71405782,46.1187277 13.1430342,50.8109917 C16.5716416,55.5036246 21.0008949,58.7507436 26.4304251,60.5527177 C27.0624378,60.6700211 27.5302994,60.5875151 27.8345016,60.3072901 C28.1388268,60.0266961 28.290805,59.6752774 28.290805,59.2545094 C28.290805,59.1842994 28.2847799,58.5526556 28.2730988,57.3588401 C28.2610488,56.1650247 28.2553926,55.1235562 28.2553926,54.2349267 L27.4479164,54.3746089 C26.9330843,54.4689191 26.2836113,54.5088809 25.4994975,54.4975686 C24.7157524,54.4866252 23.9021284,54.4044883 23.0597317,54.2517722 C22.2169661,54.1004088 21.4330982,53.749359 20.7075131,53.1993604 C19.982297,52.6493618 19.4674648,51.9294329 19.1631397,51.0406804 L18.8120898,50.2328353 C18.5780977,49.6950097 18.2097104,49.0975486 17.7064365,48.4426655 C17.2031626,47.7871671 16.6942325,47.3427911 16.1794003,47.108799 L15.9336039,46.9328437 C15.7698216,46.8159091 15.6178435,46.6748743 15.4773006,46.511215 C15.3368806,46.3475557 15.2317501,46.1837733 15.1615401,46.0197452 C15.0912072,45.8555941 15.1494901,45.7209532 15.3370036,45.6153308 C15.5245171,45.5097084 15.8633939,45.4584343 16.3551097,45.4584343 L17.0569635,45.5633189 C17.5250709,45.6571371 18.104088,45.9373622 18.7947525,46.4057156 C19.485048,46.8737001 20.052507,47.4821045 20.4972521,48.230683 C21.0358155,49.1905062 21.6846737,49.9218701 22.4456711,50.4251443 C23.2060537,50.9284181 23.9727072,51.1796248 24.744894,51.1796248 C25.5170809,51.1796248 26.1840139,51.1210961 26.7459396,51.0046532 C27.3072505,50.8875956 27.8338868,50.7116403 28.3256025,50.477771 C28.5362324,48.9090515 29.1097164,47.7039238 30.0455624,46.8615271 C28.7116959,46.721353 27.5124701,46.5102313 26.4472706,46.2295144 C25.3826856,45.9484284 24.2825656,45.4922482 23.1476478,44.8597436 C22.0121153,44.2280998 21.0701211,43.4437399 20.3214198,42.5080169 C19.5725953,41.5718019 18.9580429,40.3426971 18.4786232,38.821809 C17.9989575,37.3003059 17.7590632,35.5451796 17.7590632,33.5559381 C17.7590632,30.7235621 18.6837199,28.3133066 20.5326645,26.3238191 C19.6665366,24.1944035 19.7483048,21.8072644 20.778215,19.1626478 C21.4569523,18.951772 22.4635006,19.110021 23.7973667,19.6364115 C25.1314791,20.1630476 26.1082699,20.6141867 26.728725,20.9882301 C27.3491798,21.3621504 27.8463057,21.6790173 28.2208409,21.9360032 C30.3978419,21.3277217 32.644438,21.0235195 34.9612442,21.0235195 C37.2780503,21.0235195 39.5251383,21.3277217 41.7022622,21.9360032 L43.0362517,21.0938524 C43.9484892,20.5319266 45.0257393,20.0169716 46.2654186,19.5488642 C47.5058357,19.0810025 48.4543461,18.9521408 49.1099676,19.1630167 C50.1627482,21.8077564 50.2565666,24.1947724 49.3901927,26.324188 C51.2390143,28.3136755 52.1640399,30.7245457 52.1640399,33.556307 C52.1640399,35.5455485 51.9232849,37.3062081 51.444357,38.8393922 C50.9648143,40.3728222 50.3449745,41.6006975 49.5845919,42.5256002 C48.8233486,43.4503798 47.8753296,44.2285916 46.7404118,44.8601125 C45.605248,45.4921251 44.504759,45.9483056 43.4401742,46.2293914 C42.3750975,46.5104771 41.1758719,46.7217219 39.8420054,46.8621419 C41.0585684,47.9149226 41.6669728,49.5767225 41.6669728,51.846804 L41.6669728,59.2535257 C41.6669728,59.6742937 41.8132947,60.0255895 42.1061847,60.3063064 C42.3987057,60.5865314 42.8606653,60.6690373 43.492678,60.5516109 C48.922946,58.7498829 53.3521992,55.5026409 56.7806837,50.810008 C60.2087994,46.117744 61.923472,40.8347817 61.923472,34.9597686 C61.9222424,30.069539 60.7162539,25.5590097 58.3067362,21.4281798 Z" id="Shape" fill="#FFFFFF">
                  </path>

                </g>
              </g>

            </svg>

            <span>Continue with Github</span>

          </button>



        </div>


        {/* ==========================================
                    CREATE ACCOUNT
          ========================================== */}

        <div className="
          text-center
          mt-9
          pt-6
          border-t
          border-white/10
          w-full
        ">

          <p className="text-gray-500 text-sm">
            Don't have an account?
          </p>


          <Link
            href="/createaccount"
            className="
              inline-flex
              items-center
              gap-1
              mt-3
              text-purple-400
              hover:text-purple-300
              text-base
              font-bold
              transition-all
              duration-300
              hover:gap-2
              cursor-pointer
            "
          >
            Create Account
            <span className="text-lg">
              →
            </span>
          </Link>

        </div>


        {/* ==========================================
                    FOOTER
          ========================================== */}

        <p className="
          text-center
          text-gray-600
          text-xs
          mt-7
        ">
          Secure authentication powered by NextAuth
        </p>


      </div>

    </main>

  )

}


export default Login