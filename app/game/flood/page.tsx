import { auth } from "@/auth";
import FloodClient from "@/games/flood";
import { unauthorized } from "next/navigation";
export default async function Flood({
  searchParams,
}: {
  searchParams: Promise<{
    id: string | undefined;
  }>;
}) {
  const session = await auth();
  if (!session) unauthorized();

  const id = (await searchParams)?.id;
  if (id != session.user.id) return unauthorized();
  
  return (
    <>
      <FloodClient user={session?.user} />
    </>
  );
}
