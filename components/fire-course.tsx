"use client";

import { fireCourse } from "@/lib/fire-course";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export const description = "A donut chart";
export default function FireCourse({ userId }: { userId: string | undefined }) {
  const questions = fireCourse.map((item) => item.question);
  const real_answers = fireCourse.map((item) => item.answer);
  const [answers, setAnswers] = useState(
    Array.from({ length: fireCourse.length }),
  );
  const chartData = [
    {
      answer: "correct",
      count: answers.filter((a, idx) => a == real_answers[idx]).length,
      fill: "var(--color-correct)",
    },
    {
      answer: "incorrect",
      count: answers.filter(
        (a, idx) => a != real_answers[idx] && a != undefined,
      ).length,
      fill: "var(--color-incorrect)",
    },
    {
      answer: "unattempted",
      count: answers.filter((a, idx) => a == undefined).length,
      fill: "var(--color-unattempted)",
    },
  ];

  const chartConfig = {
    count: {
      label: "Count",
    },
    correct: {
      label: "Correct ",
      color: "var(--color-emerald-600)",
    },
    incorrect: {
      label: "Incorrect ",
      color: "var(--color-red-300)",
    },
    unattempted: {
      label: "Unattempted ",
      color: "var(--color-accent)",
    },
  } satisfies ChartConfig;
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <Dialog open={submitted} onOpenChange={setSubmitted}>
        <DialogContent className="min-w-75 max-w-80 max-h-120 overflow-scroll">
          <DialogTitle className="text-xl font-extrabold">
            <div>Result</div>
          </DialogTitle>
          <Link href={`/game/fire/?id=${userId}`}>
            <DialogHeader className="aspect-video relative">
              <Image src={"/assets/backgrounds/fire.png"} fill preload alt="" />
              <Button
                variant={"secondary"}
                className="absolute z-10 font-doto font-extrabold top-1/2 left-1/2 -translate-1/2"
              >
                Play
              </Button>
            </DialogHeader>
          </Link>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-80"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="answer"
                innerRadius={60}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="answer" />}
                className="-translate-y-2 flex-wrap gap-4 *:basis-1/4 *:justify-center *:items-center *:text-xs *:text-muted-foreground"
              />
            </PieChart>
          </ChartContainer>
          {answers.map((answer, idx) => {
            return (
              <div
                key={idx}
                className={`border ${answer == real_answers[idx] ? "bg-emerald-200 text-background border-emerald-600" : answer != undefined ? "bg-red-200 text-background border-red-500" : "bg-accent border-accent-foreground"} text-xs px-4 py-2 rounded-md min-h-12 flex flex-col justify-center items-start gap-2`}
              >
                Q. {questions[idx]}
                {answer ? (
                  <Badge
                    variant={"outline"}
                    className={`${answer == real_answers[idx] ? "bg-emerald-200 text-emerald-600 border-emerald-600" : "bg-red-200 text-red-500 border-red-500"}`}
                  >
                    <p>Your answer : {`${answer}`}</p>
                  </Badge>
                ) : null}
                <Badge
                  variant={"outline"}
                  className="bg-emerald-200 text-emerald-600 border-emerald-600"
                >
                  <p>Correct answer : {`${real_answers[idx]}`}</p>
                </Badge>
              </div>
            );
          })}
        </DialogContent>
      </Dialog>
      <section
        className="section pt-32! pb-8! flex justify-center bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/backgrounds/fire.png)",
        }}
      >
        <div
          className="relative w-full max-w-6xl overflow-hidden border bg-card shadow-xl bg-end bg-contain bg-no-repeat"
          style={{
            backgroundImage: "url('/quiz-scatter.svg')",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
          <div className="relative z-10 p-6 lg:p-12 space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight font-gravitas-one">
              Fire Safety Quiz
            </h1>

            <div className="h-1 w-full bg-emerald-500 rounded-full" />

            <p className="text-sm leading-tight text-muted-foreground max-w-2xl">
              A fire is a dangerous emergency that occurs when flames spread
              uncontrollably, often caused by electrical faults, gas leaks,
              flammable materials, or human negligence. Fires can spread rapidly
              and produce toxic smoke, posing serious risks to life and
              property.
              <br />
              <br />
              This quiz tests your understanding of essential fire safety
              measures — what to do when a fire breaks out, how to evacuate
              safely, avoid smoke inhalation, and respond correctly after
              escaping — helping you stay calm, act quickly, and reduce harm
              during fire emergencies.
            </p>
          </div>
        </div>
      </section>

      <section className="section pattern py-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {fireCourse.map((item, idx) => (
            <div
              key={idx}
              className="border bg-card p-6 shadow-sm hover:shadow-md transition-shadow bg-linear-to-b from-accent to-transparent"
            >
              <p className="text-lg font-bold mb-4">
                Q{idx + 1}. {item.question}
              </p>
              <div className="flex justify-end items-center">
                <Button
                  onClick={() => {
                    setAnswers((prev) => {
                      const copy = [...prev];
                      copy[idx] = undefined;
                      return copy;
                    });
                  }}
                  variant={"link"}
                  className="text-xs text-muted-foreground"
                >
                  Clear answer
                </Button>
              </div>
              <RadioGroup
                className="grid gap-3"
                onValueChange={(value) => {
                  setAnswers((prev) => {
                    const copy = [...prev];
                    copy[idx] = value;
                    return copy;
                  });
                }}
                value={`${answers[idx]}` || ""}
              >
                {item.options.map((option, optionIdx) => (
                  <label
                    key={optionIdx}
                    htmlFor={`${option}-${idx}`}
                    className="flex items-center gap-3 border px-4 py-3 cursor-pointer hover:bg-muted transition"
                  >
                    <RadioGroupItem
                      value={option}
                      id={`${option}-${idx}`}
                      className="border-foreground data-[state=checked]:bg-blue-500!"
                    />

                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          ))}

          <div className="flex justify-center pt-6">
            <Button
              size="lg"
              className="px-10 text-base font-semibold rounded-none"
              disabled={answers.every((a) => a === undefined)}
              onClick={() => setSubmitted(true)}
            >
              Submit
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
