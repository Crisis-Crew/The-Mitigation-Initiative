import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <>
      <section className="section pt-32!">
        <div className="min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row justify-between items-center">
          <div className="w-full">
            <div className="flex flex-col justify-center items-start gap-4">
              <h1 className="text-4xl font-extrabold">Oops ...</h1>
              <h2 className="text-3xl font-light font-geist-mono">
                Page not found
              </h2>
              <p className="text-2xl text-muted-foreground">
                The page you are looking is either not available or cannot be
                found, go back to the home page
              </p>
              <Link href={"/"}>
                <Button className="text-xl" style={{
                    backgroundColor : "#C6FF00"
                }}>Go back</Button>
              </Link>
            </div>
          </div>
          <div className="w-full aspect-square relative">
            <Image src={"/403.svg"} fill preload alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
