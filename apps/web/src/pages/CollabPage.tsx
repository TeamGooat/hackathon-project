import Editor from "@monaco-editor/react";
import ModeButton from "../components/Collab/SideBarModeButton";
import UserVideo from "../components/Collab/SideBarUserVideo";
import Header from "../components/Header";

/* Icons */
import {
  faCalculator,
  faCode,
  faSquareRootVariable,
} from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  return (
    <div className='flex flex-col gap-4 items-center rounded-2xl '>
      <UserVideo src='https://placeimg.com/192/192/people' />
      <UserVideo src='https://placeimg.com/192/192/people' />
      <h3 className='text-2xl'>Modes</h3>
      <ModeButton name='Calculator' icon={faCalculator} />
      <ModeButton name='Code' icon={faCode} />
      <ModeButton name='Math' icon={faSquareRootVariable} />
    </div>
  );
}

function CollabPage() {
  // This function is run everytime something in the editor changes
  function handleEditorChange(value: string | undefined, event: Event) {
    console.log(value);
  }

  return (
    <div className='h-screen'>
      <Header />
      <div className='grid grid-cols-[1fr,10rem] gap-4 mx-10 h-full'>
        <section className='rounded-2xl overflow-hidden mb-10'>
          <Editor
            theme='vs-dark'
            height='95%'
            width='100%'
            defaultLanguage='javascript'
            defaultValue='// Hello, this is the code editor'
            onChange={handleEditorChange}
          />
        </section>

        <SideBar />
      </div>
    </div>
  );
}

export default CollabPage;
