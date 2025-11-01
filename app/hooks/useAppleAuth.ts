import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { OAUTH_CONFIG } from "../config/oauth";

interface AppleFullName {
  givenName?: string;
  familyName?: string;
}

interface AppleAuthorizationWithName {
  email: string;
  code: string;
  fullName?: AppleFullName;
}

interface AppleAuthResponseWithName {
  authorization: AppleAuthorizationWithName;
  user?: string;
}

declare global {
  interface Window {
    AppleID?: {
      init: (_config: {
        clientId: string;
        scope: string;
        redirectURI: string;
        state: string;
        usePopup: boolean;
      }) => void;
      auth: {
        signIn: () => Promise<AppleAuthResponseWithName>;
      };
    };
  }
}

interface UserData {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name: string;
  family_name: string;
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
        if (window.AppleID) {
          window.AppleID.init({
            clientId: OAUTH_CONFIG.APPLE.CLIENT_ID,
            scope: OAUTH_CONFIG.APPLE.SCOPES.join(" "),
            redirectURI: OAUTH_CONFIG.APPLE.REDIRECT_URI,
            state: "origin:web",
            usePopup: true,
          });
        }
        resolve();
      };

      document.head.appendChild(script);
    });
  };

  const appleLogin = async (): Promise<void> => {
    try {
      await initializeAppleSDK();

      return new Promise<void>((resolve, reject) => {
        if (!window.AppleID) {
          reject(new Error("Apple SDK not loaded"));
          return;
        }

        window.AppleID.auth
          .signIn()
          .then((response) => {
            if (response.authorization) {
              // User successfully logged in
              const { authorization, user } = response;

              // Create user object from Apple response
              const userData: UserData = {
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
              resolve();
            } else {
              reject(new Error("Apple login failed"));
            }
          })
          .catch((error: unknown) => {
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