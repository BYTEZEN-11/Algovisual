import { Container } from "@/components/layout/Container";

export const metadata = { title: "Privacy Policy — DSA Visual" };

export default function PrivacyPage() {
  return (
    <Container className="py-12 max-w-3xl">
      <h1 className="text-3xl font-semibold text-ink mb-4">Privacy Policy</h1>
      <p className="text-muted leading-relaxed">
        We collect only the data needed to make DSA Visual work: your sign-in
        identity (Google), your progress on tracked topics, and your bookmarks.
        Anonymous analytics tell us which patterns are tried most so we can
        prioritise content. We never sell your data. You can request deletion
        of your account and all associated data at any time.
      </p>
      <p className="text-muted leading-relaxed mt-4">
        This page is a placeholder for the platform. Replace with the full
        policy before launching to real users.
      </p>
    </Container>
  );
}
