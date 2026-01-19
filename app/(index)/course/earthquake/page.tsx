import { auth } from "@/auth";
import EarthquakeCourse from "@/components/earthquake-course";
import { unauthorized } from "next/navigation";
export default async function EarthquakeCoursePage() {
  const session = await auth();
  if (!session) return unauthorized();
  return (
    <>
      <EarthquakeCourse userId={session?.user?.id}/>
    </>
  );
}
