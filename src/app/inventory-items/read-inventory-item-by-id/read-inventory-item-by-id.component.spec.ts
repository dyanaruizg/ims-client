import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ReadInventoryItemByIdComponent } from './read-inventory-item-by-id.component';
import { InventoryItemService } from '../inventory-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { InventoryItem } from '../inventory-item';

describe('ReadInventoryItemByIdComponent', () => {
  let component: ReadInventoryItemByIdComponent;
  let fixture: ComponentFixture<ReadInventoryItemByIdComponent>;
  let inventoryItemService: InventoryItemService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReadInventoryItemByIdComponent],
      providers: [InventoryItemService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '674753586db561ba71c1ab95' } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadInventoryItemByIdComponent);
    component = fixture.componentInstance;
    inventoryItemService = TestBed.inject(InventoryItemService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the inventory item id from the URL', () => {
    expect(component.inventoryItemId).toBe('674753586db561ba71c1ab95');
  });

  it('should get item data for item with a given ID', () => {
    const mockInventoryItem: InventoryItem = {
      _id: "674753586db561ba71c1ab95",
      categoryId: 1000,
      supplierId: 1,
      name: "Laptop",
      description: "High-end gaming laptop",
      quantity: 10,
      price: 1500,
      dateCreated: "2021-01-01T00:00:00.000Z",
      dateModified: "2021-01-01T00:00:00.000Z"
    };

    spyOn(inventoryItemService, 'getInventoryItem').and.returnValue(of(mockInventoryItem));
    component.ngOnInit();
    expect(component.inventoryItem.name).toBe('Laptop');
    expect(component.readInventoryItemForm.controls['name'].value).toBe('Laptop');
  });

  it('should handle error', () => {
    spyOn(inventoryItemService, 'getInventoryItem').and.returnValue(throwError('Error fetching details for inventory item:'));
    spyOn(console, 'error');
    component.ngOnInit();
    expect(inventoryItemService.getInventoryItem).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error fetching details for inventory item:', 'Error fetching details for inventory item:');
  });
});
