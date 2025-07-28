"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const fontSizes = ["text-base", "text-lg", "text-xl", "text-2xl", "text-3xl"];
const displaySizes = ["S", "M", "L", "XL", "XXL"];

export function FontSizeAdjuster({
  setFontSize,
}: {
  setFontSize: (size: string) => void;
}) {
  const [currentSizeIndex, setCurrentSizeIndex] = useState(1);

  const adjustSize = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < fontSizes.length) {
      setCurrentSizeIndex(newIndex);
      setFontSize(fontSizes[newIndex]);
    }
  };

  return (
    <div className="flex items-center gap-1 rounded-full border p-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => adjustSize(currentSizeIndex - 1)}
        disabled={currentSizeIndex === 0}
        aria-label="Decrease font size"
        className="rounded-full h-8 w-8"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center text-sm font-medium text-muted-foreground">
        {displaySizes[currentSizeIndex]}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => adjustSize(currentSizeIndex + 1)}
        disabled={currentSizeIndex === fontSizes.length - 1}
        aria-label="Increase font size"
        className="rounded-full h-8 w-8"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
