import { sha256 } from 'js-sha256';

export function computeHash(firstName: string, lastName: string, birthday: Date | null) {
    const hashValue = `${firstName.toUpperCase()}-${lastName.toUpperCase()}-${birthday
      ?.toISOString()
      .slice(0, 10)}`;
    return sha256(hashValue);
  };