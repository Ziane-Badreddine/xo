import React from "react";
import TopPlayerRoles from "./hero/top-player";
import { Button } from "@/components/ui/button";
import { Check, MoveRight, Zap } from "lucide-react";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeInWhenVisible from "@/components/animation/FadeInWhenVisible";

const features = ["Real-time play", "Chat", "ELO ranking"];

export default function Hero() {
  return (
    <section className="w-full m-auto relative flex flex-col md:flex-row items-center overflow-hidden  justify-center  p-2 md:px-10 md:p-3  md:gap-10 ">
      <FadeInWhenVisible className="w-full md:w-1/2 ">
        <div className="flex flex-col items-start justify-start w-full   p-5 gap-5">
          <Button variant={"secondary"} className="rounded-full border">
            <Zap color="oklch(0.7044 0.1872 23.1858)" size={10} />
            <p>Fast & Simple</p>
          </Button>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold">
            Play <span className="text-primary">XO</span> Online — Simple, Fast,
            and Fun!
          </h1>
          <p className="text-muted-foreground text-sm md:text-md">
            Challenge your friends or players around the world in the classic
            game of Tic Tac Toe. No downloads needed. Sign up to play online —
            or jump straight into offline mode with no account.
          </p>
          <div className="flex items-center justify-center gap-3">
            <SignedIn>
              <Link href={"/play/online"}>
              <Button
                className="rounded-full cursor-pointer hover:scale-105 transition-all duration-500 capitalize"
                size={"lg"}
              >
                <p>play online</p>
                <MoveRight />
              </Button>
              </Link>
            </SignedIn>
            <Link href={"/play/offline"}>
              <Button
                className="rounded-full border cursor-pointer hover:scale-105 transition-all duration-500 capitalize"
                size={"lg"}
                variant={"ghost"}
              >
                <p>play offline</p>
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-5">
            {features.map((feature, i) => {
              return (
                <div key={i} className="flex items-center justify-center gap-1">
                  <Check className="text-primary" size={18} />
                  <p className="text-muted-foreground text-xs md:text-sm">
                    {feature}
                  </p>
                </div>
              );
            })}
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md">
                Is it free?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-md">
                Yes. The game is totally free to play — no payment, no
                subscription.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </FadeInWhenVisible>
      <div className="absolute bottom-44 left-0  w-20 md:w-96 h-40 rounded-full bg-primary/20 blur-3xl opacity-70 pointer-events-none" />

      {/* Spotlight Bottom Left */}
      <div className="absolute bottom-44 left-0 w-32 h-32 rounded-full bg-accent/20 blur-2xl opacity-50 pointer-events-none" />
      <TopPlayerRoles />
    </section>
  );
}
