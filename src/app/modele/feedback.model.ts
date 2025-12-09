import {Question} from './question.model';
import {Responses} from './responses.model';

export interface Feedback {
  id?: number;
  customerName: string;
  customerPhone: string;
  comment: string;
  staff_id?: number;
  responses?: Responses[];
  questions?: Question[];

}
