export type VerificationTimelineEventType = string;

export interface VerificationTimelineEvent {
  id: number;
  type: VerificationTimelineEventType;
  rubrique: string;
  datetime: string;
  label: string;
  value: string | number | boolean | null;
  description?: string | null;
  author?: string | null;
  ref?: string | null;
  status?: string | null;
  docsCount: number;
  raw: Record<string, unknown>;
}

export interface VerificationTimelineResponse {
  timeline: VerificationTimelineEvent[];
  [key: string]: unknown;
}
