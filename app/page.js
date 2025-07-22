"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      Hello World : {count}
      <Button
        onClick={() => setCount(count + 1)}
        className="w-fit"
        variant={"ghost"}
      >
        Click
      </Button>
    </div>
  );
}
