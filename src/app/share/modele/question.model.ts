import { InputType } from "../enum/input-type.enum";
import { Proposition } from "./proposition.model";

export interface Question {
  id?: number;
  labelQuestion: string;
  inputType: InputType;
  propositions?: Proposition[];
}
