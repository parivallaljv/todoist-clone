import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { OAUTH_CONFIG } from "../config/oauth";

declare global {
  interface Window {
    AppleID: any;
  }
}

export const useAppleAuth = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const initializeAppleSDK = () => {
    return new Promise<void>((resolve) => {
      if (window.AppleID) {
        resolve();
        return;
      }

      // Load Apple Sign In SDK
      const script = document.createElement("script");
      script.src =
        "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        window.AppleID.init({
          clientId: OAUTH_CONFIG.APPLE.CLIENT_ID,
          scope: OAUTH_CONFIG.APPLE.SCOPES.join(" "),
          redirectURI: OAUTH_CONFIG.APPLE.REDIRECT_URI,
          state: "origin:web",
          usePopup: true,
        });
        resolve();
      };

      document.head.appendChild(script);
    });
  };

  const appleLogin = async () => {
    try {
      await initializeAppleSDK();

      return new Promise((resolve, reject) => {
        window.AppleID.auth
          .signIn()
          .then((response: any) => {
            if (response.authorization) {
              // User successfully logged in
              const { authorization, user } = response;

              // Create user object from Apple response
              const userData = {
                id: user || `apple_${Date.now()}`, // Apple doesn't always provide user ID
                email: authorization.email || "",
                name: authorization.fullName
                  ? `${authorization.fullName.givenName || ""} ${authorization.fullName.familyName || ""}`.trim()
                  : "Apple User",
                picture: undefined, // Apple doesn't provide profile pictures
                given_name: authorization.fullName?.givenName || "",
                family_name: authorization.fullName?.familyName || "",
              };

              login(userData, authorization.code);
              router.push("/today");
              resolve(userData);
            } else {
              reject(new Error("Apple login failed"));
            }
          })
          .catch((error: any) => {
            console.error("Apple login error:", error);
            reject(error);
          });
      });
    } catch (error) {
      console.error("Apple login error:", error);
      throw error;
    }
  };

  return { appleLogin };
};
