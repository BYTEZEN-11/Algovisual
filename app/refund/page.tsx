import { Container } from "@/components/layout/Container";

export const metadata = { title: "Refund Policy — DSA Visual" };

export default function RefundPage() {
  return (
    <Container className="py-12 max-w-3xl">
      <h1 className="text-3xl font-semibold text-ink mb-4">Refund Policy</h1>
      <p className="text-muted leading-relaxed">
        If we ever introduce paid plans, this page will describe the refund
        window and process. Until then, DSA Visual is free.
      </p>
      <p className="text-muted leading-relaxed mt-4">
        Placeholder — replace with the full refund policy before launch.
      </p>
    </Container>
  );
}
