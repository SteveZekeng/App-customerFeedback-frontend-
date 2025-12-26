import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../../share/modele/staff.model';
import {Page} from '../../share/modele/page.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private baseUrl = 'http://localhost:8083/customFeedback/staff';

  constructor(private http: HttpClient) {}

  createStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(this.baseUrl, staff);
  }

  getAllStaffs(page: number, size: number): Observable<Page<Staff>> {
    return this.http.get<Page<Staff>>(
      `${this.baseUrl}?page=${page}&size=${size}`
    );
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

  getListStaffOrderDesc(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.baseUrl}/listStaffOrderDesc`);
  }

  // getListStaffByAgenceLocation(agenceLocation: string):Observable<Staff[]>{
  //   return this.http.get<Staff[]>(`${this.baseUrl}/listStaffByAgence/${agenceLocation}`);
  // }

  getListStaffByAgenceLocation(agenceLocation: string): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.baseUrl}/listStaffByAgence`,
      { params: { agenceLocation } }
    );
  }

}
