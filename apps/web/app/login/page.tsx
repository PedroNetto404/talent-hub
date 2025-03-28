"use client";

import { GraduationCap } from "lucide-react";

import { LoginForm } from "@/components/login/login-form";
import loginImg from "@/public/placeholder.svg";
// import { userService } from "@/services/user-service";
import Image from "next/image";
import Link from "next/link";
import { FormEventHandler, useEffect } from "react";

export default function LoginPage() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const email = (
      event.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;
    const password = (
      event.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;

    try {
      // const response = await userService.auth({
      //   identifier: email,
      //   password,
      // });
      // localStorage.setItem("token", response.data.accessToken);
      // localStorage.setItem(
      //   "token-expires-in",
      //   response.data.expiresIn.toString(),
      // );
      // window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-expires-in");
  }, []);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
              <GraduationCap className="size-4" />
            </div>
            Talent Hub
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={loginImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
