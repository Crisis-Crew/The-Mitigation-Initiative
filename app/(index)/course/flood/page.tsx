import { auth } from "@/auth";
import FloodCourse from "@/components/flood-course";
import { unauthorized } from "next/navigation";
export default async function FloodCoursePage() {
  const session = await auth();
  if(!session) return unauthorized();
  return (
    <>
      <FloodCourse  userId={session?.user.id}/>
    </>
  );
}
