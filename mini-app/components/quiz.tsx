'use client';

import { useState } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const questions = [
  {
    question: "What is your favorite color?",
    options: [
      { text: "Red", princess: "Aurora" },
      { text: "Blue", princess: "Jasmine" },
      { text: "Pink", princess: "Anna" },
      { text: "Yellow", princess: "Belle" },
      { text: "Green", princess: "Cinderella" },
    ],
  },
  {
    question: "Which trait describes you best?",
    options: [
      { text: "Brave", princess: "Anna" },
      { text: "Kind", princess: "Belle" },
      { text: "Graceful", princess: "Cinderella" },
      { text: "Curious", princess: "Aurora" },
      { text: "Adventurous", princess: "Jasmine" },
    ],
  },
  {
    question: "What is your favorite activity?",
    options: [
      { text: "Exploring", princess: "Jasmine" },
      { text: "Reading", princess: "Belle" },
      { text: "Dancing", princess: "Cinderella" },
      { text: "Singing", princess: "Aurora" },
      { text: "Helping others", princess: "Anna" },
    ],
  },
  {
    question: "Which setting do you prefer?",
    options: [
      { text: "A royal palace", princess: "Aurora" },
      { text: "A desert oasis", princess: "Jasmine" },
      { text: "A forest", princess: "Anna" },
      { text: "A cozy cottage", princess: "Belle" },
      { text: "A grand ballroom", princess: "Cinderella" },
    ],
  },
  {
    question: "What is your favorite dessert?",
    options: [
      { text: "Ice cream", princess: "Anna" },
      { text: "Chocolate cake", princess: "Cinderella" },
      { text: "Fruit tart", princess: "Belle" },
      { text: "Coconut milkshake", princess: "Jasmine" },
      { text: "Royal pastries", princess: "Aurora" },
    ],
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (princess: string) => {
    const newAnswers = [...answers, princess];
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const counts: Record<string, number> = {};
      newAnswers.forEach((p) => {
        counts[p] = (counts[p] || 0) + 1;
      });
      const maxPrincess = Object.entries(counts).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0];
      setResult(maxPrincess);
    }
  };

  if (result) {
    const imageSrc = `/${result.toLowerCase()}.png`;
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold">
          You are most similar to {result}!
        </h2>
        <img
          src={imageSrc}
          alt={result}
          width={200}
          height={200}
          className="rounded-full"
        />
        <Share
          text={`I am most similar to ${result}! Check out the Disney Princess Quiz: ${url}`}
          className="mt-4"
        />
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-medium">{q.question}</h3>
      <div className="flex flex-col gap-2">
        {q.options.map((opt) => (
          <button
            key={opt.text}
            onClick={() => handleAnswer(opt.princess)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
