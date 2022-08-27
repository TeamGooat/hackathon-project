export interface QuestionProps {
  author: string;
  title: string;
  time: string;
}

const Question = (props: QuestionProps) => {
  const { author, time, title } = props;

  return (
    <div className='w-full bg-slate-300/40 rounded-2xl p-2'>
      <div className='grid grid-rows-[auto,10,0.5] gap-2 p-2'>
        <h1 className='text-1xl text-slate-300'>0 Written Answers</h1>
        <h1 className='text-3xl'>{title}</h1>
        <h1 className='text-1xl text-slate-200	'>{`Posted by ${author}`}</h1>
      </div>
    </div>
  );
};

export default Question;
