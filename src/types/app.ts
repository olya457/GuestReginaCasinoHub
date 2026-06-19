import type {ImageSourcePropType} from 'react-native';

export type TabKey = 'access' | 'assistant' | 'services' | 'comfort' | 'explore';

export type AppRoute =
  | {name: 'Access'}
  | {name: 'Assistant'}
  | {name: 'Services'}
  | {name: 'Comfort'}
  | {name: 'Explore'}
  | {name: 'EventDetail'; eventId: string}
  | {name: 'ServiceDetail'; serviceId: string}
  | {name: 'Reservations'}
  | {name: 'PlaceDetail'; placeId: string};

export type EventItem = {
  id: string;
  title: string;
  tag: string;
  time: string;
  location: string;
  description: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  tag: string;
  emoji: string;
  description: string;
};

export type PlaceItem = {
  id: string;
  title: string;
  tag: string;
  category: 'Museums' | 'Landmarks' | 'Nature' | 'Food' | 'Family' | 'Shopping' | 'Arts' | 'Sports';
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  suggestedVisit: string;
  bestFor: string;
  tip: string;
  image: ImageSourcePropType;
};

export type ReservationItem = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  tag: string;
  emoji: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
};

export type AssistantMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

export type ComfortSettings = {
  temperature: number;
  climateMode: 'Cool' | 'Heat' | 'Auto' | 'Fan';
  preset: 'Sleep' | 'Comfort' | 'Energy';
  brightness: number;
  lightingScene: 'Relax' | 'Work' | 'Sleep' | 'Bright' | 'Movie' | 'Romance';
  zone: 'Main Room' | 'Bathroom' | 'Entry' | 'Bedside';
};
