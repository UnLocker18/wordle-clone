import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
/* 
  EXTERNAL APIS
*/

export const getRandomWord = (wordLength: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}&lang=it`)
      .then((response) => response.json())
      .then((response) => resolve((response as string[])[0]))
      .catch((error) => reject(error));
  });
};

/* 
  GENERIC UTILS
*/

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const lowercaseLetters = (() => {
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  return caps.map((letter) => letter.toLowerCase());
})();
