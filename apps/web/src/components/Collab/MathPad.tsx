import { useState } from "react";
import { addStyles, EditableMathField } from "react-mathquill";

const MathPad = () => {
  addStyles();

  const [lineCount, setLineCount] = useState(1);

  const [editorLines, setEditorLines] = useState<{ [key: number]: string }>({
    1: "\\frac{1}{\\sqrt{2}}\\cdot 2",
  });

  /**
   * Called when you press enter.
   * Will add a new line to the bottom.
   */
  const addField = (event: any) => {
    if (event.key === "Enter") {
      console.log("hello");
      setEditorLines({
        ...editorLines,
        [lineCount + 1]: "",
      });
      setLineCount(lineCount + 1);
    }
  };

  /**
   * Set the latex for the lineNumber
   */
  function setField(lineNumber: number, latex: any) {
    console.log(editorLines);
    editorLines[lineNumber] = latex.latex();
    setEditorLines(editorLines);
  }

  return (
    <div
      className='bg-[#1E1E1E] h-full w-full overflow-scroll pt-1'
      onKeyPress={addField}
    >
      {Object.entries(editorLines).map(([key, value]) => (
        <div className='flex flex-row w-full h-min  gap-3 items-center'>
          <p className='text-xs pl-3 h-full '>{key}</p>
          <EditableMathField
            latex={value}
            className='border-0 w-full text-lg p-2'
            onChange={(latex) => {
              setField(Number(key), latex);
            }}
            config={{
              autoCommands: "pi theta sqrt sum",
              autoOperatorNames: "sin cos log",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default MathPad;
