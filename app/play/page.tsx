"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wifi, WifiOff, LogIn, Gamepad2 } from "lucide-react";

export default function PagePlay() {
  const [open, setOpen] = useState(true);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-[90vw] max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Ready to Play?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Choose your preferred game mode and jump into a round of Tic Tac
            Toe!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Tabs defaultValue="online" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="online">Play Online</TabsTrigger>
            <TabsTrigger value="offline">Play Offline</TabsTrigger>
          </TabsList>

          <TabsContent value="online" className="mt-4 space-y-4">
            <p>
              Challenge real players in real-time, track your score, and climb
              the leaderboard.
            </p>
            <Link href="/play/online">
              <Button
                variant="secondary"
                className="w-full flex items-center gap-2 justify-center"
              >
                <LogIn className="w-4 h-4" />
                Join an Online Match
              </Button>
            </Link>
          </TabsContent>

          <TabsContent value="offline" className="mt-4 space-y-4">
            <p>
              Play with a friend on the same device or test your strategy solo.
            </p>
            <Link href="/play/offline">
              <Button
                variant="secondary"
                className="w-full flex items-center gap-2 justify-center"
              >
                <Gamepad2 className="w-4 h-4" />
                Start an Offline Game
              </Button>
            </Link>
          </TabsContent>
        </Tabs>

        <AlertDialogFooter className="mt-6">
          <div className="text-xs text-muted-foreground text-left flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-blue-500" />
              <p>Online mode requires an internet connection.</p>
            </div>
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-red-500" />
              <p>Offline mode works without an account or connection.</p>
            </div>
          </div>
          <AlertDialogAction asChild>
            <Link href="/">Go Back</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
