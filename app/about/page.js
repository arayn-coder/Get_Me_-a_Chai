"use client";

import React from "react";
import Link from "next/link";

const About = () => {
  const features = [
    {
      icon: "☕",
      title: "Support Creators",
      description:
        "Send a small contribution to your favorite creators and help them continue doing what they love.",
    },
    {
      icon: "💳",
      title: "Simple Payments",
      description:
        "A clean and simple payment experience makes supporting creators quick and effortless.",
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description:
        "Your payments and information are handled with security and reliability in mind.",
    },
    {
      icon: "🚀",
      title: "Built for Creators",
      description:
        "Create your own support page and turn your audience into a community that believes in your work.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create your page",
      description:
        "Set up your profile and create your personalized Get Me a Chai page.",
    },
    {
      number: "02",
      title: "Share your link",
      description:
        "Share your page with your friends, followers, fans, or online community.",
    },
    {
      number: "03",
      title: "Get supported",
      description:
        "Your supporters can send you a contribution along with a personal message.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[130px]" />
        <div className="absolute top-[30%] right-[-200px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-200px] left-[30%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />
      </div>

      {/* HERO */}
      <section className="relative px-6 pt-24 pb-20">
        <div className="max-w-6xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-gray-300 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Built for creators & supporters
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Your work deserves
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              a little support.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-7 text-lg md:text-xl text-gray-400 leading-relaxed">
            Get Me a Chai is a simple platform that helps creators receive
            support from the people who believe in their work.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <Link
              href="/login"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-semibold shadow-lg shadow-purple-600/20 hover:scale-105 transition-all duration-300"
            >
              Start Your Page →
            </Link>

            <Link
              href="/explore"
              className="px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-semibold transition-all duration-300"
            >
              Explore Creators
            </Link>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">

          {[
            ["01", "Simple Setup"],
            ["24/7", "Creator Access"],
            ["100%", "Creator Focused"],
            ["∞", "Possibilities"],
          ].map(([number, text]) => (
            <div
              key={text}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl text-center hover:border-purple-500/30 transition-all"
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {number}
              </h3>
              <p className="mt-2 text-gray-400 text-sm">{text}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-24 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-purple-400 font-semibold mb-3 uppercase tracking-widest text-sm">
              Our Story
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              More than a payment.
              <span className="block text-gray-500">
                It's a way to say "keep going."
              </span>
            </h2>

            <p className="mt-7 text-gray-400 leading-relaxed text-lg">
              We believe creators should have a simple way to connect with
              the people who enjoy their work.
            </p>

            <p className="mt-5 text-gray-400 leading-relaxed">
              Whether you're a developer building open-source projects, a
              designer sharing your creativity, a musician making music, or
              someone simply creating something meaningful — Get Me a Chai
              gives your audience a simple way to support you.
            </p>
          </div>

          {/* Chai Card */}
          <div className="relative">

            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur-3xl" />

            <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-10 shadow-2xl">

              <div className="text-7xl mb-8">
                ☕
              </div>

              <h3 className="text-3xl font-bold">
                One Chai.
                <br />
                One Creator.
                <br />
                One More Reason
                <span className="text-purple-400"> to Keep Creating.</span>
              </h3>

              <div className="mt-8 h-px bg-white/10" />

              <p className="mt-6 text-gray-400">
                Small contributions can create a big difference when a
                community comes together.
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-16">

            <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm">
              Why Get Me a Chai?
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Everything creators need
            </h2>

            <p className="mt-5 text-gray-400">
              Designed to keep supporting your favorite creators simple,
              personal, and meaningful.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-7 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:-translate-y-2 hover:border-purple-500/30 transition-all duration-300"
              >

                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mt-6">
                  {feature.title}
                </h3>

                <p className="text-gray-400 mt-3 leading-relaxed text-sm">
                  {feature.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-24 bg-white/[0.02] border-y border-white/5">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">

            <p className="text-purple-400 font-semibold uppercase tracking-widest text-sm">
              How It Works
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              From idea to support in minutes.
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {steps.map((step) => (
              <div
                key={step.number}
                className="relative p-8 rounded-2xl border border-white/10 bg-[#080b18] hover:border-purple-500/30 transition-all"
              >

                <span className="text-6xl font-black text-white/5 absolute top-5 right-6">
                  {step.number}
                </span>

                <div className="relative">

                  <span className="text-purple-400 font-bold text-sm">
                    {step.number}
                  </span>

                  <h3 className="text-2xl font-bold mt-5">
                    {step.title}
                  </h3>

                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {step.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* MISSION */}
      <section className="px-6 py-28">

        <div className="max-w-4xl mx-auto text-center">

          <div className="text-6xl mb-8">
            ✨
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Great things are built
            <span className="text-gray-500"> one small step at a time.</span>
          </h2>

          <p className="max-w-2xl mx-auto mt-7 text-gray-400 text-lg leading-relaxed">
            Our mission is simple: make it easier for creators to build
            sustainable communities around the work they love.
          </p>

        </div>

      </section>

      {/* CTA */}
      <section className="px-6 pb-24">

        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-white/10">

          <div className="absolute inset-0 bg-gradient-to-r from-purple-700/30 via-blue-700/20 to-cyan-600/20" />

          <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative p-10 md:p-16 text-center">

            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to start creating?
            </h2>

            <p className="mt-5 text-gray-400 max-w-xl mx-auto">
              Create your own page and give your supporters a simple way to
              say thanks.
            </p>

            <Link
              href="/login"
              className="inline-block mt-8 px-8 py-4 rounded-xl bg-white text-black font-bold hover:scale-105 transition-all duration-300"
            >
              Create Your Page →
            </Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-6 py-10">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">

          <div>
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
  );
};

export default About;