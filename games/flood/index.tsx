"use client";
import FloodGame from "@/components/flood-game";
import { User } from "next-auth";
export default function FloodClient({ user }: { user: User | undefined }) {
  return (
    <>
      <FloodGame user={user} />
    </>
  );
}
