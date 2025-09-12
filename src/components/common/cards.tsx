import React from 'react'

function Cards() {
  return (
    <div><section className=" text-neutral-100">
  <div className=" mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="relative rounded-2xl   p-8 text-center hover:ring-yellow-500/30 transition">
      <span className="pointer-events-none absolute inset-0 mx-auto mt-2 h-24 w-24 rounded-full bg-yellow-400/20 blur-2xl"></span>
      <div className="relative mx-auto mb-4 h-30 w-30 text-yellow-400">
        <img src="/rod.png" alt="" className=' w-full h-full'/>
      </div>
      <h3 className="text-lg font-semibold">Search Anywhere</h3>
      <p className="mt-1 text-sm text-neutral-300">Enter your location, date, and training type</p>
    </div>

    <div className="relative rounded-2xl   p-8 text-center hover:ring-yellow-500/30 transition">
      <span className="pointer-events-none absolute inset-0 mx-auto mt-2 h-24 w-24 rounded-full bg-yellow-400/20 blur-2xl"></span>
      <div className="relative mx-auto mb-4 h-30 w-30 text-yellow-400">
     <img src="/dumble.png" alt="" className=' w-full h-full'/>
      </div>
      <h3 className="text-lg font-semibold">Compare &amp; Choose</h3>
      <p className="mt-1 text-sm text-neutral-300">View top-rated gyms and trainers near you</p>
    </div>

    <div className="relative rounded-2xl   p-8 text-center hover:ring-yellow-500/30 transition">
      <span className="pointer-events-none absolute inset-0 mx-auto mt-2 h-24 w-24 rounded-full bg-yellow-400/20 blur-2xl"></span>
      <div className="relative mx-auto mb-4 h-30 w-30 text-yellow-400">
       <img src="/card-pos.png" alt="" className='h-full w-full'/>
      </div>
      <h3 className="text-lg font-semibold">Book Instantly</h3>
      <p className="mt-1 text-sm text-neutral-300">Reserve and pay securely — no commitment</p>
    </div>
  </div>
</section></div>
  )
}

export default Cards



