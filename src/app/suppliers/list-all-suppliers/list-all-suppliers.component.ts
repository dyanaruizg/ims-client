/**
 * Author: Brandon Salvemini
 * Date: 12/15/2024
 * File: list-all-suppliers.component.ts
 * Description: Component file for the list all suppliers component
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Supplier } from '../supplier';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-list-all-suppliers',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="all-suppliers-page">
    <h1 class="all-suppliers-page__title">All Suppliers</h1>

    @if (suppliers && suppliers.length > 0) {
      <table class="all-suppliers-page__table">
        <thead class="all-suppliers-page__table-head">
          <tr class="all-suppliers-page__table-head">
            <th class="all-suppliers-page__table-header">ID</th>
            <th class="all-suppliers-page__table-header">Supplier ID</th>
            <th class="all-suppliers-page__table-header">Supplier Name</th>
            <th class="all-suppliers-page__table-header">Contact Information</th>
            <th class="all-suppliers-page__table-header">Address</th>
          </tr>
        </thead>
        <tbody class="all-suppliers-page__table-body">
          @for (supplier of suppliers; track supplier) {
            <tr class="all-suppliers-page__table-row">
              <td class="all-suppliers-page__table-cell">{{ supplier._id }}</td>
              <td class="all-suppliers-page__table-cell">{{ supplier.supplierId }}</td>
              <td class="all-suppliers-page__table-cell">{{ supplier.supplierName }}</td>
              <td class="all-suppliers-page__table-cell">{{ supplier.contactInformation }}</td>
              <td class="all-suppliers-page__table-cell">{{ supplier.address }}</td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <p class="all-suppliers-page__no-suppliers">No suppliers found</p>
    }

  </div>
  `,
  styles: `
    .all-suppliers-page {
      max-width: 80%;
      margin: 0 auto;
      padding: 20px;
    }

    .all-suppliers-page__title {
      text-align: left;
    }

    .all-suppliers-page__table {
      width: 100%;
      border-collapse: collapse;
    }

    .all-suppliers-page__table-header {
      background-color: #B2742D;
      color: #000;
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .all-suppliers-page__table-cell {
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .all-suppliers-page__no-suppliers {
      text-align: center;
      color: #6c757d;
    }
  `
})
export class ListAllSuppliersComponent {
  suppliers: Supplier[] = [];

  constructor (private supplierService: SupplierService) {
    supplierService.getAllSuppliers().subscribe({
      next: (data: any) => {
        this.suppliers = data;
      },
      error: (err) => {
        console.error('Error fetching all suppliers: ', err);
      }
    })
  }
}
