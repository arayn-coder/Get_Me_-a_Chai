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
        <nav
            className="
                sticky top-0 z-50
                w-full
                border-b border-white/10
                bg-[#080612]/85
                backdrop-blur-xl
                text-white
                shadow-[0_8px_40px_rgba(0,0,0,0.25)]
            "
        >

            {/* Top Glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-purple-500/70
                    to-transparent
                "
            />

            <div
                className="
                    relative
                    mx-auto
                    flex
                    min-h-[68px]
                    max-w-7xl
                    items-center
                    justify-between
                    gap-3
                    px-3
                    sm:px-5
                    lg:px-8
                "
            >

                {/* ================================================= */}
                {/* LOGO */}
                {/* ================================================= */}

                <Link
                    className="
                        group
                        flex
                        shrink-0
                        items-center
                        gap-2
                        sm:gap-3
                    "
                    href="/"
                >

                    {/* Logo Glow */}
                    <div className="relative">

                        <div
                            className="
                                absolute
                                inset-0
                                rounded-full
                                bg-purple-500/30
                                blur-lg
                                opacity-0
                                transition-opacity
                                duration-500
                                group-hover:opacity-100
                            "
                        />

                        <img
                            className="
                                relative
                                h-9
                                w-9
                                object-contain
                                transition-transform
                                duration-500
                                group-hover:rotate-[-8deg]
                                group-hover:scale-110
                                sm:h-11
                                sm:w-11
                            "
                            src="/tea.gif"
                            alt="Tea"
                        />

                    </div>

                    <div className="flex flex-col">

                        <span
                            className="
                                bg-gradient-to-r
                                from-purple-300
                                via-fuchsia-300
                                to-blue-300
                                bg-clip-text
                                text-lg
                                font-extrabold
                                tracking-tight
                                text-transparent
                                sm:text-xl
                            "
                        >
                            Get Me a Chai!
                        </span>

                        <span
                            className="
                                hidden
                                text-[9px]
                                font-medium
                                tracking-[0.2em]
                                text-gray-500
                                uppercase
                                sm:block
                            "
                        >
                            Support • Create • Inspire
                        </span>

                    </div>

                </Link>


                {/* ================================================= */}
                {/* EXPLORE */}
                {/* ================================================= */}

                <Link
                    href="/explore"
                    className="
        group
        relative
        hidden
        sm:flex
        items-center
        gap-2.5
        overflow-hidden
        rounded-full
        border
        border-white/10
        bg-white/[0.04]
        px-4
        py-2.5
        text-sm
        font-medium
        text-gray-300
        backdrop-blur-xl
        shadow-lg
        shadow-purple-500/5
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-purple-400/30
        hover:bg-purple-500/10
        hover:text-white
        hover:shadow-purple-500/20
    "
                >
                    {/* Animated icon */}
                    <span
                        className="
            relative
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-purple-500/20
            to-fuchsia-500/20
            text-purple-300
            transition-all
            duration-500
            group-hover:rotate-12
            group-hover:scale-110
            group-hover:from-purple-500/30
            group-hover:to-fuchsia-500/30
        "
                    >
                        <span className="text-sm transition-transform duration-500 group-hover:scale-125">
                            ✨
                        </span>

                        {/* Glow */}
                        <span
                            className="
                absolute
                inset-0
                rounded-full
                bg-purple-500/20
                opacity-0
                blur-md
                transition-opacity
                duration-300
                group-hover:opacity-100
            "
                        />
                    </span>

                    {/* Text */}
                    <span className="relative z-10 whitespace-nowrap">
                        Explore Creators
                    </span>

                    {/* Arrow */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="
            h-4
            w-4
            text-gray-500
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:text-purple-300
        "
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.29a.75.75 0 111.06-1.06l4.24 4.24a.75.75 0 010 1.06l-4.24 4.24a.75.75 0 01-1.08 0z"
                            clipRule="evenodd"
                        />
                    </svg>

                    {/* Bottom gradient indicator */}
                    <span
                        className="
            absolute
            bottom-0
            left-1/2
            h-[2px]
            w-0
            -translate-x-1/2
            rounded-full
            bg-gradient-to-r
            from-purple-500
            via-fuchsia-500
            to-blue-500
            shadow-[0_0_12px_rgba(168,85,247,0.7)]
            transition-all
            duration-500
            group-hover:w-3/4
        "
                    />
                </Link>


                {/* ================================================= */}
                {/* RIGHT SIDE */}
                {/* ================================================= */}

                <div
                    className="
                        relative
                        flex
                        items-center
                        gap-1
                        sm:gap-2
                    "
                >

                    {/* ================= LOADING ================= */}

                    {status === "loading" && (
                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/10
                                bg-white/5
                                px-3
                                py-2
                                text-xs
                                text-gray-400
                            "
                        >

                            <span
                                className="
                                    h-2
                                    w-2
                                    animate-pulse
                                    rounded-full
                                    bg-purple-400
                                "
                            />

                            <span className="hidden sm:inline">
                                Loading...
                            </span>

                        </div>
                    )}


                    {/* ================= LOGGED IN ================= */}

                    {status === "authenticated" && session && (
                        <>

                            {/* User Dropdown Button */}

                            <button
                                onClick={() => setShowdropdown(!showdropdown)}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setShowdropdown(false)
                                    }, 100)
                                }}
                                className="
                                    group
                                    flex
                                    max-w-[170px]
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-purple-500/20
                                    bg-white/[0.05]
                                    px-2.5
                                    py-2
                                    text-sm
                                    font-medium
                                    text-white
                                    shadow-lg
                                    shadow-purple-950/20
                                    backdrop-blur-xl
                                    transition-all
                                    duration-300
                                    hover:border-purple-500/40
                                    hover:bg-purple-500/10
                                    sm:max-w-[220px]
                                    sm:px-3
                                    sm:py-2.5
                                "
                                type="button"
                            >

                                {/* User Avatar */}

                                <span
                                    className="
                                        flex
                                        h-7
                                        w-7
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-gradient-to-br
                                        from-purple-500
                                        to-fuchsia-500
                                        text-xs
                                        font-bold
                                        shadow-lg
                                        shadow-purple-500/20
                                    "
                                >
                                    {session.user?.name?.charAt(0)?.toUpperCase() ||
                                        session.user?.email?.charAt(0)?.toUpperCase() ||
                                        "U"}
                                </span>


                                {/* Email */}

                                <span className="hidden truncate sm:block">
                                    {session.user?.email}
                                </span>


                                {/* Arrow */}

                                <svg
                                    className={`
                                        h-2.5
                                        w-2.5
                                        shrink-0
                                        transition-transform
                                        duration-300
                                        ${showdropdown ? "rotate-180" : ""}
                                    `}
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


                            {/* ================= DROPDOWN ================= */}

                            <div
                                className={`
                                    absolute
                                    right-0
                                    top-[58px]
                                    z-50
                                    w-56
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-[#11101d]/95
                                    shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                                    backdrop-blur-2xl
                                    transition-all
                                    duration-300
                                    origin-top-right
                                    ${showdropdown
                                        ? "visible translate-y-0 scale-100 opacity-100"
                                        : "invisible -translate-y-2 scale-95 opacity-0"
                                    }
                                `}
                            >

                                {/* Dropdown Header */}

                                <div className="
                                    border-b
                                    border-white/10
                                    bg-gradient-to-r
                                    from-purple-500/10
                                    to-fuchsia-500/5
                                    px-4
                                    py-3
                                ">

                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-400">
                                        Account
                                    </p>

                                    <p className="mt-1 truncate text-xs text-gray-500">
                                        {session.user?.email}
                                    </p>

                                </div>


                                <ul className="p-2 text-sm">

                                    {/* Dashboard */}

                                    <li>
                                        <Link
                                            href="/dashboard"
                                            className="
                                                group
                                                flex
                                                items-center
                                                gap-3
                                                rounded-xl
                                                px-3
                                                py-2.5
                                                text-gray-300
                                                transition-all
                                                duration-200
                                                hover:bg-purple-500/10
                                                hover:text-white
                                            "
                                        >

                                            <span className="
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-white/5
                                                transition
                                                group-hover:bg-purple-500/20
                                            ">
                                                📊
                                            </span>

                                            <span>
                                                Dashboard
                                            </span>

                                        </Link>
                                    </li>


                                    {/* Your Page */}

                                    <li>
                                        <Link
                                            href={`/${session.user?.name}`}
                                            className="
                                                group
                                                flex
                                                items-center
                                                gap-3
                                                rounded-xl
                                                px-3
                                                py-2.5
                                                text-gray-300
                                                transition-all
                                                duration-200
                                                hover:bg-purple-500/10
                                                hover:text-white
                                            "
                                        >

                                            <span className="
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-white/5
                                                transition
                                                group-hover:bg-purple-500/20
                                            ">
                                                👤
                                            </span>

                                            <span>
                                                Your Page
                                            </span>

                                        </Link>
                                    </li>


                                    {/* Sign Out */}

                                    <li className="mt-1 border-t border-white/10 pt-1">

                                        <button
                                            onClick={handleLogout}
                                            className="
                                                group
                                                flex
                                                w-full
                                                cursor-pointer
                                                items-center
                                                gap-3
                                                rounded-xl
                                                px-3
                                                py-2.5
                                                text-left
                                                text-red-400
                                                transition-all
                                                duration-200
                                                hover:bg-red-500/10
                                                hover:text-red-300
                                            "
                                        >

                                            <span className="
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-red-500/10
                                                transition
                                                group-hover:bg-red-500/20
                                            ">
                                                ↪
                                            </span>

                                            <span>
                                                Sign out
                                            </span>

                                        </button>

                                    </li>

                                </ul>

                            </div>


                            {/* ================= LOGOUT ================= */}

                            <button
                                onClick={handleLogout}
                                className="
                                    group
                                    hidden
                                    cursor-pointer
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-purple-600
                                    to-fuchsia-600
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    shadow-purple-600/20
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:from-purple-500
                                    hover:to-fuchsia-500
                                    hover:shadow-purple-500/30
                                    active:scale-95
                                    sm:flex
                                "
                            >

                                <span>
                                    Logout
                                </span>

                                <span
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                >
                                    →
                                </span>

                            </button>

                        </>
                    )}


                    {/* ================= NOT LOGGED IN ================= */}

                    {status === "unauthenticated" && (
                        <Link href="/login">

                            <button
                                className="
                                    group
                                    flex
                                    cursor-pointer
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-purple-600
                                    to-fuchsia-600
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    shadow-purple-600/20
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:from-purple-500
                                    hover:to-fuchsia-500
                                    hover:shadow-purple-500/30
                                    active:scale-95
                                    sm:px-5
                                "
                            >

                                <span>
                                    Login
                                </span>

                                <span
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                >
                                    →
                                </span>

                            </button>

                        </Link>
                    )}

                </div>

            </div>


            {/* ================================================= */}
            {/* MOBILE EXPLORE BAR */}
            {/* ================================================= */}

            <div className="
    border-t
    border-white/5
    bg-gradient-to-r
    from-purple-500/[0.04]
    via-white/[0.02]
    to-fuchsia-500/[0.04]
    px-3
    py-2.5
    sm:hidden
">

                <Link
                    href="/explore"
                    className="
            group
            relative
            flex
            items-center
            justify-center
            gap-2.5
            overflow-hidden
            rounded-xl
            border
            border-white/10
            bg-white/[0.035]
            px-4
            py-2.5
            text-xs
            font-semibold
            text-gray-300
            backdrop-blur-xl
            shadow-lg
            shadow-purple-500/5
            transition-all
            duration-300
            active:scale-[0.98]
            hover:border-purple-400/30
            hover:bg-purple-500/10
            hover:text-white
        "
                >

                    {/* Animated Explore Icon */}
                    <span
                        className="
                relative
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-purple-500/20
                to-fuchsia-500/20
                text-sm
                text-purple-300
                transition-all
                duration-500
                group-hover:rotate-12
                group-hover:scale-110
            "
                    >
                        <span className="
                transition-transform
                duration-500
                group-hover:scale-125
            ">
                            ✨
                        </span>

                        {/* Glow */}
                        <span
                            className="
                    absolute
                    inset-0
                    rounded-full
                    bg-purple-500/20
                    opacity-0
                    blur-md
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                "
                        />
                    </span>

                    {/* Text */}
                    <span className="relative z-10">
                        Explore Creators
                    </span>

                    {/* Arrow */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="
                h-4
                w-4
                text-purple-400
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:text-fuchsia-300
            "
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.29a.75.75 0 111.06-1.06l4.24 4.24a.75.75 0 010 1.06l-4.24 4.24a.75.75 0 01-1.08 0z"
                            clipRule="evenodd"
                        />
                    </svg>

                    {/* Bottom Glow */}
                    <span
                        className="
                absolute
                bottom-0
                left-1/2
                h-[2px]
                w-0
                -translate-x-1/2
                rounded-full
                bg-gradient-to-r
                from-purple-500
                via-fuchsia-500
                to-blue-500
                shadow-[0_0_10px_rgba(168,85,247,0.7)]
                transition-all
                duration-500
                group-hover:w-1/2
            "
                    />

                </Link>

            </div>
        </nav>
    )
}

export default Navbar