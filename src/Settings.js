import React from "react";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

import styled from "styled-components";
import _ from "lodash";
import {
  defaultNumberOfPrompts,
  defaultMinFret,
  defaultMaxFret,
} from "./constants";

const SettingsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
  padding: 0 15%;
`;

const InputsColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`;

const InputsRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  > div {
    max-width: 8rem;
  }

  &&:not(:first-of-type) {
    margin-top: 1rem;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const StyledButton = styled(Button)`
  max-height: 5rem;
  && {
    margin-left: 1rem;
  }
`;

const MultiSelectFormControl = styled(FormControl)`
  && {
    min-width: 8rem;
    max-width: 25rem;
  }
`;

function Settings({
  updatePromptsAmount,
  updateMinFret,
  updateMaxFret,
  updateOmittedFrets,
}) {
  const [numberOfPrompts, setNumberOfPrompts] = React.useState(
    defaultNumberOfPrompts
  );

  const [minFret, setMinFret] = React.useState(defaultMinFret);
  const [maxFret, setMaxFret] = React.useState(defaultMaxFret);
  const [omittedFrets, setOmittedFrets] = React.useState([]);

  React.useEffect(() => {
    const newOmittedFrets = omittedFrets.filter(
      (fret) => fret >= minFret && fret <= maxFret
    );
    if (!_.isEqual(newOmittedFrets, omittedFrets)) {
      setOmittedFrets(newOmittedFrets);
    }
  }, [maxFret, minFret, omittedFrets]);

  const handleMultiSelectChange = (event) => {
    setOmittedFrets(event.target.value);
  };

  function handleNumPromptsChange(event) {
    setNumberOfPrompts(event.target.value);
  }

  function handleMinFretChange(event) {
    const value = Number(event.target.value);
    if (value < defaultMinFret) return;
    setMinFret(event.target.value);
  }

  function handleMaxFretChange(event) {
    const value = Number(event.target.value);
    if (value > defaultMaxFret) return;
    setMaxFret(event.target.value);
  }

  function handleChangeNumPromptsSlider(event, newValue) {
    setNumberOfPrompts(newValue);
  }

  function onSubmit() {
    updatePromptsAmount(numberOfPrompts);
    updateMinFret(minFret);
    updateMaxFret(maxFret);
    updateOmittedFrets(omittedFrets);
  }

  const possibleFrets = _.chain(defaultMaxFret + 1)
    .times((i) => {
      if (i >= minFret && i <= maxFret) return i;
      return null;
    })
    .filter((i) => !_.isNil(i))
    .value();

  return (
    <>
      <Typography variant="h5">Settings</Typography>
      <SettingsContainer>
        <InputsColumn>
          <InputsRow>
            <InputsContainer>
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
                max={200}
                defaultValue={defaultNumberOfPrompts}
              />
            </InputsContainer>
            <InputsContainer>
              <TextField
                id="minFretInput"
                value={minFret}
                onChange={handleMinFretChange}
                type="number"
                label="Min Fret"
                variant="outlined"
              />
            </InputsContainer>
            <InputsContainer>
              <TextField
                id="maxFretInput"
                value={maxFret}
                onChange={handleMaxFretChange}
                type="number"
                label="Max Fret"
                variant="outlined"
              />
            </InputsContainer>
          </InputsRow>
          <InputsRow>
            <MultiSelectFormControl>
              <InputLabel id="mutiple-chip-label">Frets to Omit</InputLabel>
              <Select
                labelId="mutiple-chip-label"
                id="mutiple-chip"
                multiple
                value={omittedFrets}
                onChange={handleMultiSelectChange}
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
            </MultiSelectFormControl>
          </InputsRow>
        </InputsColumn>
        <StyledButton variant="contained" color="primary" onClick={onSubmit}>
          Update
        </StyledButton>
      </SettingsContainer>
    </>
  );
}

export default Settings;
