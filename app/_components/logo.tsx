import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center hover:opacity-80 transition-opacity h-6"
    >
      <div className="text-2xl md:text-3xl font-extrabold text-primary mr-1 tracking-tight flex items-center justify-center w-8 h-8">
        X
      </div>
      <Separator orientation="vertical" className="mx-2 rotate-[30deg] " />
      <div className="text-2xl md:text-3xl font-extrabold text-accent tracking-tight flex items-center justify-center w-8 h-8">
        O
      </div>
    </Link>
  );
}