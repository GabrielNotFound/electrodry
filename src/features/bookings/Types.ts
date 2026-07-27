export type BookingStatus = "new" | "pending" | "complete";

export interface Booking {
  id: string;
  status: BookingStatus;
  secondaryTag?: string;
  date: string;
  name: string;
  location: string;
  bookingId: string;
  quotedPrice: number;
  depositTaken: number;
}
