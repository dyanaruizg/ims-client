/**
 * Author: Brandon Salvemini
 * Date: 12/15/2024
 * File: list-all-suppliers.component.spec.ts
 * Description: Test file for the list all suppliers component
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllSuppliersComponent } from './list-all-suppliers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SupplierService } from '../supplier.service';
import { throwError } from 'rxjs';

describe('ListAllSuppliersComponent', () => {
  let component: ListAllSuppliersComponent;
  let fixture: ComponentFixture<ListAllSuppliersComponent>;
  let supplierService: SupplierService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ListAllSuppliersComponent],
      providers: [SupplierService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllSuppliersComponent);
    component = fixture.componentInstance;
    supplierService = TestBed.inject(SupplierService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display suppliers in the dom', () => {
      const mockSuppliers = [
        {
          _id: "650c1f1e1c9d440000a1b1c1",
          supplierId: 1,
          supplierName: "Supplier 1",
          contactInformation: "123-456-7890",
          address: "123 Tech Street",
          dateCreated: "2021-01-01T00:00:00.000Z",
          dateModified: "2021-01-01T00:00:00.000Z"
        },
        {
          _id: "67540039030e05e5ee39579c",
          supplierId: 2,
          supplierName: "Supplier 2",
          contactInformation: "800-555-5555",
          address: "456 Tech Lane",
          dateCreated: "2021-01-01T00:00:00.000Z",
          dateModified: "2021-01-01T00:00:00.000Z"
        }
      ];

      component.suppliers = mockSuppliers;
      fixture.detectChanges();

      const supplierItemRows = fixture.debugElement.queryAll(
        By.css('.all-suppliers-page__table-body .all-suppliers-page__table-row')
      );
      expect(supplierItemRows.length).toBeGreaterThan(0);
    });

    it('should show no suppliers found if no suppliers are found', () => {
      component.suppliers = [];
      fixture.detectChanges();

      const noSuppliersPTag = fixture.debugElement.queryAll(By.css('.all-suppliers-page__no-suppliers'));

      expect(noSuppliersPTag.length).toBe(1);
    });

    it('should handle errors when fetching suppliers', () => {
      spyOn(supplierService, 'getAllSuppliers').and.returnValue(throwError('Error fetching all suppliers'));

      fixture.detectChanges(); // Trigger the component's constructor

      expect(component.suppliers.length).toBe(0);
    });
});
