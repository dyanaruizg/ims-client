import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from
'@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { InventoryItemService } from './inventory-item.service';
import { AddInventoryItemDTO, InventoryItem, InventoryItemWithDetails, UpdateInventoryItemDTO } from './inventory-item';

describe('InventoryItemService', () => {
  let service: InventoryItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryItemService]
    });

    service = TestBed.inject(InventoryItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all inventory items', () => {
    const dummyInventoryItems: InventoryItemWithDetails[] = [
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

    service.getInventoryItems().subscribe(inventoryItems => {
      expect(inventoryItems.length).toBe(2);
      expect(inventoryItems).toEqual(dummyInventoryItems);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/items`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyInventoryItems);
  });

  it('should retrieve a single inventory item by ID', () => {
    const dummyInventoryItem: InventoryItem = {
      _id: '674752ac6db561ba71c1ab86',
      categoryId: 1000,
      supplierId: 1,
      name: 'Item 1',
      description: 'Item 1 description',
      quantity: 5,
      price: 699.99,
      dateCreated: '2021-01-01T00:00:00.000Z',
      dateModified: '2021-01-30T09:45:13.000Z',
    };

    service.getInventoryItem('674752ac6db561ba71c1ab86').subscribe(inventoryItem => {
      expect(inventoryItem).toEqual(dummyInventoryItem);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/itemById/674752ac6db561ba71c1ab86`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyInventoryItem);
  });

  it('should create a new inventory item', () => {
    const newInventoryItem: AddInventoryItemDTO = {
      categoryId: 1000,
      supplierId: 1,
      name: 'MacBook Air 13.6 Laptop',
      description: 'M2 chip Built for Apple Intelligence - 8GB Memory - 256GB SSD - Midnight',
      quantity: 13,
      price: 749.99
    };
    const mockResponse: InventoryItem = {
      _id: '650c1f1e1c9d440000d1e1f1',
      ...newInventoryItem
    };

    service.addInventoryItem(newInventoryItem).subscribe(inventoryItem => {
      expect(inventoryItem).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/createInventoryItem`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newInventoryItem)
    req.flush(mockResponse);
  });

  it('should update an existing inventory item', () => {
    const updateInventoryItemDTO: UpdateInventoryItemDTO = {
      categoryId: 1000,
      supplierId: 1,
      name: 'MacBook Air 13.6 Laptop',
      description: 'M2 chip Built for Apple Intelligence - 8GB Memory - 256GB SSD - Midnight',
      quantity: 10,
      price: 949.99
    };

    const updateInventoryItem: InventoryItem = {
      _id: '650c1f1e1c9d440000d1e1f1',
      ...updateInventoryItemDTO
    };

    service.updateInventoryItem(updateInventoryItemDTO, '650c1f1e1c9d440000d1e1f1').subscribe(inventoryItem => {
      expect(inventoryItem).toEqual(updateInventoryItem);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/items/650c1f1e1c9d440000d1e1f1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updateInventoryItem);
  });
});
