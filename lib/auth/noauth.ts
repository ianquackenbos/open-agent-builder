import { SessionUser, AuthPort, Resource, Action, can } from './port';

const DEMO_USER: SessionUser = {
  id: 'local-owner',
  role: 'owner',
  name: 'Local Owner',
  email: 'local@openbuilder.dev',
  orgId: 'local-org'
};

export class NoAuth implements AuthPort {
  async getSessionUser(): Promise<SessionUser | null> {
    return DEMO_USER;
  }
  
  can(user: SessionUser, resource: Resource, action: Action): boolean {
    return can(user, resource, action);
  }
}

export const noAuth = new NoAuth();
