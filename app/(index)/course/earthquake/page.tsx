import { auth } from "@/auth";
import EarthquakeCourse from "@/components/earthquake-course";
import { unauthorized } from "next/navigation";
export default async function EarthquakeCoursePage({
  searchParams,
}: {
  searchParams: Promise<{
    id: string | undefined;
  }>;
}) {
  const session = await auth();
  if (!session) return unauthorized();

  const id = (await searchParams)?.id;
  if (id != session.user?.id) return unauthorized();

  return (
    <>
      <EarthquakeCourse userId={session?.user?.id} />
    </>
  );
}
