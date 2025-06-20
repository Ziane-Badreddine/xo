"use client";

import { Id } from "@/convex/_generated/dataModel";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MessageCircle, Send } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useMutationState } from "@/hook/useMutationState";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  gameId: Id<"games">;
};

export default function Chat(props: Props) {
  const messages = useQuery(api.messages.getMessages, { gameId: props.gameId });
  const { mutate: sendMessage, pending } = useMutationState(
    api.messages.sendMessage
  );
  const [input, setInput] = useState<string>("");
  const { user } = useUser();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesEndRefMobile = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    try {
      const messageId = await sendMessage({
        gameId: props.gameId,
        clerkId: user?.id,
        content: input,
      });
    } catch (err) {
      toast.error(String(err));
    } finally {
      setInput("");
    }
  };

  const scrollToBottomWithIntoView = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    if (messagesEndRefMobile.current) {
      messagesEndRefMobile.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    scrollToBottomWithIntoView();
  }, [messages]);

  return (
    <>
      <div className="hidden md:flex flex-col justify-between h-full overflow-hidden rounded-xl border border-l-4 border-l-primary dark:border-l-accent shadow-sm dark:bg-muted-foreground/5 p-2">
        {/* Container des messages avec ref pour contrôle du scroll */}
        <div className="flex-1 overflow-y-auto space-y-2 scroll-smooth">
          {!messages ? (
            <Loader2 className="animate-spin" />
          ) : messages?.length === 0 ? (
            <div className="w-full my-auto flex items-center justify-center">
              send first message
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {messages.map((message) => {
                const isMe = user?.id === message.player?.clerkId;
                return (
                  <div
                    key={message._id}
                    className={cn(
                      "flex w-full flex-col space-y-1",
                      isMe ? "items-end" : "items-start"
                    )}
                  >
                    <Badge variant="outline" className="text-xs px-1">
                      {isMe ? "You" : message.player?.username || "Unknown"}
                    </Badge>
                    <div
                      className={cn(
                        isMe
                          ? "bg-primary  rounded-tl-xl rounded-bl-xl"
                          : "bg-accent text-foreground rounded-tr-xl rounded-br-xl",
                        "px-4 py-2 text-sm w-[75%] break-words shadow-md relative"
                      )}
                    >
                      <p className="font-mono w-[90%]">{message.content}</p>
                      <span className="text-[10px] text-muted-foreground px-1 absolute bottom-1 right-1">
                        {new Date(message._creationTime).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} className="h-1" />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="w-full flex items-center gap-2 pt-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="send message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} disabled={!input || pending}>
            <Send />
          </Button>
        </div>
      </div>

      {/* Version mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button  className="fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg md:hidden">
            <MessageCircle />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="w-full h-full flex flex-col items-center justify-between gap-2 px-2 py-5"
        >
          <SheetHeader className="self-start  w-full ">
            <SheetTitle>Chat</SheetTitle>
          </SheetHeader>

          {/* Messages pour mobile */}
          <div className="flex-1 w-full overflow-y-auto space-y-2">
            {!messages ? (
              <Loader2 className="animate-spin" />
            ) : messages?.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                send first message
              </div>
            ) : (
              <div className="space-y-2 p-2">
                {messages.map((message) => {
                  const isMe = user?.id === message.player?.clerkId;
                  return (
                    <div
                      key={message._id}
                      className={cn(
                        "flex w-full flex-col space-y-1",
                        isMe ? "items-end" : "items-start"
                      )}
                    >
                      <Badge variant="outline" className="text-xs px-1">
                        {isMe ? "You" : message.player?.username || "Unknown"}
                      </Badge>
                      <div
                        className={cn(
                          isMe
                            ? "bg-primary text-white rounded-tl-xl rounded-bl-xl"
                            : "bg-accent text-foreground rounded-tr-xl rounded-br-xl",
                          "px-4 py-2 text-sm w-[75%] break-words shadow-md relative"
                        )}
                      >
                        <p className="font-mono w-[90%]">{message.content}</p>
                        <span className="text-[10px] text-muted-foreground px-1 absolute bottom-1 right-1">
                          {new Date(message._creationTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRefMobile} className="h-1" />
              </div>
            )}
          </div>

          <div className="w-full flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="send message..."
            />
            <Button onClick={handleSendMessage} disabled={!input || pending}>
              <Send />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
