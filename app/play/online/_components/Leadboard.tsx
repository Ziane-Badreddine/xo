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

export default function Leadboard() {
  const users = useQuery(api.user.getAllUsers);
  const router = useRouter();
  return (
    <FadeInWhenVisible className="w-full h-full">
      <div className="w-full h-full border-l-4 border-l-primary dark:border-l-accent border p-5 shadow-sm bg-white dark:bg-muted-foreground/5 ">
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
              <Button
                variant={"ghost"}
                onClick={() => router.push("/leaderboard")}
              >
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
                .filter((_, i) => i < 6)
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
  );
}
