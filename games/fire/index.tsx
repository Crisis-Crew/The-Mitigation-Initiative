"use client";
import FireGame from "@/components/fire-game";
import { User } from "next-auth";
export default function FireClient({ user }: { user: User | undefined }) {
  return (
    <>
      <FireGame user={user} />
    </>
  );
}
