import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";

export const useRedirectIfAuthenticated = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/today");
    }
  }, [isAuthenticated, user, router]);

  return { isAuthenticated, user };
};
