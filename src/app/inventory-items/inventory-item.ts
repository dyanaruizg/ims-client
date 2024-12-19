export interface InventoryItem {
  _id: string,
  categoryId: number,
  supplierId: number,
  name: string,
  description: string,
  quantity: number,
  price: number,
  dateCreated?: string,
  dateModified?: string
}

export interface InventoryItemWithDetails {
  _id: string,
  categoryId: number,
  supplierId: number,
  categoryDetails: CategoryDetails,
  supplerDetails: SupplerDetails,
  name: string,
  description: string,
  quantity: number,
  price: number,
  dateCreated: string,
  dateModified: string
}

export interface CategoryDetails {
  _id: string
  categoryId: number
  categoryName: string
  description: string
  dateCreated: string
  dateModified: string
}

export interface SupplerDetails {
  _id: string
  supplierId: number
  supplierName: string
  contactInformation: string
  address: string
  dateCreated: string
  dateModified: string
}

export type AddInventoryItemDTO = Omit<InventoryItem, '_id' | 'dateCreated' | 'dateModified' | 'categoryDetails' | 'supplerDetails'>;

export type UpdateInventoryItemDTO = Omit<InventoryItem, '_id' | 'dateCreated' | 'dateModified' | 'categoryDetails' | 'supplerDetails'>
