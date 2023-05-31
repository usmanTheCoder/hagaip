import { Outlet } from "react-router"
import Sidebar from "./Sidebar.jsx"

const Layout = () => {
  return (
    <div className="flex gap-5">
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Layout