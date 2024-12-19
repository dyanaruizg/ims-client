import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UpdateInventoryItemComponent } from './update-inventory-item.component';
import { InventoryItemService } from '../inventory-item.service';
import { InventoryItem, UpdateInventoryItemDTO } from '../inventory-item';

describe('UpdateInventoryItemComponent', () => {
  let component: UpdateInventoryItemComponent;
  let fixture: ComponentFixture<UpdateInventoryItemComponent>;
  let inventoryItemService: InventoryItemService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule, UpdateInventoryItemComponent],
      providers: [
        InventoryItemService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInventoryItemComponent);
    component = fixture.componentInstance;
    inventoryItemService = TestBed.inject(InventoryItemService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Unit test 1: should have a valid form when all fields are filled correctly
  it('should have a valid form when all fields are filled correctly', () => {
    component.updateInventoryItemForm.controls['category'].setValue('Electronics');
    component.updateInventoryItemForm.controls['supplier'].setValue('TechSupplier');
    component.updateInventoryItemForm.controls['name'].setValue('Lenovo Laptop');
    component.updateInventoryItemForm.controls['description'].setValue(
      'Lenovo - Yoga Pro 9i 16 inches 3.2K Touchscreen Laptop - Intel Core Ultra 9 185H ' +
      'with 32GB Memory - NVIDIA GeForce RTX 4050 - 1TB SSD - Luna Grey'
    );
    component.updateInventoryItemForm.controls['quantity'].setValue(15);
    component.updateInventoryItemForm.controls['price'].setValue(1099.99);
    expect(component.updateInventoryItemForm.valid).toBeTrue();
  });

  // Unit test 2: should call updateInventoryItem and navigate on successful form submission
  it('should call updateInventoryItem and navigate on successful form submission', fakeAsync(() => {
    const updateInventoryItemDTO: UpdateInventoryItemDTO = {
      categoryId: 1000,
      supplierId: 1,
      name: 'MacBook Air 13.6 Laptop',
      description: 'M2 chip Built for Apple Intelligence - 8GB Memory - 256GB SSD - Midnight',
      quantity: 10,
      price: 949.99
    };

    const mockInventoryItem: InventoryItem = {
      _id: '650c1f1e1c9d440000d1e1f1',
      categoryId: 1000,
      supplierId: 1,
      name: 'MacBook Air 13.6 Laptop',
      description: 'M2 chip Built for Apple Intelligence - 8GB Memory - 256GB SSD - Midnight',
      quantity: 10,
      price: 949.99
    };

    spyOn(inventoryItemService, 'updateInventoryItem').and.returnValue(of(mockInventoryItem));
    spyOn(router, 'navigate');

    component.categoryId = updateInventoryItemDTO.categoryId;
    component.supplierId = updateInventoryItemDTO.supplierId;

    component.updateInventoryItemForm.controls['category'].setValue(updateInventoryItemDTO.categoryId);
    component.updateInventoryItemForm.controls['supplier'].setValue(updateInventoryItemDTO.supplierId);
    component.updateInventoryItemForm.controls['name'].setValue(updateInventoryItemDTO.name);
    component.updateInventoryItemForm.controls['description'].setValue(updateInventoryItemDTO.description);
    component.updateInventoryItemForm.controls['quantity'].setValue(updateInventoryItemDTO.quantity);
    component.updateInventoryItemForm.controls['price'].setValue(updateInventoryItemDTO.price);

    component.updateInventoryItem();
    tick();

    expect(inventoryItemService.updateInventoryItem).toHaveBeenCalledWith(updateInventoryItemDTO, component.inventoryItemId);
    expect(router.navigate).toHaveBeenCalledWith(['/inventory-items']);
  }));

  // Unit test 3: should handle error on form submission failure
  it('should handle error on form submission failure', fakeAsync(() => {
    spyOn(inventoryItemService, 'updateInventoryItem').and.returnValue(throwError('Error updating inventory item'));
    spyOn(console, 'error');

    component.updateInventoryItemForm.controls['category'].setValue('Electronics');
    component.updateInventoryItemForm.controls['supplier'].setValue('TechSupplier');
    component.updateInventoryItemForm.controls['name'].setValue('Lenovo Laptop');
    component.updateInventoryItemForm.controls['description'].setValue(
      'Lenovo - Yoga Pro 9i 16 inches 3.2K Touchscreen Laptop - Intel Core Ultra 9 185H ' +
      'with 32GB Memory - NVIDIA GeForce RTX 4050 - 1TB SSD - Luna Grey'
    );
    component.updateInventoryItemForm.controls['quantity'].setValue(15);
    component.updateInventoryItemForm.controls['price'].setValue(1099.99);

    component.updateInventoryItem();
    tick();

    expect(inventoryItemService.updateInventoryItem).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error updating inventory item', 'Error updating inventory item');
  }));
});
