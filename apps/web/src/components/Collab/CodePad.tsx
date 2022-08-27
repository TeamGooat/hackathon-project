import Editor, { OnChange } from "@monaco-editor/react";
import { useContext } from "react";
import { CollabState } from "./collabState";

const CodePad = () => {
  const { socket, code, setCode } = useContext(CollabState)
  let editor:any;

  function handleEditorChange(value: string | undefined, event: Event) {
    value && setCode(value)
    value && socket.emit("code:input", value)
  }

  socket.on("code:input", (code: string) => {
    setCode(code)
    editor.setValue(code)
  })

  const editorDidMount = (e: any) => {
    editor = e;
  };
  
  return (
    <Editor
      theme='vs-dark'
      height='100%'
      width='100%'
      defaultLanguage='javascript'
      onChange={handleEditorChange}
      value={code}
      onMount={editorDidMount}
    />
  );
};

export default CodePad;
