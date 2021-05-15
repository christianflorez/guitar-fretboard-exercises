import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

export const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const StyledPaper = styled(Paper)`
  padding: 1rem;
  width: 40vw;
  max-width: 40vw;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const PromptsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  padding-left: 7rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 75%;
  padding-left: 15%;
  justify-content: space-between;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  width: 50%;
`;

export const Answer = styled.div`
  color: skyblue;
  margin-bottom: 0.5rem;
  display: flex;
  padding-left: 3rem;
`;

export const PromptContainer = styled.div`
  cursor: pointer;
`;
