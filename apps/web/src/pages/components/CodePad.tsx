import Editor, { OnChange } from "@monaco-editor/react";

interface CodePadProps {
  onChange: OnChange | undefined;
}

const CodePad = (props: CodePadProps) => {
  return (
    <Editor
      theme='vs-dark'
      height='95%'
      width='100%'
      defaultLanguage='javascript'
      defaultValue='// Hello, this is the code editor'
      onChange={props.onChange}
    />
  );
};

export default CodePad;
