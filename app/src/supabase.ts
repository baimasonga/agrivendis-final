import { createClient } from '@supabase/supabase-js';
import type {
  DriverRecord,
  FleetVehicle,
  InvoiceRecord,
  LoadRecord,
  PodRecord,
  RouteRecord,
  Warehouse,
} from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const seed = {
  loads: [
    { id: 'LD-2024-001847', customer: 'Walmart Distribution', pickup: 'Chicago, IL', dropoff: 'Atlanta, GA', eta: '2026-02-28T14:30:00Z', status: 'In Transit', driver: 'Mike Rodriguez', truck: 'FL-4892', rate: 2850, margin: 18.5, priority: 'High' },
    { id: 'LD-2024-001848', customer: 'Target Corporation', pickup: 'Dallas, TX', dropoff: 'Phoenix, AZ', eta: '2026-02-27T09:15:00Z', status: 'Assigned', driver: 'Jennifer Chen', truck: 'TX-7841', rate: 1950, margin: 22.1, priority: 'Medium' },
    { id: 'LD-2024-001849', customer: 'Amazon Logistics', pickup: 'Los Angeles, CA', dropoff: 'Seattle, WA', eta: '2026-02-26T22:45:00Z', status: 'Loading', driver: 'David Thompson', truck: 'CA-3952', rate: 3200, margin: 15.8, priority: 'High' },
    { id: 'LD-2024-001850', customer: 'FedEx Ground', pickup: 'Miami, FL', dropoff: 'Jacksonville, FL', eta: '2026-02-25T16:20:00Z', status: 'Delivered', driver: 'Maria Santos', truck: 'FL-2847', rate: 850, margin: 28.2, priority: 'Low' },
  ] as LoadRecord[],
  fleet: [
    { plate: 'FL-4892', model: 'Freightliner Cascadia', status: 'Available', driver: 'Michael Rodriguez', location: 'Chicago, IL', gps: '2 minutes ago' },
    { plate: 'TX-7841', model: 'Peterbilt 579', status: 'In Use', driver: 'Jennifer Chen', location: 'Dallas, TX', gps: '5 minutes ago' },
    { plate: 'CA-3952', model: 'Volvo VNL 860', status: 'Maintenance', driver: 'Unassigned', location: 'Los Angeles, CA', gps: '2 hours ago' },
    { plate: 'NY-2847', model: 'Mack Anthem', status: 'Critical', driver: 'James Wilson', location: 'Albany, NY', gps: '45 minutes ago' },
  ] as FleetVehicle[],
  drivers: [
    { name: 'Michael Rodriguez', status: 'Available', hosRisk: 'Low', rating: 4.9, currentLocation: 'Chicago, IL' },
    { name: 'Jennifer Chen', status: 'On Trip', hosRisk: 'Medium', rating: 4.7, currentLocation: 'Dallas, TX' },
    { name: 'David Thompson', status: 'Off Duty', hosRisk: 'High', rating: 4.8, currentLocation: 'Denver, CO' },
    { name: 'Maria Santos', status: 'On Trip', hosRisk: 'Low', rating: 4.6, currentLocation: 'Atlanta, GA' },
  ] as DriverRecord[],
  warehouses: [
    { id: 'WH-001', name: 'Chicago Distribution Center', city: 'Chicago, IL', utilization: 87.3, inbound: 142, outbound: 238, onHand: 5847, status: 'Active' },
    { id: 'WH-002', name: 'Atlanta Regional Hub', city: 'Atlanta, GA', utilization: 94.8, inbound: 89, outbound: 156, onHand: 8234, status: 'Critical' },
    { id: 'WH-003', name: 'Los Angeles Port Terminal', city: 'Los Angeles, CA', utilization: 45.2, inbound: 34, outbound: 67, onHand: 3241, status: 'Maintenance' },
  ] as Warehouse[],
  routes: [
    { id: 'RT-001', loadId: 'LD-2024-001847', driver: 'Mike Rodriguez', origin: 'Chicago, IL', destination: 'Atlanta, GA', progress: 58, eta: '2026-02-28T14:30:00Z' },
    { id: 'RT-002', loadId: 'LD-2024-001848', driver: 'Jennifer Chen', origin: 'Dallas, TX', destination: 'Phoenix, AZ', progress: 34, eta: '2026-02-27T09:15:00Z' },
  ] as RouteRecord[],
  pods: [
    { id: 'POD-001', loadId: 'LD-2024-001850', customer: 'FedEx Ground', deliveredAt: '2026-02-25T16:30:00Z', driver: 'Maria Santos', status: 'Pending Upload' },
    { id: 'POD-002', loadId: 'LD-2024-001846', customer: 'Global Manufacturing', deliveredAt: '2026-02-24T12:30:00Z', driver: 'Sarah Chen', status: 'Submitted' },
  ] as PodRecord[],
  invoices: [
    { id: 'INV-001', loadId: 'LD-2024-001847', customer: 'Walmart Distribution', amount: 2850, dueDate: '2026-03-05', status: 'Sent' },
    { id: 'INV-002', loadId: 'LD-2024-001850', customer: 'FedEx Ground', amount: 850, dueDate: '2026-02-20', status: 'Overdue' },
  ] as InvoiceRecord[],
};

async function fetchWithFallback<T>(table: string, fallback: T[]): Promise<T[]> {
  if (!supabase) return fallback;
  const { data, error } = await supabase.from(table).select('*');
  if (error || !data) return fallback;
  return data as T[];
}

export const api = {
  fetchLoads: () => fetchWithFallback('loads', seed.loads),
  fetchFleet: () => fetchWithFallback('fleet_vehicles', seed.fleet),
  fetchDrivers: () => fetchWithFallback('drivers', seed.drivers),
  fetchWarehouses: () => fetchWithFallback('warehouses', seed.warehouses),
  fetchRoutes: () => fetchWithFallback('routes', seed.routes),
  fetchPods: () => fetchWithFallback('pod_submissions', seed.pods),
  fetchInvoices: () => fetchWithFallback('invoices', seed.invoices),
};
