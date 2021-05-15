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
  const noteName = allNotes[normalizedFret % 12];
  const octave = fret <= 11 ? "Lower" : "Upper";

  return (
    <S.PromptContainer onClick={() => setChecked(index, !checked)}>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      {index + 1}. What fret is the note {noteName} on the{" "}
      {strings[stringIndex]} string? ({octave} octave)
      {checked && (
        <Fade in={checked}>
          <S.Answer>Answer: Fret {fret}</S.Answer>
        </Fade>
      )}
    </S.PromptContainer>
  );
}

export default Prompt;
