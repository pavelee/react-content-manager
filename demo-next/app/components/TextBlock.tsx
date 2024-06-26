const fetchRandomCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  const data = await response.json();
  return data.fact;
}

const TextBlock = async () => {

  const catFact = await fetchRandomCatFact();

  // const catFact = 'Cats are cute!'

  return (
    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      Get started by editing&nbsp;
      <code className="font-mono font-bold">
        {catFact}
      </code>
    </p>
  );
};

export default TextBlock;
