"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";

interface ApproachSwitcherProps {
  approaches: { id: string; name: string }[];
  value: string;
  onValueChange: (v: string) => void;
}

export function ApproachSwitcher({
  approaches,
  value,
  onValueChange,
}: ApproachSwitcherProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} defaultValue={approaches[0].id}>
      <TabsList className="flex-wrap">
        {approaches.map((a) => (
          <TabsTrigger key={a.id} value={a.id}>
            {a.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}