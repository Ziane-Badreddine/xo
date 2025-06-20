"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Search,
  Brain,
  MessageCircle,
  Timer,
  Trophy,
  Loader2,
  MoveRight,
} from "lucide-react";
import Leadboard from "./_components/Leadboard";
import FadeInWhenVisible from "@/components/animation/FadeInWhenVisible";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import { useRef, useState } from "react";
import { useMutationState } from "@/hook/useMutationState";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OnlinePlayPage() {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const router = useRouter();
  const { mutate: joinCreateGame, pending: pendingJoinCreateGame } =
    useMutationState(api.games.joinCreateGame);
  const { mutate: gameLink, pending: pendingGameLink } = useMutationState(
    api.games.gameLink
  );

  const handleJoinCreateGame = async () => {
    if (!user?.id) {
      toast.error("User not logged in.");
      return;
    }

    setIsLoading(true);
    try {
      const gameId = await joinCreateGame({ clerkId: user.id }); // ou { clerkId: user.id, turn: "X" }

      if (gameId) {
        toast.success("Game found! Redirecting...");
        router.push("/play/online/" + gameId);
      } else {
        toast.error("Failed to join or create a game.");
      }
    } catch (err) {
      console.error("Error joining or creating game", err);
      toast.error("An unexpected error occurred. Try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGameLink = async () => {
    if (!user?.id || !inputRef.current) {
      toast.error("Enter a valid Game ID.");
      return;
    }

    setIsLoading(true);

    try {
      const gameId = await gameLink({
        gameId: inputRef.current.value,
        clerkId: user.id,
      });
      if (gameId) {
        toast.success("Game found! Redirecting...");
        router.push("/play/online/" + gameId);
      } else {
        toast.error("Game ID not found.");
      }
    } catch (err) {
      toast.error(String(err));
    } finally {
      setIsLoading(false);
      inputRef.current.value = ""
    }
  };

  return (
    <section className="p-5 md:my-10 h-auto md:h-[80vh] w-full md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      <FadeInWhenVisible className="w-full h-full">
        <div className="w-full h-full grid gap-4 border-l-4 border-l-primary dark:border-l-accent border p-5 shadow-sm bg-white dark:bg-muted-foreground/5 ">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Quick Match
              </h1>
              <p className="text-muted-foreground">
                Instantly join an open game or start a new one if none are
                available.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Input
                placeholder="Enter Game ID"
                className="w-[80%]"
                ref={inputRef}
              />

              <Button
                onClick={handleGameLink}
                size={"icon"}
                className="w-[20%] "
                disabled={pendingGameLink}
              >
                {pendingGameLink ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : (
                  <MoveRight className="w-7 h-7 animate-pulse" />
                )}
              </Button>
            </div>

            <Separator className="w-full" />

            {/* Create new game */}
            <div className="flex flex-col gap-4">
              <Button
                className="w-full"
                onClick={handleJoinCreateGame}
                variant={"secondary"}
                disabled={pendingJoinCreateGame}
              >
                <MoveRight className="w-5 h-5" />
                Join or Create Game
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                We’ll automatically match you with a waiting player or create a
                new game for you.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-sm text-muted-foreground">
            <InfoRow
              icon={<Search className="w-5 h-5 text-primary" />}
              text="Find a game: Join an open match or wait for an opponent."
            />
            <InfoRow
              icon={<Brain className="w-5 h-5 text-primary" />}
              text="Test your skills: Improve your ELO and win rate."
            />
            <InfoRow
              icon={<MessageCircle className="w-5 h-5 text-primary" />}
              text="Chat with opponents: Talk during the match."
            />
            <InfoRow
              icon={<Timer className="w-5 h-5 text-primary" />}
              text="Timed turns: Make your move before time runs out."
            />
            <InfoRow
              icon={<Trophy className="w-5 h-5 text-primary" />}
              text="Climb the leaderboard by winning games."
            />
          </div>
        </div>
      </FadeInWhenVisible>
      <Leadboard />
    </section>
  );
}

// ✅ Small reusable row component
function InfoRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span>{icon}</span>
      <p>{text}</p>
    </div>
  );
}
