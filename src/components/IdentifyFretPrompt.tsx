import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";
import { allNotes, stringNoteOffsets } from "../common/constants";
import * as S from "./styles";

interface IdentifyFretPromptProps {
  index: number
  fret: number
  stringIndex: number
  checked: boolean
  setChecked: (index: number, updatedValue: boolean) => void
  strings: string[]
}

function IdentifyFretPrompt({ index, fret, stringIndex, checked, setChecked, strings }: IdentifyFretPromptProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(index, event.target.checked);
  };

  const stringName = strings[stringIndex];
  const stringNoteOffset = stringNoteOffsets[stringName];
  const normalizedFret = fret + stringNoteOffset;
  const noteName = allNotes[normalizedFret % 12];
  const isUpperOctave = fret > 11;

  return (
    <S.PromptContainer onClick={() => setChecked(index, !checked)}>
      <S.PromptQuestion>
        <S.PromptQuestion>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          {index + 1}.{" "}
          <S.StringName> {strings[stringIndex]} String</S.StringName>: What fret
          is the note {noteName}?
        </S.PromptQuestion>
        <S.PromptQuestion>
          {isUpperOctave ? <S.UpperOctaveIcon /> : <S.LowerOctaveIcon />}
          {isUpperOctave ? "Upper" : "Lower"} octave
        </S.PromptQuestion>
      </S.PromptQuestion>
      <div>
        {checked && (
          <Fade in={checked}>
            <S.Answer>Answer: Fret {fret}</S.Answer>
          </Fade>
        )}
      </div>
    </S.PromptContainer>
  );
}

export default IdentifyFretPrompt;
