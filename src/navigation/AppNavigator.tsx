import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {FloatingTabBar} from '../components/FloatingTabBar';
import {colors} from '../constants/theme';
import {AppStoreProvider} from '../state/AppStore';
import type {AppRoute, TabKey} from '../types/app';
import {AccessScreen} from '../screens/AccessScreen';
import {AssistantScreen} from '../screens/AssistantScreen';
import {ComfortScreen} from '../screens/ComfortScreen';
import {EventDetailScreen} from '../screens/EventDetailScreen';
import {ExploreScreen} from '../screens/ExploreScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {PlaceDetailScreen} from '../screens/PlaceDetailScreen';
import {ReservationsScreen} from '../screens/ReservationsScreen';
import {ServiceDetailScreen} from '../screens/ServiceDetailScreen';
import {ServicesScreen} from '../screens/ServicesScreen';
import {SplashScreen} from '../screens/SplashScreen';

const onboardingKey = 'guestRegina.onboardingComplete';

const tabRoutes: Record<TabKey, AppRoute> = {
  access: {name: 'Access'},
  assistant: {name: 'Assistant'},
  services: {name: 'Services'},
  comfort: {name: 'Comfort'},
  explore: {name: 'Explore'},
};

function activeTabFor(route: AppRoute): TabKey {
  switch (route.name) {
    case 'Assistant':
      return 'assistant';
    case 'Services':
    case 'ServiceDetail':
    case 'Reservations':
      return 'services';
    case 'Comfort':
      return 'comfort';
    case 'Explore':
    case 'PlaceDetail':
      return 'explore';
    default:
      return 'access';
  }
}

function hasTabBar(route: AppRoute) {
  return (
    route.name === 'Access' ||
    route.name === 'Assistant' ||
    route.name === 'Services' ||
    route.name === 'Comfort' ||
    route.name === 'Explore'
  );
}

function MainNavigator() {
  const [route, setRoute] = useState<AppRoute>({name: 'Access'});

  function changeTab(tab: TabKey) {
    setRoute(tabRoutes[tab]);
  }

  let screen: React.ReactNode;

  switch (route.name) {
    case 'Access':
      screen = <AccessScreen onOpenEvent={eventId => setRoute({name: 'EventDetail', eventId})} />;
      break;
    case 'Assistant':
      screen = <AssistantScreen />;
      break;
    case 'Services':
      screen = (
        <ServicesScreen
          onOpenService={serviceId => setRoute({name: 'ServiceDetail', serviceId})}
          onOpenReservations={() => setRoute({name: 'Reservations'})}
        />
      );
      break;
    case 'Comfort':
      screen = <ComfortScreen />;
      break;
    case 'Explore':
      screen = <ExploreScreen onOpenPlace={placeId => setRoute({name: 'PlaceDetail', placeId})} />;
      break;
    case 'EventDetail':
      screen = <EventDetailScreen eventId={route.eventId} onBack={() => setRoute({name: 'Access'})} />;
      break;
    case 'ServiceDetail':
      screen = (
        <ServiceDetailScreen serviceId={route.serviceId} onBack={() => setRoute({name: 'Services'})} />
      );
      break;
    case 'Reservations':
      screen = <ReservationsScreen onBack={() => setRoute({name: 'Services'})} />;
      break;
    case 'PlaceDetail':
      screen = <PlaceDetailScreen placeId={route.placeId} onBack={() => setRoute({name: 'Explore'})} />;
      break;
  }

  return (
    <View style={styles.root}>
      {screen}
      {hasTabBar(route) ? (
        <FloatingTabBar activeTab={activeTabFor(route)} onChange={changeTab} />
      ) : null}
    </View>
  );
}

export function AppNavigator() {
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
        <SplashScreen />
      ) : onboardingComplete ? (
        <AppStoreProvider>
          <MainNavigator />
        </AppStoreProvider>
      ) : (
        <OnboardingScreen onFinish={finishOnboarding} />
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
