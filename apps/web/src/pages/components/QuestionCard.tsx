import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

interface QuestionCardInterface {
  title: string;
  author: string;
  timePosted: number;
  description: string;
}

function QuestionCard({
  title,
  author,
  timePosted,
  description,
}: QuestionCardInterface) {
  return (
    <div className="card bg-base-content bg-opacity-10 hover:text-primary my-10">
      <div className="card-body cursor-pointer">
        <p className="pb-2 opacity-70">{`Posted by ${author} · ${timePosted} min ago`}</p>
        <h2 className="card-title justify-between">
          {title}
          <div className="flex flex-col pr-10">
            <FontAwesomeIcon icon={faCommentDots} className="text-4xl" />
            <p className="font-light text-sm">Answer</p>
          </div>
        </h2>
      </div>
    </div>
  );
}

export default QuestionCard;
