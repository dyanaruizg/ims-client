import { Component } from '@angular/core';
import { InventoryItemWithDetails } from '../inventory-item';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-all-inventory-items',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="all-items-page">
      <h1 class="all-items-page__title">All Items</h1>

      <button class="all-items-page__button" routerLink="/search-inventory-items">Search inventory item</button>

      @if (inventoryItems && inventoryItems.length > 0) {
        <table class="all-items-page__table">
          <thead class="all-items-page__table-head">
            <tr class="all-items-page__table-head">
              <th class="all-items-page__table-header">ID</th>
              <th class="all-items-page__table-header">Category</th>
              <th class="all-items-page__table-header">Supplier</th>
              <th class="all-items-page__table-header">Name</th>
              <th class="all-items-page__table-header">Description</th>
              <th class="all-items-page__table-header">Quantity</th>
              <th class="all-items-page__table-header">Price</th>
              <th class="all-items-page__table-header">Functions</th>
            </tr>
          </thead>
          <tbody class="all-items-page__table-body">
            @for (inventoryItem of inventoryItems; track inventoryItem) {
              <tr class="all-items-page__table-row">
                <td class="all-items-page__table-cell"><a routerLink="/read-inventory-item/{{ inventoryItem._id }}">{{ inventoryItem._id }}</a></td>
                <td class="all-items-page__table-cell">{{ inventoryItem.categoryDetails.categoryName }}</td>
                <td class="all-items-page__table-cell">{{ inventoryItem.supplerDetails.supplierName }}</td>
                <td class="all-items-page__table-cell">{{ inventoryItem.name }}</td>
                <td class="all-items-page__table-cell">{{ inventoryItem.description }}</td>
                <td class="all-items-page__table-cell">{{ inventoryItem.quantity }}</td>
                <td class="all-items-page__table-cell">{{ inventoryItem.price | currency: 'USD' }}</td>
                <td class="all-items-page__table-cell all-items-page__table-cell--functions">
                  <a routerLink="/inventory-items/{{ inventoryItem._id }}"
                  class="all-items-page__icon-link"><i class="fas fa-edit"></i></a>
                  <a routerLink="/delete-inventory-item/{{ inventoryItem._id }}" class="all-items-page__icon-link">
                    <i class="fas fa-trash-alt"></i></a>
                </td>
              </tr>
            }
          </tbody>
        </table>
      } @else {
        <p class="all-items-page__no-items">No items found</p>
      }
    </div>
  `,
  styles: `
    .all-items-page {
      max-width: 80%;
      margin: 0 auto;
      padding: 20px;
    }

    .all-items-page__title {
      text-align: left;
    }

    .all-items-page__table {
      width: 100%;
      border-collapse: collapse;
    }

    .all-items-page__table-header {
      background-color: #B2742D;
      color: #000;
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .all-items-page__table-cell {
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .all-items-page__table-cell--functions {
      text-align: center;
    }

    .all-items-page__no-items {
      text-align: center;
      color: #6c757d;
    }

    .all-items-page__icon-link {
      cursor: pointer;
      color: #6c757d;
      text-decoration: none;
      margin: 0 5px;
    }

    .all-items-page__button {
      background-color: #B2742D;
      float: right;
      width: 200px;
      margin-bottom: 20px;
      padding: 12px;
      border: none;
      cursor: pointer;
      text-align: center;
      font-size: 15px;
      font-weight: 600;
    }
  `
})
export class ListAllInventoryItemsComponent {
  inventoryItems: InventoryItemWithDetails[] = [];

  constructor(private http: HttpClient) {
    this.http.get(`${environment.apiBaseUrl}/api/items`).subscribe({
      next: (data: any) => {
        this.inventoryItems = data;
      }
    })
  }
}
