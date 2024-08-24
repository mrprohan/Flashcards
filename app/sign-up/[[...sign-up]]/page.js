'use client'

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return <SignUp signInUrl="/sign-in" afterSignUpUrl="/home" />;
}