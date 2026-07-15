"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, PartyPopper } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import Button from "@/components/ui/Button";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    const { error: signInError } = await signIn.email({ email, password });
    setLoading(false);

    if (signInError) {
      setServerError(signInError.message || "Invalid email or password");
      return;
    }
    router.push("/");
  };

  const handleDemoLogin = () => {
    setEmail("demo@eventhub.com");
    setPassword("Demo@123");
    setErrors({});
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT — Branding panel, hidden on mobile */}
      <div className="hidden lg:flex lg:w-5/12 relative bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 overflow-hidden">
        <div className="absolute top-20 right-14 w-16 h-16 rounded-2xl bg-amber-400/20 -rotate-12" />
        <div className="absolute top-1/2 left-10 w-10 h-10 rounded-full bg-white/10" />
        <div className="absolute bottom-28 right-16 w-20 h-20 rounded-full border border-white/10" />
        <div className="absolute bottom-44 left-16 w-14 h-14 rounded-xl bg-amber-400/10 rotate-6" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <Calendar size={22} />
            EventHub
          </Link>

          <div>
            <PartyPopper className="text-amber-400 mb-4" size={28} />
            <h2 className="text-3xl font-bold leading-snug">
              Welcome back.
              <br />
              Your next event awaits.
            </h2>
            <p className="mt-4 text-violet-100 text-sm max-w-sm">
              Sign in to manage your events, track RSVPs, and discover what's
              happening around you.
            </p>
          </div>

          <p className="text-xs text-violet-200">© 2026 EventHub. All rights reserved.</p>
        </div>
      </div>

      {/* RIGHT — Form panel */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 text-violet-700 font-semibold text-lg mb-8">
            <Calendar size={22} />
            EventHub
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
          <p className="mt-1 text-sm text-slate-500">
            New to EventHub?{" "}
            <Link href="/signup" className="text-violet-600 font-medium hover:underline">
              Create an account
            </Link>
          </p>

          {serverError && (
            <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 p-2.5 rounded-lg">
              {serverError}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3.5 py-2.5 border rounded-xl text-sm bg-white transition-colors focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-300 focus:ring-red-200"
                    : "border-slate-200 focus:ring-violet-200 focus:border-violet-400"
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3.5 py-2.5 border rounded-xl text-sm bg-white transition-colors focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-300 focus:ring-red-200"
                    : "border-slate-200 focus:ring-violet-200 focus:border-violet-400"
                }`}
              />
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <Button type="submit" fullWidth disabled={loading} className="!py-2.5 !rounded-xl mt-2">
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full text-center text-sm text-violet-600 font-medium hover:underline py-1"
            >
              Use Demo Credentials
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}