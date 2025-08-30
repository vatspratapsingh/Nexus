import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { clearAuthToken } from "../lib/axios";

const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate:logoutMutation, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      // Clear tab-specific token
      if (data.clearToken) {
        clearAuthToken();
      }
      queryClient.invalidateQueries({ queryKey: ["authUser"]} )
    }
  })

  return { logoutMutation, isPending, error };
}

export default useLogout;
  