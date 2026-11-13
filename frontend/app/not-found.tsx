import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="bg-paper min-h-[70vh] flex items-center justify-center pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-md mx-auto text-center px-4 space-y-6">
        <span className="text-xs uppercase tracking-[0.18em] font-medium text-red">
          404 Error
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-ink">
          Page Not Found
        </h1>
        <p className="text-sm text-grey-700 leading-relaxed">
          The requested page could not be located. It may have been moved or updated.
        </p>
        <div className="pt-2">
          <Button href="/" variant="primary">
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

