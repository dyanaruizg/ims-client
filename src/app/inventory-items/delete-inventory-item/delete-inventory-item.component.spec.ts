/**
 * Author: Brandon Salvemini
 * Date: 12/12/2024
 * File: delete-inventory-item.component.spec.ts
 * Description: Test file for the delete inventory item component
 */

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DeleteInventoryItemComponent } from './delete-inventory-item.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItemService } from '../inventory-item.service';
import { InventoryItem } from '../inventory-item';
import { of, throwError } from 'rxjs';

describe('DeleteInventoryItemComponent', () => {
  let component: DeleteInventoryItemComponent;
  let fixture: ComponentFixture<DeleteInventoryItemComponent>;
  let inventoryItemService: InventoryItemService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, DeleteInventoryItemComponent],
            providers: [InventoryItemService,
              { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '674753586db561ba71c1ab95' } } } }
            ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteInventoryItemComponent);
    component = fixture.componentInstance;
    inventoryItemService = TestBed.inject(InventoryItemService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete an item', fakeAsync(() => {
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

    component.inventoryItem = mockInventoryItem;
    fixture.detectChanges();

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(inventoryItemService, 'deleteInventoryItem').and.returnValue(of({
      message: 'Item deleted successfully',
      _id: '674753586db561ba71c1ab95'
  }));

  spyOn(router, 'navigate');

  component.deleteItem();
  tick();

  expect(inventoryItemService.deleteInventoryItem).toHaveBeenCalledWith(mockInventoryItem._id);
  expect(router.navigate).toHaveBeenCalledWith(['/inventory-items']);

  }));

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
    expect(component.inventoryItem._id).toBe(mockInventoryItem._id);
    expect(component.deleteInventoryItemForm.controls['id'].value).toBe(mockInventoryItem._id);
  });

  it('should handle errors when deleting an item', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(inventoryItemService, 'deleteInventoryItem').and.returnValue(throwError('Error deleting inventory item:'));
    spyOn(console, 'error');
    component.deleteItem();
    expect(inventoryItemService.deleteInventoryItem).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error deleting inventory item:', 'Error deleting inventory item:');
  });

});
