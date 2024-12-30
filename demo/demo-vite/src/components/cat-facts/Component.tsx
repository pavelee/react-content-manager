"use client";

import { useEffect, useState } from "react";

const fetchRandomCatFact = async () => {
  const response = await fetch("https://catfact.ninja/fact");
  const data = await response.json();
  return data.fact;
};

const fetchListOfRandomCatFacts = async (limit: number = 2) => {
  const facts = [];
  for (let i = 0; i < limit; i++) {
    facts.push(await fetchRandomCatFact());
  }
  return facts;
};

export type TextBlockProps = {
  limit?: number;
};

const Component = (props: TextBlockProps) => {
  const { limit } = props;
  const [catFacts, setCatFacts] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const f = await fetchListOfRandomCatFacts(limit);
      setCatFacts(f);
    };
    fetchData();
  }, []);

  // const catFact = 'Cats are cute!'

  return (
    <div className="bg-white p-4 rounded-xl">
      <ul className="list-disc list-inside">
        {catFacts.map((fact, index) => (
          <li className="font-mono font-bold" key={index}>
            {fact}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Component;
