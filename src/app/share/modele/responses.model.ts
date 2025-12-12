import {Question} from './question.model';

export interface Responses{
  id?: number;
  value?: number;
  selectedLabel?: string;
  question_id: number;
  feedback_id: number;
}
