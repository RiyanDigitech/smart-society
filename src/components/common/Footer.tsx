import React from 'react'

function Footer() {
  return (
    <div className=' bg-footercolor rounded-xl'>
<footer className=" text-neutral-100">
  <div className="max-w-6xl mx-auto px-6 py-12">
    <div className="rounded-3xl  p-6 md:p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="pt-4 border-t border-white/10">
          <h3 className="text-lg font-semibold">GymBoy</h3>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-sm font-medium text-neutral-300 mb-3">Useful Links</p>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><a href="#" className="hover:text-neutral-200">Terms of Use</a></li>
            <li><a href="#" className="hover:text-neutral-200">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-neutral-200">Contact</a></li>
          </ul>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-sm font-medium text-neutral-300 mb-3">Useful Links</p>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><a href="#" className="hover:text-neutral-200">Terms of Use</a></li>
            <li><a href="#" className="hover:text-neutral-200">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-neutral-200">Contact</a></li>
          </ul>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-sm font-medium text-neutral-300 mb-3">Useful Links</p>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><a href="#" className="hover:text-neutral-200">Terms of Use</a></li>
            <li><a href="#" className="hover:text-neutral-200">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-neutral-200">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-between">
        <p className="text-xs text-neutral-400">© Gymscanner 2025</p>

        <div className="flex items-center gap-2">
          <a href="#" aria-label="Twitter / X"
             className="h-8 w-8 grid place-items-center rounded-full border border-white/10 text-neutral-300 hover:text-yellow-400 hover:border-yellow-500/40 transition">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18 2h3l-7.5 9 7 11H17l-5-7-6 7H3l8-9L4 2h5l4.5 6L18 2z"/></svg>
          </a>

          <a href="#" aria-label="LinkedIn"
             className="h-8 w-8 grid place-items-center rounded-full border border-white/10 text-neutral-300 hover:text-yellow-400 hover:border-yellow-500/40 transition">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6a2.5 2.5 0 0 1 2.48-2.5zM3 8h4v13H3zM9 8h4v2h.06c.56-1.06 1.94-2.18 4-2.18 4.28 0 5.07 2.82 5.07 6.48V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.88 0-2.17 1.47-2.17 2.96V21H9z"/></svg>
          </a>

          <a href="#" aria-label="GitHub"
             className="h-8 w-8 grid place-items-center rounded-full border border-white/10 text-neutral-300 hover:text-yellow-400 hover:border-yellow-500/40 transition">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.11-.76.08-.75.08-.75 1.22.08 1.86 1.25 1.86 1.25 1.09 1.86 2.86 1.32 3.56 1.01.11-.79.43-1.32.78-1.62-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.44.38.83 1.12.83 2.26v3.35c0 .32.21.7.83.58A12 12 0 0 0 12 .5z"/></svg>
          </a>

          <a href="#" aria-label="Settings"
             className="h-8 w-8 grid place-items-center rounded-full border border-white/10 text-neutral-300 hover:text-yellow-400 hover:border-yellow-500/40 transition">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M19.14 12.94a7.58 7.58 0 0 0 .06-1l1.7-1.32a.5.5 0 0 0 .12-.66l-1.6-2.77a.5.5 0 0 0-.6-.22l-2 .8a7.58 7.58 0 0 0-1.74-1l-.3-2.1a.5.5 0 0 0-.5-.42h-3.2a.5.5 0 0 0-.5.42l-.3 2.1a7.58 7.58 0 0 0-1.74 1l-2-.8a.5.5 0 0 0-.6.22L3 9.96a.5.5 0 0 0 .12.66l1.7 1.32a7.58 7.58 0 0 0 0 2l-1.7 1.32a.5.5 0 0 0-.12.66l1.6 2.77a.5.5 0 0 0 .6.22l2-.8c.54.42 1.13.77 1.74 1l.3 2.1a.5.5 0 0 0 .5.42h3.2a.5.5 0 0 0 .5-.42l.3-2.1c.61-.23 1.2-.58 1.74-1l2 .8a.5.5 0 0 0 .6-.22l1.6-2.77a.5.5 0 0 0-.12-.66l-1.7-1.32ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>
</div>
  )
}

export default Footer