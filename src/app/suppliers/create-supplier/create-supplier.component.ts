import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierService } from '../supplier.service';
import { CreateSupplierDTO } from '../supplier';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-supplier',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="create-supplier-page">
      <h1 class="create-supplier-page__title">Create a supplier</h1>

      <form [formGroup]="createSupplierForm" (ngSubmit)="createSupplier()" class="create-supplier-page__form">
        <div class="create-supplier-page__form-group">
          <label for="supplierName" class="create-supplier-page__form-label">Supplier Name:</label>
          <div class="create-supplier-page__form-validation">
            <input type="text" name="supplierName" id="supplierName" placeholder="Enter the supplier name"
            class="create-supplier-page__form-control" formControlName="supplierName">
            @if (createSupplierForm.controls['supplierName'].touched &&
            createSupplierForm.controls['supplierName'].hasError('required')) {
              <div class="create-supplier-page__alert">Supplier Name is required.</div>
            }
          </div>
        </div>
        <div class="create-supplier-page__form-group">
          <label for="contactInformation" class="create-supplier-page__form-label">Contact information:</label>
          <div class="create-supplier-page__form-validation">
            <input type="tel" name="contactInformation" id="contactInformation"
            class="create-supplier-page__form-control" formControlName="contactInformation"
            placeholder="Enter the contact number">
            @if (createSupplierForm.controls['contactInformation'].touched &&
            createSupplierForm.controls['contactInformation'].hasError('required')) {
              <div class="create-supplier-page__alert">Contact Information is required.</div>
            } @else if (createSupplierForm.controls['contactInformation'].hasError('pattern')) {
              <div class="create-supplier-page__alert">Contact Information format: 123-456-7890.</div>
            }
          </div>
        </div>
        <div class="create-supplier-page__form-group">
          <label for="address" class="create-supplier-page__form-label">Address:</label>
          <div class="create-supplier-page__form-validation">
            <input type="text" name="address" id="address" placeholder="Enter the address"
            class="create-supplier-page__form-control" formControlName="address">
            @if (createSupplierForm.controls['address'].touched &&
            createSupplierForm.controls['address'].hasError('required')) {
              <div class="create-supplier-page__alert">Address is required.</div>
            }
          </div>
        </div>
        <div class="form-actions">
          <input type="submit" value="Create supplier">
          <input type="button" value="Cancel" routerLink="/suppliers" class="cancelButton">
        </div>
      </form>
    </div>
  `,
  styles: `
    .create-supplier-page {
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 1px solid rgba(33, 35, 38, 0.1);
      border-radius: 5px;
      margin: 50px;
      padding: 50px;
    }

    .create-supplier-page__form-label {
      display: inline-block;
      width: 200px;
      font-weight: 600;
    }

    .create-supplier-page__form-group {
      display: flex;
      align-items: baseline;
    }

    .create-supplier-page__form-validation {
      width: calc(100% - 100px);
    }

    .create-supplier-page__form-control {
      margin: 10px 0;
      padding: 8px;
      width: 100%;
      font-family: "Open Sans", sans-serif;
      font-optical-sizing: auto;
      font-weight: 400;
      font-style: normal;
      font-size: 1em;
      border: 1px solid rgba(33, 35, 38, 0.1);
      border-radius: 4px;
    }

    .create-supplier-page__alert {
      color: #a70000;
      text-align: left;
      margin-bottom: 5px;
      font-size: 12px;
      background-color: #fbdcdc;
      border: 2px solid #a70000;
      border-radius: 3px;
      padding: 10px;
    }
  `
})
export class CreateSupplierComponent {
  errorMessage: string;

  createSupplierForm: FormGroup = this.fb.group({
    supplierName: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    contactInformation: [null, Validators.compose([Validators.required, Validators.pattern("[0-9]{3}-[0-9]{3}-[0-9]{4}")])],
    address: [null, Validators.compose([Validators.required, Validators.maxLength(200)])]
  });

  constructor(private fb: FormBuilder, private router: Router, private supplierService: SupplierService) {
    this.errorMessage = '';
  }

  createSupplier() {
    const supplierName = this.createSupplierForm.controls['supplierName'].value;
    const contactInformation = this.createSupplierForm.controls['contactInformation'].value;
    const address = this.createSupplierForm.controls['address'].value;

    // Check if the createSupplierForm is invalid.
    if (!this.createSupplierForm.valid) {
      if (supplierName?.length < 3 && supplierName?.length != 0) {
        this.errorMessage = "Supplier Name must be at least 3 characters.";
      } else if (supplierName?.length > 100) {
        this.errorMessage = "Supplier Name cannot exceed 100 characters.";
      } else if (address?.length > 200) {
        this.errorMessage = "Address cannot exceed 200 characters.";
      } else {
        this.errorMessage = "Please fill in all fields.";
      }

      alert(this.errorMessage);
      return;
    } else {
      const newSupplier: CreateSupplierDTO = {
        supplierName: supplierName,
        contactInformation: contactInformation,
        address: address
      };

      console.log('Creating Supplier', newSupplier);

      this.supplierService.createSupplier(newSupplier).subscribe({
        next: (result: any) => {
          console.log(`Supplier created successfully: ${result.message}`);
          this.router.navigate(['/suppliers']);
        },
        error: (error) => {
          console.error('Error creating supplier', error);
        }
      });
    }
  }
}
