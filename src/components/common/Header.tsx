import React, { useEffect, useRef } from 'react'
import { MdLineWeight } from "react-icons/md";

function Header() {
  const [open, setOpen] = React.useState(false);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
    const onKey = (e:any) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    if (open) {
      document.body.style.overflow = "hidden";
      // focus close btn for accessibility
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
        <div className="w-[85%] hidden sm:flex justify-between items-center mx-auto translate-y-4 ">
        <div>Gymscanner</div>
          <div className="flex gap-6 items-center  text-white p-4 rounded-3xl backdrop-blur-lg  filter drop-shadow-lg">
            <div>Find Trainers</div>
            <div>How It Works</div>
            <div>Become a Trainer</div>
          </div>
          <div className="flex items-center">
            <div>Log In</div>
            <div className="bg-[#e4cb0a] rounded-3xl ml-3 p-3">Sign Up</div>
          </div>
          </div>
           <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(true)}
          className="sm:hidden inline-flex items-center justify-center h-10 w-10 rounded-full
                     bg-neutral-900 ring-1 ring-white/10 hover:ring-yellow-500/40 hover:text-yellow-400 transition"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
          </svg>
        </button>

         <aside
        id="mobile-drawer"
        className={`fixed top-0 left-0 z-50 h-full w-80 max-w-[85%]
                    bg-neutral-950 ring-1 ring-white/10 shadow-2xl
                    transition-transform duration-300 ease-out
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 text-neutral-100">
          <span className="font-semibold">Menu</span>
          <button
            ref={closeBtnRef}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full
                       bg-neutral-900 ring-1 ring-white/10 hover:text-yellow-400 hover:ring-yellow-500/40 transition"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M6.4 4.9 4.9 6.4 10.5 12l-5.6 5.6 1.5 1.5L12 13.5l5.6 5.6 1.5-1.5L13.5 12l5.6-5.6-1.5-1.5L12 10.5 6.4 4.9z" />
            </svg>
          </button>
        </div>

        {/* Drawer body */}
        <nav className="px-3 py-4 text-neutral-100">
          <ul className="space-y-1">
            {["Home", "Explore", "Trainers", "Pricing"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block rounded-xl px-3 py-2 hover:bg-neutral-900 hover:text-yellow-400 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-white/10 pt-4 space-y-2">
            <a
              href="#"
              className="block text-center rounded-xl px-4 py-2 ring-1 ring-white/10 bg-neutral-900
                         hover:ring-yellow-500/40 hover:text-yellow-400 transition"
            >
              Log in
            </a>
            <a
              href="#"
              className="block text-center rounded-xl px-4 py-2 bg-yellow-500 text-black font-medium
                         hover:bg-yellow-600 transition"
            >
              Sign up
            </a>
          </div>
        </nav>
      </aside>
          {/* <div className=' sm:hidden flex justify-end mr-2'>
<MdLineWeight className='text-2xl '/>
          </div> */}
  </>
  )
}

export default Header