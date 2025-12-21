import Navbar from "./Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col gap-4">
      <Navbar></Navbar>      
      {children}      
    </section>
  )
}

export default Layout