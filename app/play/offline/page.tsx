"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Board from "./_components/Board";
import { toast } from "sonner";
import FadeInWhenVisible from "@/components/animation/FadeInWhenVisible";

export default function PageOffline() {
  const [open, setOpen] = useState(true);
  const [turn, setTurn] = useState<string>("X");
  const [gameMode, setGameMode] = useState<string>("pvp");
  const [time, setTime] = useState<number>(30);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();

    if (!turn || !gameMode) {
      toast.error("Please select a game mode and symbol.");
      return;
    }

    setOpen(false);
    toast.success("game started");
  };

  return (
    <section className="p-5 md:my-5 relative  w-full  h-full mx-auto flex flex-col items-center justify-center gap-5 text-center  ">
      <div className="absolute top-1/2 right-0 w-20 md:w-96 h-60 rounded-full bg-primary/20 blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-32 h-32 rounded-full bg-accent/20 blur-2xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/2 left-0 w-20 md:w-96 h-60 rounded-full bg-primary/20 blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-1/2 left-0 w-32 h-32 rounded-full bg-accent/20 blur-2xl opacity-50 pointer-events-none" />
      <AlertDialog open={open}>
        <AlertDialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Start a New Game</AlertDialogTitle>
            <AlertDialogDescription>
              Select your preferences before starting. No internet or account
              required.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleCheck} className="grid gap-5">
            <div className="grid gap-2">
              <Label>Select how you want to play:</Label>
              <Select
                value={gameMode}
                onValueChange={(val) => setGameMode(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Game Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pvp">
                    Player vs Player (Same device)
                  </SelectItem>
                  <SelectItem value="ai" disabled>
                    Player vs AI (Coming soon)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Choose Your Symbol:</Label>
              <Select value={turn} onValueChange={(val) => setTurn(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Who goes first?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="X">Player 1 as X</SelectItem>
                  <SelectItem value="O">Player 1 as O</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="turn-time">
                Enter time per turn (in seconds):
              </Label>
              <Input
                id="turn-time"
                type="number"
                min={5}
                max={60}
                placeholder="30"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value !== "" ? parseInt(e.target.value) : 30)
                }
              />
              <p className="text-sm text-muted-foreground">
                Players will have this much time to make each move.
              </p>
            </div>

            <Button type="submit">Start Game</Button>
          </form>
        </AlertDialogContent>
      </AlertDialog>
      <FadeInWhenVisible className="w-full h-full">
        <Board open={open} setOpen={setOpen} time={time} turn={turn} />
      </FadeInWhenVisible>
    </section>
  );
}
