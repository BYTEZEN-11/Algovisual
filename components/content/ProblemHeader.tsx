import { Badge } from "@/components/ui/Badge";
import { Topic } from "@/types/content";
import { DetailsDisclosure } from "./DetailsDisclosure";

interface ProblemHeaderProps {
  topic: Topic;
  patternTitle: string;
}

export function ProblemHeader({ topic, patternTitle }: ProblemHeaderProps) {
  const variant: "easy" | "medium" | "hard" =
    topic.difficulty === "Easy"
      ? "easy"
      : topic.difficulty === "Medium"
        ? "medium"
        : "hard";
  const showDetails = topic.askedAt && topic.askedAt.length > 0;

  return (
    <div>
      <div className="flex items-center gap-2 text-xs text-muted mb-2 flex-wrap">
        <span className="uppercase tracking-widest text-accent font-medium">
          Concept
        </span>
        <span>·</span>
        <span className="uppercase tracking-wider">{patternTitle}</span>
        {showDetails && (
          <>
            <span>·</span>
            <DetailsDisclosure>
              <div className="text-xs uppercase tracking-wider text-muted mb-1.5">
                Asked at
              </div>
              <div className="flex flex-wrap gap-1.5">
                {topic.askedAt!.map((c) => (
                  <Badge key={c} variant="neutral">
                    {c}
                  </Badge>
                ))}
              </div>
            </DetailsDisclosure>
          </>
        )}
      </div>

      <div className="flex items-start justify-between flex-wrap gap-3">
        <h1 className="text-3xl md:text-4xl font-semibold text-ink leading-tight">
          {topic.title}
        </h1>
        <Badge variant={variant}>{topic.difficulty}</Badge>
      </div>

      <p className="mt-2 text-muted max-w-2xl">{topic.description}</p>

      {(topic.problem || showDetails) && (
        <div className="mt-4 rounded-md bg-elev border border-line p-4">
          {topic.problem && (
            <p className="text-sm text-ink/80 leading-relaxed">
              {topic.problem}
            </p>
          )}
        </div>
      )}
    </div>
  );
}