"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { MoveRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import FadeInWhenVisible from "@/components/animation/FadeInWhenVisible";

export default function TopPlayerRoles() {
  const users = useQuery(api.user.getAllUsers);
  const router = useRouter();

  return (
    <div className=" relative w-full md:w-1/2 flex flex-col items-center justify-center gap-5 p-5">
      <FadeInWhenVisible className="w-full">
        <div className="absolute top-0 right-0 w-20 md:w-96 h-60 rounded-full bg-primary/20 blur-3xl opacity-70 pointer-events-none" />

        {/* Spotlight Bottom Left */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-accent/20 blur-2xl opacity-50 pointer-events-none" />
        <div className="w-full border-l-4 border-l-primary dark:border-l-accent border p-5 shadow-sm dark:bg-muted-foreground/5 ">
          <h1 className="text-xl font-semibold text-foreground mb-3 underline underline-offset-3">
            Game Rules
          </h1>
          <p>
            <span className="text-primary">—</span> Align 3 symbols to win
            (horizontal, vertical, or diagonal)
          </p>
          <p>
            <span className="text-primary">—</span> Play in real-time against
            friends or other players
          </p>
          <p>
            <span className="text-primary">—</span> ELO ranking system:
          </p>
          <p>
            <span className="text-primary">——</span> Winner: +3 ELO
          </p>
          <p>
            <span className="text-primary">——</span> Loser: –3 ELO
          </p>
          <p>
            <span className="text-primary">——</span> Draw: +1 ELO each
          </p>
          <p>
            <span className="text-primary">—</span> New accounts start with 100
            ELO <span className="text-primary">—</span> free and fair for all!
          </p>
        </div>
      </FadeInWhenVisible>
      <FadeInWhenVisible className="w-full">
        <div className="w-full border-l-4 border-l-primary dark:border-l-accent border p-5 shadow-sm bg-white dark:bg-muted-foreground/5 ">
          <h1 className="text-xl font-semibold text-foreground mb-3 underline underline-offset-3">
            Top Players
          </h1>
          {!users ? (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
              <Skeleton className="h-[40px] w-full rounded-full" />
              <Skeleton className="h-[40px] w-full rounded-full" />
              <Skeleton className="h-[40px] w-full rounded-full" />
              <Skeleton className="h-[40px] w-full rounded-full" />
            </div>
          ) : users.length > 0 ? (
            <Table>
              <TableCaption>
                <Button variant={"ghost"} onClick={() => router.push("/leaderboard")}>
                  watch all
                  <MoveRight />
                </Button>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>rank</TableHead>
                  <TableHead>player</TableHead>
                  <TableHead>elo</TableHead>
                  <TableHead>wins</TableHead>
                  <TableHead>losses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users
                  .sort((a, b) => a.elo - b.elo)
                  .filter((_, i) => i < 3)
                  .map((user, i) => (
                    <TableRow
                      onClick={() => router.push(`/users/${user._id}`)}
                      key={i}
                    >
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell className="font-medium">
                        <Avatar>
                          <AvatarImage src={user.imageUrl} />
                          <AvatarFallback>
                            {user.username.slice(0.2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>{user.elo}</TableCell>
                      <TableCell>{user.winCount}</TableCell>
                      <TableCell>{user.lossCount}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <div>users no found </div>
          )}
        </div>
      </FadeInWhenVisible>
    </div>
  );
}
