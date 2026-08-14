import type { Status } from "@/types/content";
import { Badge } from "@/components/ui/Badge";

export function StatusBadge({ status }: { status: Status }) {
  if (status === "live") return <Badge variant="live">● Live</Badge>;
  if (status === "bonus") return <Badge variant="bonus">★ Bonus</Badge>;
  if (status === "new") return <Badge variant="new">✦ New</Badge>;
  return <Badge variant="neutral">Draft</Badge>;
}