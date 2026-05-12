/**
 * Parameter interface representing an application parameter
 */
export interface Parameter {
  id?: string | number;
  key?: string;
  value?: string | number | boolean | object;
  userId?: string | number;
  type?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * ParameterUpdateRequest interface for updating parameters
 */
export interface ParameterUpdateRequest {
  key?: string;
  value?: string | number | boolean | object;
  userId?: string | number;
  type?: string;
  description?: string;
}

/**
 * Demo account entities configuration
 */
export interface DemoAccountEntities {
  maintenances?: boolean;
  equipements?: boolean;
  lieux?: boolean;
  contrats?: boolean;
  tiers?: boolean;
  contacts?: boolean;
  taches?: boolean;
  consommables?: boolean;
  categories?: boolean;
}

/**
 * Demo account deletion request
 */
export interface DemoAccountDeletionRequest {
  id?: null;
  userId?: string | number;
  entitiesToRemove?: DemoAccountEntities;
}

/**
 * Session user interface for session storage
 */
export interface SessionUser {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
  parameters?: Parameter[];
  [key: string]: any; // Allow additional properties
}
