import {Agence} from './agence.model';

export interface Staff {
  id?: number;
  staffName: string;
  staffPhone: string;
  staffEmail: string;
  matricule: string;
  agence_id: Agence;
  average?: number;
}
