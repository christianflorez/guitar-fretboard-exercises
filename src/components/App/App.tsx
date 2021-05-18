import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import SettingsIcon from "@material-ui/icons/Settings";
import FretboardExercises from "components/FretboardExercises";
import * as S from "./styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#9c27b0" },
    secondary: {
      main: "#d81b60",
    },
  },
});

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <S.ToolbarContainer>
            <S.LeftHandToolbarContainer>
              <IconButton edge="start" color="inherit">
                <MusicNoteIcon fontSize="large" />
              </IconButton>
              <Typography variant="h6">Guitar Fretboard Exerciser</Typography>
            </S.LeftHandToolbarContainer>
            <div>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                <SettingsIcon fontSize="large" />
              </IconButton>
            </div>
          </S.ToolbarContainer>
        </Toolbar>
      </AppBar>
      <S.AppContainer className="App">
        <FretboardExercises
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
        />
      </S.AppContainer>
    </ThemeProvider>
  );
}
