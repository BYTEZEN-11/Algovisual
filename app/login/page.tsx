import { redirect } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "./LoginForm";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { getOptionalUser } from "@/lib/auth-guards";

export const metadata = { title: "Sign in — DSA Visual" };
export const dynamic = "force-dynamic";

interface LoginPageProps {
  searchParams: { return?: string; error?: string };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getOptionalUser();
  if (user) {
    redirect(searchParams.return || "/dashboard");
  }

  const returnTo = searchParams.return || "/dashboard";

  return (
    <Container className="py-16 max-w-md">
      <div className="mb-8 text-center">
        <div className="text-xs uppercase tracking-widest text-accent font-medium mb-2">
          Welcome back
        </div>
        <h1 className="text-3xl font-semibold text-ink">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Pick up where you left off — your solved topics and bookmarks are waiting.
        </p>
      </div>

      <Card className="bg-elev border-line" glow>
        <GoogleSignInButton returnTo={returnTo} />

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-line" />
          <span className="text-xs text-muted uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-line" />
        </div>

        <LoginForm returnTo={returnTo} initialError={searchParams.error} />
      </Card>

      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link
          href={`/signup${returnTo ? `?return=${encodeURIComponent(returnTo)}` : ""}`}
          className="text-accent hover:underline font-medium"
        >
          Sign up
        </Link>
      </p>
    </Container>
  );
}