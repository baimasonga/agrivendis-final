export type NavItem =
  | 'Dashboard'
  | 'Orders / Loads'
  | 'Dispatch Board'
  | 'Fleet'
  | 'Drivers'
  | 'Routes & Tracking'
  | 'Warehouses / Hubs'
  | 'Proof of Delivery'
  | 'Billing & Invoices'
  | 'Reports'
  | 'AI Ops Assistant'
  | 'Settings';

export type LoadStatus = 'In Transit' | 'Assigned' | 'Loading' | 'Delivered' | 'Unassigned';
export type DriverStatus = 'Available' | 'On Trip' | 'Off Duty';
export type FleetStatus = 'Available' | 'In Use' | 'Maintenance' | 'Critical';

export interface LoadRecord {
  id: string;
  customer: string;
  pickup: string;
  dropoff: string;
  eta: string;
  status: LoadStatus;
  driver: string;
  truck: string;
  rate: number;
  margin: number;
  priority: 'Low' | 'Medium' | 'High';
}

export interface FleetVehicle {
  plate: string;
  model: string;
  status: FleetStatus;
  driver: string;
  location: string;
  gps: string;
}

export interface DriverRecord {
  name: string;
  status: DriverStatus;
  hosRisk: 'Low' | 'Medium' | 'High';
  rating: number;
  currentLocation: string;
}

export interface Warehouse {
  id: string;
  name: string;
  city: string;
  utilization: number;
  inbound: number;
  outbound: number;
  onHand: number;
  status: 'Active' | 'Critical' | 'Maintenance';
}

export interface RouteRecord {
  id: string;
  loadId: string;
  driver: string;
  origin: string;
  destination: string;
  progress: number;
  eta: string;
}

export interface PodRecord {
  id: string;
  loadId: string;
  customer: string;
  deliveredAt: string;
  driver: string;
  status: 'Pending Upload' | 'Submitted' | 'Approved' | 'Rejected';
  fileName?: string;
}

export interface InvoiceRecord {
  id: string;
  loadId: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
}

export interface AiMessage {
  role: 'user' | 'assistant';
  text: string;
}
