import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ResponseCardInterface {
  questionId: number;
}

function ResponseCard({ questionId }: ResponseCardInterface) {
  return (
    <div className="card bg-base-content bg-opacity-10 hover:text-primary my-10">
      resource card
    </div>
  );
}

export default ResponseCard;
