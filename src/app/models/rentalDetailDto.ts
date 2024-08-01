export interface RentalDetailDto {
  id: number;
  brandName: string;
  customerFullName: string;
  rentDate: Date;
  returnDate?: Date;
}
