import { auth } from "@/auth"
import FireCourse from "@/components/fire-course"
import { unauthorized } from "next/navigation";
export default async function FireCoursePage() {
  const session = await auth();
  if (!session) return unauthorized();

  return (
    <>
      <FireCourse userId={session?.user?.id}/>
    </>
  )
}
