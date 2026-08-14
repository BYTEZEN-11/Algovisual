import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <div className="text-xs uppercase tracking-widest text-warn font-medium mb-2">
        404
      </div>
      <h1 className="text-4xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 text-muted max-w-md mx-auto">
        The page you’re looking for hasn’t been authored yet, or the URL has a
        typo. Try heading home and picking a track.
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button variant="primary">Back home</Button>
        </Link>
      </div>
    </Container>
  );
}
