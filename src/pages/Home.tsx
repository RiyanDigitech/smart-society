import React from "react";
import "../index.css";
import Cards from "@/components/common/cards";
import RightSection from "@/components/righ-section";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

function Home() {
  return (
    <div className=" bg-mainbody">
      <div className="h-screen bg-[url('/banner.png')]  w-full bg-cover bg-center text-white mt-3 ">
        <div className="w-full">
          <Header />
        </div>
        <div
          className="  rounded-full bg-neutral-900/70 px-4 py-2
             text-sm text-neutral-100 ring-1 ring-white/10
             shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur
             w-fit mx-auto
              flex items-center justify-center text-center translate-y-35 sm:translate-y-65
             "
        >
          <span className="relative flex">
            <span className="absolute inset-0 -z-10 h-5 w-5 rounded-full bg-yellow-400/20 blur-md"></span>
            <img src="/Sparks.png" alt="" />
           
          </span>

          <span className="whitespace-nowrap ml-2">
            Smart fitness starts here
          </span>
        </div>

        {/* <div className="w-full flex items-center justify-center text-center translate-y-65">
          <div className="w-fit flex items-center gap-2 ">
            <div>
              <img src="/Sparks.png" alt="" />
            </div>
            <div>Smart Fitness Starts here</div>
          </div>
        </div> */}
        <h1 className="w-full flex items-center justify-center text-center translate-y-44 sm:translate-y-70  text-4xl sm:text-6xl">
          Your Global Fitness companion
        </h1>
        <div className="w-full flex items-center justify-center text-center translate-y-54 sm:translate-y-75 text-md">
          Discover and book top gyms and certified personal trainers worldwide.
        </div>
        <div className="hidden w-full xmd:flex items-center justify-center text-center translate-y-80 text-md ">
          <form className="w-full max-w-5xl">
            <div className="flex items-center gap-3 rounded-full bg-neutral-50/95 p-3 shadow ring-1 ring-black/10 backdrop-blur">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
              >
                Trainers
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 opacity-70"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <span className="h-8 w-px bg-neutral-200 hidden sm:block"></span>

              <div className="flex flex-1 items-center gap-6 px-1">
                <label className="hidden" htmlFor="location">
                  Location
                </label>
                <div className="min-w-[160px]">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-black">
                    Location
                  </div>
                  <input
                    id="location"
                    type="text"
                    placeholder="City or address"
                    className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 focus:outline-none"
                  />
                </div>

                <div className="hidden sm:block h-8 w-px bg-neutral-200"></div>

                <label className="hidden" htmlFor="type">
                  Training Type
                </label>
                <div className="min-w-[160px]">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-black">
                    Training Type
                  </div>
                  <input
                    id="type"
                    type="text"
                    placeholder="Type (e.g., Yoga)"
                    className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 focus:outline-none"
                  />
                </div>

                <div className="hidden sm:block h-8 w-px bg-neutral-200"></div>

                <label className="hidden" htmlFor="date">
                  Date
                </label>
                <div className="min-w-[140px]">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-black">
                    Date
                  </div>
                  <input
                    id="date"
                    type="date"
                    className="w-full bg-transparent text-neutral-900 focus:outline-none [color-scheme:light]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="ml-auto rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-black shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600/40"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10">
        <h1 className=" text-white flex justify-center text-3xl sm:text-5xl">
          How Gymscanner Works
        </h1>
        <div className=" flex justify-center items-center text-white mt-6">
          Find a trainer or gym in just a few clicks
        </div>
        <div>
          <Cards />
        </div>
        <div className="w-full flex justify-center items-center flex-col md:flex-row">
          <div className="ml-6 md:ml-0 md:w-[50%] h-180 ">
            <img
              src="/twoimg.PNG"
              alt=""
              className="w-11/12 object-fill h-full"
            />
          </div>
          <div className=" md:w-[40%] ">
            <div className="text-white h-180 mt-18">
              <RightSection />
            </div>
          </div>
        </div>
        <div className="h-[calc(100vh-20px)] md:h-[calc(110vh-20px)] text-white flex justify-center items-center rounded-3xl p-4">
          <div className="h-[40vh] md:w-10/12 md:h-3/5 md:ml-20 bg-[url('/bg-img.png')] bg-cover bg-center rounded-3xl overflow-hidden flex justify-center items-center flex-col">
            <div className="md:text-5xl">Ready to dive in?</div>
            <div className="my-5 md:my-7">
              Sign up select your desired challenge account and Get Funded
            </div>
            <div>
              <button className=" bg-yellowcolor px-4 py-2  rounded-lg">
                Get Funded
              </button>
            </div>
          </div>
        </div>
        <div className=" text-white  w-11/12 mx-auto mb-5">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
