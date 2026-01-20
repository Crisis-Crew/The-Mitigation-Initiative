import { auth } from "@/auth"
import FireClient from "@/games/fire";
import { unauthorized } from "next/navigation"

export default async function Fire({searchParams} : {
  searchParams : Promise<{
    id : string | undefined
  }>
}){

  const session = await auth()
  if (!session) return unauthorized();

  const id = (await searchParams)?.id
  if(session.user.id != id) return unauthorized(); 
  return (
    <>
      <FireClient user={session?.user}/>
    </>
  )
}