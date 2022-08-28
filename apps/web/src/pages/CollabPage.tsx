/* eslint-disable react-hooks/exhaustive-deps */
import ModeButton from "../components/Collab/SideBarModeButton";
import UserVideo from "../components/Collab/SideBarUserVideo";
import Header from "../components/Header";
import { socket } from '../utils/socket'

/* Icons */
import {
  faCode,
  faQuestion,
  faSquareRootVariable,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useContext, useEffect, useState } from "react";
import CodePad from "../components/Collab/CodePad";
import MathPad from "../components/Collab/MathPad";
import { CollabState, ICollabState } from "../components/Collab/collabState";
import QuestionPad from "../components/Collab/QuestionPad";

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

function SideBar(props: { toggleQuestion: () => void }) {
  const { setMode } = useContext<ICollabState>(CollabState);
  const { toggleQuestion } = props;

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

    socket.on("sdp", (sdp: RTCSessionDescriptionInit) => {
      console.log(sdp);
      if (sdp.type === "offer") {
        makeAnswer(sdp);
      } else {
        setRemoteSdp(sdp);
      }
    });

    socket.on("ice", (candidate: RTCIceCandidate) => {
      console.log(candidate);
      pc.addIceCandidate(candidate);
    });
  }, []);

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
      e.candidate && socket.emit("ice", e.candidate);
    };
    local_stream.getTracks().forEach((track) => {
      pc.addTrack(track, local_stream);
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const makeOffer = async () => {
    const offer = await pc.createOffer({
      offerToReceiveVideo: true,
      offerToReceiveAudio: true,
    });
    await pc.setLocalDescription(offer);

    socket.emit("sdp", offer);
  };

  const makeAnswer = async (sdp: RTCSessionDescriptionInit) => {
    setRemoteSdp(sdp);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket.emit("sdp", answer);
  };

  return (
    <div className='flex flex-col gap-4 items-center rounded-2xl '>
      <UserVideo local id='local' src='https://cdn.dribbble.com/users/456158/screenshots/6305721/care-bot.gif' />
      <UserVideo id='remote' src="https://cdn.dribbble.com/users/1210339/screenshots/2767019/avatar18.gif"/>
      <h3 className='text-2xl'>Modes</h3>
      <button onClick={makeOffer}>Call</button>
      <ModeButton name='Code' icon={faCode} onClick={() => setMode("Code")} />
      <ModeButton
        name='Math'
        icon={faSquareRootVariable}
        onClick={() => setMode("Math")}
      />
      <ModeButton
        name='Question'
        icon={faQuestion}
        onClick={() => toggleQuestion()}
      />
    </div>
  );
}

function CollabPage() {
  const { mode } = useContext(CollabState);
  const [showQuestion, setShowQuestion] = useState(false);

  const toggleQuestion = useCallback(() => {
    setShowQuestion(!showQuestion);
  }, [setShowQuestion])

  function renderMode() {
    switch (mode) {
      case "Code":
        return <CodePad />;
      case "Math":
        return <MathPad />;
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='grid grid-cols-[1fr,10rem] gap-4 mx-10 mb-10 overflow-hidden h-full'>
        <div className='flex rounded-2xl relative overflow-hidden mb-10 h-full'>
          {renderMode()}
          {showQuestion && <QuestionPad />}
        </div>
        <SideBar toggleQuestion={toggleQuestion} />
      </div>
    </div>
  );
}

export default CollabPage;
