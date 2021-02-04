import React from "react";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
  > div {
    max-width: 8rem;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const StyledButton = styled(Button)`
  max-height: 5rem;
`;

function Settings({ updatePromptsAmount, updateMinFret, updateMaxFret }) {
  const [numberOfPrompts, setNumberOfPrompts] = React.useState(
    defaultNumberOfPrompts
  );

  const [minFret, setMinFret] = React.useState(defaultMinFret);
  const [maxFret, setMaxFret] = React.useState(defaultMaxFret);

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
  }

  return (
    <>
      <Typography variant="h5">Settings</Typography>
      <SettingsContainer>
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
        <StyledButton variant="contained" color="primary" onClick={onSubmit}>
          Update
        </StyledButton>
      </SettingsContainer>
    </>
  );
}

export default Settings;
