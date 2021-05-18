import styled from "styled-components";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";

export const SettingsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 400px;
`;

export const SettingsHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

export const SettingsHeader = styled(Typography)`
  margin: 1rem;
`;

export const InputsColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;

  & > div {
    margin-top: 1rem;
    max-width: 10rem;
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const MultiSelectFormControl = styled(FormControl)`
  margin-top: 1rem;
  && {
    width: 17rem;
    min-width: 17rem;
  }
`;

export const StyledButton = styled(Button)`
  max-height: 5rem;
  margin-top: 2rem;
  && {
    margin-left: 1rem;
  }
`;
