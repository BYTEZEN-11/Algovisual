import { CheckCircle2, AlertTriangle } from "lucide-react";

export function OnTrackIndicator({
  onTrack,
}: {
  onTrack: boolean;
}) {
  return onTrack ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/15 text-accent border border-accent/30 text-xs font-medium">
      <CheckCircle2 className="w-3.5 h-3.5" /> On track
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-warn/15 text-warn border border-warn/30 text-xs font-medium">
      <AlertTriangle className="w-3.5 h-3.5" /> Behind
    </span>
  );
}