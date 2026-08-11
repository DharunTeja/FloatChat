export type UserRole = 'Admin' | 'Government' | 'Researcher' | 'Student';

/** Central role configuration — single source of truth for badge styles, labels, and permissions */
export const ROLE_CONFIG = {
  Admin: {
    label: 'System Administrator',
    emoji: '🔴',
    color: 'rose',
    bgClass:     'bg-rose-500/10',
    textClass:   'text-rose-400',
    borderClass: 'border-rose-500/30',
    permissions: [
      'Full Access',
      'User Management',
      'Security Dashboard',
      'Audit Logs',
      'Dataset Management',
      'System Settings',
    ],
    navAccess: ['dashboard', 'ai-chat', 'upload', 'datasets', 'visualization', 'security', 'audit-logs', 'user-management', 'settings'],
  },
  Government: {
    label: 'Government Agency',
    emoji: '🟢',
    color: 'emerald',
    bgClass:     'bg-emerald-500/10',
    textClass:   'text-emerald-400',
    borderClass: 'border-emerald-500/30',
    permissions: [
      'Access All Datasets',
      'AI Chat',
      'Advanced Analytics',
      'Download Reports',
      'Export Ocean Data',
      'Government Dashboard',
    ],
    navAccess: ['dashboard', 'ai-chat', 'datasets', 'visualization'],
  },
  Researcher: {
    label: 'Research Scientist',
    emoji: '🔵',
    color: 'cyan',
    bgClass:     'bg-cyan-500/10',
    textClass:   'text-cyan-400',
    borderClass: 'border-cyan-500/30',
    permissions: [
      'Upload NetCDF',
      'AI Chat',
      'Visualization Dashboard',
      'Dataset Manager',
    ],
    navAccess: ['dashboard', 'ai-chat', 'upload', 'datasets', 'visualization', 'settings'],
  },
  Student: {
    label: 'Student / Public Access',
    emoji: '🟣',
    color: 'violet',
    bgClass:     'bg-violet-500/10',
    textClass:   'text-violet-400',
    borderClass: 'border-violet-500/30',
    permissions: [
      'Read-only Dashboard',
      'AI Chat',
      'View Maps',
      'View Graphs',
    ],
    navAccess: ['dashboard', 'ai-chat', 'visualization'],
  },
} as const satisfies Record<UserRole, {
  label: string; emoji: string; color: string;
  bgClass: string; textClass: string; borderClass: string;
  permissions: readonly string[];
  navAccess: readonly string[];
}>;

export type UserStatus = 'Active' | 'Pending Approval' | 'Suspended' | 'Disabled' | 'Deleted';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  avatar?: string;
  status: UserStatus;
  lastLogin: string;
  mfaEnabled?: boolean;
}

export interface GovAccessKey {
  id: string;
  key: string;
  organization: string;
  issuedTo: string;
  createdAt: string;
  expiresAt: string;
  status: 'Active' | 'Expired' | 'Deactivated';
}

export interface DatasetMetadata {
  latitude: number;
  longitude: number;
  temperature: number; // °C
  pressure: number;    // dbar
  salinity: number;    // PSU
  depth: number;       // meters
}

export interface DatasetItem {
  id: string;
  filename: string;
  fileSize: string;
  format: '.nc' | '.csv' | '.json';
  sha256: string;
  verificationStatus: 'Verified' | 'Pending' | 'Failed';
  duplicateStatus: 'Unique' | 'Duplicate Found';
  uploadedBy: string;
  uploadDate: string;
  rowCount: number;
  metadata: DatasetMetadata;
}

export interface SecurityEvent {
  id: string;
  time: string;
  user: string;
  action: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Blocked' | 'Allowed' | 'Flagged';
  details: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  username: string;
  role: UserRole;
  organization?: string;
  action: string;
  status: 'Success' | 'Failed' | 'Denied' | 'Blocked';
  severity?: 'Low' | 'Medium' | 'High' | 'Critical';
  ipAddress: string;
  browser?: string;
  os?: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sqlQuery?: string;
  confidenceScore?: number;
  retrievedDocs?: { title: string; floatId: string; relevance: string }[];
  executionTimeMs?: number;
  isBlocked?: boolean;
}

export interface ChatConversation {
  id: string;
  title: string;
  lastUpdated: string;
  isPinned?: boolean;
  messages: ChatMessage[];
}

export interface ArgoFloat {
  id: string;
  floatId: string;
  oceanRegion: string;
  latitude: number;
  longitude: number;
  temperature: number;
  salinity: number;
  pressure: number;
  depth: number;
  lastTransmission: string;
  status: 'Active' | 'Maintenance' | 'Historical';
}
