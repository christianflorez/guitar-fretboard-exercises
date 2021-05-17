import styled from "styled-components";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import colors from "common/colors";

export const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const LeftHandToolbarContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

export const StyledPaper = styled(Paper)`
  padding: 1rem;
  width: 39vw;
  margin-top: 1rem;
  margin-bottom: 2rem;
  @media (max-width: 1700px) {
    width: 65vw;
  }
  @media (max-width: 1024px) {
    width: 80vw;
  }
`;

export const PromptsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  padding-left: 10%;
`;

export const FilterChipsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 1rem;
  & > div {
    margin-top: 5px;
  }
  & > div:not(:first-of-type) {
    margin-left: 5px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  justify-content: space-between;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  width: 50%;
`;

export const ResetButton = styled(Button)`
  min-width: 80px;
  margin-right: 8px;
`;

export const Answer = styled.div`
  color: skyblue;
  margin-bottom: 0.5rem;
  display: flex;
  padding-left: 3rem;
`;

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

export const SettingsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 400px;
`;

export const SettingsHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

export const SettingsHeader = styled(Typography)`
  margin: 1rem;
`;

export const InputsColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;

  & > div {
    margin-top: 1rem;
    max-width: 10rem;
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const StyledButton = styled(Button)`
  max-height: 5rem;
  margin-top: 2rem;
  && {
    margin-left: 1rem;
  }
`;

export const MultiSelectFormControl = styled(FormControl)`
  margin-top: 1rem;
  && {
    width: 17rem;
    min-width: 17rem;
  }
`;

export const UpperOctaveIcon = styled(ArrowUpwardIcon)`
  color: ${colors.success};
`;

export const LowerOctaveIcon = styled(ArrowDownwardIcon)`
  color: ${colors.error};
`;
