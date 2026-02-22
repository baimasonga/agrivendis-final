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

export interface LoadRecord {
  id: string;
  customer: string;
  pickup: string;
  dropoff: string;
  eta: string;
  status: 'In Transit' | 'Assigned' | 'Loading' | 'Delivered' | 'Unassigned';
  driver: string;
  truck: string;
  rate: string;
  margin: string;
}

export interface FleetVehicle {
  plate: string;
  model: string;
  status: 'Available' | 'In Use' | 'Maintenance' | 'Critical';
  driver: string;
  location: string;
  gps: string;
}

export interface DriverRecord {
  name: string;
  status: 'Available' | 'On Trip' | 'Off Duty';
  hosRisk: 'Low' | 'Medium' | 'High';
  rating: number;
  currentLocation: string;
}

export interface Warehouse {
  name: string;
  city: string;
  utilization: number;
  inbound: number;
  outbound: number;
  onHand: number;
  status: 'Active' | 'Critical' | 'Maintenance';
}
