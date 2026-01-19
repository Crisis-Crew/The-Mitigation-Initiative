import { auth } from "@/auth";
import FireCourse from "@/components/fire-course";
import { unauthorized } from "next/navigation";
export default async function FireCoursePage({
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
      <FireCourse userId={session?.user?.id} />
    </>
  );
}
