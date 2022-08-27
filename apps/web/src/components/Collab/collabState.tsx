import React, { ReactNode, useState } from "react";
import { io, Socket } from "socket.io-client";

export const CollabState = React.createContext<ICollabState>({
  socket: io("http://localhost:4000"),
  code: "",
  setCode: (code: string) => {},
})

export interface ICollabState {
  socket: Socket;
  code: string;
  setCode: (code: string) => void;
}

export const CollabStateProvider: React.FC< {children: ReactNode}> = (props) => {
  const { children } = props;

  const [socket, setSocket] = useState<Socket>(io("http://localhost:4000"));
  const [code, setCode] = useState<string>("// Hello, this is the code editor");


  const initialState : ICollabState = {
    socket,
    code,
    setCode
  }

  return (
    <CollabState.Provider value={initialState}>
      { children }
    </CollabState.Provider>
  )
}