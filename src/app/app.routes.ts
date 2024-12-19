import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateInventoryItemComponent } from './inventory-items/create-inventory-item/create-inventory-item.component';
import { ListAllInventoryItemsComponent } from './inventory-items/list-all-inventory-items/list-all-inventory-items.component';
import { UpdateInventoryItemComponent } from './inventory-items/update-inventory-item/update-inventory-item.component';
import { ReadInventoryItemByIdComponent } from './inventory-items/read-inventory-item-by-id/read-inventory-item-by-id.component';
import { DeleteInventoryItemComponent } from './inventory-items/delete-inventory-item/delete-inventory-item.component';
import { SearchInventoryItemsComponent } from './inventory-items/search-inventory-items/search-inventory-items.component';
import { ListAllSuppliersComponent } from './suppliers/list-all-suppliers/list-all-suppliers.component';
import { CreateSupplierComponent } from './suppliers/create-supplier/create-supplier.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-inventory-item',
    component: CreateInventoryItemComponent
  },
  {
    path: 'inventory-items',
    component: ListAllInventoryItemsComponent
  },
  {
    path: 'inventory-items/:inventoryItemId',
    component: UpdateInventoryItemComponent
  },
  {
    path: 'read-inventory-item/:inventoryItemId',
    component: ReadInventoryItemByIdComponent
  },
  {
    path: 'delete-inventory-item/:inventoryItemId',
    component: DeleteInventoryItemComponent
  },
  {
    path: 'search-inventory-items',
    component: SearchInventoryItemsComponent
  },
  {
    path: 'suppliers',
    component: ListAllSuppliersComponent
  },
  {
    path: 'create-supplier',
    component: CreateSupplierComponent
  }
];
