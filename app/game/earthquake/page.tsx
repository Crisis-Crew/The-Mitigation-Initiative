import { auth } from "@/auth";
import EarthquakeClient from "@/games/earthquake";
import { unauthorized } from "next/navigation";


export default async function Earthquake({
  searchParams,
}: {
  searchParams: Promise<{
    id: string | undefined;
  }>;
}) {

  const session = await auth();
  if (!session) return unauthorized();

  const id = (await searchParams)?.id;
  if(session.user.id != id) return unauthorized();
  
  return (
    <>
      <EarthquakeClient user={session?.user} />
    </>
  );
}
