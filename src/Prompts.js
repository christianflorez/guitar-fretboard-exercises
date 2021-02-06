import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { getRandomInt } from "./utils";
import {
  strings,
  defaultNumberOfPrompts,
  defaultMinFret,
  defaultMaxFret,
} from "./constants";
import Prompt from "./Prompt";
import Settings from "./Settings";

const PromptsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  padding-left: 7rem;
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
  const [numberOfPrompts, setNumberOfPrompts] = React.useState(
    defaultNumberOfPrompts
  );

  const [minFret, setMinFret] = React.useState(defaultMinFret);
  const [maxFret, setMaxFret] = React.useState(defaultMaxFret);
  const [omittedFrets, setOmittedFrets] = React.useState([]);

  function renderPrompts() {
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

    return promptRawValues.map((prompt, i) => {
      return (
        <Prompt
          key={i}
          index={i}
          fret={prompt.fret}
          stringIndex={prompt.stringIndex}
        />
      );
    });
  }

  return (
    <>
      <Settings
        updatePromptsAmount={setNumberOfPrompts}
        updateMinFret={setMinFret}
        updateMaxFret={setMaxFret}
        updateOmittedFrets={setOmittedFrets}
      />
      <PromptsContainer>{renderPrompts()}</PromptsContainer>
    </>
  );
}

export default Prompts;
