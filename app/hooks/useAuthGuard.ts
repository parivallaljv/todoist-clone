import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";

export const useAuthGuard = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we're on the client side and if the store has been hydrated
    if (typeof window !== "undefined") {
      setIsLoading(false);

      if (!isAuthenticated || !user) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, user, router]);

  return { isAuthenticated, user, isLoading };
};
