import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

interface ActiveUsersInterface {
  author: string;
  rating: number;
}

function ActiveUsers({ author, rating }: ActiveUsersInterface) {
  return (
    <div className="flex flex-row justify-between py-5">
      <div className="flex flex-row gap-10">
        <div className="avatar online">
          <div className="w-20 rounded-full">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <div className="flex flex-col ">
          <p className="text-2xl font-medium">{author}</p>
          <div className="flex flex-row gap-2 items-center">
            <FontAwesomeIcon icon={faStar} />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faPhone}
        className="text-3xl hover:text-base-100 hover:cursor-pointer px-10"
      />
    </div>
  );
}

export default ActiveUsers;
