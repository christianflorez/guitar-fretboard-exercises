import React from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";
import { allNotes, stringNoteOffsets } from "./constants";

const Answer = styled.div`
  color: skyblue;
  margin-bottom: 0.5rem;
  display: flex;
  padding-left: 3rem;
`;

const PromptContainer = styled.div`
  cursor: pointer;
`;

function Prompt({ index, fret, stringIndex, checked, setChecked, strings }) {
  const handleChange = (event) => {
    setChecked(index, event.target.checked);
  };

  const stringName = strings[stringIndex];
  const stringNoteOffset = stringNoteOffsets[stringName];
  const normalizedFret = fret + stringNoteOffset;
  const noteNameAnswer = allNotes[normalizedFret % 12];

  return (
    <PromptContainer onClick={() => setChecked(index, !checked)}>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      {index + 1}. What note is fret {fret} on the {strings[stringIndex]}{" "}
      string?
      {checked && (
        <Fade in={checked}>
          <Answer>Answer: {noteNameAnswer}</Answer>
        </Fade>
      )}
    </PromptContainer>
  );
}

export default Prompt;
