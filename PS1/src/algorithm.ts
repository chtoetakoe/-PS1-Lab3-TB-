/**
 * Problem Set 1: Flashcards - Algorithm Functions
 *
 * This file contains the implementations for the flashcard algorithm functions
 * as described in the problem set handout.
 *
 * Please DO NOT modify the signatures of the exported functions in this file,
 * or you risk failing the autograder.
 */

import { Flashcard, AnswerDifficulty, BucketMap } from "./flashcards";

/**
 * Converts a Map representation of learning buckets into an Array-of-Set representation.
 *
 * @param buckets Map where keys are bucket numbers and values are sets of Flashcards.
 * @returns Array of Sets, where element at index i is the set of flashcards in bucket i.
 *          Buckets with no cards will have empty sets in the array.
 * @spec.requires buckets is a valid representation of flashcard buckets.
 */
export function toBucketSets(buckets: BucketMap): Array<Set<Flashcard>> {
  // Determine the highest bucket number to size the array correctly
  const maxBucket = Math.max(0, ...Array.from(buckets.keys()));
  
  // Initialize an array of empty sets of appropriate length
  const bucketArray: Array<Set<Flashcard>> = Array.from(
      { length: maxBucket + 1 },
      () => new Set<Flashcard>()
  );
  
  // Populate the array with flashcards from the map
  for (const [bucket, flashcards] of buckets.entries()) {
      bucketArray[bucket] = new Set(flashcards);
  }
  
  return bucketArray;
}

/**
 * Finds the range of buckets that contain flashcards, as a rough measure of progress.
 *
 * @param buckets Array-of-Set representation of buckets.
 * @returns object with minBucket and maxBucket properties representing the range,
 *          or undefined if no buckets contain cards.
 * @spec.requires buckets is a valid Array-of-Set representation of flashcard buckets.
 */
export function getBucketRange(
  buckets: Array<Set<Flashcard>>
): { minBucket: number; maxBucket: number } | undefined {
    // Find the indices of the first and last non-empty bucket
    let minBucket: number | null = null;
    let maxBucket: number | null = null;

    for (let i = 0; i < buckets.length; i++) {
        const bucket = buckets[i];
        if (bucket instanceof Set && bucket.size > 0) {
            if (minBucket === null) {
                minBucket = i;
            }
            maxBucket = i;
        }
    }

    return minBucket !== null && maxBucket !== null
        ? { minBucket, maxBucket }
        : undefined;
}



/**
 * Selects cards to practice on a particular day.
 *
 * @param buckets Array-of-Set representation of buckets.
 * @param day current day number (starting from 0).
 * @returns a Set of Flashcards that should be practiced on day `day`,
 *          according to the Modified-Leitner algorithm.
 * @spec.requires buckets is a valid Array-of-Set representation of flashcard buckets.
 */

export function practice(
  buckets: Array<Set<Flashcard>>,
  day: number
): Set<Flashcard> {
  const practiceSet: Set<Flashcard> = new Set();

  for (let i = 0; i < buckets.length; i++) {
    if (day % (1 << i) === 0) {
      const bucket = buckets[i];
      if (bucket) {
        for (const card of bucket) {
          practiceSet.add(card);
        }
      }
    }
  }

  return practiceSet;
}

/**
 * Updates a card's bucket number after a practice trial.
 *
 * @param buckets Map representation of learning buckets.
 * @param card flashcard that was practiced.
 * @param difficulty how well the user did on the card in this practice trial.
 * @returns updated Map of learning buckets.
 * @spec.requires buckets is a valid representation of flashcard buckets.
 */
export function update(
  buckets: BucketMap,
  card: Flashcard,
  difficulty: AnswerDifficulty
): BucketMap {
  const newBuckets = new Map(buckets);

  let currentBucket: number | undefined;

  for (const [bucket, cards] of newBuckets.entries()) {
    if (cards.has(card)) {
      currentBucket = bucket;
      cards.delete(card);
      break;
    }
  }

  if (currentBucket === undefined) {
    throw new Error("Card not found in any bucket");
  }

  let newBucket = currentBucket;

  if (difficulty === AnswerDifficulty.Easy) {
    newBucket = Math.min(currentBucket + 1, newBuckets.size - 1);
  } else if (difficulty === AnswerDifficulty.Hard) {
    newBucket = Math.max(currentBucket - 1, 0);
  }

  if (!newBuckets.has(newBucket)) {
    newBuckets.set(newBucket, new Set());
  }

  newBuckets.get(newBucket)!.add(card);

  return newBuckets;
}



/**
 * Generates a hint for a flashcard.
 *
 * @param card flashcard to hint
 * @returns a hint for the front of the flashcard.
 * @spec.requires card is a valid Flashcard.
 */
export function getHint(card: Flashcard): string {
  if (!card || !card.front || typeof card.front !== "string") {
    throw new Error("Invalid flashcard");
  }

  const words = card.front.split(" ");
  if (words.length === 0 || !words[0]) {
    return "..."; // Return a default hint if there's no valid text
  }

  if (words.length === 1) {
    return words[0].slice(0, Math.max(1, Math.floor(words[0].length / 2))) + "...";
  }

  return words
    .map(word => (word ? word.slice(0, Math.max(1, Math.floor(word.length / 2))) + "..." : "..."))
    .join(" ");
}



/**
 * Computes statistics about the user's learning progress.
 *
 * @param buckets representation of learning buckets.
 * @param history representation of user's answer history.
 * @returns statistics about learning progress.
 * @spec.requires [SPEC TO BE DEFINED]
 */
export function computeProgress(buckets: any, history: any): any {
  // Replace 'any' with appropriate types
  // TODO: Implement this function (and define the spec!)
  throw new Error("Implement me!");
}

/**
* Checks if a number is prime.
* @param n a non-negative integer
* @returns true if n is a prime number, false otherwise.
* @spec.requires n is an integer, n >= 0
*           (Note: 0 and 1 are NOT prime numbers)
*/
export function isPrime(n: number): boolean {
  // if (n < 2) return false; // 0 and 1 are not prime
  // if (n === 2 || n === 3) return true; // 2 and 3 are prime
  // if (n % 2 === 0 || n % 3 === 0) return false; // Exclude even numbers and multiples of 3

  // // Check from 5 to sqrt(n), skipping even numbers
  // for (let i = 5; i * i <= n; i += 6) {
  //   if (n % i === 0 || n % (i + 2) === 0) {
  //     return false;
  //   }
  // }
  return true;
}
