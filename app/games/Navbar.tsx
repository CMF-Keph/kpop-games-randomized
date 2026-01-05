import { ArrowLeftIcon, ChevronDown } from "lucide-react"
import Link from "next/link"

const Navbar: React.FC = () => {
  return (
    <div className="grid grid-cols-3 p-4">
      <Link href="/" className="flex gap-1 items-center text-slate-700 group font-medium cursor-pointer">
        <ArrowLeftIcon size={16} className="group-hover:translate-x-[-3.25px] transition-transform duration-100" /> Back
      </Link>
      <div className="flex items-center gap-3 hover:scale-105 duration-300 cursor-pointer justify-center">
        <div className="flex flex-col items-center">
          <span className="text-sm text-slate-700 leading-tight">
            K-Pop Games
          </span>
          <span className="text-xl -mt-1 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent transform -rotate-2">
            Randomized!
          </span>
        </div>
      </div>
      <div className="flex justify-end gap-2 items-center font-medium text-slate-700">
        Me <ChevronDown size={16}></ChevronDown>
      </div>
    </div>
  )
}

export default Navbar