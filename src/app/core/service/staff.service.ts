import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../../share/modele/staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private baseUrl = 'http://localhost:8083/customFeedback/staff';

  constructor(private http: HttpClient) {}

  createStaff(staff: Staff): Observable<string> {
    return this.http.post<string>(this.baseUrl, staff);
  }

  getAllStaffs(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.baseUrl);
  }

  getStaffById(id: number): Observable<Staff> {
    return this.http.get<Staff>(`${this.baseUrl}/${id}`);
  }

  updateStaff(id: number, staff: Staff): Observable<Staff> {
    return this.http.put<Staff>(`${this.baseUrl}/${id}`, staff);
  }

  deleteStaff(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getStaffByAgence(agenceId: number): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.baseUrl}/staffAgence/${agenceId}`);
  }

}
