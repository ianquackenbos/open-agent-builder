export type Role = 'owner' | 'admin' | 'user' | 'viewer';

export interface SessionUser {
  id: string;
  role: Role;
  name: string;
  email: string;
  orgId: string;
}

export type Resource = 'workflow' | 'template' | 'execution' | 'settings' | 'api-keys';
export type Action = 'create' | 'read' | 'update' | 'delete' | 'execute';

export interface AuthPort {
  getSessionUser(): Promise<SessionUser | null>;
  can(user: SessionUser, resource: Resource, action: Action): boolean;
}

export function can(user: SessionUser, resource: Resource, action: Action): boolean {
  // Owner has full access
  if (user.role === 'owner') {
    return true;
  }
  
  // Admin has most access except some owner-only actions
  if (user.role === 'admin') {
    return action !== 'delete' || resource === 'workflow';
  }
  
  // User can read and execute, limited create/update
  if (user.role === 'user') {
    return ['read', 'execute'].includes(action) || 
           (action === 'create' && ['workflow', 'template'].includes(resource)) ||
           (action === 'update' && resource === 'workflow');
  }
  
  // Viewer can only read
  if (user.role === 'viewer') {
    return action === 'read';
  }
  
  return false;
}
