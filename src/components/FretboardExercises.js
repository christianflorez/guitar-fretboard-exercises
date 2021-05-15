import React from "react";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Drawer from "@material-ui/core/Drawer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RefreshIcon from "@material-ui/icons/Refresh";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { getRandomInt } from "../common/utils";
import {
  strings,
  defaultNumberOfPrompts,
  defaultMinFret,
  defaultMaxFret,
} from "../common/constants";
import IdentifyNotePrompt from "./IdentifyNotePrompt";
import IdentifyFretPrompt from "./IdentifyFretPrompt";
import Settings from "./Settings";
import * as S from "./styles";

function getFret(minFret, maxFret, omittedFrets) {
  let isFretValid = false;
  let fretToUse;

  while (!isFretValid) {
    const fret = getRandomInt(minFret, maxFret);
    if (!omittedFrets.includes(fret)) {
      isFretValid = true;
      fretToUse = fret;
    }
  }

  return fretToUse;
}

function FretboardExercises({ isSettingsOpen, setIsSettingsOpen }) {
  const [state, setState] = React.useState({
    numberOfPrompts: defaultNumberOfPrompts,
    minFret: defaultMinFret,
    maxFret: defaultMaxFret,
    omittedFrets: [],
    stringsToUse: strings,
  });
  const [shouldIdentifyFrets, setShouldIdentifyFrets] = React.useState(false);
  const [checkedState, setCheckedState] = React.useState(() =>
    _.times(defaultNumberOfPrompts, () => false)
  );
  const [promptValues, setPromptValues] = React.useState(() =>
    getPromptValues(state)
  );

  function getPromptValues({
    minFret,
    maxFret,
    omittedFrets,
    numberOfPrompts,
    stringsToUse,
  }) {
    const promptRawValues = [];

    _.times(numberOfPrompts, (i) => {
      let isUnique = false;
      while (!isUnique) {
        const stringIndex = getRandomInt(0, stringsToUse.length - 1);
        const fret = getFret(minFret, maxFret, omittedFrets);
        const existingPrompt = _.find(
          promptRawValues,
          (prompt) => prompt.stringIndex === stringIndex && prompt.fret === fret
        );

        if (_.isNil(existingPrompt)) {
          promptRawValues.push({ stringIndex, fret });
          isUnique = true;
        }
      }
    });

    return promptRawValues;
  }

  function updateSettings(updatedValues) {
    const updatedPromptValues = getPromptValues(updatedValues);
    setState(updatedValues);
    setPromptValues(updatedPromptValues);
    if (updatedValues.numberOfPrompts > state.numberOfPrompts) {
      const missingCount =
        updatedValues.numberOfPrompts - state.numberOfPrompts;
      const additionalEmptyCheckedValues = _.times(missingCount, () => false);
      setCheckedState(checkedState.concat(additionalEmptyCheckedValues));
    } else {
      setCheckedState(checkedState.slice(0, updatedValues.numberOfPrompts));
    }
  }

  function handleCheckPrompt(index, updatedValue) {
    const updatedCheckedState = _.map(checkedState, (value, i) => {
      if (i === index) return updatedValue;
      return value;
    });

    setCheckedState(updatedCheckedState);
  }

  function handleChangeGameMode(event) {
    setShouldIdentifyFrets(event.target.checked);
  }

  function handleRefresh() {
    setPromptValues(getPromptValues(state));
    setCheckedState(_.times(defaultNumberOfPrompts, () => false));
  }

  function renderPrompts() {
    return promptValues.map((prompt, i) => {
      return shouldIdentifyFrets ? (
        <IdentifyFretPrompt
          key={i}
          index={i}
          fret={prompt.fret}
          stringIndex={prompt.stringIndex}
          strings={state.stringsToUse}
          checked={checkedState[i]}
          setChecked={handleCheckPrompt}
        />
      ) : (
        <IdentifyNotePrompt
          key={i}
          index={i}
          fret={prompt.fret}
          stringIndex={prompt.stringIndex}
          strings={state.stringsToUse}
          checked={checkedState[i]}
          setChecked={handleCheckPrompt}
        />
      );
    });
  }

  return (
    <>
      <Drawer
        anchor="left"
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      >
        <Settings
          updateSettings={updateSettings}
          state={state}
          setIsSettingsOpen={setIsSettingsOpen}
        />
      </Drawer>
      <S.StyledPaper elevation={3}>
        <S.FilterChipsContainer>
          <Chip label={`Prompts: ${state.numberOfPrompts}`} />
          <Chip label={`Min Fret: ${state.minFret}`} />
          <Chip label={`Max Fret: ${state.maxFret}`} />
          {!_.isEmpty(state.omittedFrets) && (
            <Chip label={`Omitted Frets: ${state.omittedFrets.join(", ")}`} />
          )}
          <Chip label={`Strings to use: ${state.stringsToUse.join(", ")}`} />
        </S.FilterChipsContainer>
        <S.HeaderContainer>
          <Typography variant="h6">Questions</Typography>
          <S.ActionsContainer>
            <Tooltip title="Get new set of questions" placement="top">
              <S.ResetButton
                variant="outlined"
                color="secondary"
                onClick={handleRefresh}
                startIcon={<RefreshIcon />}
              >
                Reset
              </S.ResetButton>
            </Tooltip>
            <Tooltip title="Change the game mode" placement="top">
              <FormControlLabel
                control={
                  <Switch
                    checked={shouldIdentifyFrets}
                    onChange={handleChangeGameMode}
                    name="checkedB"
                    color="secondary"
                  />
                }
                label={
                  shouldIdentifyFrets ? "Identify Notes" : "Identify Frets"
                }
              />
            </Tooltip>
          </S.ActionsContainer>
        </S.HeaderContainer>
        <S.PromptsContainer>{renderPrompts()}</S.PromptsContainer>
      </S.StyledPaper>
    </>
  );
}

export default FretboardExercises;
