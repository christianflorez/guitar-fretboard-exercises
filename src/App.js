import "./styles.css";
import "fontsource-roboto";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Prompts from "./Prompts";

const StyledPaper = styled(Paper)`
  padding: 1rem;
  width: 40vw;
  max-width: 40vw;
  margin-top: 2rem;
`;

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  return (
    <AppContainer className="App">
      <StyledPaper elevation={3}>
        <h1>Guitar Fretboard Exercises</h1>
        <Prompts />
      </StyledPaper>
    </AppContainer>
  );
}
