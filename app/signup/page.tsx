import { redirect } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { SignupForm } from "./SignupForm";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { getOptionalUser } from "@/lib/auth-guards";

export const metadata = { title: "Sign up — DSA Visual" };
export const dynamic = "force-dynamic";

interface SignupPageProps {
  searchParams: { return?: string };
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const user = await getOptionalUser();
  if (user) {
    redirect(searchParams.return || "/dashboard");
  }

  const returnTo = searchParams.return || "/dashboard";

  return (
    <Container className="py-16 max-w-md">
      <div className="mb-8 text-center">
        <div className="text-xs uppercase tracking-widest text-accent font-medium mb-2">
          Get started
        </div>
        <h1 className="text-3xl font-semibold text-ink">Create your account</h1>
        <p className="mt-2 text-sm text-muted">
          Track solved topics, save bookmarks, and pick up your prep streak from any device.
        </p>
      </div>

      <Card className="bg-elev border-line" glow>
        <GoogleSignInButton returnTo={returnTo} />

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-line" />
          <span className="text-xs text-muted uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-line" />
        </div>

        <SignupForm returnTo={returnTo} />
      </Card>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          href={`/login${returnTo ? `?return=${encodeURIComponent(returnTo)}` : ""}`}
          className="text-accent hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
    </Container>
  );
}