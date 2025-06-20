"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SlidingNumber } from "@/components/ui/sliding-number";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RotateCcw, Settings, Settings2 } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  turn: string;
  time: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type PropsCell = {
  id: number;
  content: string;
  onClick: (id: number) => void;
  isWinningCell?: boolean;
};

export default function Board(props: Props) {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>(props.turn);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(props.time);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [res, setRes] = useState("");

  useEffect(() => {
    if (gameOver || winner) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextPlayer = currentPlayer === "X" ? "O" : "X";
          setCurrentPlayer(nextPlayer);

          toast.warning(`Time's up! ${nextPlayer}'s turn`);

          return props.time;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPlayer, gameOver, winner, props.time]);

  useEffect(() => {
    setTimeLeft(props.time);
  }, [currentPlayer, props.time, props.open]);
  const handleCellClick = (id: number) => {
    if (board[id] || winner || gameOver) return;
    const newBoard = [...board];
    newBoard[id] = currentPlayer;
    setBoard(newBoard);
    const { winner: gameWinner, winningCells: cells } = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      setWinningCells(cells);
      setScore((prev) => ({
        ...prev,
        [gameWinner]: prev[gameWinner as "X" | "O"] + 1,
      }));
      setRes(`Player ${gameWinner} wins! 🎉`);
      toast.success(`Player ${gameWinner} wins! 🎉`);
    } else if (!newBoard.includes("")) {
      setGameOver(true);
      setRes("It's a draw! 🤝");
      toast.info("It's a draw! 🤝");
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };
  const checkWinner = (newBoard: string[]) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        return { winner: newBoard[a], winningCells: pattern };
      }
    }
    return { winner: null, winningCells: [] };
  };
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer(props.turn);
    setWinner(null);
    setWinningCells([]);
    setGameOver(false);
    setTimeLeft(props.time);
    toast.success("New game started!");
  };
  if (props.open) return null;
  return (
    <main className="w-full  sm:w-[470px]  md:w-[530px] lg:w-[30%] flex flex-col mx-auto  gap-5 ">
      <div className="w-full   flex  mx-auto ">
        <Button
          variant={"outline"}
          className="text-2xl md:text-3xl w-[10%] font-mono p-5 shadow-lg border cursor-pointer "
          onClick={() => {
            props.setOpen(true);
            resetGame();
          }}
        >
          <Settings />
        </Button>
        <Button
          variant={"ghost"}
          className="text-2xl md:text-3xl w-[60%] font-mono p-5 shadow-lg border "
        >
          Tic Tac Toe .
        </Button>
        <Button
          className="text-2xl md:text-3xl w-[10%] cursor-pointer  font-semibold p-5 shadow-lg border "
          onClick={resetGame}
        >
          <RotateCcw size={30} />
        </Button>
        <Button
          className="text-2xl gap-0 items-center justify-center flex md:text-3xl w-[20%]  font-mono p-5 shadow-lg border "
          variant={"secondary"}
        >
          <SlidingNumber value={timeLeft} />
        </Button>
      </div>
      <div className=" w-full mt-10 md:mt-0 relative mx-auto  grid grid-cols-3 shadow-sm dark:bg-muted-foreground/5 ">
        <div className="w-full h-10 md:w-10 md:h-full grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 left-0 -top-10 md:-left-10 md:top-0  border absolute">
          <div className="col-span-1 md:row-span-1 flex items-center justify-center bg-primary text-2xl md:text-3xl font-mono">
            <div className="flex flex-row md:flex-col items-center justify-center gap-1">
              <p>X</p>
              <Separator className=" hidden md:block" />
              <p className=" md:hidden"> | </p>
              <p>{score.X}</p>
            </div>
          </div>
          <div className="col-span-1 md:row-span-1 flex items-center justify-center bg-accent shadow-sm md:shadow-none text-2xl md:text-3xl font-mono">
            <div className="flex flex-row md:flex-col items-center justify-center gap-1">
              <p>O</p>
              <Separator className=" hidden  md:block " />
              <p className=" md:hidden"> | </p>
              <p>{score.O}</p>
            </div>
          </div>
        </div>
        {board.map((cell, i) => {
          return (
            <Cell
              key={i}
              id={i}
              content={cell}
              onClick={handleCellClick}
              isWinningCell={winningCells.includes(i)}
            />
          );
        })}
      </div>
      <h1
        className={cn(
          " font-mono  shadow-lg border   text-2xl md:text-3xl",
          currentPlayer === "X" ? "bg-primary" : "bg-accent"
        )}
      >
        {gameOver ? res : `Player ${currentPlayer}'s Turn`}
      </h1>
    </main>
  );
}

function Cell(props: PropsCell) {
  const { id, content, isWinningCell, onClick } = props;

  return (
    <div
      className={` 
        col-span-1 w-full h-full aspect-square duration-200 transition-all cursor-pointer 
        border border-border flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-mono
        hover:bg-muted/50 active:scale-95  
        ${isWinningCell ? "bg-green-100 dark:bg-green-900/30" : ""}
        ${content ? "cursor-default" : "hover:scale-105"}
      `}
      onClick={() => onClick(id)}
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          rotate: isWinningCell ? 360 : 0,
          transition: { duration: 1 },
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={` 
          ${content === "O" ? "text-blue-600 dark:text-blue-400" : ""}
          ${content === "X" ? "text-red-600 dark:text-red-400" : ""}
        `}
      >
        {content}
      </motion.span>
    </div>
  );
}
