"use client";
import React from "react";
import Image from "next/image";
import logo from "../icons/todoist.png";
import SignupImage from "../images/signup.jpg";
import { useSocialAuth, useRedirectIfAuthenticated } from "../hooks";
import { SocialLoginButtons, LoginForm, AuthFooter } from "./auth";

export default function SignupPage() {
  const { googleLogin, facebookLogin, appleLogin } = useSocialAuth();
  useRedirectIfAuthenticated(); // Redirect if already authenticated

  const handleEmailSignup = (email: string, password: string) => {
    // TODO: Implement email/password signup
    console.log("Email signup:", { email, password });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center md:flex-row">
        <div className="flex w-full flex-col items-center px-4 md:w-1/2 md:items-start md:px-12">
          <Image src={logo} alt="Todoist Logo" className="w-32" />
          <h1 className="mb-6 w-full text-3xl font-bold text-gray-900">
            Sign up
          </h1>
          <SocialLoginButtons
            onGoogleLogin={googleLogin}
            onFacebookLogin={facebookLogin}
            onAppleLogin={appleLogin}
          />
          <div className="my-6 w-full max-w-md border-t border-gray-200"></div>
          <LoginForm onSubmit={handleEmailSignup} />
          <AuthFooter type="signup" />
        </div>
        <div className="hidden w-1/2 flex-col items-center justify-center md:flex">
          <Image
            src={SignupImage}
            alt="Signup Illustration"
            className="mb-6 w-80 max-w-full"
          />
          <div className="max-w-xs rounded-lg bg-white p-6 shadow-md">
            <p className="mb-2 text-gray-700 italic">
              Before Todoist, my to-do lists were scattered all around! Now,
              everything is in order and in one place.
            </p>
            <span className="block text-sm text-gray-500">— Matt M.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
