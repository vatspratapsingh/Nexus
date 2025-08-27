import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser.js"
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";
import useLogout from "../hooks/useLogout.js";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

//   const queryClient = useQueryClient();

//   const { mutate: logoutMutation } = useMutation({
//     mutationFn: logout,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"]} )
//   })

  const { logoutMutation } = useLogout()
  
  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end w-full">
                {/* LOGO - ONLY IN CHAT PAGE */}
                {isChatPage && (
                    <div className="pl-5">
                        <Link to="/" className="flex items-center gap-2.5">
                            <ShipWheelIcon className="size-9 text-primary"/>
                            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                                NEXUS
                            </span>
                        </Link>
                    </div>
                )}

                <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                    <Link to={"/notifications"}>
                        <button className="btn btn-ghost btn-circle">
                            <BellIcon className="h-6 w-6 text-base-content opacity-70"/>
                        </button>
                    </Link>
                </div>

                <ThemeSelector />

                <Link to="/settings" className="avatar hover:opacity-80 transition-opacity cursor-pointer">
                    <div className="w-9 rounded-full">
                        <img src={authUser?.profilePics} alt="User Avatar" rel="noreferrer" />
                    </div>
                </Link>

                {/* Logout Button */}
                <button className="btn btn-circle" onClick={logoutMutation}>
                    <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar