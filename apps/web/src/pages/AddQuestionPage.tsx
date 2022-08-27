import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

interface AddQuestionPageBodyProps {
  title: string;
  setTitle: (title: string) => void;
  question: string;
  setQuestion: (title: string) => void;
}

const PageHeader = () => {
  return (
    <div className='grid grid-cols-[1fr,auto]'>
      <h1 className='text-4xl'>Ask a question</h1>
    </div>
  );
};

const PageBody = (props: AddQuestionPageBodyProps) => {
  const { title, setTitle, question, setQuestion } = props;
  return (
    <div className='flex flex-col gap-4 w-7/8 h-full'>
      <input
        type='text'
        placeholder='Title'
        className='input input-lg w-full'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Question'
        className='input bordered input-lg w-full h-1/2 overflow-hidden pt-3'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div className='flex flex-row gap-4 justify-end'>
        <Link to='/forum'>
          <button className='btn btn-primary'>Cancel</button>
        </Link>
        <button className='btn btn-secondary'>Post</button>
      </div>
    </div>
  );
};

const AddQuestionPage = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='grid grid-rows-[auto,1fr] gap-5 px-10 pt-10 overflow-hidden h-full'>
        <PageHeader />
        <PageBody
          title={title}
          setTitle={setTitle}
          question={question}
          setQuestion={setQuestion}
        />
      </div>
    </div>
  );
};

export default AddQuestionPage;
