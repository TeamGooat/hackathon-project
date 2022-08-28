const mockTitle = "I don't know what to do :( Can you please help me?";
const mockQuestion =
  "Hey so I've been trying to code this website and it's not working. I've changed my node version and this is my logs. Pls send help :( I've changed my node version and this is my logs.";

const QuestionPad = () => {
  const QuestionHeader = () => {
    return (
      <div className='grid grid-rows-[1fr,auto]'>
        <p className='text-1xl text-white/70'>Question</p>
        <h1 className='text-3xl'>{mockTitle}</h1>
      </div>
    );
  };

  const QuestionBody = () => {
    return (
      <div className='grid grid-rows-[1fr,auto]'>
        <h1 className='text-xl'>{mockQuestion}</h1>
      </div>
    );
  };

  return (
    <div className='bg-[#1E1E1E]/80 pointer-events-none absolute top-0 left-0 right-0 bottom-0 overflow-scroll pt-1 z-10'>
      <div className='grid grid-rows-[auto,1fr] gap-5 p-20 overflow-hidden h-full'>
        <QuestionHeader />
        <QuestionBody />
      </div>
    </div>
  );
};

export default QuestionPad;
