export interface Supplier {
  _id: string;
  supplierId: number;
  supplierName: string;
  contactInformation: string;
  address: string;
  dateCreated?: string;
  dateModified?: string;
}

export type CreateSupplierDTO = Omit<Supplier, '_id' | 'supplierId' | 'dateModified'>;
