"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { keywords, features, technologies } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Link as ScrollLink, Element } from "react-scroll";
import Autoplay from "embla-carousel-autoplay";
import { User } from "next-auth";
import { Spinner } from "./ui/spinner";
import { Suspense } from "react";

export default function Home({ user }: { user: User | null }) {
  return (
    <>
      <section
        className="section pt-32! min-h-screen bg-conatin bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/circle-scatter.svg')",
        }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col justify-center items-start gap-4 w-full">
            <h1 className="text-4xl font-extrabold">
              The <br />
              <span className="text-emerald-500">Mitigation Initiative</span>
            </h1>
            <p className="text-sm font-semibold">
              Skill up for the unexpected. Our interactive courses turn disaster
              preparedness into a life-saving habit. From emergency basics to
              advanced survival strategies, we give you the knowledge to protect
              what matters most.
            </p>
            <div className="flex flex-wrap justify-start items-center gap-2 *:even:bg-emerald-600 *:odd:bg-emerald-500">
              {keywords.map((keyword) => {
                return (
                  <Badge
                    key={keyword}
                    className="text-xs"
                    variant={"secondary"}
                  >
                    {keyword}
                  </Badge>
                );
              })}
            </div>
            <div>
              <Suspense fallback={<Spinner />}>
                <ScrollLink
                  to={!user ? "" : "courses"}
                  smooth={true}
                  duration={150}
                >
                  <Button className="rounded-none text-xs font-extrabold group" disabled={!user}>
                    Start Now{" "}
                    <ChevronRight
                      className="group-hover:animate-pulse"
                      strokeWidth={6}
                    />
                  </Button>
                </ScrollLink>
              </Suspense>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-2 w-full relative aspect-video">
            <Image src={"/hero.png"} fill preload alt="Hero Image" />
          </div>
        </div>
      </section>
      <section className="section py-8! bg-accent text-center">
        <h2 className="mb-4 text-xl font-extrabold">Frameworks</h2>
        <div className="flex flex-wrap w-full justify-center items-center gap-8">
          {technologies.map((technology) => {
            return (
              <div
                className="flex flex-col justify-center items-center gap-0.5 min-w-25 max-w-30 group"
                key={technology.title}
              >
                <div className="size-8 aspect-square relative group-hover:animate-pulse">
                  <Image src={`${technology.src}`} fill preload alt="" />
                </div>
                <p className="text-muted-foreground text-xs text-wrap group-hover:animate-pulse">
                  {technology.title}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section py-8! flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col justify-center items-center gap-2">
          <h3 className="text-4xl font-extrabold">Features</h3>
          <p className="text-center text-xs max-w-4xl text-muted-foreground">
            Our platform combines structured learning, interactive gameplay, and
            practical assessments to create an engaging and effective learning
            experience. Each course is carefully designed to guide you step by
            step, helping you understand essential safety concepts while
            applying them in real-world scenarios. Through games, quizzes, and
            certifications, you don’t just learn — you practice, test, and prove
            your knowledge.
          </p>
        </div>

        <Carousel
          className="max-w-60 md:max-w-full"
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {features.map((feature) => {
              return (
                <CarouselItem key={feature.title} className="md:basis-1/2">
                  <Card className="rounded-none h-full">
                    <CardHeader>
                      <div className="relative aspect-video w-full">
                        <Image
                          src={`${feature.thumbnail}`}
                          fill
                          preload
                          alt=""
                        />
                      </div>
                      <CardTitle className="text-2xl font-bold text-emerald-600 stroke-2 stroke-foreground">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs leading-relaxed max-w-lg text-muted-foreground">
                      {feature.content}
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <Element name="courses">
        <section className="section relative">
          <div className="absolute h-2/3 w-full top-0 left-0 bg-accent -z-1" />
          <div className="flex flex-col justify-center items-center gap-8">
            <div className="flex flex-col justify-center items-center gap-2">
              <h4 className="text-4xl font-extrabold">Courses</h4>
              <p className="text-center text-xs text-muted-foreground max-w-5xl">
                Explore a growing collection of disaster preparedness courses
                designed to teach essential safety skills in a clear and
                engaging way. Each course focuses on real-world scenarios,
                guiding you through what to do before, during, and after
                emergencies. With interactive lessons, hands-on games, and short
                assessments, our courses help you build confidence, improve
                awareness, and stay prepared when it matters most.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
              <Link href={`/course/flood/?id=${user?.id}`}>
                <Card className="hover:border-emerald-600 group h-full">
                  <CardHeader>
                    <div className="w-full aspect-video relative">
                      <Image
                        src={"/assets/backgrounds/flood.png"}
                        fill
                        preload
                        alt=""
                      />
                    </div>
                    <CardTitle className="text-emerald-600 font-extrabold text-xl font-doto">
                      Flood Prepardness
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      Learn how to respond quickly and safely during flood
                      situations. This course covers essential precautions,
                      evacuation steps, and post-flood safety measures to help
                      you reduce risk and protect yourself and others.
                    </p>
                  </CardContent>

                  <CardFooter>
                    <div className="group-hover:border-b border-emerald-600 text-xs text-emerald-600 font-semibold flex justify-start gap-2 items-center">
                      View More{" "}
                      <ChevronRight
                        size={12}
                        strokeWidth={6}
                        className="group-hover:animate-pulse"
                      />
                    </div>
                  </CardFooter>
                </Card>
              </Link>

              <Link href={`/course/earthquake/?id=${user?.id}`}>
                <Card className="hover:border-emerald-600 group h-full">
                  <CardHeader>
                    <div className="w-full aspect-video relative">
                      <Image
                        src={"/assets/backgrounds/earthquake.png"}
                        fill
                        preload
                        alt=""
                      />
                    </div>
                    <CardTitle className="text-emerald-600 font-extrabold text-xl font-doto">
                      Earthquake Prepardness
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      Understand how to act during fire emergencies with
                      confidence. Learn safe evacuation techniques, how to avoid
                      smoke and hazards, and the correct steps to take after
                      escaping a fire.
                    </p>
                  </CardContent>

                  <CardFooter>
                    <div className="group-hover:border-b border-emerald-600 text-xs text-emerald-600 font-semibold flex justify-start gap-2 items-center">
                      View More{" "}
                      <ChevronRight
                        size={12}
                        strokeWidth={6}
                        className="group-hover:animate-pulse"
                      />
                    </div>
                  </CardFooter>
                </Card>
              </Link>

              <Link href={`/course/fire/?id=${user?.id}`}>
                <Card className="hover:border-emerald-600 group h-full">
                  <CardHeader>
                    <div className="w-full aspect-video relative">
                      <Image
                        src={"/assets/backgrounds/fire.png"}
                        fill
                        preload
                        alt=""
                      />
                    </div>
                    <CardTitle className="text-emerald-600 font-extrabold text-xl font-doto">
                      Fire Prepardness
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      Understand how to act during fire emergencies with
                      confidence. Learn safe evacuation techniques, how to avoid
                      smoke and hazards, and the correct steps to take after
                      escaping a fire.
                    </p>
                  </CardContent>

                  <CardFooter>
                    <div className="group-hover:border-b border-emerald-600 text-xs text-emerald-600 font-semibold flex justify-start gap-2 items-center">
                      View More{" "}
                      <ChevronRight
                        size={12}
                        strokeWidth={6}
                        className="group-hover:animate-pulse"
                      />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </Element>
    </>
  );
}
