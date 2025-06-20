"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlignRight, Menu, TrendingUp, X } from "lucide-react";
import Logo from "./logo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Info, BarChart, Trophy, Gamepad2 } from "lucide-react";
import { SlidingNumber } from "@/components/ui/sliding-number";
import { AnimatedNumber } from "@/components/ui/animated-number";

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

export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();
  const player = useQuery(
    api.user.getInfoPlayers,
    user ? { clerkId: user.id } : "skip"
  );

  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/90 shadow-sm border-b ">
      <div className="container mx-auto flex h-16 px-4 md:px-6 items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center justify-center gap-5 h-8">
          <nav className="flex items-center capitalize justify-center gap-5">
            {navLinks.map((link, i) => {
              return (
                <Link
                  key={i}
                  href={link.href}
                  className={cn(
                    " text-lg transition-colors text-muted-foreground hover:text-foreground relative group duration-200"
                  )}
                  style={{
                    opacity: 1,
                    transform: "none",
                  }}
                >
                  {link.label}
                  <span
                    className={cn(
                      " absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 bg-primary group-hover:w-full",
                      pathname.startsWith(link.href) && "w-full"
                    )}
                  ></span>
                </Link>
              );
            })}
          </nav>
          <Separator orientation="vertical" />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center justify-center gap-2">
              <SignUpButton mode="modal">
                <Button variant={"outline"}>Log Up</Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button>Log In</Button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <Separator orientation="vertical" />
            <Button
              variant="default"
              className="gap-1  text-sm border rounded-full"
            >
              <TrendingUp className="w-4 h-4" />
              {player?.elo}
            </Button>
          </SignedIn>

          <Separator orientation="vertical" />
          <ModeToggle />
        </div>
        <div className="flex md:hidden flex:items-center justify-center gap-5">
          <SignedIn>
            <Button
              variant="default"
              className="gap-1  text-sm border rounded-full"
            >
              <TrendingUp className="w-4 h-4" />
              <AnimatedNumber
                springOptions={{
                  bounce: 0,
                  duration: 2000,
                }}
                value={player?.elo || 0}
              />
            </Button>
          </SignedIn>
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <AlignRight size={26} />}
          </button>
        </div>
      </div>
      {open && (
        <div
          className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b "
          style={{
            opacity: 1,
            transform: "none",
          }}
        >
          <div className="mx-auto  py-5 flex flex-col gap-4 px-4 backdrop-blur-3xl">
            {navLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <React.Fragment key={i}>
                  <Link
                    onClick={() => setOpen(false)}
                    href={link.href}
                    className={cn(
                      "py-2 text-md capitalize font-medium relative overflow-hidden group flex items-center gap-2"
                    )}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 bg-primary group-hover:w-full",
                        pathname === link.href && "w-full"
                      )}
                    />
                  </Link>
                  <Separator />
                </React.Fragment>
              );
            })}
          </div>

          <div className="w-full  flex flex-col justify-center items-center gap-2 pb-5 ">
            <div className="w-full px-4">
              <Card>
                <CardContent className="flex items-center justify-between gap-5">
                  <h1>Appearance</h1>
                  <ModeToggle />
                </CardContent>
              </Card>
            </div>
            <SignedIn>
              <div className="w-full px-4">
                <Card>
                  <CardContent className="flex items-center gap-5">
                    <UserButton />
                    <div>
                      <h1 className="text-sm ">
                        {user?.username || "unknown"}
                      </h1>
                      <p className="text-xs text-muted-foreground">
                        {user?.emailAddresses[0].emailAddress}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex flex-col w-full p-4 items-center justify-center gap-2">
                <SignUpButton mode="modal">
                  <Button variant={"outline"} className="w-full">
                    Log Up
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button className="w-full">Log In</Button>
                </SignInButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
