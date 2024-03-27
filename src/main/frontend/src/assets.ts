import EmblemWhite from './images/emblem-white-32x32.svg';
import EmblemBlack from './images/emblem-black-32x32.svg';
import Profile from './images/profile.jpg';

const IMAGES = {
    whiteLogo: new URL(EmblemWhite, import.meta.url).href,
    blackLogo: new URL(EmblemBlack, import.meta.url).href,
    profile: new URL(Profile, import.meta.url).href,
};

export default IMAGES;

// const IMAGES = {
//     whiteLogo: new URL('./emblem-white-32x32.svg', import.meta.url).href,
//     blackLogo: new URL('./emblem-black-32x32.svg', import.meta.url).href,
//     profile: new URL('./profile.jpg', import.meta.url).href,
// };
//
// export default IMAGES;
