import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

export interface QuestionProps {
  author: string;
  title: string;
  time: string;
}

const Question = (props: QuestionProps) => {
  const { author, time, title } = props;

  return (
    <div className='w-full bg-slate-300/40 rounded-2xl p-2'>
      <div className='grid grid-cols-[1fr,auto] gap-2 p-2 pr-5'>
        <div className='grid grid-rows-[auto,10,0.5] gap-2 p-2'>
          <h1 className='text-1xl text-slate-300'>0 Written Answers</h1>
          <h1 className='text-3xl'>{title}</h1>
          <h1 className='text-1xl text-slate-200	'>{`Posted by ${author}`}</h1>
        </div>
        <button className='flex flex-col gap-2 justify-center items-center'>
          <FontAwesomeIcon
            icon={faReply}
            className='text-4xl hover:text-secondary hover:cursor-pointer'
            onClick={() => {
              console.log("DO SOMETHING");
            }}
          />
          <h1 className='text-sm'>Respond</h1>
        </button>
      </div>
    </div>
  );
};

export default Question;
