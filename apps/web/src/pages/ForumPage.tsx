import QuestionCard from "./components/QuestionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ActiveUsers from "./components/ActiveUsers";
import Header from "../components/Header";

function ForumPage() {
  return (
    <div className="h-screen">
      <Header unauthenticated />

      <div className="grid grid-cols-[2fr,1fr] gap-4 pt-10 h-5/6 px-10 overflow-hidden">
        <div>
          <div
            id="add question"
            className="flex flex-row justify-between items-center"
          >
            <h1 className="text-3xl font-bold">Questions</h1>
            <FontAwesomeIcon icon={faCirclePlus} className="text-4xl pr-10" />
          </div>
          <div className="">
            <QuestionCard
              title="How to hackathon?"
              author="kimchi8"
              timePosted={30}
              description="something about the question"
            />
            <QuestionCard
              title="How to hackathon?"
              author="kimchi8"
              timePosted={30}
              description="something about the question"
            />
          </div>
        </div>
        <div
          id="active users"
          className="card bg-gradient-to-b from-secondary via-[#5F60A7] p-10 grid grid-flow-row[4fr,1fr] "
        >
          <div>
            <h2 className="text-3xl font-base text-base-100">
              Users Onlines Now
            </h2>
            <ActiveUsers author="kimchi8" rating={4.6} />
            <ActiveUsers author="Nathaniel" rating={4.3} />
          </div>
        </div>
        <div className="flex flex-col gap-7 w-fit absolute right-24 bottom-10">
          <button className="btn btn-primary px-10">Your Questions</button>
          <button className="btn btn-secondary px-10">Your Responses</button>
        </div>
      </div>
    </div>
  );
}

export default ForumPage;
