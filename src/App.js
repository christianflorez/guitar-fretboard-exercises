import "./styles.css";
import "fontsource-roboto";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import styled from "styled-components";
import FretboardExercises from "./FretboardExercises";

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const theme = createMuiTheme({
  palette: {
    primary: { main: "#9c27b0" },
    secondary: {
      main: "#d81b60",
    },

    alternateTextColor: "#FFFFFF",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Guitar Fretboard Exerciser</Typography>
        </Toolbar>
      </AppBar>
      <AppContainer className="App">
        <FretboardExercises />
      </AppContainer>
    </ThemeProvider>
  );
}
