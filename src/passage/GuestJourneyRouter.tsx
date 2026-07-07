import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {JourneyDock} from '../kit/JourneyDock';
import {colors} from '../styleGuide/styleTokens';
import {VisitMemoryProvider} from '../guestMemory/VisitMemory';
import type {AppRoute, TabKey} from '../domain/visitTypes';
import {ArrivalAccessDesk} from '../journeys/ArrivalAccessDesk';
import {ConciergeChatDesk} from '../journeys/ConciergeChatDesk';
import {SuiteComfortPanel} from '../journeys/SuiteComfortPanel';
import {EventPassDetail} from '../journeys/EventPassDetail';
import {ReginaDiscoveryMap} from '../journeys/ReginaDiscoveryMap';
import {ArrivalBriefing} from '../journeys/ArrivalBriefing';
import {CityPlaceStory} from '../journeys/CityPlaceStory';
import {VisitItineraryDesk} from '../journeys/VisitItineraryDesk';
import {ServiceRequestAtelier} from '../journeys/ServiceRequestAtelier';
import {ServiceSalon} from '../journeys/ServiceSalon';
import {WelcomeCurtain} from '../journeys/WelcomeCurtain';

const onboardingKey = 'conciergeReginaVisit.onboardingComplete';

const tabRoutes: Record<TabKey, AppRoute> = {
  access: {name: 'ArrivalAccessDesk'},
  assistant: {name: 'ConciergeChatDesk'},
  services: {name: 'ServiceSalon'},
  comfort: {name: 'SuiteComfortPanel'},
  explore: {name: 'ReginaDiscoveryMap'},
};

function activeTabFor(route: AppRoute): TabKey {
  switch (route.name) {
    case 'ConciergeChatDesk':
      return 'assistant';
    case 'ServiceSalon':
    case 'ServiceRequestAtelier':
    case 'VisitItineraryDesk':
      return 'services';
    case 'SuiteComfortPanel':
      return 'comfort';
    case 'ReginaDiscoveryMap':
    case 'CityPlaceStory':
      return 'explore';
    default:
      return 'access';
  }
}

function hasTabBar(route: AppRoute) {
  return (
    route.name === 'ArrivalAccessDesk' ||
    route.name === 'ConciergeChatDesk' ||
    route.name === 'ServiceSalon' ||
    route.name === 'SuiteComfortPanel' ||
    route.name === 'ReginaDiscoveryMap'
  );
}

function GuestPassage() {
  const [route, setRoute] = useState<AppRoute>({name: 'ArrivalAccessDesk'});

  function changeTab(tab: TabKey) {
    setRoute(tabRoutes[tab]);
  }

  let activeJourney: React.ReactNode;

  switch (route.name) {
    case 'ArrivalAccessDesk':
      activeJourney = <ArrivalAccessDesk onOpenEvent={eventId => setRoute({name: 'EventPassDetail', eventId})} />;
      break;
    case 'ConciergeChatDesk':
      activeJourney = <ConciergeChatDesk />;
      break;
    case 'ServiceSalon':
      activeJourney = (
        <ServiceSalon
          onOpenService={serviceId => setRoute({name: 'ServiceRequestAtelier', serviceId})}
          onOpenReservations={() => setRoute({name: 'VisitItineraryDesk'})}
        />
      );
      break;
    case 'SuiteComfortPanel':
      activeJourney = <SuiteComfortPanel />;
      break;
    case 'ReginaDiscoveryMap':
      activeJourney = <ReginaDiscoveryMap onOpenPlace={placeId => setRoute({name: 'CityPlaceStory', placeId})} />;
      break;
    case 'EventPassDetail':
      activeJourney = <EventPassDetail eventId={route.eventId} onBack={() => setRoute({name: 'ArrivalAccessDesk'})} />;
      break;
    case 'ServiceRequestAtelier':
      activeJourney = (
        <ServiceRequestAtelier serviceId={route.serviceId} onBack={() => setRoute({name: 'ServiceSalon'})} />
      );
      break;
    case 'VisitItineraryDesk':
      activeJourney = <VisitItineraryDesk onBack={() => setRoute({name: 'ServiceSalon'})} />;
      break;
    case 'CityPlaceStory':
      activeJourney = <CityPlaceStory placeId={route.placeId} onBack={() => setRoute({name: 'ReginaDiscoveryMap'})} />;
      break;
  }

  return (
    <View style={styles.root}>
      {activeJourney}
      {hasTabBar(route) ? (
        <JourneyDock activeTab={activeTabFor(route)} onChange={changeTab} />
      ) : null}
    </View>
  );
}

export function GuestJourneyRouter() {
  const [showSplash, setShowSplash] = useState(true);
  const [checked, setChecked] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function checkOnboarding() {
      const value = await AsyncStorage.getItem(onboardingKey);
      if (!mounted) {
        return;
      }
      setOnboardingComplete(value === 'true');
      setChecked(true);
    }
    checkOnboarding().catch(() => {
      if (mounted) {
        setChecked(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  async function finishOnboarding() {
    await AsyncStorage.setItem(onboardingKey, 'true');
    setOnboardingComplete(true);
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      {showSplash || !checked ? (
        <WelcomeCurtain />
      ) : onboardingComplete ? (
        <VisitMemoryProvider>
          <GuestPassage />
        </VisitMemoryProvider>
      ) : (
        <ArrivalBriefing onFinish={finishOnboarding} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
});
