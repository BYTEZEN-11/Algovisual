import { Container } from "@/components/layout/Container";

export const metadata = { title: "Terms of Service — DSA Visual" };

export default function TermsPage() {
  return (
    <Container className="py-12 max-w-3xl">
      <h1 className="text-3xl font-semibold text-ink mb-4">Terms of Service</h1>
      <p className="text-muted leading-relaxed">
        DSA Visual is provided as-is for educational use. You may use the
        content for personal study, teaching, or sharing within your team.
        You may not resell the content as your own or use it to train
        commercial AI models without explicit permission.
      </p>
      <p className="text-muted leading-relaxed mt-4">
        Placeholder — replace with the full terms before launch.
      </p>
    </Container>
  );
}
