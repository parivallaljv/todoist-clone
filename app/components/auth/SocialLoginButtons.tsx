"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GoogleIcon from "../../icons/Google";
import { MdOutlineFacebook } from "react-icons/md";
import AppleLogo from "../../icons/AppleLogo";

interface SocialLoginButtonsProps {
  onGoogleLogin: () => Promise<any>;
  onFacebookLogin?: () => Promise<any>;
  onAppleLogin?: () => Promise<any>;
  isLoading?: boolean;
}

export default function SocialLoginButtons({
  onGoogleLogin,
  onFacebookLogin,
  onAppleLogin,
  isLoading = false,
}: SocialLoginButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleLogin = async (
    provider: string,
    loginFunction: () => Promise<any>,
  ) => {
    if (isLoading || loadingProvider) return;

    setLoadingProvider(provider);
    try {
      await loginFunction();
    } catch (error) {
      console.error(`${provider} login error:`, error);
      // You could add toast notification here
    } finally {
      setLoadingProvider(null);
    }
  };

  const isProviderLoading = (provider: string) => loadingProvider === provider;

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Button
        variant="outline"
        className="flex w-full items-center justify-center gap-2"
        onClick={() => handleLogin("google", onGoogleLogin)}
        disabled={isLoading || isProviderLoading("google")}
      >
        <span>
          <GoogleIcon />
        </span>
        {isProviderLoading("google") ? "Signing in..." : "Continue with Google"}
      </Button>

      {onFacebookLogin && (
        <Button
          variant="outline"
          className="flex w-full items-center justify-center gap-2"
          onClick={() => handleLogin("facebook", onFacebookLogin)}
          disabled={isLoading || isProviderLoading("facebook")}
        >
          <span className="text-lg">
            <MdOutlineFacebook fill="#1877F2" size={"20px"} />
          </span>
          {isProviderLoading("facebook")
            ? "Signing in..."
            : "Continue with Facebook"}
        </Button>
      )}

      {/* {onAppleLogin && (
        <Button
          variant="outline"
          className="flex w-full items-center justify-center gap-2"
          onClick={() => handleLogin("apple", onAppleLogin)}
          disabled={isLoading || isProviderLoading("apple")}
        >
          <span className="text-lg">
            <AppleLogo />
          </span>
          {isProviderLoading("apple") ? "Signing in..." : "Continue with Apple"}
        </Button>
      )} */}
    </div>
  );
}
