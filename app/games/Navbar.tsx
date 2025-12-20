const Navbar = () => {
  return (
    <div className="flex justify-between">
      <button>
        Volver
      </button>

      <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <defs>
                <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="18" fill="none" stroke="url(#sparkleGradient)" strokeWidth="2" />
              <path 
                d="M20 8 L22 18 L28 14 L24 20 L32 22 L24 24 L28 30 L22 26 L20 36 L18 26 L12 30 L16 24 L8 22 L16 20 L12 14 L18 18 Z" 
                fill="none" 
                stroke="url(#sparkleGradient)" 
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-slate-600 leading-tight">
              K-Pop Games
            </span>
            <span className="text-xl -mt-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent transform -rotate-2">
              Randomized!
            </span>
          </div>
        </div>
    </div>
  )
}

export default Navbar