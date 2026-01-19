"use client";

import { earthquakeCourse } from "@/lib/earthquake-course";

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
export default function EarthquakeCourse({
  userId,
}: {
  userId: string | undefined;
}) {
  const questions = earthquakeCourse.map((item) => item.question);
  const real_answers = earthquakeCourse.map((item) => item.answer);
  const [answers, setAnswers] = useState(
    Array.from({ length: earthquakeCourse.length }),
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
          <Link href={`/game/earthquake/?id=${userId}`}>
            <DialogHeader className="aspect-video relative">
              <Image
                src={"/assets/backgrounds/earthquake.png"}
                fill
                preload
                alt=""
              />
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
          backgroundImage: "url(/assets/backgrounds/earthquake.png)",
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
              Earthquake Safety Quiz
            </h1>

            <div className="h-1 w-full bg-emerald-500 rounded-full" />

            <p className="text-sm leading-tight text-muted-foreground max-w-2xl">
              An earthquake is a sudden shaking of the ground caused by
              movements within the Earth’s crust. These movements release energy
              that can damage buildings, roads, and infrastructure, often
              without warning.
              <br />
              <br />
              This quiz tests your understanding of essential earthquake safety
              measures — what actions to take during shaking, how to protect
              yourself indoors and outdoors, and what precautions to follow
              after the shaking stops — helping you stay alert, act safely, and
              reduce the risk of injury during an earthquake.
            </p>
          </div>
        </div>
      </section>

      <section className="section py-16 pattern">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {earthquakeCourse.map((item, idx) => (
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
                      className="border-foreground"
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
