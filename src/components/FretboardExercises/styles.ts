import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export const StyledPaper = styled(Paper)`
  padding: 1rem;
  width: 40vw;
  margin-top: 1rem;
  margin-bottom: 2rem;
  @media (max-width: 1700px) {
    width: 65vw;
  }
  @media (max-width: 1024px) {
    width: 80vw;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  width: 50%;
`;

export const FilterChipsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 1rem;
  & > div {
    margin-top: 5px;
  }
  & > div:not(:first-of-type) {
    margin-left: 5px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  justify-content: space-between;
`;

export const PromptsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  padding-left: 10%;
`;

export const ResetButton = styled(Button)`
  min-width: 80px;
  margin-right: 8px;
`;
