import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AppDispatch } from "../store/store";
import schedulingsSlice from "../store/schedulings";
import Editor from "@monaco-editor/react";

function JsonEditor() {
  const dispatch: AppDispatch = useDispatch();
  const left = useSelector((state: AppState) => state.schedulings.left);
  const right = useSelector((state: AppState) => state.schedulings.right);
  const areEqual = useSelector((state: AppState) => state.schedulings.areEqual);

  const [leftEditorValue, setLeftEditorValue] = useState(
    JSON.stringify(left, null, 2)
  );
  const [rightEditorValue, setRightEditorValue] = useState(
    JSON.stringify(right, null, 2)
  );

  // Update state when editors change
  const handleLeftEditorChange = (value) => {
    setLeftEditorValue(value);
  };
  const handleRightEditorChange = (value) => {
    setRightEditorValue(value);
  };
  const onCompareSchedulingsClick = () => {
    dispatch(
      schedulingsSlice.actions.compareSchedulings({
        left: JSON.parse(leftEditorValue),
        right: JSON.parse(rightEditorValue)
      })
    );
  };

  return (
    <>
      <h2>Schedulings are {areEqual ? "" : "not "} equal</h2>
      <div style={{ display: "flex", height: "500px" }}>
        <Editor
          value={leftEditorValue}
          language="json"
          theme="vs-dark"
          options={{ automaticLayout: true }}
          onChange={handleLeftEditorChange}
        />
        <Editor
          value={rightEditorValue}
          language="json"
          theme="vs-dark"
          options={{ automaticLayout: true }}
          onChange={handleRightEditorChange}
        />
      </div>
      <button style={{ marginTop: "20px" }} onClick={onCompareSchedulingsClick}>
        Compare Schedulings
      </button>
    </>
  );
}

export default JsonEditor;
