"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"
import { initiate, fetchuser, fetchpayments, fetchcreator } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const PaymentPage = ({ username }) => {

    const [paymentform, setPaymentform] = useState({
        name: "",
        message: "",
        amount: ""
    })

    const [payments, setPayments] = useState([])
    const [creator, setCreator] = useState(null)
    const [currentUser, setcurrentUser] = useState(null) // initially the user is null and after user fetch sucessfully than user set by email
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const router = useRouter()


    // payment form restriction
    const isFormValid =
        paymentform.name.trim().length >= 2 &&
        paymentform.message.trim().length >= 1 &&
        Number(paymentform.amount) > 0


    // get the current user data usting getData function
    useEffect(() => {
        getData()
    }, [session, username])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)

    }, [])

    // for give inpunt in paymentform
    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        try {

            // ========================================
            // FETCH CREATOR - ALWAYS
            // ========================================

            const creatorData = await fetchcreator(username)

            console.log("Creator profile:", creatorData)

            if (!creatorData) {
                console.log("Creator not found:", username)
                return
            }

            setCreator(creatorData)


            // ========================================
            // FETCH PAYMENTS - ALWAYS
            // ========================================

            const dbpayments = await fetchpayments(username)

            console.log("Creator payments:", dbpayments)

            setPayments(dbpayments)


            // ========================================
            // FETCH LOGGED-IN USER - ONLY IF LOGIN
            // ========================================

            if (session?.user?.email) {

                const loggedInUser = await fetchuser(
                    session.user.email
                )

                console.log("Logged-in user:", loggedInUser)

                setcurrentUser(loggedInUser)

            } else {

                // No login
                setcurrentUser(null)

            }

        } catch (error) {

            console.error("Error loading creator profile:", error)

        }
    }

    if (!creator) {
        return (
            <div className="min-h-screen bg-[#050816] text-white flex justify-center items-center">

                <div className="flex flex-col items-center gap-5">

                    <div className="w-14 h-14 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin"></div>

                    <p className="text-gray-400 text-sm">
                        Loading creator profile...
                    </p>

                </div>

            </div>
        )
    }
    const pay = async (amount) => {

        if (!creator) {
            toast.error("Creator profile not found")
            return
        }

        if (!creator.razorpayid) {
            toast.error("This creator has not configured Razorpay")
            return
        }

        try {

            const a = await initiate(
                amount,
                creator.username,
                paymentform
            )

            if (!a.success) {
                toast.error(a.error)
                return
            }

            const orderId = a.order.id

            const options = {
                key: creator.razorpayid,

                amount: amount,

                currency: "INR",

                name: "Get Me A Chai",

                description: `Support @${creator.username}`,

                image: creator.profilepic || undefined,

                order_id: orderId,

                callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,

                prefill: {
                    name: paymentform.name
                },

                notes: {
                    creator: creator.username,
                    message: paymentform.message
                },

                theme: {
                    color: "#3399cc"
                }
            }

            if (!window.Razorpay) {
                toast.error("Razorpay SDK failed to load")
                return
            }

            const rzp1 = new window.Razorpay(options)

            rzp1.open()

        } catch (error) {

            console.error("Payment Error:", error)

            toast.error(
                "Something went wrong while starting payment"
            )
        }
    }



    return (

        <>

            {/* Toast */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* Razorpay Script */}
            <>
                <Script
                    src="https://checkout.razorpay.com/v1/checkout.js"
                    strategy="afterInteractive"
                />

                {/* Your page */}
            </>


            {/* ================= MAIN PAGE ================= */}

            <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

                {/* Background Glow */}
                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

                    <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[130px]" />

                    <div className="absolute top-[35%] right-[-200px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[130px]" />

                    <div className="absolute bottom-[-200px] left-[30%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />

                </div>


                {/* ================= COVER SECTION ================= */}

                <section className="relative">

                    {/* Cover Image */}
                    <div className="relative w-full h-[280px] md:h-[380px] overflow-hidden">

                        <img
                            className="w-full h-full object-cover"
                            src={creator.coverpic || "/default-cover.jpg"}
                            alt="Cover"
                        />

                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-black/10" />

                        {/* Purple overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />

                    </div>


                    {/* Profile Image */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">

                        <div className="p-1.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-2xl shadow-purple-500/30">
                            <img
                                className="w-[120px] h-[120px] rounded-full object-cover border-0 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl"
                                src={creator.profilepic || "/default-profile.jpg"}
                                alt="Profile"
                            />
                        </div>

                    </div>

                </section>


                {/* ================= PROFILE INFO ================= */}

                <section className="text-center px-6 pt-24 pb-12">

                    <div className="max-w-3xl mx-auto">

                        {/* Creator Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl text-sm text-gray-400">

                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>

                            Creator Profile

                        </div>


                        <h1 className="text-3xl md:text-4xl font-extrabold mt-5">

                            @{creator.username}

                        </h1>


                        <p className="text-gray-400 mt-3 text-base md:text-lg">

                            Let's help{" "}
                            <span className="text-purple-400 font-semibold">
                                {username}
                            </span>{" "}
                            get a chai! ☕

                        </p>


                        {/* Stats */}
                        <div className="flex justify-center items-center gap-6 mt-7">

                            <div className="text-center">

                                <p className="text-2xl font-bold text-white">
                                    {payments.length}
                                </p>

                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    Payments
                                </p>

                            </div>


                            <div className="w-px h-10 bg-white/10"></div>


                            <div className="text-center">

                                <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    ₹{payments.reduce((a, b) => a + b.amount, 0)}
                                </p>

                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    Raised
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= PAYMENT + SUPPORTERS ================= */}

                <section className="px-5 md:px-8 pb-20">

                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-7">


                        {/* ================= SUPPORTERS ================= */}

                        <div className="relative group">

                            {/* Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>


                            <div className="relative h-[430px] rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden">

                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">

                                    <div>

                                        <h2 className="text-xl font-bold">
                                            Supporters
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            People who supported this creator
                                        </p>

                                    </div>

                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                        ☕
                                    </div>

                                </div>


                                {/* Messages */}
                                <div className="h-[340px] overflow-y-auto px-5 py-5 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">

                                    {payments.length == 0 && (
                                        <div className="h-full flex flex-col justify-center items-center text-center">

                                            <div className="text-5xl mb-4">
                                                ☕
                                            </div>

                                            <p className="text-gray-400 font-medium">
                                                No payments yet
                                            </p>

                                            <p className="text-gray-600 text-sm mt-2">
                                                Be the first person to support!
                                            </p>

                                        </div>
                                    )}


                                    {payments.map((payment, index) => {

                                        return (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 p-4 mb-3 rounded-2xl bg-white/[0.035] border border-white/5 hover:bg-white/[0.06] hover:border-purple-500/20 transition-all duration-300"
                                            >

                                                <div className="shrink-0">

                                                    <img
                                                        className="w-[42px] h-[42px] rounded-full object-cover border border-white/10"
                                                        src="/avatar.gif"
                                                        alt="Avatar"
                                                    />

                                                </div>


                                                <div className="min-w-0">

                                                    <p className="text-sm text-gray-300 leading-relaxed">

                                                        <span className="font-bold text-white">
                                                            {payment.name}
                                                        </span>{" "}

                                                        donated{" "}

                                                        <span className="font-bold text-purple-400">
                                                            ₹{payment.amount}
                                                        </span>

                                                    </p>


                                                    <p className="text-sm text-gray-500 mt-1 break-words">

                                                        "{payment.message}"

                                                    </p>

                                                </div>

                                            </div>
                                        );

                                    })}

                                </div>

                            </div>

                        </div>


                        {/* ================= PAYMENT CARD ================= */}

                        <div className="relative group">

                            {/* Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-blue-600/10 to-cyan-500/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>


                            <div className="relative rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-7 md:p-8">

                                {/* Header */}
                                <div className="mb-7">

                                    <div className="flex items-center gap-3">

                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 flex items-center justify-center text-2xl">
                                            ☕
                                        </div>

                                        <div>

                                            <h2 className="text-2xl font-bold">
                                                Buy a Chai
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                Support this creator
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Form */}
                                <div className="flex flex-col w-full gap-4">


                                    {/* Name */}
                                    <div>

                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Your Name
                                        </label>

                                        <input
                                            onChange={handleChange}
                                            value={paymentform.name}
                                            name='name'
                                            className="w-full outline-none bg-white/[0.05] border border-white/10 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 transition-all duration-300"
                                            type="text"
                                            placeholder="Enter your name"
                                        />

                                    </div>


                                    {/* Message */}
                                    <div>

                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Message
                                        </label>

                                        <input
                                            onChange={handleChange}
                                            value={paymentform.message}
                                            name='message'
                                            className="w-full outline-none bg-white/[0.05] border border-white/10 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 transition-all duration-300"
                                            type="text"
                                            placeholder="Write a nice message..."
                                        />

                                    </div>


                                    {/* Amount */}
                                    <div>

                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Chai Amount
                                        </label>

                                        <div className="relative">

                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 font-bold">
                                                ₹
                                            </span>

                                            <input
                                                onChange={handleChange}
                                                value={paymentform.amount}
                                                name="amount"
                                                className="w-full outline-none bg-white/[0.05] border border-white/10 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder:text-gray-600 transition-all duration-300"
                                                type="text"
                                                placeholder="Enter Amount"
                                            />

                                        </div>

                                    </div>


                                    {/* Pay Button */}
                                    <button
                                        onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                                        disabled={!isFormValid}
                                        type="button"
                                        className={`w-full rounded-xl font-bold text-sm px-4 py-3.5 text-center transition-all duration-300 mt-2 ${isFormValid
                                            ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 cursor-pointer hover:scale-[1.02] shadow-lg shadow-purple-600/20"
                                            : "bg-gray-700/70 text-gray-500 opacity-60 cursor-not-allowed"
                                            }`}
                                    >
                                        {isFormValid ? "☕ Pay & Support" : "Enter Your Details"}
                                    </button>


                                </div>


                                {/* Secure payment text */}
                                <div className="flex justify-center items-center gap-2 mt-6 text-xs text-gray-600">

                                    <span>🔒</span>

                                    <span>
                                        Secure payment powered by Razorpay
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= BOTTOM CTA ================= */}

                <section className="px-6 pb-24">

                    <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-white/10">

                        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/20 via-blue-700/10 to-cyan-600/20"></div>

                        <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

                        <div className="relative p-10 md:p-14 text-center">

                            <div className="text-5xl mb-5">
                                💜
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold">
                                Every chai makes a difference.
                            </h2>

                            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                                Your support helps creators stay motivated,
                                keep building, and continue sharing their work
                                with the world.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= FOOTER ================= */}

                <footer className="border-t border-white/5 px-6 py-8">

                    <div className="max-w-6xl mx-auto text-center">

                        <h3 className="font-bold text-lg">
                            ☕ Get Me a Chai
                        </h3>

                        <p className="text-gray-600 text-sm mt-1">
                            Supporting creators, one chai at a time.
                        </p>

                    </div>

                </footer>

            </main>

        </>

    );
}

export default PaymentPage