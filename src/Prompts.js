import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { getRandomInt } from "./utils";
import { strings, defaultNumberOfPrompts } from "./constants";
import Prompt from "./Prompt";
import Settings from "./Settings";

const PromptsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  padding-left: 7rem;
`;

function Prompts() {
  const [numberOfPrompts, setNumberOfPrompts] = React.useState(
    defaultNumberOfPrompts
  );

  const prompts = _.times(numberOfPrompts, (i) => {
    const stringIndex = getRandomInt(0, strings.length - 1);
    return (
      <Prompt
        key={i}
        index={i}
        fret={getRandomInt(0, 24)}
        stringIndex={stringIndex}
      />
    );
  });

  return (
    <>
      <Settings
        defaultValue={defaultNumberOfPrompts}
        updateValues={setNumberOfPrompts}
      />
      <PromptsContainer>{prompts}</PromptsContainer>
    </>
  );
}

export default Prompts;
