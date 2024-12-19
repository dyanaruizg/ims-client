import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateSupplierDTO, Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getAllSuppliers() {
    return this.http.get<Supplier[]>(`${environment.apiBaseUrl}/api/suppliers/all`);
  }

  getSuppliers() {
    return this.http.get<Supplier[]>(`${environment.apiBaseUrl}/api/suppliers`);
  }

  getSupplier(supplierId: number) {
    return this.http.get<Supplier>(`${environment.apiBaseUrl}/api/suppliers/${supplierId}`);
  }

  createSupplier(supplier: CreateSupplierDTO) {
    return this.http.post<Supplier>(`${environment.apiBaseUrl}/api/createSupplier`, supplier);
  }
}
