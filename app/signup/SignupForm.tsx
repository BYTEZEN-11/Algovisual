"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export function SignupForm({ returnTo }: { returnTo: string }) {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Please enter your name.");
    if (!email) return setError("Email is required.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setLoading(false);

      if (!result || result.error) {
        router.push("/login?return=" + encodeURIComponent(returnTo));
        return;
      }

      router.push(returnTo);
      router.refresh();
    } catch {
      setLoading(false);
      setError("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs text-muted mb-1.5 font-medium">
          Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            disabled={loading}
            className="w-full pl-10 pr-3 py-2.5 bg-base border border-line rounded-md text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="signup-email" className="block text-xs text-muted mb-1.5 font-medium">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
            className="w-full pl-10 pr-3 py-2.5 bg-base border border-line rounded-md text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="signup-password" className="block text-xs text-muted mb-1.5 font-medium">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            disabled={loading}
            className="w-full pl-10 pr-10 py-2.5 bg-base border border-line rounded-md text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-xs text-muted mb-1.5 font-medium">
          Confirm password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            disabled={loading}
            className="w-full pl-10 pr-3 py-2.5 bg-base border border-line rounded-md text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition disabled:opacity-50"
          />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="text-sm text-warn bg-warn/10 border border-warn/30 rounded-md px-3 py-2"
        >
          {error}
        </div>
      )}

      <Button type="submit" size="md" variant="primary" disabled={loading} className="w-full">
        {loading ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-xs text-muted text-center">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="text-accent hover:underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-accent hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}