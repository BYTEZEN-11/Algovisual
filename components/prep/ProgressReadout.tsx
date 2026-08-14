export function ProgressReadout({
  solved,
  total,
}: {
  solved: number;
  total: number;
}) {
  const pct = total === 0 ? 0 : Math.round((solved / total) * 100);
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted">Progress</span>
      <span className="font-mono font-medium text-ink">
        {solved} / {total} solved
      </span>
      <span className="text-muted">·</span>
      <span className="font-mono font-medium text-accent">{pct}%</span>
    </div>
  );
}