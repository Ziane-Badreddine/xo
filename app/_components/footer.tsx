import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Info, BarChart, Trophy, Gamepad2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import FadeInWhenVisible from "@/components/animation/FadeInWhenVisible";

const resources = ["GitHub", "Discord", "Contact"];
const navLinks = [
  {
    label: "Play",
    href: "/play",
    icon: Gamepad2,
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    label: "Stats",
    href: "/stats",
    icon: BarChart,
  },
  {
    label: "About",
    href: "/about",
    icon: Info,
  },
];

export default function Footer() {
  return (
      <footer className="border-t z-10   relative  w-full px-5 py-10  md:py-10 lg:py-16 md:px-10  bg-background">
        <div className="absolute bottom-44 left-0  w-20 md:w-96 h-40 rounded-full bg-primary/20 blur-3xl opacity-70 pointer-events-none" />

        {/* Spotlight Bottom Left */}
        <div className="absolute bottom-44 left-0 w-32 h-32 rounded-full bg-accent/20 blur-2xl opacity-50 pointer-events-none" />

        <div className="absolute top-44 right-0  w-20 md:w-96 h-40 rounded-full bg-primary/20 blur-3xl opacity-70 pointer-events-none" />

        {/* Spotlight Bottom Left */}
        <div className="absolute top-44 right-0 w-32 h-32 rounded-full bg-accent/20 blur-2xl opacity-50 pointer-events-none" />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 w-full py-5 ">
          <div className="col-span-2 flex flex-col justify-start items-start gap-2 max-w-lg">
            <Logo />
            <p className="text-xs md:text-sm text-muted-foreground mt-2">
              Play Tic Tac Toe online or offline — no downloads, just pure
              strategy. Built for quick matches, friendly competition, and
              global challenges.
            </p>
            <Skeleton className="w-1/2 h-[40px]" />
          </div>
          <div className="col-span-1 flex flex-col items-start justify-start">
            <h1 className="mb-2 font-semibold">Product</h1>
            <div className="flex flex-col gap-1">
              {navLinks.map((p, i) => (
                <Link
                  key={i}
                  href={p.href}
                  className="text-muted-foreground text-xs md:text-sm hover:text-foreground"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-start justify-start">
            <h1 className="mb-2 font-semibold">Resources</h1>
            <div className="flex flex-col gap-1">
              {resources.map((p, i) => (
                <Link
                  key={i}
                  href={"/#"}
                  className="text-muted-foreground text-xs md:text-sm hover:text-foreground"
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col md:flex-row items-center justify-between  gap-4 mt-5 py-5">
          <p className="text-xs md:text-sm text-muted-foreground">
            © 2025 XO. All rights reserved.
          </p>
          <Link
            href={"/privacy-policy"}
            className="text-xs md:text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </div>
      </footer>
  );
}
