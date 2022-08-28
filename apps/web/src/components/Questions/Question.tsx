import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export interface QuestionProps {
  id: Number;
  author: string;
  title: string;
  time: string;
}

const Question = (props: QuestionProps) => {
  const { author, time, id, title } = props;
  const navigate = useNavigate();

  return (
    <div className='w-full bg-slate-300/40 rounded-2xl p-2'>
      <div className='grid grid-cols-[1fr,auto] gap-2 p-2 pr-5'>
        <div className='grid grid-rows-[auto,10,0.5] gap-2 p-2'>
          <h1 className='text-sm text-slate-300'>0 Written Answers</h1>
          <h1 className='text-2xl'>{title}</h1>
          <h1 className='text-l text-slate-200	'>{`Posted by ${author}`}</h1>
        </div>
        <button className='flex flex-col gap-2 justify-center items-center'>
          <FontAwesomeIcon
            icon={faReply}
            className='text-4xl hover:text-secondary hover:cursor-pointer'
            onClick={() => {
              navigate(`/answer/${id}`);
            }}
          />
          <h1 className='text-sm'>Respond</h1>
        </button>
      </div>
    </div>
  );
};

export default Question;
