import React, { ReactNode, useState } from "react";
import { io, Socket } from "socket.io-client";

export type Mode = "Code" | "Math";

export const CollabState = React.createContext<ICollabState>({
  mode: "Code",
  socket: io(""),
  code: "",
  setCode: (code: string) => {},
  setMode: (mode: Mode) => {},
  lineCount: 1,
  editorLines: {},
  setEditorLines: (editorLines: any) => {},
  setLineCount: (lineCount: number) => {},
})

export interface ICollabState {
  socket: Socket;
  code: string;
  setCode: (code: string) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  lineCount: number;
  editorLines: { [key: number]: string };
  setEditorLines: (editorLines: any) => void;
  setLineCount: (lineCount: number) => void;
}

export const CollabStateProvider: React.FC< {children: ReactNode}> = (props) => {
  const { children } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socket, _] = useState<Socket>(io("http://localhost:4000"));
  const [code, setCode] = useState<string>("// Hello, this is the code editor");
  const [mode, _setMode] = useState<Mode>("Code");
  const [lineCount, _setLineCount] = useState(1);
  const [editorLines, _setEditorLines] = useState<{ [key: number]: string }>({
    1: "\\frac{1}{\\sqrt{2}}\\cdot 2",
  });

  const setMode = (_mode: Mode) => {
    _setMode(_mode)
    socket.emit("changemode", _mode)
  }

  const setEditorLines = (lines: { [key: number]: string }) => {
      _setEditorLines(lines)
      socket.emit("math:input", lines)
  }

  const setLineCount = (count: number) => {
    _setLineCount(count)
    socket.emit("math:line", count)
  }

  socket.on("math:input", (lines: { [key: number]: string }) => {
    _setEditorLines(lines)
  })

  socket.on("math:line", (count: number) => {
    _setLineCount(count)
  })

  socket.on("changemode", (mode: Mode) => {
    _setMode(mode)
  })

  const initialState : ICollabState = {
    socket,
    code,
    setCode,
    mode,
    setMode,
    lineCount,
    editorLines,
    setEditorLines,
    setLineCount,
  }
  
  return (
    <CollabState.Provider value={initialState}>
      { children }
    </CollabState.Provider>
  )
}