import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { trpc } from "../utils/trpc";

const ErrorToast = () => {
  return (
    <div className='toast toast-center'>
      <div className='alert alert-info'>
        <div>
          <span>New mail arrived.</span>
        </div>
      </div>
      <div className='alert alert-success'>
        <div>
          <span>Message sent successfully.</span>
        </div>
      </div>
    </div>
  );
};

const AddQuestionPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const newQuestionMutation = trpc.useMutation("question.new");

  async function submitHandler(e: any) {
    const res = await newQuestionMutation.mutateAsync({
      title: e.target.title.value,
      question: e.target.question.value,
    });

    if (res.success) {
      navigate("/forum");
    } else {
      console.log("error")
      setError(true);
    }
  }

  const PageHeader = () => {
    return (
      <div className='grid grid-cols-[1fr,auto]'>
        <h1 className='text-4xl'>Ask a question</h1>
      </div>
    );
  };

  const PageBody = () => {
    return (
      <form
        onSubmit={submitHandler}
        className='flex flex-col gap-4 w-7/8 h-full'
      >
        <input
          type='text'
          id='title'
          placeholder='Title'
          className='input input-lg w-full'
          required
        />
        <textarea
          placeholder='Question'
          id='question'
          className='input bordered input-lg w-full h-1/2 overflow-hidden pt-3'
          required
        />
        <div className='flex flex-row gap-4 justify-end'>
          <Link to='/forum'>
            <button className='btn btn-primary'>Cancel</button>
          </Link>
          <button className='btn btn-secondary'>Post</button>
        </div>
        {error && <ErrorToast/>}
      </form>
    );
  };

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='grid grid-rows-[auto,1fr] gap-5 px-10 pt-10 overflow-hidden h-full'>
        <PageHeader />
        <PageBody />
      </div>
    </div>
  );
};

export default AddQuestionPage;
