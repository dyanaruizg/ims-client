import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchInventoryItemsComponent } from './search-inventory-items.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InventoryItemWithDetails } from '../inventory-item';
import { By } from '@angular/platform-browser';

describe('SearchInventoryItemsComponent', () => {
  let component: SearchInventoryItemsComponent;
  let fixture: ComponentFixture<SearchInventoryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SearchInventoryItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInventoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Unit test 1: should display title "Search Items".
  it('should display title "Search Items"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('.search-items-page__title');
    expect(titleElement).toBeTruthy();
  });

  // Unit test 2: should filter inventory items based on search term.
  it('should filter inventory items based on search term', fakeAsync(() => {
    const mockInventoryItems: InventoryItemWithDetails[] = [
      {
        _id: '67547feb4dcf93328696c978',
        categoryId: 1000,
        supplierId: 1,
        name: "ThinkPad T490 Lenovo Laptop",
        description: "14.0 FHD (1920 x 1080) 250 nits",
        quantity: 15,
        price: 249.99,
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
        }
      }
    ];

    component.inventoryItems = mockInventoryItems;
    fixture.detectChanges(); // Trigger change detection

    component.txtSearchControl.setValue('Laptop');
    tick(500); // Simulate debounce time
    fixture.detectChanges(); // Trigger change detection
    expect(component.inventoryItems.length).toBe(1);
    expect(component.inventoryItems[0].name).toBe('ThinkPad T490 Lenovo Laptop');
  }));

  // Unit test 3: should show no items found if no inventory items are found.
  it('should show no items found if no inventory items are found', () => {
    component.inventoryItems = [];
    fixture.detectChanges();

    const noItemsPTag = fixture.debugElement.queryAll(By.css('.search-items-page__no-items'));

    expect(noItemsPTag.length).toBe(1);
  });
});
