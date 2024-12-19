import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SupplierService } from './supplier.service';
import { CreateSupplierDTO, Supplier } from './supplier';
import { environment } from '../../environments/environment';

describe('SupplierService', () => {
  let service: SupplierService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplierService]
    });

    service = TestBed.inject(SupplierService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all suppliers', () => {
    const dummySuppliers: Supplier[] = [
      {
        _id: "650c1f1e1c9d440000a1b1c1",
        supplierId: 1,
        supplierName: "TechSupplier",
        contactInformation: "123-456-7890",
        address: "123 Tech Street",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-01T00:00:00.000Z"
      },
      {
        _id: "67540039030e05e5ee39579c",
        supplierId: 2,
        supplierName: "Koblenz",
        contactInformation: "800-548-5741",
        address: "P.O. Box 18363",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-01T00:00:00.000Z"
      }
    ];

    service.getSuppliers().subscribe(suppliers => {
      expect(suppliers.length).toBe(2);
      expect(suppliers).toEqual(dummySuppliers);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/suppliers`);
    expect(req.request.method).toBe('GET');
    req.flush(dummySuppliers);
  });

  it('should retrieve a single supplier by ID', () => {
    const dummySupplier: Supplier = {
      _id: "650c1f1e1c9d440000a1b1c1",
      supplierId: 1,
      supplierName: "TechSupplier",
      contactInformation: "123-456-7890",
      address: "123 Tech Street",
      dateCreated: "2021-01-01T00:00:00.000Z",
      dateModified: "2021-01-01T00:00:00.000Z"
    };

    service.getSupplier(1).subscribe(supplier => {
      expect(supplier).toEqual(dummySupplier);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/suppliers/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummySupplier);
  });

  it('should create a new supplier', () => {
    const newSupplier: CreateSupplierDTO = {
      supplierName: 'Apple',
      contactInformation: '800-275-2273',
      address: '10600 N Tantau Ave'
    };

    const mockResponse: Supplier = {
      _id: '650c1f1e1c9d440000d1e1f1',
      supplierId: 7,
      ...newSupplier
    };

    service.createSupplier(newSupplier).subscribe(supplier => {
      expect(supplier).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/createSupplier`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newSupplier)
    req.flush(mockResponse);
  });
});
