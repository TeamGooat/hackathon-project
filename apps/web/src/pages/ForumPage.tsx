import { Link } from "react-router-dom";
import Header from "../components/Header";
import Question, { QuestionProps } from "../components/Questions/Question";
import { trpc } from "../utils/trpc";

function ForumPage() {
  const data = trpc.useQuery(["question.all", null]).data;
  console.log(data);

  const PageHeader = () => {
    return (
      <div className='grid grid-cols-[1fr,auto]'>
        <h1 className='text-4xl'>Questions</h1>
        <Link to='/question'>
          <button className='btn btn-info'>Add Question</button>
        </Link>
      </div>
    );
  };

  const PageBody = () => {
    return (
      <div className='flex flex-col gap-4 w-7/8 bg-slate-300/20 p-2 h-full rounded-2xl overflow-scroll'>
        {data && data.map((q) => (
          <Question title={q.title} time={q.time} author={"kimchi"} id={q.} />
        ))}
      </div>
    );
  };

  return (
    <div className='flex flex-col flex-1 h-screen'>
      <Header />
      <div className='flex flex-col px-10 my-5 gap-2 h-full overflow-scroll'>
        <PageHeader />
        <PageBody />
      </div>
    </div>
  );
}

export default ForumPage;
