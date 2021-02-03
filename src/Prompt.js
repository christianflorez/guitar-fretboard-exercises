import React from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";
import { strings } from "./utils";

const Answer = styled.div`
  color: skyblue;
  margin-bottom: 0.5rem;
`;

const PromptContainer = styled.div`
  cursor: pointer;
`;

const allNotes = [
  "A",
  "A#/Bb",
  "B",
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab"
];

const stringNoteOffsets = [7, 0, 5, 10, 2, 7];

function Prompt({ index, fret, stringIndex }) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const stringNoteOffset = stringNoteOffsets[stringIndex];
  const normalizedFret = fret + stringNoteOffset;
  const noteNameAnswer = allNotes[normalizedFret % 12];

  return (
    <PromptContainer onClick={() => setChecked(!checked)}>
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
