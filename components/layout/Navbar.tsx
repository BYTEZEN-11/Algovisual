import Link from "next/link";
import { Container } from "./Container";
import { auth } from "@/auth";
import { AuthNavButtons } from "@/components/auth/AuthNavButtons";
import { UserMenu } from "@/components/auth/UserMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SearchRoot } from "@/components/search/SearchRoot";

export async function Navbar() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-base/80 border-b border-line">
      <Container className="h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <div className="w-7 h-7 rounded bg-accent/20 border border-accent/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>
          <span className="text-ink">DSA Visual</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <Link href="/patterns/two-pointers" className="hover:text-ink transition">
            DSA
          </Link>
          <Link href="/lld/solid" className="hover:text-ink transition">
            LLD
          </Link>
          <Link href="/computer-networks" className="hover:text-ink transition">
            Networks
          </Link>
          <Link href="/operating-systems" className="hover:text-ink transition">
            OS
          </Link>
          <Link
            href="/prepare"
            className="hover:text-accent transition text-accent/80"
          >
            Prep
          </Link>
          {session?.user && (
            <>
              <Link href="/dashboard" className="hover:text-ink transition">
                Dashboard
              </Link>
              <Link href="/bookmarks" className="hover:text-ink transition">
                Bookmarks
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <SearchRoot />
          <ThemeToggle />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <AuthNavButtons />
          )}
        </div>
      </Container>
    </header>
  );
}