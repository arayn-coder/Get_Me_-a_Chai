"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { fetchuser, updateProfile } from "@/actions/useractions"
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Dashboard = () => {

    const { data: session, status } = useSession()
    const router = useRouter()

    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        profilepic: "",
        coverpic: "",
        razorpayid: "",
        razorpaysecret: ""
    })

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)


    useEffect(() => {

        if (status === "loading") return

        if (status === "unauthenticated") {
            router.push("/login")
            return
        }

        const getData = async () => {

            try {

                const email = session?.user?.email

                if (!email) {
                    setFetching(false)
                    return
                }

                console.log("Fetching user:", email)

                const user = await fetchuser(email)

                console.log("User from database:", user)

                if (user) {

                    setForm({
                        name: user.name || "",
                        email: user.email || "",
                        username: user.username || "",
                        profilepic: user.profilepic || "",
                        coverpic: user.coverpic || "",
                        razorpayid: user.razorpayid || "",
                        razorpaysecret: user.razorpaysecret || ""
                    })

                }

            } catch (error) {

                console.error("Fetch user error:", error)

            } finally {

                setFetching(false)

            }

        }

        getData()

    }, [status, router])


    const handleChange = (e) => {

        const { name, value } = e.target

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value
        }))

    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        console.log("SAVE BUTTON CLICKED")

        try {

            setLoading(true)

            const formData = new FormData(e.currentTarget)

            console.log(
                "Form data:",
                Object.fromEntries(formData)
            )

            const result = await updateProfile(
                formData,
                form.username
            )

            console.log("Update result:", result)

            if (result?.error) {
                alert(result.error)
                return
            }

            toast('profile was updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        } catch (error) {

            console.error("Update error:", error)

            alert("Something went wrong")

        } finally {

            setLoading(false)

        }

    }


    if (status === "loading" || fetching) {
        return (
            <div className="min-h-screen bg-[#050816] text-white flex justify-center items-center">

                <div className="flex flex-col items-center gap-5">

                    <div className="w-14 h-14 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin"></div>

                    <p className="text-gray-400 text-sm">
                        Loading your dashboard...
                    </p>

                </div>

            </div>
        )
    }


    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />


            {/* ================= MAIN DASHBOARD ================= */}

            <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

                {/* Background Glow */}

                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

                    <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[130px]" />

                    <div className="absolute top-[30%] right-[-200px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[130px]" />

                    <div className="absolute bottom-[-200px] left-[30%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />

                </div>


                {/* ================= HEADER ================= */}

                <section className="px-6 pt-16 pb-10">

                    <div className="max-w-6xl mx-auto">

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

                            <div>

                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl text-sm text-gray-400">

                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>

                                    Creator Dashboard

                                </div>

                                <h1 className="text-4xl md:text-5xl font-extrabold mt-5">

                                    Welcome back,
                                    <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                        {form.name || "Creator"} 👋
                                    </span>

                                </h1>

                                <p className="text-gray-400 mt-4 max-w-xl">
                                    Manage your creator profile and payment
                                    settings from one place.
                                </p>

                            </div>


                            {/* Profile Mini Card */}

                            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">

                                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-[2px]">

                                    <img
                                        src={form.profilepic || "/avatar.gif"}
                                        alt=""
                                        className="w-full h-full rounded-full object-cover border-2 border-[#050816]"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold">
                                        @{form.username || "username"}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Creator account
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* Divider */}

                <div className="max-w-6xl mx-auto px-6">

                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                </div>


                {/* ================= DASHBOARD CONTENT ================= */}

                <section className="px-6 py-12">

                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-7">


                        {/* ================= LEFT INFO ================= */}

                        <div className="lg:col-span-1">

                            <div className="relative group">

                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>

                                <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7">

                                    <div className="text-4xl mb-5">
                                        ☕
                                    </div>

                                    <h2 className="text-2xl font-bold">
                                        Your Creator Profile
                                    </h2>

                                    <p className="text-gray-400 text-sm leading-relaxed mt-3">
                                        Keep your profile information updated
                                        so your supporters can recognize you
                                        and easily support your work.
                                    </p>


                                    {/* Profile Preview */}

                                    <div className="mt-8 rounded-2xl overflow-hidden border border-white/10">

                                        <div className="h-24 relative">

                                            {form.coverpic ? (
                                                <img
                                                    src={form.coverpic}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-r from-purple-700 to-blue-700"></div>
                                            )}

                                            <div className="absolute inset-0 bg-black/30"></div>

                                        </div>


                                        <div className="relative bg-white/[0.04] p-5 pt-9">

                                            <div className="absolute -top-7 left-5">

                                                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-[2px]">

                                                    <img
                                                        src={form.profilepic || "/avatar.gif"}
                                                        alt=""
                                                        className="w-full h-full rounded-full object-cover border-2 border-[#080b18]"
                                                    />

                                                </div>

                                            </div>


                                            <h3 className="font-bold">
                                                {form.name || "Your Name"}
                                            </h3>

                                            <p className="text-sm text-purple-400 mt-1">
                                                @{form.username || "username"}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Helpful Text */}

                                    <div className="mt-6 p-4 rounded-2xl bg-purple-500/[0.06] border border-purple-500/10">

                                        <p className="text-xs text-gray-400 leading-relaxed">

                                            💡 <span className="text-gray-300 font-medium">
                                                Tip:
                                            </span>{" "}
                                            A good profile picture and cover
                                            image can make your creator page
                                            look much more professional.

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ================= FORM ================= */}

                        <div className="lg:col-span-2">

                            <div className="relative group">

                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-500/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500"></div>


                                <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 md:p-9">

                                    <div className="mb-8">

                                        <p className="text-purple-400 font-semibold uppercase tracking-widest text-xs">
                                            Account Settings
                                        </p>

                                        <h2 className="text-3xl font-bold mt-2">
                                            Edit your profile
                                        </h2>

                                        <p className="text-gray-500 text-sm mt-2">
                                            Update your information and payment
                                            credentials.
                                        </p>

                                    </div>


                                    <form onSubmit={handleSubmit}>


                                        {/* ================= BASIC INFORMATION ================= */}

                                        <div className="mb-8">

                                            <div className="flex items-center gap-3 mb-5">

                                                <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                                    👤
                                                </div>

                                                <div>

                                                    <h3 className="font-semibold">
                                                        Basic Information
                                                    </h3>

                                                    <p className="text-xs text-gray-600">
                                                        Your public profile details
                                                    </p>

                                                </div>

                                            </div>


                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                                                {/* Name */}

                                                <div>

                                                    <label
                                                        htmlFor="name"
                                                        className="block mb-2 text-sm font-medium text-gray-400"
                                                    >
                                                        Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={form.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter your name"
                                                        className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 transition-all"
                                                    />

                                                </div>


                                                {/* Email */}

                                                <div>

                                                    <label
                                                        htmlFor="email"
                                                        className="block mb-2 text-sm font-medium text-gray-400"
                                                    >
                                                        Email
                                                    </label>

                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={form.email}
                                                        onChange={handleChange}
                                                        placeholder="Enter your email"
                                                        className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 transition-all"
                                                    />

                                                </div>


                                                {/* Username */}

                                                <div className="md:col-span-2">

                                                    <label
                                                        htmlFor="username"
                                                        className="block mb-2 text-sm font-medium text-gray-400"
                                                    >
                                                        Username
                                                    </label>

                                                    <div className="relative">

                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 font-semibold">
                                                            @
                                                        </span>

                                                        <input
                                                            type="text"
                                                            id="username"
                                                            name="username"
                                                            value={form.username}
                                                            onChange={handleChange}
                                                            placeholder="Enter username"
                                                            className="w-full p-3.5 pl-9 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 transition-all"
                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>


                                        {/* ================= IMAGES ================= */}

                                        <div className="mb-8 pt-7 border-t border-white/5">

                                            <div className="flex items-center gap-3 mb-5">

                                                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                                    🖼️
                                                </div>

                                                <div>

                                                    <h3 className="font-semibold">
                                                        Profile Images
                                                    </h3>

                                                    <p className="text-xs text-gray-600">
                                                        Customize your creator page
                                                    </p>

                                                </div>

                                            </div>


                                            <div className="grid grid-cols-1 gap-5">


                                                {/* Profile Picture */}

                                                <div>

                                                    <label
                                                        htmlFor="profilepic"
                                                        className="block mb-2 text-sm font-medium text-gray-400"
                                                    >
                                                        Profile Picture URL
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="profilepic"
                                                        name="profilepic"
                                                        value={form.profilepic}
                                                        onChange={handleChange}
                                                        placeholder="https://example.com/profile.jpg"
                                                        className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10 transition-all"
                                                    />

                                                </div>


                                                {/* Cover Picture */}

                                                <div>

                                                    <label
                                                        htmlFor="coverpic"
                                                        className="block mb-2 text-sm font-medium text-gray-400"
                                                    >
                                                        Cover Picture URL
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="coverpic"
                                                        name="coverpic"
                                                        value={form.coverpic}
                                                        onChange={handleChange}
                                                        placeholder="https://example.com/cover.jpg"
                                                        className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10 transition-all"
                                                    />

                                                </div>

                                            </div>

                                        </div>


                                        {/* ================= PAYMENT ================= */}

                                        <div className="mb-8 pt-7 border-t border-white/5">

                                            <div className="flex items-center gap-3 mb-5">

                                                <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                                    💳
                                                </div>

                                                <div>

                                                    <h3 className="font-semibold">
                                                        Payment Settings
                                                    </h3>

                                                    <p className="text-xs text-gray-600">
                                                        Configure Razorpay for receiving payments
                                                    </p>

                                                </div>

                                            </div>


                                            <div className="space-y-5">


                                                {/* Razorpay ID */}

                                                <div>

                                                    <label
                                                        htmlFor="razorpayid"
                                                        className="block mb-2 text-sm font-medium text-gray-400"
                                                    >
                                                        Razorpay ID
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="razorpayid"
                                                        name="razorpayid"
                                                        value={form.razorpayid}
                                                        onChange={handleChange}
                                                        placeholder="Enter Razorpay ID"
                                                        className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/10 transition-all"
                                                    />

                                                </div>


                                                {/* Razorpay Secret */}

                                                <div>

                                                    <label
                                                        htmlFor="razorpaysecret"
                                                        className="block mb-2 text-sm font-medium text-gray-400"
                                                    >
                                                        Razorpay Secret
                                                    </label>

                                                    <input
                                                        type="password"
                                                        id="razorpaysecret"
                                                        name="razorpaysecret"
                                                        value={form.razorpaysecret}
                                                        onChange={handleChange}
                                                        placeholder="Enter Razorpay Secret"
                                                        className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/10 transition-all"
                                                    />

                                                </div>

                                            </div>


                                            {/* Security Notice */}

                                            <div className="mt-5 p-4 rounded-2xl bg-yellow-500/[0.05] border border-yellow-500/10">

                                                <p className="text-xs text-gray-500 leading-relaxed">

                                                    🔒 <span className="text-gray-400 font-medium">
                                                        Keep your Razorpay credentials private.
                                                    </span>{" "}
                                                    Never share your secret key publicly.

                                                </p>

                                            </div>

                                        </div>


                                        {/* ================= SAVE BUTTON ================= */}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:from-purple-500 hover:to-blue-500 hover:scale-[1.01] transition-all duration-300 disabled:bg-gray-700 disabled:from-gray-700 disabled:to-gray-700 disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-purple-600/20"
                                        >
                                            {loading ? (
                                                <span className="flex justify-center items-center gap-3">

                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>

                                                    Saving...

                                                </span>
                                            ) : (
                                                "Save Changes"
                                            )}
                                        </button>


                                    </form>

                                </div>

                            </div>

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
    )
}

export default Dashboard