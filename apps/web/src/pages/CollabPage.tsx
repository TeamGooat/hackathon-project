/* eslint-disable react-hooks/exhaustive-deps */
import ModeButton from "../components/Collab/SideBarModeButton";
import UserVideo from "../components/Collab/SideBarUserVideo";
import Header from "../components/Header";
import { io } from "socket.io-client";
/* Icons */
import {
  faCalculator,
  faCode,
  faSquareRootVariable,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CodePad from "./components/CodePad";
import MathPad from "./components/MathPad";
type Mode = "Code" | "Math" | "Calculator";

const ws = io("http://localhost:4000");
const config: RTCConfiguration = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
      ],
    },
    {
      urls: "turn:192.46.220.156:3478",
      credential: "myturner1234",
      username: "turner",
    },
  ],
};
var pc = new RTCPeerConnection(config);

function SideBar(props: { setMode: (mode: Mode) => void }) {
  const { setMode } = props;

  let local_vid: HTMLVideoElement;
  let remote_vid: HTMLVideoElement;
  let local_stream: MediaStream;
  let remote_stream: MediaStream;

  useEffect(() => {
    local_vid = document.querySelector("#local") as HTMLVideoElement;
    remote_vid = document.querySelector("#remote") as HTMLVideoElement;
    getMedia();

    pc.ontrack = (e) => {
      e.streams[0].getTracks().forEach((track) => {
        remote_stream.addTrack(track);
      });
    };

    ws.on("sdp", (sdp: RTCSessionDescriptionInit) => {
      console.log(sdp);
      if (sdp.type === "offer") {
        makeAnswer(sdp);
      } else {
        setRemoteSdp(sdp);
      }
    });

    ws.on("ice", (candidate: RTCIceCandidate) => {
      console.log(candidate);
      pc.addIceCandidate(candidate);
    });
  });

  const setRemoteSdp = async (sdp: RTCSessionDescriptionInit) => {
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
  };

  const getMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    local_stream = stream;
    local_vid.srcObject = stream;
    remote_stream = new MediaStream();
    remote_vid.srcObject = remote_stream;

    pc.onicecandidate = (e) => {
      e.candidate && ws.emit("ice", e.candidate);
    };
    local_stream.getTracks().forEach((track) => {
      pc.addTrack(track, local_stream);
    });
  };
  const makeOffer = async () => {
    const offer = await pc.createOffer({
      offerToReceiveVideo: true,
      offerToReceiveAudio: true,
    });
    await pc.setLocalDescription(offer);

    ws.emit("sdp", offer);
  };

  const makeAnswer = async (sdp: RTCSessionDescriptionInit) => {
    setRemoteSdp(sdp);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    ws.emit("sdp", answer);
  };

  return (
    <div className='flex flex-col gap-4 items-center rounded-2xl '>
      <UserVideo local id='local' src='https://placeimg.com/192/192/people' />
      <UserVideo id='remote' src='https://placeimg.com/192/192/people' />
      <h3 className='text-2xl'>Modes</h3>
<<<<<<< HEAD
      <button onClick={() => {ws.emit("request_session")}}>Call</button>
      <ModeButton name='Calculator' icon={faCalculator} />
      <ModeButton name='Code' icon={faCode} />
      <ModeButton name='Math' icon={faSquareRootVariable} />
=======
      <button onClick={makeOffer}>Call</button>
      <ModeButton name='Code' icon={faCode} onClick={() => setMode("Code")} />
      <ModeButton
        name='Math'
        icon={faSquareRootVariable}
        onClick={() => setMode("Math")}
      />
      <ModeButton
        name='Calculator'
        icon={faCalculator}
        onClick={() => setMode("Calculator")}
      />
>>>>>>> f2812cf949c9149c61ff1f562d9aa13bc4e8f5fe
    </div>
  );
}

function CollabPage() {
  const [mode, setMode] = useState<Mode>("Code");

  // This function is run everytime something in the editor changes
  function handleEditorChange(value: string | undefined, event: Event) {
    console.log(value);
  }

  function renderMode(mode: Mode) {
    switch (mode) {
      case "Code":
        return <CodePad onChange={handleEditorChange} />;
      case "Math":
        return <MathPad />;
      default:
        return <CodePad onChange={handleEditorChange} />;
    }
  }

  return (
    <div className='h-screen'>
      <Header />
      <div className='grid grid-cols-[1fr,10rem] gap-4 mx-10 h-full'>
        <section className='rounded-2xl overflow-hidden mb-10'>
          {renderMode(mode)}
        </section>
        <SideBar setMode={setMode} />
      </div>
    </div>
  );
}

export default CollabPage;
