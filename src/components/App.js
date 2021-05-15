import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import FretboardExercises from "./FretboardExercises";
import * as S from "./styles";

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
          <IconButton edge="start" color="inherit">
            <MusicNoteIcon />
          </IconButton>
          <Typography variant="h6">Guitar Fretboard Exerciser</Typography>
        </Toolbar>
      </AppBar>
      <S.AppContainer className="App">
        <FretboardExercises />
      </S.AppContainer>
    </ThemeProvider>
  );
}
