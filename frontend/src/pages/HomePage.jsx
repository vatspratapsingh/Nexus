import { useQuery } from "@tanstack/react-query"
import { getUserfriends } from "../lib/api.js";
import { Link } from "react-router";
import { MessageSquare, User } from "lucide-react";

const HomePage = () => {
  const {data: friends = [], isLoading: loadingFriends} = useQuery({
    queryKey: ["friends"],
    queryFn: getUserfriends
  })

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">Home</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Previous Chats */}
          <div className="lg:col-span-2">
            <div className="card bg-base-200">
              <div className="card-body">
                <h2 className="card-title flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5" />
                  Recent Chats
                </h2>
                
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-base-content opacity-40 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Recent Chats</h3>
                  <p className="text-base-content opacity-70">
                    Start a conversation with your friends!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Online Friends */}
          <div className="lg:col-span-1">
            <div className="card bg-base-200">
              <div className="card-body">
                <h2 className="card-title flex items-center gap-2 mb-4">
                  <User className="h-5 w-5" />
                  Online Friends
                </h2>
                
                <div className="space-y-3">
                  {loadingFriends ? (
                    <div className="flex justify-center py-4">
                      <span className="loading loading-spinner loading-sm" />
                    </div>
                  ) : friends.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-base-content opacity-70">
                        No friends online
                      </p>
                    </div>
                  ) : (
                    friends.slice(0, 5).map((friend) => (
                      <Link 
                        key={friend._id} 
                        to={`/chat/${friend._id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-300 transition-colors"
                      >
                        <div className="relative">
                          <div className="avatar size-10 rounded-full">
                            <img src={friend.profilePics} alt={friend.fullName} />
                          </div>
                          <div className="absolute -bottom-1 -right-1 size-3 bg-success rounded-full border-2 border-base-200"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{friend.fullName}</h3>
                          <p className="text-xs text-base-content opacity-70 truncate">
                            {friend.college}
                          </p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;