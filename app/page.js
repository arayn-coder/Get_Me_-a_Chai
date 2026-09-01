import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-[#050816] text-white overflow-hidden">

        {/* Background Glow */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[130px]" />
          <div className="absolute top-[30%] right-[-200px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[130px]" />
          <div className="absolute bottom-[-200px] left-[30%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />
        </div>

        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-[65vh] flex items-center justify-center px-6 py-20">

          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.04] via-transparent to-transparent" />

          <div className="relative max-w-4xl mx-auto text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-xl text-sm text-gray-300">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Support your favorite creators
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight flex flex-col">
              Buy Me a
              <div className="flex items-center  justify-center">
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Chai
                </span>
                <span className="flex">☕</span>
              </div>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto mt-7 text-lg md:text-xl text-gray-400 leading-relaxed">
              Your chai is ready, thanks to your amazing fans.
              <br className="hidden sm:block" />
              Support creators and help them keep doing what they love.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

              <Link href={`/login`}>
                <button
                  type="button"
                  className="w-full sm:w-auto text-white cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-600/20 hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 rounded-xl font-bold text-sm px-7 py-3.5"
                >
                  Start Here →
                </button>
              </Link>

              <Link href={`/about`}>
                <button
                  type="button"
                  className="w-full sm:w-auto text-white cursor-pointer bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-purple-500/40 backdrop-blur-xl transition-all duration-300 rounded-xl font-bold text-sm px-7 py-3.5"
                >
                  Read More
                </button>
              </Link>

            </div>

            {/* Small trust text */}
            <div className="mt-8 flex justify-center items-center gap-3 text-sm text-gray-500">
              <span>☕</span>
              <span>Small support. Big motivation.</span>
            </div>

          </div>
        </section>


        {/* Divider */}
        <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />


        {/* ================= SUPPORT SECTION ================= */}
        <section className="px-6 py-24">

          <div className="max-w-6xl mx-auto">

            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto mb-16">

              <p className="text-purple-400 font-semibold uppercase tracking-widest text-sm">
                How it works
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mt-3">
                Your fans can buy you a chai
              </h2>

              <p className="text-gray-400 mt-5 leading-relaxed">
                A simple way for your fans to support your work and show
                appreciation.
              </p>

            </div>


            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Card 1 */}
              <div className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.07] hover:border-purple-500/30 hover:-translate-y-2 transition-all duration-300">

                <div className="absolute top-5 right-6 text-6xl font-black text-white/[0.03]">
                  01
                </div>

                <div className="relative">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">

                    <img
                      width={50}
                      src="/man.gif"
                      alt=""
                      className="rounded-xl"
                    />

                  </div>

                  <h3 className="text-xl font-bold mt-7">
                    Fans want to help
                  </h3>

                  <p className="text-gray-400 mt-3 leading-relaxed text-sm">
                    Your fans appreciate your work and want to help you
                    continue creating amazing things.
                  </p>

                </div>
              </div>


              {/* Card 2 */}
              <div className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.07] hover:border-purple-500/30 hover:-translate-y-2 transition-all duration-300">

                <div className="absolute top-5 right-6 text-6xl font-black text-white/[0.03]">
                  02
                </div>

                <div className="relative">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">

                    <img
                      width={50}
                      src="/coin.gif"
                      alt=""
                      className="rounded-xl"
                    />

                  </div>

                  <h3 className="text-xl font-bold mt-7">
                    They send support
                  </h3>

                  <p className="text-gray-400 mt-3 leading-relaxed text-sm">
                    Fans can easily send a small contribution to support
                    your creative journey.
                  </p>

                </div>
              </div>


              {/* Card 3 */}
              <div className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.07] hover:border-purple-500/30 hover:-translate-y-2 transition-all duration-300">

                <div className="absolute top-5 right-6 text-6xl font-black text-white/[0.03]">
                  03
                </div>

                <div className="relative">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">

                    <img
                      width={50}
                      src="/group.gif"
                      alt=""
                      className="rounded-xl"
                    />

                  </div>

                  <h3 className="text-xl font-bold mt-7">
                    You keep creating
                  </h3>

                  <p className="text-gray-400 mt-3 leading-relaxed text-sm">
                    Turn that support into motivation and keep building,
                    creating, and sharing your work.
                  </p>

                </div>
              </div>

            </div>

          </div>
        </section>


        {/* Divider */}
        <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />


        {/* ================= VIDEO SECTION ================= */}
        <section className="px-6 py-24">

          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-12">

              <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm">
                See how it works
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mt-3">
                A chai can make a difference.
              </h2>

              <p className="text-gray-400 mt-5 max-w-xl mx-auto">
                Discover how small contributions can help creators continue
                doing what they love.
              </p>

            </div>


            {/* Video Container */}
            <div className="relative group">

              {/* Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-blue-600/20 to-cyan-500/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500" />

              {/* Video */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">

                <div className="aspect-video">

                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/YkGFaQQQsvQ?si=KqE5XRi3rg_Sg2ud"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= FINAL CTA ================= */}
        <section className="px-6 pb-24">

          <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-white/10">

            <div className="absolute inset-0 bg-gradient-to-r from-purple-700/30 via-blue-700/20 to-cyan-600/20" />

            <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />

            <div className="relative p-10 md:p-16 text-center">

              <div className="text-5xl mb-6">
                ☕
              </div>

              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to get your first chai?
              </h2>

              <p className="mt-5 text-gray-400 max-w-xl mx-auto leading-relaxed">
                Create your page, share it with your fans, and start building
                a community that supports what you do.
              </p>

              <Link href={`/login`}>
                <button
                  type="button"
                  className="mt-8 px-8 py-4 rounded-xl bg-white text-black font-bold hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Start Your Journey →
                </button>
              </Link>

            </div>

          </div>

        </section>


        {/* ================= FOOTER ================= */}
        <footer className="border-t border-white/5 px-6 py-10">

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

            <div className="text-center md:text-left">

              <h3 className="font-bold text-lg">
                ☕ Get Me a Chai
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Supporting creators, one chai at a time.
              </p>

            </div>

            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Get Me a Chai. All rights reserved.
            </p>

          </div>

        </footer>

      </main>
    </>
  );
}
