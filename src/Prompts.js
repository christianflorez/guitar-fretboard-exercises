import React from "react";
import Input from "@material-ui/core/Input";
import _ from "lodash";
import styled from "styled-components";
import { getRandomInt } from "./utils";
import Prompt from "./Prompt";
import Settings from "./Settings";
import { strings } from "./utils";

const DEFAULT_NUM_OF_PROMPTS = 25;

const PromptsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  padding-left: 7rem;
`;

function Prompts() {
  const [numberOfPrompts, setNumberOfPrompts] = React.useState(
    DEFAULT_NUM_OF_PROMPTS
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
        defaultValue={DEFAULT_NUM_OF_PROMPTS}
        updateValues={setNumberOfPrompts}
      />
      <PromptsContainer>{prompts}</PromptsContainer>
    </>
  );
}

export default Prompts;
