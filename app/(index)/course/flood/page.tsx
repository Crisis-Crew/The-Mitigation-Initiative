import { auth } from "@/auth";
import FloodCourse from "@/components/flood-course";
import { unauthorized } from "next/navigation";
export default async function FloodCoursePage({
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
      <FloodCourse userId={session?.user.id} />
    </>
  );
}
