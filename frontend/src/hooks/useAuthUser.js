import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api.js";
import { getCurrentTabId } from "../lib/axios.js";

const useAuthUser = () => {
    const tabId = getCurrentTabId();
    
    const authUser = useQuery({
        queryKey:["authUser", tabId], // Include tabId in query key for isolation
        queryFn: getAuthUser,
        retry: 1, // Retry once on failure
        retryDelay: 1000, // Wait 1 second before retry
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
        refetchOnWindowFocus: false, // Don't refetch when window gains focus
        refetchOnMount: false, // Don't refetch when component mounts
    });

    return {isLoading: authUser.isLoading, authUser: authUser.data?.user}
}
export default useAuthUser
