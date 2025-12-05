import {Question} from './question.model';

export interface Feedback {
  id?: number;
  customerName: string;
  customerPhone: string;
  comment: string;
  staff_id?: number;
  responses?: Response[];
  questions?: Question[];

}
