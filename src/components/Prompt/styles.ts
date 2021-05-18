import styled from "styled-components";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import colors from "common/colors";

export const PromptContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

export const PromptQuestion = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const Answer = styled.div`
  color: skyblue;
  margin-bottom: 0.5rem;
  display: flex;
  padding-left: 3rem;
`;

export const StringName = styled.b`
  margin-left: 4px;
`;

export const UpperOctaveIcon = styled(ArrowUpwardIcon)`
  color: ${colors.success};
`;

export const LowerOctaveIcon = styled(ArrowDownwardIcon)`
  color: ${colors.error};
`;
