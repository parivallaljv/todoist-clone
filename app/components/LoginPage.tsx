"use client";
import React from "react";
import Image from "next/image";
import logo from "../icons/todoist.png";
import LoginImage from "../images/login.jpg";
import { useSocialAuth, useRedirectIfAuthenticated } from "../hooks";
import { useAuthStore } from "../store/useAuthStore";
import { SocialLoginButtons, LoginForm, AuthFooter } from "./auth";

export default function LoginPage() {
  const { googleLogin, facebookLogin, appleLogin } = useSocialAuth();
  const { isLoading } = useAuthStore();
  useRedirectIfAuthenticated(); // Redirect if already authenticated

  const handleEmailLogin = (email: string, password: string) => {
    // TODO: Implement email/password login
    console.log("Email login:", { email, password });
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    console.log("Forgot password clicked");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center md:flex-row">
        <div className="flex w-full flex-col items-center px-4 md:w-1/2 md:items-start md:px-12">
          <Image src={logo} alt="Todoist Logo" className="w-32" />
          <h1 className="mb-6 w-full text-3xl font-bold text-gray-900">
            Log in
          </h1>
          <SocialLoginButtons
            onGoogleLogin={googleLogin}
            onFacebookLogin={facebookLogin}
            onAppleLogin={appleLogin}
            isLoading={isLoading}
          />
          <div className="my-6 w-full max-w-md border-t border-gray-200"></div>
          <LoginForm onSubmit={handleEmailLogin} />
          <AuthFooter type="login" onForgotPassword={handleForgotPassword} />
        </div>
        <div className="hidden w-1/2 md:block">
          <Image
            src={LoginImage}
            alt="Login Illustration"
            className="h-auto w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
