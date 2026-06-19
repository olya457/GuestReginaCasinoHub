import type {ImageSourcePropType} from 'react-native';

const image = (asset: ImageSourcePropType) => asset;

export const images = {
  logo: image(require('./casino_regina_guesthub_signature_logo.png')),
  onboardingAccess: image(require('./regina_casino_arrival_facade_night.png')),
  onboardingServices: image(require('./regina_casino_amber_dining_lounge.png')),
  onboardingComfort: image(require('./regina_casino_private_suite_comfort.png')),
  onboardingExplore: image(require('./regina_casino_rooftop_city_evening.png')),
  places: {
    wascanaCentre: image(require('./regina_place_wascana_centre_lakewalk.png')),
    cornwallCentre: image(require('./regina_place_cornwall_centre_arcade.png')),
    dunlopArtGallery: image(require('./regina_place_dunlop_art_gallery.png')),
    globeTheatre: image(require('./regina_place_globe_theatre_downtown.png')),
    governmentHouse: image(require('./regina_place_government_house_heritage.png')),
    mackenzieArtGallery: image(require('./regina_place_mackenzie_art_gallery.png')),
    mosaicStadium: image(require('./regina_place_mosaic_stadium_area.png')),
    rcmpHeritageCentre: image(require('./regina_place_rcmp_heritage_centre.png')),
    farmersMarket: image(require('./regina_place_farmers_market_square.png')),
    floralConservatory: image(require('./regina_place_floral_conservatory.png')),
    warehouseDistrict: image(require('./regina_place_warehouse_district.png')),
    scienceCentre: image(require('./regina_place_saskatchewan_science_centre.png')),
    sportsHallOfFame: image(require('./regina_place_sports_hall_of_fame.png')),
  },
};
