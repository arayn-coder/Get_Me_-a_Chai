import Link from "next/link"

const CreatorCard = ({ creator }) => {
  return (
    <Link href={`/${creator.username}`} className="block h-full">
      <div
        className="
        group relative h-full
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-[#0d0b18]
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        cursor-pointer

        transition-all duration-500 ease-out

        hover:-translate-y-2
        hover:border-purple-500/50
        hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)]
        "
      >

        {/* Animated Glow */}
        <div
          className="
          absolute -top-24 -right-24
          h-48 w-48
          rounded-full
          bg-purple-600/20
          blur-3xl
          transition-all duration-700
          group-hover:bg-purple-500/30
          group-hover:scale-150
          pointer-events-none
          "
        />

        {/* ================= COVER ================= */}

        <div className="relative h-36 sm:h-40 overflow-hidden">

          {creator.coverpic ? (
            <img
              src={creator.coverpic}
              alt={`${creator.name} cover`}
              className="
              w-full h-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-110
              "
            />
          ) : (
            <div
              className="
              w-full h-full
              bg-gradient-to-br
              from-purple-700
              via-fuchsia-600
              to-blue-600
              "
            />
          )}

          {/* Cover Overlay */}
          <div
            className="
            absolute inset-0
            bg-gradient-to-t
            from-[#0d0b18]
            via-transparent
            to-black/10
            "
          />

          {/* Animated shine */}
          <div
            className="
            absolute inset-0
            -translate-x-full
            group-hover:translate-x-full
            transition-transform
            duration-1000
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
            skew-x-12
            "
          />

        </div>


        {/* ================= CONTENT ================= */}

        <div className="relative px-4 sm:px-5 pb-5">


          {/* ================= PROFILE IMAGE ================= */}

          <div
            className="
            relative
            -mt-11
            w-[76px]
            h-[76px]
            sm:w-20
            sm:h-20
            rounded-full
            p-[3px]
            bg-gradient-to-br
            from-purple-500
            via-fuchsia-500
            to-blue-500
            shadow-lg
            shadow-purple-500/20

            transition-transform
            duration-500
            group-hover:scale-105
            "
          >

            <div
              className="
              w-full h-full
              rounded-full
              overflow-hidden
              border-4
              border-[#0d0b18]
              bg-gray-800
              "
            >

              {creator.profilepic ? (
                <img
                  src={creator.profilepic}
                  alt={creator.name}
                  className="
                  w-full h-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-110
                  "
                />
              ) : (
                <div
                  className="
                  w-full h-full
                  flex
                  items-center
                  justify-center
                  bg-gradient-to-br
                  from-purple-600
                  to-blue-600
                  text-white
                  text-2xl
                  font-bold
                  "
                >
                  {creator.name?.charAt(0).toUpperCase()}
                </div>
              )}

            </div>

          </div>


          {/* ================= CREATOR INFO ================= */}

          <div className="mt-4">

            <div className="flex items-center gap-2">

              <h2
                className="
                text-lg
                sm:text-xl
                font-bold
                text-white
                truncate
                group-hover:text-purple-300
                transition-colors
                duration-300
                "
              >
                {creator.name}
              </h2>

              {/* Verified style badge */}
              <span
                className="
                flex-shrink-0
                flex items-center justify-center
                w-5 h-5
                rounded-full
                bg-purple-500/20
                border border-purple-400/30
                text-purple-300
                text-[10px]
                "
              >
                ✓
              </span>

            </div>


            <p
              className="
              mt-1
              text-sm
              text-gray-500
              group-hover:text-gray-400
              transition-colors
              "
            >
              @{creator.username}
            </p>

          </div>


          {/* ================= SUPPORT BUTTON ================= */}

          <button
            className="
            relative
            w-full
            mt-5
            overflow-hidden
            rounded-xl
            py-3

            bg-gradient-to-r
            from-purple-600
            via-fuchsia-600
            to-purple-600

            bg-[length:200%_100%]

            text-white
            font-semibold
            text-sm

            shadow-lg
            shadow-purple-600/20

            transition-all
            duration-500

            group-hover:bg-[position:100%_0]
            group-hover:shadow-purple-500/40
            group-hover:scale-[1.02]

            active:scale-[0.98]
            "
          >

            {/* Button Shine */}
            <span
              className="
              absolute inset-0
              -translate-x-full
              group-hover:translate-x-full
              transition-transform
              duration-700
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              "
            />

            <span className="relative flex items-center justify-center gap-2">

              <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round">
                <path d="M2.5 4V5C2.5 6.41421 2.5 7.12132 2.93934 7.56066C3.37868 8 4.08579 8 5.5 8H6.5"></path>
                <path d="M2.49922 12.0005C2.49922 17.2472 6.75252 21.5005 11.9992 21.5005C17.2459 21.5005 21.4992 17.2472 21.4992 12.0005C21.4992 6.75378 17.2459 2.50049 11.9992 2.50049C8.08133 2.50049 5.04534 4.60026 3.41084 7.26031"></path>
                <path d="M16 17C15.8565 15.1345 14.3644 13.6576 12.4975 13.5332L12 13.5C11.8223 13.5049 11.6567 13.5113 11.5004 13.519C9.65 13.6097 8.14209 15.1529 8 17"></path>
                <path d="M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"></path>
              </svg></span>

              <span>
                Support Creator
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

            </span>

          </button>

        </div>

      </div>
    </Link>
  )
}

export default CreatorCard