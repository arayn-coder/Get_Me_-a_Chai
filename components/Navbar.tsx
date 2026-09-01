"use client"

import React, { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

const Navbar = () => {
    const { data: session, status } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)

    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/login",
        })
    }

    return (
        <nav className="bg-gray-900 shadow-xl shadow-white text-white flex justify-between items-center px-4 md:h-16">

            {/* Logo */}
            <Link
                className="logo font-bold text-lg flex justify-center items-center"
                href="/"
            >
                <img
                    className="invertImg"
                    src="/tea.gif"
                    width={44}
                    alt="Tea"
                />

                <span className="text-xl md:text-base my-3 md:my-0">
                    Get Me a Chai!
                </span>
            </Link>

            <div className="relative flex justify-center items-center md:block gap-4">

                {/* Loading */}
                {status === "loading" && (
                    <span className="text-sm mr-3">Loading...</span>
                )}

                {/* Logged in */}
                {status === "authenticated" && session && (
                    <>
                        <button
                            onClick={() => setShowdropdown(!showdropdown)}
                            onBlur={() => {
                                setTimeout(() => {
                                    setShowdropdown(false)
                                }, 100)
                            }}
                            className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center"
                            type="button"
                        >
                            {session.user?.email}

                            <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        <div
                            className={`z-10 ${
                                showdropdown ? "" : "hidden"
                            } absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                        >
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                <li>
                                    <Link
                                        href="/dashboard"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Dashboard
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={`/${session.user?.name}`}
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Your Page
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Sign out
                                    </button>
                                </li>

                            </ul>
                        </div>

                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            className="text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                        >
                            Logout
                        </button>
                    </>
                )}

                {/* Not logged in */}
                {status === "unauthenticated" && (
                    <Link href="/login">
                        <button
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                        >
                            Login
                        </button>
                    </Link>
                )}

            </div>
        </nav>
    )
}

export default Navbar