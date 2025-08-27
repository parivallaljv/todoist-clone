import { useGoogleAuth } from "./useGoogleAuth";
import { useFacebookAuth } from "./useFacebookAuth";
import { useAppleAuth } from "./useAppleAuth";

export const useSocialAuth = () => {
  const { googleLogin } = useGoogleAuth();
  const { facebookLogin } = useFacebookAuth();
  const { appleLogin } = useAppleAuth();

  return {
    googleLogin,
    facebookLogin,
    appleLogin,
  };
};
