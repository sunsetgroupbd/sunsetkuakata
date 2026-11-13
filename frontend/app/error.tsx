"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-paper min-h-[70vh] flex items-center justify-center pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-md mx-auto text-center px-4 space-y-6">
        <span className="text-xs uppercase tracking-[0.18em] font-medium text-red">
          System Notice
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink">
          An Unexpected Error Occurred
        </h1>
        <p className="text-sm text-grey-700 leading-relaxed">
          We encountered an issue processing this view. You may reload or return to our homepage.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Button onClick={() => reset()} variant="primary">
            Try Again
          </Button>
          <Button href="/" variant="outline">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}

