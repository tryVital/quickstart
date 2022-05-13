export interface User {
  uid: string;
}

export interface ConnectedSource {
  source_id: Number;
  id: string;
}

export interface Profile {
  auth0_id: string;
  avatar: string;
  email: string;
  id: string;
  name: string;
}

export interface Invite {
  id: string;
  email: string;
  role?: string;
  invited_at: string;
  team_id: string;
  verification_code: string;
  invited_by: string;
  team_name: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: Member[];
  sandbox_client_id: string;
  sandbox_client_secret: string;
  prod_client_id: string;
  prod_client_secret: string;
  sandbox_connected_sources: ConnectedSource[];
  prod_connected_sources: ConnectedSource[];
  prod_users: User[];
  sandbox_users: User[];
  sandbox_airtable_api_key: string;
  sandbox_airtable_base_id: string;
  prod_airtable_api_key: string;
  prod_airtable_base_id: string;
  sandbox_webhook_secret: string;
  prod_webhook_secret: string;
  has_production_access: boolean;
  has_dashboard_access: boolean;
  prod_application_status?: "applied" | "success";
  invites: Invite[];
}

export interface Member {
  auth0_id: string;
  avatar: string;
  email: string;
  id: string;
  name: string;
  teams: Team[];
  role: string;
}

export interface CreateUserResponse {
  client_user_id: string;
  team_id: string;
}

export interface LinkTokenResponse {
  user_key: string;
  team_id: string;
}

export interface HeartRate {
  value: number;
  timestamp: number;
}
export interface Source {
  name: string;
  slug: string;
  logo: string;
  auth_type: string;
}

export interface Sport {
  name: string;
  icon: string;
  category: string;
  id: string;
}
export interface Workout {
  average_hr: number;
  calories: number;
  distance: number;
  heart_rate: HeartRate[];
  hr_zones: number[];
  id: string;
  max_hr: number;
  priority: number;
  source: Source;
  sport: Sport;
  time_end: string;
  time_start: string;
}

export interface Sleep {
  average_hrv: number;
  awake: number;
  bedtime_start: string;
  bedtime_stop: string;
  date: string;
  deep: number;
  duration: number;
  efficiency: number;
  hr_average: number;
  hr_lowest: number;
  latency: number;
  light: number;
  priority: number;
  rem: number;
  respiratory_rate: number;
  source: Source;
  temperature_delta: number;
  total: number;
}

export interface Activity {
  calories_active: number;
  calories_total: number;
  daily_movement: number;
  date: string;
  high: number;
  id: string;
  low: number;
  medium: number;
  priority: number;
  source: Source;
  steps: null;
  user_id: string;
}

export interface Webhook {
  id: string;
  url: string;
  event_type: string;
  last_event_sent: string;
}
