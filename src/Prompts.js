import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { getRandomInt } from "./utils";
import Prompt from "./Prompt";
import { strings } from "./utils";

const NUM_OF_PROMPTS = 25;

const PromptsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  padding-left: 7rem;
`;

function Prompts() {
  const prompts = _.times(NUM_OF_PROMPTS, (i) => {
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

  return <PromptsContainer>{prompts}</PromptsContainer>;
}

export default Prompts;
