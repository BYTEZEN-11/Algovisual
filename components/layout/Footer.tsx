import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-line py-10 mt-16 bg-elev">
      <Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-accent/20 border border-accent/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent" />
          </div>
          <span className="font-semibold text-ink">DSA Visual</span>
          <span className="text-xs text-muted ml-2">
            an independent learning platform.
          </span>
        </div>
        <nav className="flex items-center gap-5 text-xs text-muted">
          <Link href="/privacy" className="hover:text-accent transition">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-accent transition">
            Terms
          </Link>
          <Link href="/pricing" className="hover:text-accent transition">
            Pricing
          </Link>
          <Link href="/refund" className="hover:text-accent transition">
            Refund
          </Link>
        </nav>
      </Container>
      <Container className="mt-4 text-xs text-muted">
        © {new Date().getFullYear()} DSA Visual. Built for learners.
      </Container>
    </footer>
  );
}
