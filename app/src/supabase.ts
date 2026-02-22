import { createClient } from '@supabase/supabase-js';
import type { DriverRecord, FleetVehicle, LoadRecord, Warehouse } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const loadSeed: LoadRecord[] = [
  { id: 'LD-2024-001847', customer: 'Walmart Distribution', pickup: 'Chicago, IL', dropoff: 'Atlanta, GA', eta: 'Feb 8, 14:30', status: 'In Transit', driver: 'Mike Rodriguez', truck: 'FL-4892', rate: '$2,850', margin: '18.5%' },
  { id: 'LD-2024-001848', customer: 'Target Corporation', pickup: 'Dallas, TX', dropoff: 'Phoenix, AZ', eta: 'Feb 9, 09:15', status: 'Assigned', driver: 'Jennifer Chen', truck: 'TX-7841', rate: '$1,950', margin: '22.1%' },
  { id: 'LD-2024-001849', customer: 'Amazon Logistics', pickup: 'Los Angeles, CA', dropoff: 'Seattle, WA', eta: 'Feb 8, 22:45', status: 'Loading', driver: 'David Thompson', truck: 'CA-3952', rate: '$3,200', margin: '15.8%' },
  { id: 'LD-2024-001850', customer: 'FedEx Ground', pickup: 'Miami, FL', dropoff: 'Jacksonville, FL', eta: 'Feb 7, 16:20', status: 'Delivered', driver: 'Maria Santos', truck: 'FL-2847', rate: '$850', margin: '28.2%' },
];

const fleetSeed: FleetVehicle[] = [
  { plate: 'FL-4892', model: 'Freightliner Cascadia', status: 'Available', driver: 'Michael Rodriguez', location: 'Chicago, IL', gps: '2 minutes ago' },
  { plate: 'TX-7841', model: 'Peterbilt 579', status: 'In Use', driver: 'Jennifer Chen', location: 'Dallas, TX', gps: '5 minutes ago' },
  { plate: 'CA-3952', model: 'Volvo VNL 860', status: 'Maintenance', driver: 'Unassigned', location: 'Los Angeles, CA', gps: '2 hours ago' },
  { plate: 'NY-2847', model: 'Mack Anthem', status: 'Critical', driver: 'James Wilson', location: 'Albany, NY', gps: '45 minutes ago' },
];

const driversSeed: DriverRecord[] = [
  { name: 'Michael Rodriguez', status: 'Available', hosRisk: 'Low', rating: 4.9, currentLocation: 'Chicago, IL' },
  { name: 'Jennifer Chen', status: 'On Trip', hosRisk: 'Medium', rating: 4.7, currentLocation: 'Dallas, TX' },
  { name: 'David Thompson', status: 'Off Duty', hosRisk: 'High', rating: 4.8, currentLocation: 'Denver, CO' },
  { name: 'Maria Santos', status: 'On Trip', hosRisk: 'Low', rating: 4.6, currentLocation: 'Atlanta, GA' },
];

const warehouseSeed: Warehouse[] = [
  { name: 'Chicago Distribution Center', city: 'Chicago, IL', utilization: 87.3, inbound: 142, outbound: 238, onHand: 5847, status: 'Active' },
  { name: 'Atlanta Regional Hub', city: 'Atlanta, GA', utilization: 94.8, inbound: 89, outbound: 156, onHand: 8234, status: 'Critical' },
  { name: 'Los Angeles Port Terminal', city: 'Los Angeles, CA', utilization: 45.2, inbound: 34, outbound: 67, onHand: 3241, status: 'Maintenance' },
];

export async function fetchLoads() {
  if (!supabase) return loadSeed;
  const { data } = await supabase.from('loads').select('*').limit(12);
  return (data as LoadRecord[]) ?? loadSeed;
}

export async function fetchFleet() {
  if (!supabase) return fleetSeed;
  const { data } = await supabase.from('fleet').select('*').limit(12);
  return (data as FleetVehicle[]) ?? fleetSeed;
}

export async function fetchDrivers() {
  if (!supabase) return driversSeed;
  const { data } = await supabase.from('drivers').select('*').limit(12);
  return (data as DriverRecord[]) ?? driversSeed;
}

export async function fetchWarehouses() {
  if (!supabase) return warehouseSeed;
  const { data } = await supabase.from('warehouses').select('*').limit(12);
  return (data as Warehouse[]) ?? warehouseSeed;
}
