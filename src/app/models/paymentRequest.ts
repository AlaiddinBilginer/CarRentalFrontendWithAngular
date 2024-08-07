export interface PaymentRequest {
  customerId: number;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: Date;
  cvv: string;
  amount: number;
}
