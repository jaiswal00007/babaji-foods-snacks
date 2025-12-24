export default function Home() {
  return (
    <section className="relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-700 opacity-90"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center text-white">
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Pure & Authentic <br />
          <span className="text-yellow-300">Indian Snacks</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-10">
          Handcrafted sweets & snacks made with love, tradition, and the finest ingredients.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-yellow-400 text-red-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition">
            Shop Now
          </button>

          <button className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-red-800 transition">
            View Menu
          </button>
        </div>

      </div>
    </section>
  )
}
