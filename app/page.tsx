import FadeInWhenVisible from "@/components/animation/FadeInWhenVisible";
import Hero from "./_components/hero";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="w-full h-[90vh]  flex flex-col ">
      <FadeInWhenVisible>
        <Hero />
      </FadeInWhenVisible>
    </main>
  );
}
