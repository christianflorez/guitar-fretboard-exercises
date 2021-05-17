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
      <S.PromptQuestion>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        {index + 1}. <S.StringName>{strings[stringIndex]} string</S.StringName>:
        What note is fret {fret}?
      </S.PromptQuestion>
      <div>
        {checked && (
          <Fade in={checked}>
            <S.Answer>Answer: {noteNameAnswer}</S.Answer>
          </Fade>
        )}
      </div>
    </S.PromptContainer>
  );
}

export default Prompt;
