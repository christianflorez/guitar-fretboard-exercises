import React from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";
import { strings, allNotes, stringNoteOffsets } from "./constants";

const Answer = styled.div`
  color: skyblue;
  margin-bottom: 0.5rem;
`;

const PromptContainer = styled.div`
  cursor: pointer;
`;

function Prompt({ index, fret, stringIndex, checked, setChecked }) {
  const handleChange = (event) => {
    setChecked(index, event.target.checked);
  };

  const stringNoteOffset = stringNoteOffsets[stringIndex];
  const normalizedFret = fret + stringNoteOffset;
  const noteNameAnswer = allNotes[normalizedFret % 12];

  return (
    <PromptContainer onClick={() => setChecked(index, !checked)}>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      {index + 1}. Play fret {fret} on the{" "}
      {stringIndex === 0 ? "low " : stringIndex === 5 ? "high " : ""}
      {strings[stringIndex]} string
      {checked && (
        <Fade in={checked}>
          <Answer>The answer is: {noteNameAnswer}</Answer>
        </Fade>
      )}
    </PromptContainer>
  );
}

export default Prompt;
