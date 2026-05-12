/**
 * Tenant + user context the backend expects on most endpoints. Populated
 * by the consumer after `/api/auth_0` returns the account record. Mirrors
 * the legacy Vue app's `JSON.parse(sessionStorage.user)` shape.
 *
 * Every field is optional: callers may not have every value when the SDK
 * is first constructed, and not every endpoint reads every field.
 */
export interface AppContext {
  /** Tenant ID — the legacy app reads this as `user.appID`. */
  appID?: string;
  /** Pipe-separated list of site paths the user is restricted to. The
   *  legacy wire format uses the literal string "null" when there is no
   *  restriction; pass undefined here and the SDK will emit "null". */
  restrictionsite?: string | null;
  /** Symfony role string (e.g. "ROLE_ADMIN", "ROLE_SOUS_TRAITANT"). */
  role?: string;
  /** Internal user PK (legacy field name `idUser`). */
  idUser?: number | string;
  /** Tiers ID — relevant when role is ROLE_SOUS_TRAITANT. */
  tiers_id?: number | string;
  /** Hourly rate used by Maintenance.coutInterne. */
  tauxHoraire?: number;
}
