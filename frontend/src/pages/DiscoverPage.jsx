import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from "../lib/api.js";
import { CheckCircleIcon, UserPlusIcon } from "lucide-react";

const DiscoverPage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds,setOutgoingRequestsIds] = useState(new Set());

  const {data: recommendedUsers=[], isLoading: loadingUsers} = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers
  })

  const {data: outgoingFriendReqs} = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs
  })

  const {mutate:sendRequestMutation, isPending} = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] })
  })

  useEffect(() => {
    const outgoingIds = new Set()
    if(outgoingFriendReqs && outgoingFriendReqs.length > 0){
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id)
      })
      setOutgoingRequestsIds(outgoingIds)
    }
  }, [outgoingFriendReqs])

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Discover People</h2>
        </div>

        {/* USERS SECTION */}
        <section>
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">People You May Know</h3>
            {loadingUsers ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className="card bg-base-200 p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">No Users Found</h3>
                <p className="text-base-content opacity-70">
                  Check back later for new people to connect with!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recommendedUsers.map((user) => {
                  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                  
                  return (
                    <div key={user._id} className="card bg-base-200 hover:shadow-md transition-shadow">
                      <div className="card-body p-4">
                        {/* USER INFO */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="avatar size-12 rounded-full">
                            <img src={user.profilePics} alt={user.fullName} />
                          </div>
                          <h3 className="font-semibold truncate">{user.fullName}</h3>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <span className="badge badge-primary text-xs">
                            College: {user.college}
                          </span>
                          <span className="badge badge-secondary text-xs">
                            Domain: {user.fieldOfStudy}
                          </span>
                        </div>

                        {/* Action button */}
                        <button
                          className={`btn w-full mt-2 ${
                            hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                          } `}
                          onClick={() => sendRequestMutation(user._id)}
                          disabled={hasRequestBeenSent || isPending}
                        >
                          {hasRequestBeenSent ? (
                            <>
                              <CheckCircleIcon className="size-4 mr-2" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="size-4 mr-2" />
                              Send Friend Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiscoverPage;
