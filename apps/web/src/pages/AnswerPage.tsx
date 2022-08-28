import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const userName = "kimchi8";
const min = "30";
const active = true;
const mockTitle = "I don't know what to do :( Can you please help me?";
const mockQuestion =
  "Dolor sint sunt proident eiusmod velit dolor. Tempor veniam anim minim proident eiusmod nisi occaecat dolore excepteur aliqua. Nulla officia tempor nostrud minim velit consequat dolor ut culpa nulla sunt. Ullamco do ipsum anim ex dolor ad proident qui eu fugiat eiusmod aliquip eiusmod anim. Do nostrud cupidatat occaecat ut dolor aliqua elit incididunt. Qui ipsum minim veniam officia ullamco enim dolor minim irure ipsum laborum eu. Sunt ullamco deserunt est commodo excepteur aute ex pariatur culpa magna sunt culpa pariatur esse. Consectetur elit nisi voluptate est consequat. Reprehenderit duis nisi proident nulla culpa sit laboris minim. Occaecat amet tempor labore incididunt aliqua consequat nostrud esse veniam adipisicing. Commodo excepteur sunt consequat minim deserunt incididunt nostrud consequat laboris consectetur nostrud ipsum in. Veniam occaecat ullamco do ipsum laboris.";

const AnswerPage = () => {
  const navigate = useNavigate();

  const QuestionDetails = () => {
    return (
      <div className='flex flex-row gap-2'>
        <p>{`Posted by ${userName}`}</p>
        <b className='text-slate-400'>.</b>
        <p>{`${min} min ago`}</p>
        <b className='text-slate-400'>.</b>
        {active && <p className='text-success'>active now</p>}
        <b className='text-slate-400'>{`#${questionId}`}</b>
      </div>
    );
  };
  const QuestionTitle = () => {
    return <h1 className='text-3xl'>{mockTitle}</h1>;
  };
  const QuestionBody = () => {
    return (
      <h1 className='text-xl leading-9 max-w-screen-lg'>{mockQuestion}</h1>
    );
  };

  const CallPrompt = () => {
    return (
      <>
        <label className='label px-5 rounded-t-3xl bg-green-400/30'>
          <div>
            <span className='label-text'>{`${userName} is `}</span>
            <span className='label-text font-bold text-green-400'>{`online`}</span>
            <span className='label-text'>{` now do you want to call them`}</span>
          </div>

          <span className='label-text-alt'>
            <button
              className='btn  btn-md bg-green-500 border-none rounded-full text-white normal-case gap-2 animate-bounce'
              onClick={() => {
                navigate("/collab");
              }}
            >
              <FontAwesomeIcon icon={faPhone} />
              <p>Call</p>
            </button>
          </span>
        </label>
      </>
    );
  };

  const AnswerTextArea = () => {
    return (
      <div className='form-control'>
        {active && <CallPrompt />}
        <textarea
          className='textarea textarea-bordered h-24 rounded-t-none'
          placeholder='Write something back...'
        ></textarea>
      </div>
    );
  };

  let { questionId } = useParams();

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='grid grid-rows-[auto,auto,1fr,auto] gap-5 mx-10 my-5 p-10 overflow-hidden h-full rounded-2xl bg-slate-300/20'>
        <QuestionDetails />
        <QuestionTitle />
        <QuestionBody />
        <AnswerTextArea />
      </div>
    </div>
  );
};

export default AnswerPage;
