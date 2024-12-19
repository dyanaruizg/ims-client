import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupplierComponent } from './create-supplier.component';
import { SupplierService } from '../supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateSupplierDTO, Supplier } from '../supplier';
import { of, throwError } from 'rxjs';

describe('CreateSupplierComponent', () => {
  let component: CreateSupplierComponent;
  let fixture: ComponentFixture<CreateSupplierComponent>;
  let supplierService: SupplierService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule, CreateSupplierComponent],
      providers: [
        SupplierService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSupplierComponent);
    component = fixture.componentInstance;
    supplierService = TestBed.inject(SupplierService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Unit test 1: should have a valid form when all fields are filled correctly.
  it('should have a valid form when all fields are filled correctly', () => {
    component.createSupplierForm.controls['supplierName'].setValue('Apple');
    component.createSupplierForm.controls['contactInformation'].setValue('800-275-2273');
    component.createSupplierForm.controls['address'].setValue('10600 N Tantau Ave');

    expect(component.createSupplierForm.valid).toBeTrue();
  });

  // Unit test 2: should call createSupplier and navigate on successful form submission.
  it('should call createSupplier and navigate on successful form submission', () => {
    const createSupplierDTO: CreateSupplierDTO = {
      supplierName: 'Apple',
      contactInformation: '800-275-2273',
      address: '10600 N Tantau Ave'
    };

    const mockSupplier: Supplier = {
      _id: '650c1f1e1c9d440000d1e1f1',
      supplierId: 7,
      supplierName: 'Apple',
      contactInformation: '800-275-2273',
      address: '10600 N Tantau Ave'
    };

    spyOn(supplierService, 'createSupplier').and.returnValue(of(mockSupplier));
    spyOn(router, 'navigate');

    component.createSupplierForm.controls['supplierName'].setValue(createSupplierDTO.supplierName);
    component.createSupplierForm.controls['contactInformation'].setValue(createSupplierDTO.contactInformation);
    component.createSupplierForm.controls['address'].setValue(createSupplierDTO.address);

    component.createSupplier();

    expect(supplierService.createSupplier).toHaveBeenCalledWith(createSupplierDTO);
    expect(router.navigate).toHaveBeenCalledWith(['/suppliers']);
  });

  // Unit test 3: should handle error on form submission failure.
  it('should handle error on form submission failure', () => {
    spyOn(supplierService, 'createSupplier').and.returnValue(throwError('Error creating supplier'));

    spyOn(console, 'error');

    component.createSupplierForm.controls['supplierName'].setValue('Apple');
    component.createSupplierForm.controls['contactInformation'].setValue('800-275-2273');
    component.createSupplierForm.controls['address'].setValue('10600 N Tantau Ave');

    component.createSupplier();

    expect(supplierService.createSupplier).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error creating supplier', 'Error creating supplier');
  });
});
