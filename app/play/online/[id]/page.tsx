"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { use } from "react";
import Chat from "./_components/Chat";

export default function pageGame({
  params,
}: {
  params: Promise<{ id: Id<"games"> }>;
}) {
  const { id } = use(params);
  const game = useQuery(api.games.getGame, { gameId: id });
  return (
    <main className=" w-full overflow-x-hidden    h-[90vh] grid grid-cols-1 gap-5 md:grid-cols-4 p-5">
      <Chat gameId={id} />
      <div className="flex flex-col justify-between h-full overflow-hidden rounded-xl border border-l-4 border-l-primary dark:border-l-accent shadow-sm dark:bg-muted-foreground/5 p-2 md:col-span-3">
        game
      </div>
    </main>
  );
}
