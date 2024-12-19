import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryItemService } from '../inventory-item.service';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../categories/category';
import { Supplier } from '../../suppliers/supplier';
import { AddInventoryItemDTO } from '../inventory-item';
import { CategoryService } from '../../categories/category.service';
import { SupplierService } from '../../suppliers/supplier.service';

@Component({
  selector: 'app-create-inventory-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="form-container">
      <h1>Create an inventory item</h1>
      <form [formGroup]="createInventoryItemForm" (ngSubmit)="createInventoryItem()" class="create-inventory-item">
        <div class="form-group">
          <label for="category">Category:</label>
          <select formControlName="category" name="category" class="select">
          <option [ngValue]="null" [disabled]="true">Select the category</option>
            @for(category of categories; track category) {
              <option value="{{ category.categoryName }}">{{ category.categoryName }}</option>
            }
          </select>
        </div>
        @if (createInventoryItemForm.controls['category'].touched &&
        createInventoryItemForm.controls['category'].hasError('required')) {
          <div class="alert">Category is required.</div>
        }
        <div class="form-group">
          <label for="supplier">Supplier:</label>
          <select formControlName="supplier" name="supplier" class="select">
          <option [ngValue]="null" [disabled]="true">Select the supplier</option>
            @for(supplier of suppliers; track supplier) {
              <option value="{{ supplier.supplierName }}">{{ supplier.supplierName }}</option>
            }
          </select>
        </div>
        @if (createInventoryItemForm.controls['supplier'].touched &&
        createInventoryItemForm.controls['supplier'].hasError('required')) {
          <div class="alert">Supplier is required.</div>
        }
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" name="name" id="name" placeholder="Enter the name" formControlName="name">
        </div>
        @if (createInventoryItemForm.controls['name'].touched &&
        createInventoryItemForm.controls['name'].hasError('required')) {
          <div class="alert">Name is required.</div>
        }
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea rows="8" name="description" id="description" placeholder="Enter the description" formControlName="description"></textarea>
        </div>
        @if (createInventoryItemForm.controls['description'].touched &&
        createInventoryItemForm.controls['description'].hasError('required')) {
          <div class="alert">Description is required.</div>
        }
        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input type="number" name="quantity" id="quantity" min="0" placeholder="Enter the quantity" formControlName="quantity">
        </div>
        @if (createInventoryItemForm.controls['quantity'].touched &&
        createInventoryItemForm.controls['quantity'].hasError('required')) {
          <div class="alert">Quantity is required.</div>
        }
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" name="price" id="price" min="0.0" placeholder="Enter the price" formControlName="price">
        </div>
        @if (createInventoryItemForm.controls['price'].touched &&
        createInventoryItemForm.controls['price'].hasError('required')) {
          <div class="alert">Price is required.</div>
        }
        <div class="form-actions">
          <input type="submit" value="Create item">
          <input type="button" value="Cancel" routerLink="/inventory-items" class="cancelButton">
        </div>
      </form>
    </div>
  `,
  styles: ``
})
export class CreateInventoryItemComponent {
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  errorMessage: string;
  categoryId!: number; // Variable to store categoryId
  supplierId!: number; // Variable to store supplierId

  createInventoryItemForm: FormGroup = this.fb.group({
    category: [null, Validators.compose([Validators.required])],
    supplier: [null, Validators.compose([Validators.required])],
    name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    description: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
    quantity: [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
    price: [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]+.?[0-9]*$")])]
  });

  constructor(private fb: FormBuilder, private router: Router, private inventoryItemService: InventoryItemService,
    private categoryService: CategoryService, private supplierService: SupplierService) {
    this.errorMessage = '';

    // Query to get the categories
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        console.log('categories', data);
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
    // Query to get the suppliers
    this.supplierService.getSuppliers().subscribe({
      next: (data: any) => {
        console.log('suppliers', data);
        this.suppliers = data;
      },
      error: (err) => {
        console.error('Error fetching suppliers:', err);
      }
    });
  }

  createInventoryItem() {
    const categoryName = this.createInventoryItemForm.controls['category'].value;
    const supplierName = this.createInventoryItemForm.controls['supplier'].value;
    const name = this.createInventoryItemForm.controls['name'].value;
    const description = this.createInventoryItemForm.controls['description'].value;
    const quantity = this.createInventoryItemForm.controls['quantity'].value;
    const price = this.createInventoryItemForm.controls['price'].value;

    // Check if the categories array is not empty.
    if (this.categories.length) {
      // Get categoryId from the categories array
      for(let category of this.categories) {
        if(category.categoryName === categoryName) {
          this.categoryId = category.categoryId;
        }
      }
    }

    // Check if the suppliers array is not empty.
    if (this.suppliers.length) {
      // Get supplierId from the suppliers array
      for(let supplier of this.suppliers) {
        if(supplier.supplierName === supplierName) {
          this.supplierId = supplier.supplierId;
        }
      }
    }

    // Check if the createInventoryItemForm is invalid.
    if (!this.createInventoryItemForm.valid) {
      if (name?.length < 3 && name?.length != 0) {
        this.errorMessage = "Name must be at least 3 characters.";
      } else if (name?.length > 100) {
        this.errorMessage = "Name cannot exceed 100 characters.";
      } else if (description?.length < 3 && description?.length != 0) {
        this.errorMessage = "Description must be at least 3 characters.";
      } else if (description?.length > 500) {
        this.errorMessage = "Description cannot exceed 500 characters.";
      } else {
        this.errorMessage = "Please fill in all fields.";
      }

      alert(this.errorMessage);
      return;
    } else {
      const newInventoryItem: AddInventoryItemDTO = {
        categoryId: this.categoryId,
        supplierId: this.supplierId,
        name: name,
        description: description,
        quantity: quantity,
        price: price
      };

      console.log('Creating Inventory Item', newInventoryItem);

      this.inventoryItemService.addInventoryItem(newInventoryItem).subscribe({
        next: (result: any) => {
          console.log(`Inventory Item created successfully: ${result.message}`);
          this.router.navigate(['/inventory-items']);
        },
        error: (error) => {
          console.error('Error creating inventory item', error);
        }
      });
    }
  }
}
