import { Container } from "@/components/layout/Container";

export const metadata = { title: "Pricing — DSA Visual" };

export default function PricingPage() {
  return (
    <Container className="py-12 max-w-3xl">
      <h1 className="text-3xl font-semibold text-ink mb-4">Pricing</h1>
      <p className="text-muted leading-relaxed">
        DSA Visual is currently free to use. Planned paid tiers will unlock
        the Interview Prep track and downloadable progress certificates once
        those features ship.
      </p>
      <p className="text-muted leading-relaxed mt-4">
        Placeholder — replace with the full pricing policy before launch.
      </p>
    </Container>
  );
}
