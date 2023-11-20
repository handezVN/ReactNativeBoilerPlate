import {enJson} from './en';

export const getLanguageKey = (keyName: string) => {
  if (enJson.hasOwnProperty(keyName)) {
    return keyName; // Output: "user"
  } else {
    return keyName;
  }
};
