// Document data types for the UFO Declassified project

export type Agency = 'DOW' | 'FBI' | 'NASA' | 'DOS' | 'NARA' | 'CIA' | 'ICA' | 'ODNI' | 'DOE' | 'EOP' | 'OTHER';

export type DocumentCategory =
  | 'mission-report'
  | 'range-fouler'
  | 'cable'
  | 'transcript'
  | 'photo-evidence'
  | 'video-evidence'
  | 'case-file'
  | 'email'
  | 'archival'
  | 'crew-debriefing'
  | 'launch-summary'
  | 'presentation'
  | 'audio-recording';

export type FileType = 'image' | 'video' | 'pdf' | 'audio';

export interface DocumentFile {
  type: FileType;
  filename: string;
  /** Size in bytes */
  size: number;
  description?: string;
  /** Optional official or externally hosted file URL. */
  url?: string;
  /** Optional image used as a preview or video poster. */
  thumbnailUrl?: string;
  /** Optional official source page URL for the file. */
  sourceUrl?: string;
  /** Optional MIME type from the source. */
  contentType?: string;
}

export interface GeoLocation {
  name: string;
  region: string;
  lat?: number;
  lng?: number;
}

export interface DeclassifiedDocument {
  id: string;
  slug: string;
  title: string;
  agency: Agency;
  category: DocumentCategory;
  /** Date of the original document/event */
  date: string;
  /** Year of the event for timeline grouping */
  year: number;
  /** Date declassified or released */
  dateReleased: string;
  /** Release tranche label shown in filters and provenance. */
  releaseLabel?: string;
  /** Official source URL for this record when available. */
  sourceUrl?: string;
  location?: GeoLocation;
  /** Original classification level */
  classification: string;
  summary: string;
  /** Key findings or notable elements */
  keyFindings: string[];
  files: DocumentFile[];
  /** Related document IDs */
  relatedDocs: string[];
  tags: string[];
  /** Whether this is a featured/highlighted document */
  featured?: boolean;
}

export const AGENCY_INFO: Record<Agency, { name: string; fullName: string; color: string; badgeClass: string }> = {
  DOW: { name: 'DOW', fullName: 'Department of War', color: '#f59e0b', badgeClass: 'badge-dow' },
  FBI: { name: 'FBI', fullName: 'Federal Bureau of Investigation', color: '#3b82f6', badgeClass: 'badge-fbi' },
  NASA: { name: 'NASA', fullName: 'National Aeronautics and Space Administration', color: '#06b6d4', badgeClass: 'badge-nasa' },
  DOS: { name: 'DOS', fullName: 'Department of State', color: '#a855f7', badgeClass: 'badge-dos' },
  NARA: { name: 'NARA', fullName: 'National Archives and Records Administration', color: '#10b981', badgeClass: 'badge-nara' },
  CIA: { name: 'CIA', fullName: 'Central Intelligence Agency', color: '#f97316', badgeClass: 'badge-cia' },
  ICA: { name: 'ICA', fullName: 'Intelligence Community Assessment', color: '#818cf8', badgeClass: 'badge-ica' },
  ODNI: { name: 'ODNI', fullName: 'Office of the Director of National Intelligence', color: '#14b8a6', badgeClass: 'badge-odni' },
  DOE: { name: 'DOE', fullName: 'Department of Energy', color: '#eab308', badgeClass: 'badge-doe' },
  EOP: { name: 'EOP', fullName: 'Executive Office of the President', color: '#ec4899', badgeClass: 'badge-dos' },
  OTHER: { name: 'Other', fullName: 'Other Sources', color: '#6b7280', badgeClass: 'badge-nara' },
};

export const CATEGORY_INFO: Record<DocumentCategory, { label: string; icon: string }> = {
  'mission-report': { label: 'Mission Report', icon: '[MR]' },
  'range-fouler': { label: 'Range Fouler Debrief', icon: '[RF]' },
  'cable': { label: 'Diplomatic Cable', icon: '[DC]' },
  'transcript': { label: 'Transcript', icon: '[TX]' },
  'photo-evidence': { label: 'Photo Evidence', icon: '[PH]' },
  'video-evidence': { label: 'Video Evidence', icon: '[VD]' },
  'case-file': { label: 'Case File', icon: '[CF]' },
  'email': { label: 'Email Correspondence', icon: '[EM]' },
  'archival': { label: 'Archival Record', icon: '[AR]' },
  'crew-debriefing': { label: 'Crew Debriefing', icon: '[CD]' },
  'launch-summary': { label: 'Launch Summary', icon: '[LS]' },
  'presentation': { label: 'Presentation', icon: '[PR]' },
  'audio-recording': { label: 'Audio Recording', icon: '[AU]' },
};
