import { Link, useLocation } from "react-router"
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, HomeIcon, ShipWheelIcon, UserIcon, Settings, UsersIcon } from "lucide-react";
import { getCurrentTabId } from "../lib/axios";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const tabId = getCurrentTabId();

  return <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
    <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
            <ShipWheelIcon className="size-9 text-primary"/>
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                NEXUS
            </span>
        </Link>
        {/* Debug info - remove this later */}
        <div className="text-xs text-gray-500 mt-2">
          Tab: {tabId?.substring(0, 10)}...
        </div>
    </div>
    <nav className="flex-1 p-4 space-y-1">
        <Link
            to="/"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
                currentPath === "/" ? "btn-active" : ""
            }`}
        >
            <HomeIcon className="size-5 text-base-content opacity-70" />
            <span>Home</span>
        </Link>
        <Link
            to="/discover"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
                currentPath === "/discover" ? "btn-active" : ""
            }`}
        >
            <UsersIcon className="size-5 text-base-content opacity-70" />
            <span>Discover</span>
        </Link>
        <Link
            to="/friends"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
                currentPath === "/friends" ? "btn-active" : ""
            }`}
        >
            <UserIcon className="size-5 text-base-content opacity-70" />
            <span>Friends</span>
        </Link>
        <Link
            to="/notifications"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
                currentPath === "/notifications" ? "btn-active" : ""
            }`}
        >
            <BellIcon className="size-5 text-base-content opacity-70" />
            <span>Notifications</span>
        </Link>
    </nav>

    {/* USER PROFILE SECTION */}
    <div className="p-4 border-t border-base-300 mt-auto">
        <Link to="/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300 transition-colors">
            <div className="avatar size-10 rounded-full">
                <img src={authUser?.profilePics} alt={authUser?.fullName} />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{authUser?.fullName}</h3>
                <p className="text-sm text-base-content opacity-70 truncate">{authUser?.email}</p>
            </div>
            <Settings className="size-4 text-base-content opacity-70" />
        </Link>
    </div>
</aside>
}

export default Sidebar
