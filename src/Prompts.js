import React from "react";
import _ from "lodash";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { getRandomInt } from "./utils";
import {
  strings,
  defaultNumberOfPrompts,
  defaultMinFret,
  defaultMaxFret,
} from "./constants";
import Prompt from "./Prompt";
import Settings from "./Settings";

const StyledPaper = styled(Paper)`
  padding: 1rem;
  width: 40vw;
  max-width: 40vw;
  margin-top: 1rem;
`;

const PromptsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  padding-left: 7rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 75%;
  padding-left: 15%;
  justify-content: space-between;
`;

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

function Prompts() {
  const [state, setState] = React.useState({
    numberOfPrompts: defaultNumberOfPrompts,
    minFret: defaultMinFret,
    maxFret: defaultMaxFret,
    omittedFrets: [],
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
  }) {
    const promptRawValues = [];

    _.times(numberOfPrompts, (i) => {
      let isUnique = false;
      while (!isUnique) {
        const stringIndex = getRandomInt(0, strings.length - 1);
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
    setCheckedState(checkedState.slice(0, updatedValues.numberOfPrompts));
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

  function renderPrompts() {
    return promptValues.map((prompt, i) => {
      return (
        <Prompt
          key={i}
          index={i}
          fret={prompt.fret}
          stringIndex={prompt.stringIndex}
          checked={checkedState[i]}
          setChecked={handleCheck}
        />
      );
    });
  }

  return (
    <>
      <Settings updateState={updateState} />

      <StyledPaper elevation={3}>
        <HeaderContainer>
          <Typography variant="h6">Questions</Typography>
          <Button variant="contained" color="secondary" onClick={handleReset}>
            Reset Questions
          </Button>
        </HeaderContainer>
        <PromptsContainer>{renderPrompts()}</PromptsContainer>
      </StyledPaper>
    </>
  );
}

export default Prompts;
