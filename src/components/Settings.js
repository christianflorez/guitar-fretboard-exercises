import React from "react";
import _ from "lodash";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import * as S from "./styles";
import {
  defaultNumberOfPrompts,
  defaultMinFret,
  defaultMaxFret,
  strings as allStrings,
} from "../common/constants";

function Settings({ updateSettings, setIsSettingsOpen, state }) {
  const [numberOfPrompts, setNumberOfPrompts] = React.useState(
    state.numberOfPrompts
  );
  const [minFret, setMinFret] = React.useState(state.minFret);
  const [maxFret, setMaxFret] = React.useState(state.maxFret);
  const [omittedFrets, setOmittedFrets] = React.useState(state.omittedFrets);
  const [strings, setStrings] = React.useState(state.stringsToUse);

  const currentTotalPossiblePrompts =
    (Number(maxFret) + 1 - Number(minFret)) * strings.length -
    omittedFrets.length * strings.length;

  React.useEffect(() => {
    const newOmittedFrets = omittedFrets.filter(
      (fret) => fret >= minFret && fret <= maxFret
    );
    if (!_.isEqual(newOmittedFrets, omittedFrets)) {
      setOmittedFrets(newOmittedFrets);
    }
  }, [maxFret, minFret, omittedFrets]);

  function adjustNumberOfPrompts(
    minFretToUse,
    maxFretToUse,
    omittedFretsToUse,
    stringsAvailable
  ) {
    const newTotalPossiblePrompts =
      (Number(maxFretToUse) + 1 - Number(minFretToUse)) *
        stringsAvailable.length -
      omittedFretsToUse.length * stringsAvailable.length;

    if (newTotalPossiblePrompts < numberOfPrompts) {
      setNumberOfPrompts(newTotalPossiblePrompts);
    }
  }

  function handleNumPromptsChange(event) {
    const value = Number(event.target.value);
    if (value > currentTotalPossiblePrompts) return;
    setNumberOfPrompts(Number(event.target.value));
  }

  function handleNumPromptsChange(event) {
    const value = event.target.value;
    setOmittedFrets(value);

    adjustNumberOfPrompts(minFret, maxFret, value, strings);
  }

  function handleStringsChange(event) {
    const value = event.target.value;
    setStrings(value);

    adjustNumberOfPrompts(minFret, maxFret, omittedFrets, value);
  }

  function handleMinFretChange(event) {
    const value = Number(event.target.value);
    if (value < defaultMinFret || value >= defaultMaxFret) return;
    setMinFret(value);

    adjustNumberOfPrompts(value, maxFret, omittedFrets, strings);
  }

  function handleMaxFretChange(event) {
    const value = Number(event.target.value);
    if (value > defaultMaxFret || value <= minFret) return;
    setMaxFret(value);

    adjustNumberOfPrompts(minFret, value, omittedFrets, strings);
  }

  function handleChangeNumPromptsSlider(event, newValue) {
    setNumberOfPrompts(newValue);
  }

  function onSubmit() {
    const updatedState = {
      numberOfPrompts,
      minFret,
      maxFret,
      omittedFrets,
      stringsToUse: strings,
    };
    updateSettings(updatedState);
    setIsSettingsOpen(false);
  }

  const possibleFrets = _.chain(defaultMaxFret + 1)
    .times((i) => {
      if (i >= minFret && i <= maxFret) return i;
      return null;
    })
    .filter((i) => !_.isNil(i))
    .value();

  console.log("omittedFrets", omittedFrets);
  return (
    <>
      <S.SettingsHeaderContainer>
        <S.SettingsHeader variant="h5">Settings</S.SettingsHeader>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => setIsSettingsOpen(false)}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
      </S.SettingsHeaderContainer>
      <div>
        <S.SettingsContainer>
          <S.InputsColumn>
            <S.InputsContainer>
              <TextField
                id="amountOfPrompts"
                value={numberOfPrompts}
                onChange={handleNumPromptsChange}
                type="number"
                label="Number of Questions"
                variant="outlined"
              />
              <Slider
                value={numberOfPrompts}
                onChange={handleChangeNumPromptsSlider}
                aria-labelledby="continuous-slider"
                min={1}
                max={currentTotalPossiblePrompts}
                defaultValue={defaultNumberOfPrompts}
              />
            </S.InputsContainer>
            <S.InputsContainer>
              <TextField
                id="minFretInput"
                value={minFret}
                onChange={handleMinFretChange}
                type="number"
                label="Min Fret"
                variant="outlined"
              />
            </S.InputsContainer>
            <S.InputsContainer>
              <TextField
                id="maxFretInput"
                value={maxFret}
                onChange={handleMaxFretChange}
                type="number"
                label="Max Fret"
                variant="outlined"
              />
            </S.InputsContainer>
            <S.MultiSelectFormControl>
              <InputLabel id="mutiple-chip-label">Frets to Omit</InputLabel>
              <Select
                labelId="mutiple-chip-label"
                id="mutiple-chip"
                multiple
                value={omittedFrets}
                onChange={handleNumPromptsChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {possibleFrets.map((fret) => (
                  <MenuItem key={fret} value={fret}>
                    {fret}
                  </MenuItem>
                ))}
              </Select>
            </S.MultiSelectFormControl>
            <S.MultiSelectFormControl>
              <InputLabel id="mutiple-chip-label2">Strings to use</InputLabel>
              <Select
                labelId="mutiple-chip-label"
                id="mutiple-chip"
                multiple
                value={strings}
                onChange={handleStringsChange}
                input={<Input id="select-multiple-chip2" />}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {allStrings.map((string) => (
                  <MenuItem key={string} value={string}>
                    {string}
                  </MenuItem>
                ))}
              </Select>
            </S.MultiSelectFormControl>
            <S.StyledButton
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Update
            </S.StyledButton>
          </S.InputsColumn>
        </S.SettingsContainer>
      </div>
    </>
  );
}

export default Settings;
