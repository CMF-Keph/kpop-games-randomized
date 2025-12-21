import { ArrowLeftIcon, ArrowLeftToLineIcon } from "lucide-react"
import Link from "next/link"

const Navbar = () => {  
  return (
    <div className="grid grid-cols-3">
      <Link href="/" title="Back" className="flex gap-1 items-center text-gray-500 group font-medium">
        <ArrowLeftIcon size={16} className="group-hover:translate-x-[-3.25px] transition-transform duration-100" /> Back
      </Link>
      <div className="flex items-center gap-3 hover:scale-105 duration-300 cursor-pointer">
          <div className="flex flex-col items-center">
            <span className="text-sm text-slate-600 leading-tight">
              K-Pop Games
            </span>
            <span className="text-xl -mt-1 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent transform -rotate-2">
              Randomized!
            </span>
          </div>
        </div>
    </div>
  )
}

export default Navbar