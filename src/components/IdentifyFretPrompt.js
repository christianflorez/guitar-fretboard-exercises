import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";
import { allNotes, stringNoteOffsets } from "../common/constants";
import * as S from "./styles";

function Prompt({ index, fret, stringIndex, checked, setChecked, strings }) {
  const handleChange = (event) => {
    setChecked(index, event.target.checked);
  };

  const stringName = strings[stringIndex];
  const stringNoteOffset = stringNoteOffsets[stringName];
  const normalizedFret = fret + stringNoteOffset;
  const noteNameAnswer = allNotes[normalizedFret % 12];

  return (
    <S.PromptContainer onClick={() => setChecked(index, !checked)}>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      {index + 1}. What note is fret {fret} on the {strings[stringIndex]}{" "}
      string?
      {checked && (
        <Fade in={checked}>
          <S.Answer>Answer: {noteNameAnswer}</S.Answer>
        </Fade>
      )}
    </S.PromptContainer>
  );
}

export default Prompt;
