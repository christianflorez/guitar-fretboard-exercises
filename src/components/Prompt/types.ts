export interface PromptProps {
  index: number;
  fret: number;
  stringIndex: number;
  checked: boolean;
  setChecked: (index: number, updatedValue: boolean) => void;
  strings: string[];
}
