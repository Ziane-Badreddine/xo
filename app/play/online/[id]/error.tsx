'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error('Error caught in error.tsx:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        We couldn’t load the game. The Game ID might be invalid or there was a server issue.
      </p>

      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button variant="secondary" onClick={() => router.push('/play/online')}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
