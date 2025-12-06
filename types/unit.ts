// /types/unit.ts

export type UnitType =
  | "guest_room"
  | "suite"
  | "villa"
  | "cabin"
  | "apartment"
  | "conference_room";

export type ViewType =
  | "parking"
  | "forest"
  | "mountain"
  | "stream"
  | "garden"
  | "city"
  | "courtyard";

export type BedSize =
  | "king"
  | "queen"
  | "double"
  | "twin"
  | "bunkbed"
  | "daybed"
  | "sofa_bed";

export interface BedSpec {
  size: BedSize;
  count: number; // how many beds of this size
}

export type MediaType = "image" | "video" | "audio" | "360_tour" | "document";

export interface UnitMedia {
  type: MediaType;
  url: string; // primary endpoint/URL for the media (e.g., image src, video stream, audio file)
  thumbnailUrl?: string; // optional thumbnail endpoint for previews
  altText?: string; // accessibility description
  caption?: string; // descriptive text or title
  duration?: number; // in seconds, for video/audio
  fileSize?: number; // in bytes, for management
  mimeType?: string; // e.g., 'image/jpeg', 'video/mp4', 'audio/mpeg'
  uploadDate?: string; // ISO date string for when it was added
  isPrimary?: boolean; // flag for main display image/video
}

export type Amenity =
  | "wifi"
  | "tv"
  | "air_conditioning"
  | "heating"
  | "kitchen"
  | "refrigerator"
  | "microwave"
  | "coffee_maker"
  | "washer_dryer"
  | "balcony"
  | "fireplace"
  | "pool_access"
  | "gym_access"
  | "parking"
  | "elevator"
  | "wheelchair_accessible"
  | "pet_friendly"
  | "smoking_allowed"
  | "crib_available"
  | "high_chair_available";

export interface UnitConfig {
  squareFeet?: number;
  view?: ViewType;
  beds?: BedSpec[];
  shower?: boolean;
  bathtub?: boolean;
  hotTub?: boolean;
  sauna?: boolean;
  ada?: boolean;
  maxOccupancy?: number; // maximum number of guests
  maxAdults?: number;
  maxChildren?: number;
  floorLevel?: number; // e.g., 1 for first floor
  building?: string; // if part of a complex
  amenities?: Amenity[]; // list of available amenities
  petPolicy?: "allowed" | "not_allowed" | "restricted"; // more detailed than just boolean
  smokingPolicy?: "allowed" | "not_allowed";
}

export interface UnitCalendarLink {
  calendarId: string;      // ObjectId as string
  name: string;            // stored for fast display/snapshots
  version: number;
  effectiveDate: string;   // yyyy-mm-dd
}

export interface Unit {
  _id?: string;
  tenantId: string;
  unit_id: string;
  name: string;
  unitNumber?: string;
  type: UnitType;
  description?: string;
  rate: number;
  currency: string;        // e.g., "USD"
  config: UnitConfig;
  media?: UnitMedia[];     // array of media items for the unit
  calendars: UnitCalendarLink[]; // multiple calendar versions over time
  active: boolean;
  tags?: string[];         // arbitrary tags for categorization, e.g., ["luxury", "family_friendly"]
  locationDescription?: string; // detailed location notes
  checkInTime?: string;    // default check-in time, e.g., "15:00"
  checkOutTime?: string;   // default check-out time, e.g., "11:00"
  minStayNights?: number;  // minimum booking length
  maxStayNights?: number;  // maximum booking length
  cleaningFee?: number;    // additional fees
  securityDeposit?: number;
  createdAt?: string;
  updatedAt?: string;
}