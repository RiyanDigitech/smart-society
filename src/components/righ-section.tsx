import React from "react";

function RightSection() {
  return (
    <div>
      <section className=" text-neutral-100 ">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h2 className="text-3xl md:text-4xl font-bold w-9/12 ">
            Why People Love Gymscanner
          </h2>
          <p className="mt-6 text-sm md:text-base text-neutral-300">
            A smarter way to stay fit anywhere in the world
          </p>

          <div className="mt-10 space-y-9">
            <div className="flex items-start gap-6  ">
              <div className="shrink-0 h-12 w-12 rounded-xl  ring-1 ring-white/5 grid place-items-center text-yellow-400">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm7.32 7h-3.18a15.6 15.6 0 0 0-1.34-4.26A8.03 8.03 0 0 1 19.32 9ZM12 4.05c.86 1.23 1.55 2.92 1.9 4.95h-3.8C10.45 6.97 11.14 5.28 12 4.05ZM4.68 9A8.03 8.03 0 0 1 9.2 4.74 15.6 15.6 0 0 0 7.86 9H4.68Zm0 6h3.18c.34 1.98 1.03 3.67 1.9 4.95A8.03 8.03 0 0 1 4.68 15Zm7.32 4.95c-.86-1.23-1.55-2.92-1.9-4.95h3.8c-.35 2.03-1.04 3.72-1.9 4.95Zm2.8-4.95h3.18A8.03 8.03 0 0 1 14.8 19.26 15.6 15.6 0 0 0 14.2 15Zm-6.34-2c.29-1.88.92-3.57 1.76-4.95h6.76c.84 1.38 1.47 3.07 1.76 4.95H7.86Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Worldwide Access</h3>
                <p className="text-sm text-neutral-300">
                  Find gyms and trainers in 100+ cities
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 ">
              <div className="shrink-0 h-12 w-12 rounded-xl bg-neutral-900/70 ring-1 ring-white/5 grid place-items-center text-yellow-400">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path d="M3 6a2 2 0 0 1 2-2h11.59l-2 2H5v3h6.59l-2 2H3V6Zm18 1.41-2 2V18a2 2 0 0 1-2 2H5a1.99 1.99 0 0 1-1.9-1.41L16.59 4H19a2 2 0 0 1 2 2v1.41ZM6 16h5v2H6v-2Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">No Membership Required</h3>
                <p className="text-sm text-neutral-300">
                  Pay-per-session. No contracts, ever.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 ">
              <div className="shrink-0 h-12 w-12 rounded-xl bg-neutral-900/70 ring-1 ring-white/5 grid place-items-center text-yellow-400">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path d="M12 2 9.8 4.7 6.5 4.9 6.3 8.2 3.6 10.4 5 13.5 3.6 16.6 6.3 18.8 6.5 22.1 9.8 22.3 12 25l2.2-2.7 3.3-.2.2-3.3 2.7-2.2-1.4-3.1 1.4-3.1-2.7-2.2-.2-3.3-3.3-.2L12 2Zm3.7 7.3-4.7 4.7-2-2a1 1 0 1 0-1.4 1.4l2.7 2.7a1 1 0 0 0 1.4 0l5.4-5.4a1 1 0 0 0-1.4-1.4Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Verified Trainers &amp; Gyms</h3>
                <p className="text-sm text-neutral-300">
                  Curated professionals, rated by real users
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 ">
              <div className="shrink-0 h-12 w-12 rounded-xl bg-neutral-900/70 ring-1 ring-white/5 grid place-items-center text-yellow-400">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path d="M13 2 3 14h7l-1 8 11-12h-7l0-8Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Instant Booking</h3>
                <p className="text-sm text-neutral-300">
                  Book in minutes, with real-time availability
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RightSection;
