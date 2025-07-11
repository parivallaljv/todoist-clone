"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../icons/todoist.png";
import SignupImage from "../images/signup.jpg";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start px-4 md:px-12">
          <Image
            src={logo}
            alt="Todoist Logo"
            className="w-32"
          />
          <h1 className="text-3xl font-bold mb-6 text-gray-900 w-full">
            Sign up
          </h1>
          <div className="flex flex-col gap-3 w-full max-w-md">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <span className="text-lg">🌐</span> Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <span className="text-lg">📘</span> Continue with Facebook
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <span className="text-lg">🍎</span> Continue with Apple
            </Button>
          </div>
          <div className="my-6 w-full max-w-md border-t border-gray-200"></div>
          <form className="flex flex-col gap-4 w-full max-w-md">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your personal or work email..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-8 text-gray-500 focus:outline-none"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#db4c3f] hover:bg-[#c44536] text-white font-semibold text-base py-2 rounded-md"
            >
              Sign up with Email
            </Button>
          </form>
          <div className="w-full max-w-md flex flex-col items-start mt-2">
            <p className="text-xs text-gray-500">
              By continuing with Google, Apple, or Email, you agree to Todoist's{" "}
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
          <div className="w-full max-w-md text-center mt-6">
            <span className="text-sm text-gray-700">Already signed up? </span>
            <a
              href="/login"
              className="text-[#db4c3f] font-medium hover:underline"
            >
              Go to login
            </a>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 items-center justify-center flex-col">
          <Image
            src={SignupImage}
            alt="Signup Illustration"
            className="w-80 max-w-full mb-6"
          />
          <div className="bg-white rounded-lg shadow-md p-6 max-w-xs">
            <p className="italic text-gray-700 mb-2">
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
