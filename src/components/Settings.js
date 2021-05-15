import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import _ from "lodash";
import {
  defaultNumberOfPrompts,
  defaultMinFret,
  defaultMaxFret,
  strings as allStrings,
} from "../common/constants";

const StyledAccordion = styled(Accordion)`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  && {
    && {
      margin-top: 1rem;
      width: 40vw;
    }
  }
`;

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

function Settings({ updateState, stringsToUse }) {
  const [numberOfPrompts, setNumberOfPrompts] = React.useState(
    defaultNumberOfPrompts
  );
  const [minFret, setMinFret] = React.useState(defaultMinFret);
  const [maxFret, setMaxFret] = React.useState(defaultMaxFret);
  const [omittedFrets, setOmittedFrets] = React.useState([]);
  const [strings, setStrings] = React.useState(stringsToUse);

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
    updateState(updatedState);
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
      <StyledAccordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                    max={currentTotalPossiblePrompts}
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
                </MultiSelectFormControl>
                <MultiSelectFormControl>
                  <InputLabel id="mutiple-chip-label2">
                    Strings to use
                  </InputLabel>
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
                </MultiSelectFormControl>
              </InputsRow>
            </InputsColumn>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Update
            </StyledButton>
          </SettingsContainer>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
}

export default Settings;
