import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

const getImageRef = async (path) => {
  return storage().ref(path);
};

/**
 * Upload Photo
 * @param {object} photoString base64 encoded photo to upload
 * @param {string} tailNumber tail number of the plane
 * @param {string} flightId id of the flight
 * @param {string} photoName name of the photo
 * @returns promise of the url to download the image
 */
export const uploadPhoto = async (photo, tailNumber, flightId, photoName) => {
  const imageRef = await getImageRef(`/reciepts/${tailNumber}/${flightId}/${photoName}${Platform.OS === 'ios' ? '.jpg' : '.jpg'}`);
  await imageRef.putFile(photo['uri']);
  const url = await imageRef.getDownloadURL();
  return url;
};