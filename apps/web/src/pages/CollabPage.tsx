import Editor from "@monaco-editor/react";

function CollabPage() {
  return (
    <>
      <p>This is the editor page</p>
      <Editor
        height='90vh'
        defaultLanguage='javascript'
        defaultValue='// Hello, this is the code editor'
      />
    </>
  );
}

export default CollabPage;
