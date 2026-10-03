"use client"

import { useEffect, useState } from "react"
import CreatorCard from "@/components/CreatorCard"

const Explore = () => {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const fetchCreators = async () => {
    try {
      const response = await fetch("/api/creators")

      const data = await response.json()

      if (data.success) {
        setCreators(data.creators)
      }
    } catch (error) {
      console.error("Error fetching creators:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCreators = creators.filter((creator) => {
    const query = search
      .toLowerCase()
      .trim()
      .replace(/^@/, "")

    return (
      creator.name?.toLowerCase().includes(query) ||
      creator.username?.toLowerCase().includes(query)
    )
  })
  useEffect(() => {
    fetchCreators()
  }, [])

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070511] text-white">

        {/* Background glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-72
            w-72
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-purple-600/20
            blur-[100px]
            animate-pulse
            sm:h-96
            sm:w-96
          "
        />

        <div className="relative z-10 flex flex-col items-center">

          {/* Loader */}
          <div className="relative h-20 w-20">

            <div
              className="
                absolute
                inset-0
                rounded-full
                border-4
                border-white/5
              "
            />

            <div
              className="
                absolute
                inset-0
                animate-spin
                rounded-full
                border-4
                border-transparent
                border-r-fuchsia-500
                border-t-purple-500
              "
            />

            <div
              className="
                absolute
                inset-3
                rounded-full
                bg-gradient-to-br
                from-purple-500
                to-fuchsia-500
                opacity-20
                blur-md
              "
            />

            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              ☕
            </div>

          </div>

          <p className="mt-6 animate-pulse text-sm text-gray-300 sm:text-base">
            Discovering amazing creators...
          </p>

          <p className="mt-2 text-xs text-gray-600">
            Please wait a moment
          </p>

        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070511] text-white">

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -top-40
          left-1/2
          h-80
          w-80
          -translate-x-1/2
          rounded-full
          bg-purple-600/20
          blur-[120px]
          animate-pulse
          sm:h-[500px]
          sm:w-[500px]
        "
      />
      <div className="mx-auto mt-6 w-full max-w-2xl px-1 sm:mt-8 sm:px-0">
        <div
          className="
            group
            relative
            flex
            min-h-[50px]
            w-full
            items-center
            rounded-xl
            border
            border-white/10
            bg-white/[0.04]
            px-3
            py-2
            shadow-xl
            shadow-purple-500/5
            backdrop-blur-xl
            transition-all
            duration-300
            focus-within:border-purple-500/40
            focus-within:bg-purple-500/[0.06]
            focus-within:shadow-purple-500/10
            sm:min-h-[56px]
            sm:rounded-2xl
            sm:px-4
            sm:py-3
        "
        >

          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="
                h-[18px]
                w-[18px]
                shrink-0
                text-gray-500
                transition-all
                duration-300
                group-focus-within:scale-110
                group-focus-within:text-purple-400
                sm:h-5
                sm:w-5
            "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>

          {/* Input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search creators or usernames..."
            className="
                min-w-0
                flex-1
                bg-transparent
                px-2.5
                text-sm
                text-white
                outline-none
                placeholder:text-xs
                placeholder:text-gray-600
                sm:px-3
                sm:text-base
                sm:placeholder:text-sm
            "
          />

          {/* Clear button */}
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/5
                    text-base
                    leading-none
                    text-gray-500
                    transition-all
                    duration-200
                    hover:bg-white/10
                    hover:text-white
                    active:scale-90
                    sm:h-8
                    sm:w-8
                "
            >
              ×
            </button>
          )}

          {/* Focus glow */}
          <span
            className="
                pointer-events-none
                absolute
                inset-0
                -z-10
                rounded-xl
                bg-purple-500/10
                opacity-0
                blur-xl
                transition-opacity
                duration-300
                group-focus-within:opacity-100
                sm:rounded-2xl
            "
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          py-12
          sm:px-6
          sm:py-16
          lg:px-8
          lg:py-20
        "
      >



        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">

          {/* Badge */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-purple-500/20
              bg-purple-500/10
              px-4
              py-2
              text-xs
              font-medium
              text-purple-300
              backdrop-blur-xl
              sm:text-sm
            "
          >

            <span className="relative flex h-2 w-2">

              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-purple-400
                  opacity-75
                "
              />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />

            </span>

            Discover • Support • Create

          </div>


          {/* Heading */}
          <h1
            className="
              mt-6
              text-4xl
              font-black
              leading-tight
              tracking-tight
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >

            Discover

            <span
              className="
                mt-1
                block
                bg-gradient-to-r
                from-purple-400
                via-fuchsia-400
                to-blue-400
                bg-clip-text
                text-transparent
              "
            >
              Amazing Creators
            </span>

          </h1>


          {/* Description */}
          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-relaxed
              text-gray-400
              sm:mt-6
              sm:text-base
              md:text-lg
            "
          >
            Discover talented creators, explore their work,
            and support the people who inspire you.
          </p>


          {/* Creator count */}
          {creators.length > 0 && (
            <div
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.035]
                px-4
                py-2
                text-xs
                text-gray-400
                backdrop-blur-xl
                sm:text-sm
              "
            >

              <span
                className="
                  flex
                  h-6
                  min-w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-purple-500/15
                  px-1.5
                  font-bold
                  text-purple-300
                "
              >
                {creators.length}
              </span>

              <span>
                {creators.length === 1 ? "creator" : "creators"} waiting to be discovered
              </span>

            </div>
          )}

        </section>


        {/* ================================================= */}
        {/* CREATORS */}
        {/* ================================================= */}

        {creators.length > 0 && filteredCreators.length === 0 ? (
          <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-white/10 bg-white/[0.035] px-6 py-14 text-center backdrop-blur-xl">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-3xl">
              🔍
            </div>

            <h2 className="mt-6 text-xl font-bold text-white">
              No creators found
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              We couldn't find a creator matching{" "}
              <span className="font-medium text-purple-400">
                "{search}"
              </span>
              .
            </p>

            <button
              onClick={() => setSearch("")}
              className="
                mt-6
                rounded-xl
                bg-gradient-to-r
                from-purple-600
                to-fuchsia-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-lg
                hover:shadow-purple-500/20
            "
            >
              Clear Search
            </button>

          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4">
            {filteredCreators.map((creator) => (
              <div
                key={creator._id}
                className="transition-all duration-500 hover:-translate-y-2"
              >
                <CreatorCard creator={creator} />
              </div>
            ))}
          </div>
        )}

        {/* ================================================= */}
        {/* BOTTOM */}
        {/* ================================================= */}

        {creators.length > 0 && (
          <div className="mt-16 text-center sm:mt-20">

            <div
              className="
                inline-flex
                items-center
                gap-3
                text-xs
                text-gray-600
                sm:text-sm
              "
            >

              <span className="h-px w-8 bg-white/10 sm:w-14" />

              <span>
                Keep exploring & support creators ☕
              </span>

              <span className="h-px w-8 bg-white/10 sm:w-14" />

            </div>

          </div>
        )}

      </main>

    </div>
  )
}

export default Explore