import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Home } from "lucide-react";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  return (
    <>
      <header className="absolute w-full lg:px-32 px-8 pt-8 z-10">
        <div className="flex justify-between items-center">
          <Badge variant={"secondary"} className="pl-0 pr-4">
            <div className="flex flex-wrap justify-start items-center">
              <div className="w-18 aspect-square rounded-full relative">
                <Image src={"/logo.png"} fill preload alt="Logo" />
              </div>
              <div className="flex-col justify-center items-start gap-auto hidden lg:flex">
                <h3 className="text-xs font-bold text-emerald-500 dark:text-emerald-600">
                  The Mitigation Initiative
                </h3>
                <h3 className="text-xs text-muted-foreground">
                  Disaster Prepardness
                </h3>
              </div>
            </div>
          </Badge>

          <div className="flex justify-center items-center gap-2">
            <Link href={"/"} className="text-muted-foreground">
              <Button variant={"secondary"} className="px-4 py-2 rounded-full text-sm font-bold">
                <Home /> Home
              </Button>
            </Link>
            <Suspense fallback={<Spinner />}>
              {!session ? (
                <form
                  action={async () => {
                    "use server";
                    await signIn();
                  }}
                >
                  <Button
                    type="submit"
                    className="rounded-none text-sm font-semibold"
                  >
                    Register
                  </Button>
                </form>
              ) : (
                <HoverCard>
                  <HoverCardTrigger>
                    <Avatar className="border-2 border-emerald-500 dark:border-emerald-600">
                      <AvatarImage src={`${session.user?.image}`} />
                      <AvatarFallback>
                        {`${session.user?.name?.split(" ")[0][0]} ${session.user?.name?.split(" ")[1][0]}`}
                      </AvatarFallback>
                    </Avatar>
                  </HoverCardTrigger>
                  <HoverCardContent align="end">
                    <div className="border-b border-muted p-2 relative">
                      <Badge
                        variant={"secondary"}
                        className="p-2 w-full flex items-center justify-between gap-2"
                      >
                        <div className="w-6 aspect-square relative">
                          <Image
                            src={"/google.svg"}
                            fill
                            preload
                            alt="google"
                          />
                        </div>
                        <div className="w-full">
                          <p className="text-xs text-wrap text-muted-foreground">
                            Continue as <br />
                            {session.user?.email}
                          </p>
                        </div>
                      </Badge>
                      <div className="absolute bottom-0 translate-y-1/2 left-0 w-full flex justify-center">
                        <p className="text-xs text-muted-foreground">or</p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <form
                        action={async () => {
                          "use server";
                          await signOut();
                        }}
                      >
                        <Button
                          type="submit"
                          variant={"link"}
                          className="text-xs"
                        >
                          Sign out
                        </Button>
                      </form>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              )}
            </Suspense>
          </div>
        </div>
      </header>
    </>
  );
}
