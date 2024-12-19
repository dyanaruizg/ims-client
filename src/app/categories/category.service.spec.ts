import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from './category';
import { environment } from '../../environments/environment';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all categories', () => {
    const dummyCategories: Category[] = [
      {
        _id: "650c1f1e1c9d440000a1b1c1",
        categoryId: 1000,
        categoryName: "Electronics",
        description: "Electronic devices and gadgets",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-01T00:00:00.000Z"
      },
      {
        _id: "6753fd80030e05e5ee395798",
        categoryId: 1001,
        categoryName: "Home",
        description: "Home products such as Furniture, Appliances, Kitchen & Dining items",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-01T00:00:00.000Z"
      }
    ];

    service.getCategories().subscribe(categories => {
      expect(categories.length).toBe(2);
      expect(categories).toEqual(dummyCategories);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCategories);
  });

  it('should retrieve a single category by ID', () => {
    const dummyCategory: Category = {
      _id: "650c1f1e1c9d440000a1b1c1",
      categoryId: 1000,
      categoryName: "Electronics",
      description: "Electronic devices and gadgets",
      dateCreated: "2021-01-01T00:00:00.000Z",
      dateModified: "2021-01-01T00:00:00.000Z"
    };

    service.getCategory(1000).subscribe(category => {
      expect(category).toEqual(dummyCategory);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/categories/1000`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCategory);
  });
});
