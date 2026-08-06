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

export interface LineItem {
  type: string;
  description?: string;
  quantity: number;
  amount: number;
}

export interface BookingDetails extends Booking {
  scheduleDate: string;
  startTime: string;
  customerName: string;
  customAddress: string;
  phoneNumber: string;
  workPhone?: string;
  customerEmail: string;
  internalJobNotes: string;
  cleaningDetails: LineItem[];
  quotedJob: LineItem[];
}
