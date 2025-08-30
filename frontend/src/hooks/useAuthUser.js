import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api.js";

const useAuthUser = () => {
    const authUser = useQuery({
        queryKey:["authUser"],
        queryFn: getAuthUser,
        retry: 1, // Retry once on failure
        retryDelay: 1000, // Wait 1 second before retry
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    });

    return {isLoading: authUser.isLoading, authUser: authUser.data?.user}
}
export default useAuthUser
