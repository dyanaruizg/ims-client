import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllInventoryItemsComponent } from './list-all-inventory-items.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListAllInventoryItemsComponent', () => {
  let component: ListAllInventoryItemsComponent;
  let fixture: ComponentFixture<ListAllInventoryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ListAllInventoryItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAllInventoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display inventory items in the dom', () => {
    const mockInventoryItems = [
      {
        _id: '674752ac6db561ba71c1ab86',
        categoryId: 1000,
        supplierId: 1,
        name: 'Item 1',
        description: 'Item 1 description',
        quantity: 5,
        price: 699.99,
        dateCreated: '2021-01-01T00:00:00.000Z',
        dateModified: '2021-01-30T09:45:13.000Z',
        categoryDetails: {
          _id: '650c1f1e1c9d440000a1b1c1',
          categoryId: 1000,
          categoryName: 'Electronics',
          description: 'Electronic devices and gadgets',
          dateCreated: '2021-01-01T00:00:00.000Z',
          dateModified: '2021-01-01T00:00:00.000Z',
        },
        supplerDetails: {
          _id: '650c1f1e1c9d440000a1b1c1',
          supplierId: 1,
          supplierName: 'TechSupplier',
          contactInformation: '123-456-7890',
          address: '123 Tech Street',
          dateCreated: '2021-01-01T00:00:00.000Z',
          dateModified: '2021-01-01T00:00:00.000Z',
        },
      },
      {
        _id: '674753586db561ba71c1ab95',
        categoryId: 1000,
        supplierId: 1,
        name: 'Item 2',
        description: 'Item 2 description',
        quantity: 10,
        price: 1500,
        dateCreated: '2021-01-01T00:00:00.000Z',
        dateModified: '2021-01-01T00:00:00.000Z',
        categoryDetails: {
          _id: '650c1f1e1c9d440000a1b1c1',
          categoryId: 1000,
          categoryName: 'Electronics',
          description: 'Electronic devices and gadgets',
          dateCreated: '2021-01-01T00:00:00.000Z',
          dateModified: '2021-01-01T00:00:00.000Z',
        },
        supplerDetails: {
          _id: '650c1f1e1c9d440000a1b1c1',
          supplierId: 1,
          supplierName: 'TechSupplier',
          contactInformation: '123-456-7890',
          address: '123 Tech Street',
          dateCreated: '2021-01-01T00:00:00.000Z',
          dateModified: '2021-01-01T00:00:00.000Z',
        },
      },
    ];

    component.inventoryItems = mockInventoryItems;
    fixture.detectChanges();

    const inventoryItemRows = fixture.debugElement.queryAll(
      By.css('.all-items-page__table-body .all-items-page__table-row')
    );
    expect(inventoryItemRows.length).toBeGreaterThan(0);
  });

  it('should show no items found if no inventory items are found', () => {
    component.inventoryItems = [];
    fixture.detectChanges();

    const noItemsPTag = fixture.debugElement.queryAll(By.css('.all-items-page__no-items'));

    expect(noItemsPTag.length).toBe(1);
  });

  it('should display title "All Items"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('.all-items-page__title');
    expect(titleElement).toBeTruthy();
  });

});
