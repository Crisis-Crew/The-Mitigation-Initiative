"use client";
import EarthquakeGame from "@/components/earthquake-game";
import { User } from "next-auth";
export default function EarthquakeClient({ user }: { user: User | undefined }) {
  return (
    <>
      <EarthquakeGame user={user} />
    </>
  );
}
