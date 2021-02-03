import React from "react";
import Input from "@material-ui/core/Input";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import _ from "lodash";

const SettingsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 0 30%;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

function Settings({ defaultValue, updateValues }) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeSlider = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h5">Settings</Typography>
      <SettingsContainer>
        <InputsContainer>
          <Slider
            value={value}
            onChange={handleChangeSlider}
            aria-labelledby="continuous-slider"
            min={1}
            max={200}
            defaultValue={defaultValue}
          />
          <Input
            id="amountOfPrompts"
            value={value}
            onChange={handleChange}
            type="number"
          />
        </InputsContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateValues(value)}
        >
          Update
        </Button>
      </SettingsContainer>
    </>
  );
}

export default Settings;
