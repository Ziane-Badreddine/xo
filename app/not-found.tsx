import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center space-y-6">
      <Ghost className="w-16 h-16 text-muted-foreground animate-pulse" />
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
      </div>
      <Link href="/">
        <Button variant="default" className="text-base px-6 py-2">
          Go back home
        </Button>
      </Link>
    </section>
  );
}
