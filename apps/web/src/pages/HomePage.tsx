import Header from "../components/Header";
import Homies from "../images/homies.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  return (
    <div className="h-screen">
      <Header unauthenticated />
      <div className="grid grid-cols-[.9fr,0.7fr] gap-2 h-5/6 px-10 overflow-hidden">
        <section className="flex flex-col gap-7 rounded-2xl justify-center items-left h-full">
          <h1 className="text-5xl font-bold font-Almarai">
            Welcome to responsIO
          </h1>
          <h1 className="text-4xl font-light">
            Get your responses to your questions quick, fast &amp; easy
          </h1>
          <h1 className="text-3xl font-extralight">
            Featuring <b className="font-bold">real-time video collaboration</b>{" "}
            with <b className="font-bold">coding, math &amp; face-time</b>{" "}
            capabilities
          </h1>
          <div className="flex flex-row gap-7">
            <button className="bg-pinky btn text-[#fff] hover:bg-accent">
              Join for free
            </button>
            <button className="btn bg-transparent border-none text-[#fff] underline hover:bg-accent ">
              {" "}
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="text-3xl pr-3 text-success"
              />{" "}
              See how it works
            </button>
          </div>
        </section>
        <section className="flex rounded-2xl justify-center items-center ">
          <img src={Homies} alt="People smiling" />
        </section>
      </div>
    </div>
  );
}

export default HomePage;
