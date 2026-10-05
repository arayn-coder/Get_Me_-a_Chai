"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast, ToastContainer, Bounce } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { createUser } from "../../actions/useractions"
import { Eye, EyeOff } from "lucide-react"

export default function CreateAccount() {

    const router = useRouter()

    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }


    const handleSubmit = async (e) => {

        e.preventDefault()


        if (!form.name.trim()) {
            toast.error("Name is required")
            return
        }


        if (!form.email.trim()) {
            toast.error("Email is required")
            return
        }


        if (!form.username.trim()) {
            toast.error("Username is required")
            return
        }


        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters")
            return
        }


        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }


        try {

            setLoading(true)


            const formData = new FormData()

            formData.append("name", form.name)
            formData.append("email", form.email)
            formData.append("username", form.username)
            formData.append("password", form.password)


            const result = await createUser(formData)


            if (result?.error) {

                toast.error(result.error)

                return
            }


            toast.success("Account created successfully!")


            setTimeout(() => {

                router.push("/login")

            }, 1500)


        } catch (error) {

            console.error(error)

            toast.error("Something went wrong")

        } finally {

            setLoading(false)

        }

    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="dark"
                transition={Bounce}
            />


            <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-5 py-12 relative overflow-hidden">


                {/* Background */}

                <div className="fixed inset-0 pointer-events-none">

                    <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[130px]" />

                    <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[130px]" />

                </div>


                {/* Card */}

                <div className="relative w-full max-w-lg">

                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl"></div>


                    <div className="relative bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-9">


                        {/* Logo */}

                        <div className="text-center mb-8">

                            <div className="text-5xl mb-4">
                                ☕
                            </div>


                            <h1 className="text-3xl font-bold">
                                Create Account
                            </h1>


                            <p className="text-gray-500 text-sm mt-2">
                                Start your creator journey with Get Me a Chai
                            </p>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >


                            {/* Name */}

                            <div>

                                <label className="block text-sm text-gray-400 mb-2">
                                    Full Name
                                </label>

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-purple-500/60 text-white placeholder:text-gray-600"
                                />

                            </div>


                            {/* Email */}

                            <div>

                                <label className="block text-sm text-gray-400 mb-2">
                                    Email
                                </label>

                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-purple-500/60 text-white placeholder:text-gray-600"
                                />

                            </div>


                            {/* Username */}

                            <div>

                                <label className="block text-sm text-gray-400 mb-2">
                                    Username
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400">
                                        @
                                    </span>

                                    <input
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Choose username"
                                        className="w-full p-3.5 pl-9 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-purple-500/60 text-white placeholder:text-gray-600"
                                    />

                                </div>

                            </div>



                            {/* Password */}

                            <div>

                                <label className="block text-sm text-gray-400 mb-2">
                                    Password
                                </label>

                                <div className="relative">

                                    <input
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        className="w-full p-3.5 pr-12 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-purple-500/60 text-white placeholder:text-gray-600"
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


                            {/* Confirm Password */}

                            <div>

                                <label className="block text-sm text-gray-400 mb-2">
                                    Confirm Password
                                </label>

                                <div className="relative">

                                    <input
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        className="w-full p-3.5 pr-12 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-purple-500/60 text-white placeholder:text-gray-600"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide confirm password"
                                                : "Show confirm password"
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={20} strokeWidth={1.8} />
                                        ) : (
                                            <Eye size={20} strokeWidth={1.8} />
                                        )}
                                    </button>

                                </div>

                            </div>




                            {/* Button */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full cursor-pointer py-3.5 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >

                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"
                                }

                            </button>


                        </form>


                        {/* Login */}

                        <div className="text-center mt-7">

                            <p className="text-gray-500 text-sm">

                                Already have an account?{" "}

                                <Link
                                    href="/login"
                                    className="text-purple-400 hover:text-purple-300 font-semibold"
                                >
                                    Login
                                </Link>

                            </p>

                        </div>


                    </div>

                </div>

            </main>
        </>
    )
}