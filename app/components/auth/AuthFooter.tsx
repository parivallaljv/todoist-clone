"use client";

import React from "react";

interface AuthFooterProps {
  type: "login" | "signup";
  onForgotPassword?: () => void;
}

export default function AuthFooter({
  type,
  onForgotPassword,
}: AuthFooterProps) {
  const isLogin = type === "login";
  const oppositeText = isLogin
    ? "Don't have an account?"
    : "Already signed up?";
  const oppositeLink = isLogin ? "Sign up" : "Go to login";
  const oppositePath = isLogin ? "/signup" : "/login";

  return (
    <>
      {isLogin && onForgotPassword && (
        <div className="mt-2 flex w-full max-w-md flex-col items-start">
          <button
            onClick={onForgotPassword}
            className="mb-2 text-xs text-[#db4c3f] hover:underline"
          >
            Forgot your password?
          </button>
        </div>
      )}

      <div className="mt-2 flex w-full max-w-md flex-col items-start">
        <p className="text-xs text-gray-500">
          By continuing with Google, Apple, or Email, you agree to Todoist&apos;s{" "}
          <a href="#" className="text-[#db4c3f] underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#db4c3f] underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <div className="mt-6 w-full max-w-md text-center">
        <span className="text-sm text-gray-700">{oppositeText} </span>
        <a
          href={oppositePath}
          className="font-medium text-[#db4c3f] hover:underline"
        >
          {oppositeLink}
        </a>
      </div>
    </>
  );
}
