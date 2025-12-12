import {Question} from './question.model';
import {Responses} from './responses.model';
import {Staff} from './staff.model';

export interface Feedback {
  id?: number;
  customerName: string;
  customerPhone: string;
  comment: string;
  staff_id?: Staff;
  responses?: Responses[];
  questions?: Question[];

}
