/**
 * Author: Brandon Salvemini
 * Date: 12/12/2024
 * File: delete-inventory-item.component.ts
 * Description: Component file for the delete inventory item component
 */

import { CommonModule, formatNumber } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InventoryItem } from '../inventory-item';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../categories/category.service';
import { SupplierService } from '../../suppliers/supplier.service';
import { Category } from '../../categories/category';
import { Supplier } from '../../suppliers/supplier';
import { InventoryItemService } from '../inventory-item.service';

@Component({
  selector: 'app-delete-inventory-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
  <div class="form-container">
      <h1>Delete inventory item</h1>

      <form [formGroup]="deleteInventoryItemForm">
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" name="id" id="id" formControlName="id" readonly />
      </div>

          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" formControlName="name" readonly />
          </div>
          <div class="form-group">
            <label for="supplier">Supplier:</label>
            <input type="text" name="supplier" id="supplier" formControlName="supplier" readonly>
          </div>
          <div class="form-group">
            <label for="category">Category:</label>
            <input type="text" name="category" id="category" formControlName="category" readonly>
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea rows="8" name="description" id="description" formControlName="description" readonly ></textarea>
          </div>
          <div class="form-group">
            <label for="quantity">Quantity:</label>
            <input type="text" name="quantity" id="quantity" formControlName="quantity" readonly />
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <input type="text" name="price" id="price" formControlName="price" readonly />
          </div>
          <div class="form-actions">
            <input type="button" value="Delete Item" class="deleteButton" (click)="deleteItem()">
            <input type="button" value="Cancel" class="cancelButton" routerLink="/inventory-items">
          </div>
      </form>
    </div>
  `,
  styles: ``
})
export class DeleteInventoryItemComponent {
  inventoryItem: InventoryItem;

  inventoryItemId: string;

  deleteInventoryItemForm: FormGroup = this.fb.group({
    id: [null],
    supplier: [null],
    category: [null],
    name: [null],
    description: [null],
    quantity: [null],
    price: [null]
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private inventoryItemService: InventoryItemService, private categoryService: CategoryService,
    private supplierService: SupplierService) {
      this.inventoryItem = {} as InventoryItem;
      this.inventoryItemId = this.route.snapshot.paramMap.get('inventoryItemId') || "";
    }

    ngOnInit() {
      this.inventoryItemService.getInventoryItem(this.inventoryItemId).subscribe({
        next: (data: any) => {
          this.inventoryItem = data;
          console.log(data);

          // Set id, name, description, quantity, and price
          // Supplier and category are set below
          this.deleteInventoryItemForm.controls['id'].setValue(this.inventoryItem._id);
          this.deleteInventoryItemForm.controls['name'].setValue(this.inventoryItem.name);
          this.deleteInventoryItemForm.controls['description'].setValue(this.inventoryItem.description);
          this.deleteInventoryItemForm.controls['quantity'].setValue(this.inventoryItem.quantity);
          this.deleteInventoryItemForm.controls['price'].setValue(formatNumber(this.inventoryItem.price, 'en-US'));
        },
        error: (err) => {
          console.error('Error fetching details for inventory item:', err);
        },
        complete: () => {
          // Get the supplier name
          this.supplierService.getSupplier(this.inventoryItem.supplierId).subscribe({
            next: (data: Supplier) => {
              this.deleteInventoryItemForm.controls['supplier'].setValue(data['supplierName']);
            }
          });

          // Get the category name
          this.categoryService.getCategory(this.inventoryItem.categoryId).subscribe({
            next: (data: Category) => {
              this.deleteInventoryItemForm.controls['category'].setValue(data['categoryName']);
            }
          });
        }
      });
    }

    deleteItem() {
      if (!confirm('Are you sure you want to delete this item?')) {
        return;
      }

      this.inventoryItemService.deleteInventoryItem(this.inventoryItemId).subscribe({
        next: () => {
          console.log(`Item with ID ${this.inventoryItemId} deleted successfully`);
          this.router.navigate(['/inventory-items']);
        }, error: (err: any) => {
          console.error('Error deleting inventory item:', err);
        }
      })
    }

}
