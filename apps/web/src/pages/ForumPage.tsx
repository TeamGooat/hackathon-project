import { Link } from "react-router-dom";
import Header from "../components/Header";

interface Question {
  userName: string;
  time: string;
}

// Question
// User
// Time
//

function ForumPage() {
  //   const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  //   const [addQuestion, setAddQuestion] = useState<boolean>(false);

  //   const a = trpc.useMutation(["question.new"])
  //   const hi = trpc.useQuery(["question.all"])

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
      <div className='flex flex-col gap-4 w-7/8 h-full bg-slate-300/20 p-2 rounded-2xl'>
        <div className='w-full bg-slate-300/40 rounded-2xl p-2'>
          <div className='grid grid-rows-[auto,1fr,auto] gap-5 p-2'>
            <h1 className='text-2xl'>Question</h1>
            <h1 className='text-3xl'>Question</h1>
            <h1 className='text-2xl'>Question</h1>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='grid grid-cols-[2fr,0fr] gap-4 pt-10 h-5/6 px-10 overflow-hidden'>
        <div className='grid grid-rows-[auto,1fr] gap-5'>
          <PageHeader />
          <PageBody />
        </div>
      </div>
    </div>
  );
}

export default ForumPage;
