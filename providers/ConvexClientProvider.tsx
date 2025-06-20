"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkLoaded, ClerkLoading, useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <ClerkLoading>
        <main className="flex items-center justify-center w-screen h-screen ">
          <div className="flex  text-[100px] font-bold">
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-primary"
            >
              X
            </motion.span>
            <motion.span
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.1,
              }}
              className="text-accent"
            >
              O
            </motion.span>
          </div>
        </main>
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </ConvexProviderWithClerk>
  );
}
