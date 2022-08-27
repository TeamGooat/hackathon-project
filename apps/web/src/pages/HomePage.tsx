import Header from "../components/Header";
import Homies from "../images/homies.png";

function HomePage() {
  return (
    <div className='h-screen'>
      <Header unauthenticated />
      <div className='grid grid-cols-[1fr,1.1fr] gap-2 h-5/6 px-10 overflow-hidden'>
        <section className='flex flex-col gap-7 rounded-2xl justify-center items-left h-full'>
          <h1 className='text-5xl font-bold'>Welcome to responsIO</h1>
          <h1 className='text-4xl font-light'>
            Get your responses to your questions simple, quick &amp; easy
          </h1>
          <h1 className='text-3xl font-extralight'>
            Featuring <b>real-time video collaboration</b> with{" "}
            <b>colding, math &amp; face-time</b> capabilities
          </h1>
          <div className='flex flex-row gap-7'>
            <button className='btn'>Join for free</button>
            <button className='btn'>See how it works</button>
          </div>
        </section>
        <section className='flex rounded-2xl justify-center items-center'>
          <img src={Homies} alt='People smiling' />
        </section>
      </div>
    </div>
  );
}

export default HomePage;
