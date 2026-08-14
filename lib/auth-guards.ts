import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireUser() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session.user as {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export async function requireUserFromPath(currentPath: string) {
  const session = await auth();
  if (!session?.user) {
    redirect(`/login?return=${encodeURIComponent(currentPath)}`);
  }
  return session.user as {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export async function getOptionalUser() {
  const session = await auth();
  return session?.user ?? null;
}