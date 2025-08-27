import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { OAUTH_CONFIG } from "../config/oauth";

declare global {
  interface Window {
    FB: any;
  }
}

export const useFacebookAuth = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const initializeFacebookSDK = () => {
    return new Promise<void>((resolve) => {
      if (window.FB) {
        resolve();
        return;
      }

      // Load Facebook SDK
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";

      script.onload = () => {
        window.FB.init({
          appId: OAUTH_CONFIG.FACEBOOK.APP_ID,
          cookie: true,
          xfbml: true,
          version: OAUTH_CONFIG.FACEBOOK.VERSION,
        });
        resolve();
      };

      document.head.appendChild(script);
    });
  };

  const facebookLogin = async () => {
    try {
      await initializeFacebookSDK();

      return new Promise((resolve, reject) => {
        window.FB.login(
          (response: any) => {
            if (response.authResponse) {
              // User successfully logged in
              const accessToken = response.authResponse.accessToken;

              // Get user info - email is automatically included with public_profile
              window.FB.api(
                "/me",
                { fields: "id,name,email,picture" },
                (userInfo: any) => {
                  if (userInfo && !userInfo.error) {
                    const user = {
                      id: userInfo.id,
                      email:
                        userInfo.email || `user_${userInfo.id}@facebook.com`, // Fallback if email not available
                      name: userInfo.name,
                      picture: userInfo.picture?.data?.url,
                      given_name: userInfo.name?.split(" ")[0],
                      family_name: userInfo.name?.split(" ").slice(1).join(" "),
                    };

                    login(user, accessToken);
                    router.push("/today");
                    resolve(user);
                  } else {
                    console.error("Facebook API error:", userInfo?.error);
                    reject(new Error("Failed to fetch user info"));
                  }
                },
              );
            } else {
              reject(new Error("Facebook login failed"));
            }
          },
          { scope: OAUTH_CONFIG.FACEBOOK.SCOPES.join(",") },
        );
      });
    } catch (error) {
      console.error("Facebook login error:", error);
      throw error;
    }
  };

  return { facebookLogin };
};
