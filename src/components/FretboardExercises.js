import React from "react";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import { getRandomInt } from "../common/utils";
import {
  strings,
  defaultNumberOfPrompts,
  defaultMinFret,
  defaultMaxFret,
} from "../common/constants";
import Prompt from "./IdentifyFretPrompt";
import Settings from "./Settings";
import * as S from "./styles";

function getFret(minFret, maxFret, omittedFrets) {
  let isFretValid = false;
  let fretToUse;

  while (!isFretValid) {
    const fret = getRandomInt(minFret, maxFret);
    if (!omittedFrets.includes(fret)) {
      isFretValid = true;
      fretToUse = fret;
    }
  }

  return fretToUse;
}

function FretboardExercises() {
  const [state, setState] = React.useState({
    numberOfPrompts: defaultNumberOfPrompts,
    minFret: defaultMinFret,
    maxFret: defaultMaxFret,
    omittedFrets: [],
    stringsToUse: strings,
  });

  const [checkedState, setCheckedState] = React.useState(() =>
    _.times(defaultNumberOfPrompts, () => false)
  );
  const [promptValues, setPromptValues] = React.useState(() =>
    getPromptValues(state)
  );

  function getPromptValues({
    minFret,
    maxFret,
    omittedFrets,
    numberOfPrompts,
    stringsToUse,
  }) {
    const promptRawValues = [];

    _.times(numberOfPrompts, (i) => {
      let isUnique = false;
      while (!isUnique) {
        const stringIndex = getRandomInt(0, stringsToUse.length - 1);
        const fret = getFret(minFret, maxFret, omittedFrets);
        const existingPrompt = _.find(
          promptRawValues,
          (prompt) => prompt.stringIndex === stringIndex && prompt.fret === fret
        );

        if (_.isNil(existingPrompt)) {
          promptRawValues.push({ stringIndex, fret });
          isUnique = true;
        }
      }
    });

    return promptRawValues;
  }

  function updateState(updatedValues) {
    const updatedPromptValues = getPromptValues(updatedValues);
    setState(updatedValues);
    setPromptValues(updatedPromptValues);
    if (updatedValues.numberOfPrompts > state.numberOfPrompts) {
      const missingCount =
        updatedValues.numberOfPrompts - state.numberOfPrompts;
      const additionalEmptyCheckedValues = _.times(missingCount, () => false);
      setCheckedState(checkedState.concat(additionalEmptyCheckedValues));
    } else {
      setCheckedState(checkedState.slice(0, updatedValues.numberOfPrompts));
    }
  }

  function handleCheck(index, updatedValue) {
    const updatedCheckedState = _.map(checkedState, (value, i) => {
      if (i === index) return updatedValue;
      return value;
    });

    setCheckedState(updatedCheckedState);
  }

  function handleReset() {
    setCheckedState(_.times(defaultNumberOfPrompts, () => false));
  }

  function handleRefresh() {
    setPromptValues(getPromptValues(state));
    handleReset();
  }

  function renderPrompts() {
    return promptValues.map((prompt, i) => {
      return (
        <Prompt
          key={i}
          index={i}
          fret={prompt.fret}
          stringIndex={prompt.stringIndex}
          strings={state.stringsToUse}
          checked={checkedState[i]}
          setChecked={handleCheck}
        />
      );
    });
  }

  return (
    <>
      <Settings updateState={updateState} stringsToUse={state.stringsToUse} />
      <S.StyledPaper elevation={3}>
        <S.HeaderContainer>
          <Typography variant="h6">Questions</Typography>
          <S.ButtonContainer>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset Questions
            </Button>
            <Tooltip title="Get new set of questions" placement="top">
              <IconButton edge="start" color="inherit" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </S.ButtonContainer>
        </S.HeaderContainer>
        <S.PromptsContainer>{renderPrompts()}</S.PromptsContainer>
      </S.StyledPaper>
    </>
  );
}

export default FretboardExercises;
