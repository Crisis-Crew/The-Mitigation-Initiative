"use client";
import kaplay from "kaplay";
import { useEffect, useRef } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";
import { User } from "next-auth";
import makeFlood from "@/levels/flood/main";
import levelOne from "@/levels/flood/levelone";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { Kbd } from "@/components/ui/kbd";

export default function FloodGame({ user }: { user: User | undefined }) {
  const gameContainerRef = useRef<HTMLCanvasElement>(null);
  const certificateContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (gameContainerRef.current) {
      const k = kaplay({
        canvas: gameContainerRef.current,
        width: 1280,
        height: 720,
        letterbox: true,
        global: false,
        scale: 2,
      });

      k.loadSprite("Flood Background", "/assets/backgrounds/flood.png");
      k.loadSprite("Player", "/assets/sprites/player_spritesheet.png", {
        sliceY: 1,
        sliceX: 18,
        anims: {
          idle: {
            from: 0,
            to: 3,
            loop: true,
            speed: 6,
          },
          jump: {
            from: 4,
            to: 11,
          },
          run: {
            from: 12,
            to: 17,
            loop: true,
            speed: 6,
          },
        },
      });
      k.loadSprite("Scaffold", "/assets/sprites/scaffold.png");
      k.loadSprite("Flood Water", "/assets/backgrounds/flood_water.png");
      k.loadSprite("Ladder", "/assets/sprites/ladder.png");
      k.loadSprite("Start", "/assets/sprites/start.png");
      k.loadSprite("Restart", "/assets/sprites/restart.png");
      k.loadSprite("Flag", "/assets/sprites/flag.png");
      k.loadSprite("Win Screen", "/assets/backgrounds/win.jpg");
      k.loadSprite("Exit", "/assets/sprites/Icon_35.png");
      k.loadSprite("Share", "/assets/sprites/share.svg");
      k.loadFont("doto", "/assets/fonts/doto-800.woff2");
      k.loadFont("orbitron", "/assets/fonts/orbitron.woff2");
      k.onLoad(() => {
        toast(
          <div className="flex justify-center items-center w-full">
            <p className="text-center text-xs text-muted-foreground">
              Press <Kbd>F11</Kbd> to enter full screen
            </p>
          </div>,
          {
            position: "top-center",
            duration: 5000,
          },
        );
        k.scene("main", async () => {
          makeFlood(k);
        });
        k.scene("Level I", async () => {
          levelOne(k, certificateContainerRef);
        });

        k.go("main");
      });
    }
  }, []);
  return (
    <>
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        ref={certificateContainerRef}
      >
        <div
          className="w-7xl h-180 place-content-center border-8 border-emerald-600 bg-background py-[32px] bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/waves.svg'), url('/pattern.svg')",
          }}
        >
          <div className="flex flex-col justify-center items-center gap-2 w-full h-full text-center">
            <div className="flex flex-col justify-center items-center gap-4 w-full h-full text-center">
              <div className="relative">
                <Image
                  src={"/logo.png"}
                  preload
                  width={128}
                  height={128}
                  alt="Logo"
                />
              </div>

              <h3 className="text-emerald-600 text-shadow-2xs text-shadow-foreground text-[36px] font-extrabold font-gravitas-one!">
                Certificate of Completion
              </h3>
              <p className="text-lg text-foreground max-w-[900px]">
                This is to certify that <br />
                <span className="text-emerald-600 underline font-bold text-[28px]">
                  {user?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {" "}
                  ( {user?.email} ){" "}
                </span>{" "}
                <br /> has completed the disaster prepardness course by{" "}
                <span className="text-emerald-600 underline">
                  The Mitigation Initiative
                </span>{" "}
                on{" "}
                <span className="text-emerald-600 underline">
                  {formatDate(Date())}
                </span>
              </p>
              <div className="flex flex-col justify-center items-center gap-2 max-w-[896px]">
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <div className="size-[32px] aspect-square relative">
                    <Image src={"/google.svg"} fill preload alt="" />
                  </div>
                  <div className="size-[32px] aspect-square relative">
                    <Image src={"/auth.png"} fill preload alt="" />
                  </div>
                  <div className="size-[32px] aspect-square relative">
                    <Image src={"/next.svg"} fill preload alt="" />
                  </div>
                  <div className="size-[32px] aspect-square relative">
                    <Image src={"/typescript.svg"} fill preload alt="" />
                  </div>
                  <div className="size-[32px] aspect-square relative">
                    <Image src={"/react.svg"} fill preload alt="" />
                  </div>
                  <div className="size-[32px] aspect-square relative">
                    <Image src={"/tailwind.svg"} fill preload alt="" />
                  </div>
                  <div className="h-[32px] w-[96px] relative">
                    <Image src={"/kaplay.png"} fill preload alt="" />
                  </div>
                  <div className="size-[32px] aspect-square relative">
                    <Image src={"/shadcn.png"} fill preload alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full px-[32px]">
              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-xs text-muted-foreground">
                  Try it out yourself
                </p>
                <QRCode
                  value={`${process.env.NEXT_PUBLIC_BASE_URL}`}
                  size={96}
                  className="border border-emerald-600"
                />
                <p className="text-xs text-muted-foreground">
                  {`${process.env.NEXT_PUBLIC_BASE_URL}`}
                </p>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-sm text-muted-foreground">Nikunj Chauhan</p>
                <h6 className="text-md font-semibold text-foreground border-t-2 border-muted-foreground">
                  Lead Developer
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen h-screen">
        <canvas ref={gameContainerRef} />
      </div>
    </>
  );
}
