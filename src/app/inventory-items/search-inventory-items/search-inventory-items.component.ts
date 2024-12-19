import { Component } from '@angular/core';
import { InventoryItemWithDetails } from '../inventory-item';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InventoryItemService } from '../inventory-item.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-inventory-items',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="search-items-page">
      <h1 class="search-items-page__title">Search Items</h1>

      <input type="search" placeholder="Search inventory item" class="search-inventory-item"
      [formControl]="txtSearchControl">

      <h2 class="search-items-page__title">Results</h2>

      @if (inventoryItems && inventoryItems.length > 0) {
        <table class="search-items-page__table">
          <thead class="search-items-page__table-head">
            <tr class="search-items-page__table-head">
              <th class="search-items-page__table-header">ID</th>
              <th class="search-items-page__table-header">Category</th>
              <th class="search-items-page__table-header">Supplier</th>
              <th class="search-items-page__table-header">Name</th>
              <th class="search-items-page__table-header">Description</th>
              <th class="search-items-page__table-header">Quantity</th>
              <th class="search-items-page__table-header">Price</th>
              <th class="search-items-page__table-header">Functions</th>
            </tr>
          </thead>
          <tbody class="search-items-page__table-body">
            @for (inventoryItem of inventoryItems; track inventoryItem) {
              <tr class="search-items-page__table-row">
                <td class="search-items-page__table-cell"><a routerLink="/read-inventory-item/{{ inventoryItem._id }}">{{ inventoryItem._id }}</a></td>
                <td class="search-items-page__table-cell">{{ inventoryItem.categoryDetails.categoryName }}</td>
                <td class="search-items-page__table-cell">{{ inventoryItem.supplerDetails.supplierName }}</td>
                <td class="search-items-page__table-cell">{{ inventoryItem.name }}</td>
                <td class="search-items-page__table-cell">{{ inventoryItem.description }}</td>
                <td class="search-items-page__table-cell">{{ inventoryItem.quantity }}</td>
                <td class="search-items-page__table-cell">{{ inventoryItem.price | currency: 'USD' }}</td>
                <td class="search-items-page__table-cell all-items-page__table-cell--functions">
                  <a routerLink="/inventory-items/{{ inventoryItem._id }}"
                  class="search-items-page__icon-link"><i class="fas fa-edit"></i></a>
                  <a routerLink="/delete-inventory-item/{{ inventoryItem._id }}" class="search-items-page__icon-link">
                    <i class="fas fa-trash-alt"></i></a>
                </td>
              </tr>
            }
          </tbody>
        </table>
      } @else {
        <p class="search-items-page__no-items">No items found</p>
      }
    </div>
  `,
  styles: `
    .search-items-page {
      max-width: 80%;
      margin: 0 auto;
      padding: 20px;
    }

    .search-items-page__title {
      text-align: left;
    }

    .search-items-page__table {
      width: 100%;
      border-collapse: collapse;
    }

    .search-items-page__table-header {
      background-color: #B2742D;
      color: #000;
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .search-items-page__table-cell {
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .search-items-page__table-cell--functions {
      text-align: center;
    }

    .search-items-page__no-items {
      text-align: center;
      color: #6c757d;
    }

    .search-items-page__icon-link {
      cursor: pointer;
      color: #6c757d;
      text-decoration: none;
      margin: 0 5px;
    }

    .search-inventory-item {
      background: url(/assets/search-symbol.png) no-repeat scroll;
      background-size: 14px;
      background-position-y: center;
      background-position-x: 3px;
      padding: 6px 0 6px 22px;
      border: 1px solid rgba(33, 35, 38, 0.1);
      border-radius: 5px;
      font-size: 1em;
      width: 30%;
    }
  `
})
export class SearchInventoryItemsComponent {
  inventoryItems: InventoryItemWithDetails[] = [];

  txtSearchControl = new FormControl('');

  constructor(private inventoryItemService: InventoryItemService) {
    this.txtSearchControl.valueChanges.pipe(debounceTime(500)).subscribe(
      val => this.filterItems(val || '')
    );
  }

  // Function to filter the inventory items by name
  filterItems(name: string) {
    this.inventoryItemService.searchInventoryItems(name).subscribe({
      next: (inventoryItems: InventoryItemWithDetails[]) => {
        this.inventoryItems = inventoryItems;
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving items: ${err}`);
        this.inventoryItems = [];
      }
    });
  }
}
