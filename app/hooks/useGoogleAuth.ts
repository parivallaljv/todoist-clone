import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";

interface GoogleLoginSuccessResponse {
  success: boolean;
}

export const useGoogleAuth = () => {
  const router = useRouter();
  const { fetchGoogleUserInfo, login } = useAuthStore();

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (codeResponse: TokenResponse) => {
      if (codeResponse?.access_token) {
        try {
          const user = await fetchGoogleUserInfo(codeResponse.access_token);
          if (user) {
            login(user, codeResponse.access_token);
            router.push("/today");
          }
        } catch (error) {
          console.error("Error during Google login:", error);
        }
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });

  const handleGoogleLogin = async (): Promise<GoogleLoginSuccessResponse> => {
    return new Promise((resolve, reject) => {
      try {
        googleLogin();
        // Note: This is a simplified approach. In a real implementation,
        // you'd want to handle the async nature of the OAuth flow properly
        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    });
  };

  return { googleLogin: handleGoogleLogin };
};
