"use client";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { MoveDown, MoveLeft, MoveRight, MoveUp, Search, TrendingDown, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import FadeInWhenVisible from "@/components/animation/FadeInWhenVisible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PageLeaderboard() {
  const playres = useQuery(api.user.getAllUsers)?.sort((a, b) => b.elo - a.elo);
  const router = useRouter();
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const filterPlayres =
    search === ""
      ? playres
      : playres?.filter(
          (player) =>
            player.username.includes(search) || player.email.includes(search)
        );
  return (
    <FadeInWhenVisible>
      <section className="p-5 md:my-10 md:w-2/3  w-full h-full mx-auto flex flex-col items-start justify-start gap-5">
        <div>
          <h1 className="text-lg md:text-xl font-semibold">
            Global Leaderboard
          </h1>
          <p className="text-sm md:text-md text-muted-foreground ">
            See who's leading the XO arena. Updated in real time.
          </p>
        </div>
        <div className="w-full relative">
          {search === "" ? <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" /> : <MoveLeft onClick={() => setSearch("")} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />}

          <Input
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full flex flex-col">
          {playres ? (
            filterPlayres?.map((player) => {
              const r = player.winCount - player.lossCount;
              return (
                <Link
                  href={`/stats${player.clerkId !== user?.id ? `/${player.clerkId}` : ""}`}
                  key={player.clerkId}
                  className="w-full grid grid-cols-3 md:grid-cols-6 items-center border-l-4 border-l-primary dark:border-l-accent border p-5 shadow-sm dark:bg-muted-foreground/5 hover:bg-accent/50 relative"
                >
                  {player.clerkId === user?.id && <Badge variant={"secondary"} className=" absolute right-0 top-0">You</Badge>}
                  <div className="flex items-center gap-2 md:gap-5 col-span-2 md:col-span-4 ">
                    <h1 className="md:mr-5 text-lg">{playres.indexOf(player) + 1}</h1>
                    <Avatar>
                      <AvatarImage src={player.imageUrl} />
                      <AvatarFallback>{player.username.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1>{player.username}</h1>
                      <p className="break-all line-clamp-1 text-muted-foreground">{player.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center  md:gap-5 col-span-1 md:col-span-2 self-center place-self-end ">
                    <Button className="rounded-full">{player.elo >= 100 ? <TrendingUp /> : <TrendingDown />}{player.elo}</Button>
                    <h1 className="hidden md:block">{`${player.winCount}/${player.lossCount}`}</h1>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="w-full grid gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-full h-16 rounded-md bg-secondary space-y-6"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
