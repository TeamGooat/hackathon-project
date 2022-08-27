import { useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
interface ResponseCardInterface {
  questionId: number;
}

interface questionData {
  description: string;
  title: string;
  author: string;
  timePosted: number;
  isOnline: boolean;
}

function ResponseCard({ questionId }: ResponseCardInterface) {
  const [questionData, setQuestionData] = useState<questionData>();

  useEffect(() => {
    getData(questionId);
  }, []);

  const fakeData = (id: number) => {
    if (id === 1) {
      return {
        description:
          "Cake lemon drops pastry pudding oat cake. Gummi bears pie danish tiramisu liquorice marzipan. Liquorice cheesecake apple pie marzipan brownie jelly beans candy donut croissant. Icing jujubes ice cream toffee liquorice bear claw. Lemon drops jelly-o sugar plum gummi bears fruitcake cupcake wafer cotton candy bonbon. Oat cake caramels tiramisu danish halvah wafer jelly-o tootsie roll sweet. Oat cake wafer donut tiramisu pie pie dragée. Biscuit danish caramels candy canes jelly beans. Sweet roll chocolate cake apple pie chocolate chupa chups biscuit. Bonbon sweet jelly liquorice cookie cake chocolate cake. Chocolate sweet cupcake jelly beans cake cake chocolate marzipan. Soufflé lollipop shortbread candy canes sweet roll dessert cheesecake gummi bears. Dragée marzipan pastry dessert pastry tootsie roll biscuit carrot cake. Dessert pastry halvah gummies sesame snaps gingerbread macaroon sweet. Wafer ice cream pie oat cake brownie icing.",
        title: "How do you make cupcakes on a budget",
        author: "kimchi8",
        timePosted: 30,
        isOnline: true,
      };
    } else return false;
  };

  const getData = (questionId: number) => {
    const results = fakeData(questionId);
    if (results != false) {
      setQuestionData(results);
      return true;
    }
    return false;
  };
  return (
    // <div className="card bg-base-content bg-opacity-10 my-10 p-7">
    <div>
      {/* <h5 className="pb-10">
        Posted by kimchi8{" "}
        <span className="text-[#fff] text-opacity-50 ">· 30 min ago</span>
        {questionData?.isOnline ? (
          <span className="text-greener"> · active now </span>
        ) : (
          <span className="text-[#fff] text-opacity-75">· offline </span>
        )}
        <b />
      </h5>
      <h1 className="card-title">{questionData?.title}</h1>
      <p className="pt-10">{questionData?.description}</p> */}
      <RichTextEditor />
    </div>
  );
}

export default ResponseCard;
