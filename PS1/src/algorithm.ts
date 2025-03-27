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

  // Find the current bucket of the flashcard
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

  // Fix: Move to the next bucket correctly
  if (difficulty === AnswerDifficulty.Easy) {
    newBucket = Math.min(currentBucket + 1, Math.max(...newBuckets.keys(), currentBucket + 1));
  } else if (difficulty === AnswerDifficulty.Hard) {
    newBucket = Math.max(currentBucket - 1, 0);
  }

  // Ensure the new bucket exists
  if (!newBuckets.has(newBucket)) {
    newBuckets.set(newBucket, new Set());
  }

  // Move card to the new bucket
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

  const words = card.front.split(/\s+/).filter(word => word.length > 0);
  if (words.length === 0) {
    return "..."; // Default hint for empty input
  }

  return words
    .map(word => {
      const sliceLength = Math.max(1, Math.ceil(word.length / 2));
      return word.slice(0, sliceLength) + "...";
    })
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
export function computeProgress(
  buckets: BucketMap,
  history: Map<Flashcard, AnswerDifficulty[]>
): { totalCards: number; bucketCounts: Map<number, number> } {
  const bucketCounts = new Map<number, number>();
  let totalCards = 0;

  for (const [bucket, cards] of buckets.entries()) {
    bucketCounts.set(bucket, cards.size);
    totalCards += cards.size;
  }

  return { totalCards, bucketCounts };
}




