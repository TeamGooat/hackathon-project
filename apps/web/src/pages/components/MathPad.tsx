import { useState } from "react";
import { addStyles, EditableMathField } from "react-mathquill";

const MathPad = () => {
  addStyles();
  const [latex, setLatex] = useState("\\frac{1}{\\sqrt{2}}\\cdot 2");

  return (
    <div>
      <EditableMathField
        latex={latex}
        onChange={(mathField) => {
          setLatex(mathField.latex());
        }}
        config={{
          autoCommands: "pi theta sqrt sum",
          autoOperatorNames: "sin cos log",
        }}
      />
      <p>{latex}</p>
    </div>
  );
};

export default MathPad;
