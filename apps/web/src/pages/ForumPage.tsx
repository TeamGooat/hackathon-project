import { Link } from "react-router-dom";
import Header from "../components/Header";
import Question, { QuestionProps } from "../components/Questions/Question";

// Question
// User
// Time
//

function ForumPage() {
  //   const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  //   const [addQuestion, setAddQuestion] = useState<boolean>(false);

  //   const a = trpc.useMutation(["question.new"])
  //   const hi = trpc.useQuery(["question.all"])

  let questionData: QuestionProps[] = [
    {
      id: 1,
      author: "Nathan Hettige",
      title: "How to code in ReactJS?",
      time: "10 minutes ago",
    },
    {
      id: 2,
      author: "Dane WLKR",
      title: "How to code in SolidJS?",
      time: "10 minutes ago",
    },
    {
      id: 3,
      author: "Jane Doe",
      title: "Where can I meet Jill?",
      time: "10 minutes ago",
    },
    {
      id: 4,
      author: "Nathan Hettige",
      title: "How to code in ReactJS?",
      time: "10 minutes ago",
    },
    {
      id: 4,
      author: "Dane WLKR",
      title: "How to code in SolidJS?",
      time: "10 minutes ago",
    },
    {
      id: 4,
      author: "Jane Doe",
      title: "Where can I meet Jill?",
      time: "10 minutes ago",
    },
  ];

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
      <div className='flex flex-col gap-4 w-7/8 bg-slate-300/20 p-2 rounded-2xl overflow-scroll'>
        {questionData.map((q) => (
          <Question title={q.title} time={q.time} author={q.author} id={q.id} />
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
