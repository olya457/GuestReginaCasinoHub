import type {ImageSourcePropType} from 'react-native';

const image = (asset: ImageSourcePropType) => asset;

export const images = {
  logo: image(require('./brand/signature-logo.png')),
  onboardingAccess: image(require('./arrival/facade-night.png')),
  onboardingServices: image(require('./arrival/amber-dining-lounge.png')),
  onboardingComfort: image(require('./arrival/private-suite-comfort.png')),
  onboardingExplore: image(require('./arrival/rooftop-city-evening.png')),
  places: {
    wascanaCentre: image(require('./places/wascana-centre-lakewalk.png')),
    cornwallCentre: image(require('./places/cornwall-centre-arcade.png')),
    dunlopArtGallery: image(require('./places/dunlop-art-gallery.png')),
    globeTheatre: image(require('./places/globe-theatre-downtown.png')),
    governmentHouse: image(require('./places/government-house-heritage.png')),
    mackenzieArtGallery: image(require('./places/mackenzie-art-gallery.png')),
    mosaicStadium: image(require('./places/mosaic-stadium-area.png')),
    rcmpHeritageCentre: image(require('./places/rcmp-heritage-centre.png')),
    farmersMarket: image(require('./places/farmers-market-square.png')),
    floralConservatory: image(require('./places/floral-conservatory.png')),
    warehouseDistrict: image(require('./places/warehouse-district.png')),
    scienceCentre: image(require('./places/saskatchewan-science-centre.png')),
    sportsHallOfFame: image(require('./places/sports-hall-of-fame.png')),
  },
};
