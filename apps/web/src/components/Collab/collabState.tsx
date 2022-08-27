import React, { ReactNode, useState } from "react";
import { io, Socket } from "socket.io-client";

export type Mode = "Code" | "Math" | "Calculator";

export const CollabState = React.createContext<ICollabState>({
  mode: "Code",
  socket: io("http://localhost:4000"),
  code: "",
  setCode: (code: string) => {},
  setMode: (mode: Mode) => {},
})

export interface ICollabState {
  socket: Socket;
  code: string;
  setCode: (code: string) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const CollabStateProvider: React.FC< {children: ReactNode}> = (props) => {
  const { children } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socket, _] = useState<Socket>(io("http://localhost:4000"));
  const [code, setCode] = useState<string>("// Hello, this is the code editor");
  const [mode, _setMode] = useState<Mode>("Code");

  const setMode = (_mode: Mode) => {
    _setMode(_mode)
    socket.emit("changemode", _mode)
  }

  socket.on("changemode", (mode: Mode) => {
    console.log("SHIT", mode)
    _setMode(mode)
  })

  const initialState : ICollabState = {
    socket,
    code,
    setCode,
    mode,
    setMode,
  }
  
  return (
    <CollabState.Provider value={initialState}>
      { children }
    </CollabState.Provider>
  )
}