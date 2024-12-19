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
  selector: 'app-read-inventory-item-by-id',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="form-container">
      <h1>Read inventory item</h1>

      <form [formGroup]="readInventoryItemForm">
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
            <input type="submit" value="Update Item" id="updateItemBtn" (click)="updateItem()">
            <input type="button" value="Delete Item" class="deleteButton" (click)="deleteItem()">
            <input type="button" value="Back" class="cancelButton" routerLink="/inventory-items">
          </div>
      </form>
    </div>
  `,
  styles: `
    input#id {
      margin-left: 4px;
      width: calc(100% - 100px);
    }
  `,
})
export class ReadInventoryItemByIdComponent {
  inventoryItem: InventoryItem;

  inventoryItemId: string;

  readInventoryItemForm: FormGroup = this.fb.group({
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
          this.readInventoryItemForm.controls['id'].setValue(this.inventoryItem._id);
          this.readInventoryItemForm.controls['name'].setValue(this.inventoryItem.name);
          this.readInventoryItemForm.controls['description'].setValue(this.inventoryItem.description);
          this.readInventoryItemForm.controls['quantity'].setValue(this.inventoryItem.quantity);
          this.readInventoryItemForm.controls['price'].setValue(formatNumber(this.inventoryItem.price, 'en-US'));
        },
        error: (err) => {
          console.error('Error fetching details for inventory item:', err);
        },
        complete: () => {
          // Get the supplier name
          this.supplierService.getSupplier(this.inventoryItem.supplierId).subscribe({
            next: (data: Supplier) => {
              this.readInventoryItemForm.controls['supplier'].setValue(data['supplierName']);
            }
          });

          // Get the category name
          this.categoryService.getCategory(this.inventoryItem.categoryId).subscribe({
            next: (data: Category) => {
              this.readInventoryItemForm.controls['category'].setValue(data['categoryName']);
            }
          });
        }
      });
    }

  updateItem() {
    this.router.navigate([`/inventory-items/${this.inventoryItem._id}`])
  }

  deleteItem() {
    this.router.navigate([`/delete-inventory-item/${this.inventoryItem._id}`])
  }
}
