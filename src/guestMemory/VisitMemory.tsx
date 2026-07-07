import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {faqItems} from '../conciergeDesk/assistantAnswers';
import {services} from '../conciergeDesk/guestServices';
import type {
  AssistantMessage,
  ComfortSettings,
  ReservationItem,
  ServiceItem,
} from '../domain/visitTypes';
import {bookingDateLabel} from '../helpers/visitClock';

type VisitMemoryState = {
  savedEventIds: string[];
  savedPlaceIds: string[];
  reservations: ReservationItem[];
  assistantMessages: AssistantMessage[];
  comfortSettings: ComfortSettings;
  toggleSavedEvent: (eventId: string) => void;
  toggleSavedPlace: (placeId: string) => void;
  addReservation: (service: ServiceItem, time: string, notes: string) => void;
  cancelReservation: (reservationId: string) => void;
  askAssistant: (question: string) => void;
  clearAssistant: () => void;
  updateComfortSettings: (settings: ComfortSettings) => void;
};

const VisitMemoryContext = createContext<VisitMemoryState | null>(null);

const storageKeys = {
  savedEvents: 'conciergeReginaVisit.savedEvents',
  savedPlaces: 'conciergeReginaVisit.savedPlaces',
  reservations: 'conciergeReginaVisit.reservations',
  assistantMessages: 'conciergeReginaVisit.assistantMessages',
  comfortSettings: 'conciergeReginaVisit.comfortSettings',
};

const defaultComfortSettings: ComfortSettings = {
  temperature: 22,
  climateMode: 'Auto',
  preset: 'Comfort',
  brightness: 70,
  lightingScene: 'Relax',
  zone: 'Main Room',
};

const defaultAssistantMessages: AssistantMessage[] = [
  {
    id: 'welcome-question',
    role: 'user',
    text: 'How do I use my guest access code?',
  },
  {
    id: 'welcome-answer',
    role: 'assistant',
    text: 'Open the Access tab and show your Guest Identification Code to a staff member when confirmation is required.',
  },
  {
    id: 'places-question',
    role: 'user',
    text: 'Where can I find places to visit nearby?',
  },
  {
    id: 'places-answer',
    role: 'assistant',
    text: 'Open the Explore tab to browse museums, landmarks, parks, food spots, and Regina city highlights.',
  },
];

async function readJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => undefined);
}

function uniqueId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function answerFor(question: string) {
  const normalized = question.toLowerCase();
  const match = faqItems.find(item => item.question.toLowerCase() === normalized);
  if (match) {
    return match.answer;
  }
  if (normalized.includes('reserve') || normalized.includes('service')) {
    return 'Open the Services tab, choose the request you need, add visit notes, and confirm the reservation. It will stay in My Reservations until you cancel it.';
  }
  if (normalized.includes('event')) {
    return 'Open the Access tab to view today events, save favorites, and open event details before your visit.';
  }
  return 'Ask venue staff during your visit for confirmation, activation, reservations, or access support.';
}

export function VisitMemoryProvider({children}: {children: React.ReactNode}) {
  const [loaded, setLoaded] = useState(false);
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>([]);
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>(
    defaultAssistantMessages,
  );
  const [comfortSettings, setComfortSettings] =
    useState<ComfortSettings>(defaultComfortSettings);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const [
        nextSavedEvents,
        nextSavedPlaces,
        nextReservations,
        nextAssistantMessages,
        nextComfortSettings,
      ] = await Promise.all([
        readJson<string[]>(storageKeys.savedEvents, []),
        readJson<string[]>(storageKeys.savedPlaces, []),
        readJson<ReservationItem[]>(storageKeys.reservations, []),
        readJson<AssistantMessage[]>(storageKeys.assistantMessages, defaultAssistantMessages),
        readJson<ComfortSettings>(storageKeys.comfortSettings, defaultComfortSettings),
      ]);
      if (!mounted) {
        return;
      }
      setSavedEventIds(nextSavedEvents);
      setSavedPlaceIds(nextSavedPlaces);
      setReservations(nextReservations);
      setAssistantMessages(nextAssistantMessages);
      setComfortSettings(nextComfortSettings);
      setLoaded(true);
    }
    load().catch(() => {
      if (mounted) {
        setLoaded(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      writeJson(storageKeys.savedEvents, savedEventIds);
    }
  }, [loaded, savedEventIds]);

  useEffect(() => {
    if (loaded) {
      writeJson(storageKeys.savedPlaces, savedPlaceIds);
    }
  }, [loaded, savedPlaceIds]);

  useEffect(() => {
    if (loaded) {
      writeJson(storageKeys.reservations, reservations);
    }
  }, [loaded, reservations]);

  useEffect(() => {
    if (loaded) {
      writeJson(storageKeys.assistantMessages, assistantMessages);
    }
  }, [assistantMessages, loaded]);

  useEffect(() => {
    if (loaded) {
      writeJson(storageKeys.comfortSettings, comfortSettings);
    }
  }, [comfortSettings, loaded]);

  const value = useMemo<VisitMemoryState>(
    () => ({
      savedEventIds,
      savedPlaceIds,
      reservations,
      assistantMessages,
      comfortSettings,
      toggleSavedEvent: eventId => {
        setSavedEventIds(current =>
          current.includes(eventId)
            ? current.filter(item => item !== eventId)
            : [...current, eventId],
        );
      },
      toggleSavedPlace: placeId => {
        setSavedPlaceIds(current =>
          current.includes(placeId)
            ? current.filter(item => item !== placeId)
            : [...current, placeId],
        );
      },
      addReservation: (service, time, notes) => {
        const reservation: ReservationItem = {
          id: uniqueId('reservation'),
          serviceId: service.id,
          serviceTitle: service.title,
          tag: service.tag,
          emoji: service.emoji,
          date: bookingDateLabel,
          time,
          notes,
          createdAt: new Date().toISOString(),
        };
        setReservations(current => [reservation, ...current]);
      },
      cancelReservation: reservationId => {
        setReservations(current => current.filter(item => item.id !== reservationId));
      },
      askAssistant: question => {
        const userMessage: AssistantMessage = {
          id: uniqueId('message-user'),
          role: 'user',
          text: question,
        };
        const assistantMessage: AssistantMessage = {
          id: uniqueId('message-assistant'),
          role: 'assistant',
          text: answerFor(question),
        };
        setAssistantMessages(current => [...current, userMessage, assistantMessage]);
      },
      clearAssistant: () => {
        setAssistantMessages([]);
      },
      updateComfortSettings: settings => {
        setComfortSettings(settings);
      },
    }),
    [
      assistantMessages,
      comfortSettings,
      reservations,
      savedEventIds,
      savedPlaceIds,
    ],
  );

  return <VisitMemoryContext.Provider value={value}>{children}</VisitMemoryContext.Provider>;
}

export function useVisitMemory() {
  const value = useContext(VisitMemoryContext);
  if (!value) {
    throw new Error('useVisitMemory must be used inside VisitMemoryProvider');
  }
  return value;
}

export function serviceById(id: string) {
  return services.find(service => service.id === id);
}
