export interface JobTypeItem {
  id: string;
  type: string;
  details: string[];
  status: "pending" | "done";
  timeFinished?: string;
  addOnService?: string;
}
