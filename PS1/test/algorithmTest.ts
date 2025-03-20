import assert from "assert";
import { AnswerDifficulty, Flashcard, BucketMap } from "../src/flashcards";
import {
  toBucketSets,
  getBucketRange,
  practice,
  update,
  getHint,
  computeProgress,
  isPrime
} from "../src/algorithm";

/*
 * Testing strategy for toBucketSets():
 *
 * TODO: Describe your testing strategy for toBucketSets() here.
 */
describe("toBucketSets()", () => {
  it("should correctly convert a single bucket map", () => {
    const flashcard1 = new Flashcard("Q1", "A1", "Hint for Q1", ["tag1"]);

    const buckets: BucketMap = new Map([[0, new Set([flashcard1])]]);
    const expected = [new Set([flashcard1])];

    assert.deepStrictEqual(toBucketSets(buckets), expected);
  });
});


/*
 * Testing strategy for getBucketRange():
 *
 * TODO: Describe your testing strategy for getBucketRange() here.
 */
describe("getBucketRange()", () => {
  it("should return correct range for multiple non-empty buckets", () => {
    const flashcard1 = new Flashcard("Q1", "A1", "Hint for Q1", ["tag1"]);
    const flashcard2 = new Flashcard("Q2", "A2", "Hint for Q2", ["tag2"]);

    const buckets: Array<Set<Flashcard>> = [
      new Set<Flashcard>(), // Empty bucket
      new Set<Flashcard>([flashcard1]), // Flashcard in bucket 1
      new Set<Flashcard>(), // Empty bucket
      new Set<Flashcard>([flashcard2])  // Flashcard in bucket 3
    ];

    assert.deepStrictEqual(getBucketRange(buckets), { minBucket: 1, maxBucket: 3 });
  });
});


/*
 * Testing strategy for practice():
 *
 * TODO: Describe your testing strategy for practice() here.
 */
describe("practice()", () => {
  it("should return an empty set for empty buckets", () => {
    assert.deepStrictEqual(practice([], 0), new Set());
  });

  it("should return cards from the correct buckets based on day", () => {
    const flashcard1 = new Flashcard("Q1", "A1", "Hint for Q1", ["tag1"]);
    const flashcard2 = new Flashcard("Q2", "A2", "Hint for Q2", ["tag2"]);
    const buckets: Array<Set<Flashcard>> = [
      new Set([flashcard1]), // Practice every day
      new Set([flashcard2])  // Practice every 2 days
    ];
    assert.deepStrictEqual(practice(buckets, 2), new Set([flashcard1, flashcard2]));
    assert.deepStrictEqual(practice(buckets, 3), new Set([flashcard1]));
  });
});

/*
 * Testing strategy for update():
 *
 * TODO: Describe your testing strategy for update() here.
 */
describe("update()", () => {
  it("should move a card to the next bucket if answered easy", () => {
    const flashcard = new Flashcard("Q1", "A1", "Hint for Q1", ["tag1"]);
    const buckets: BucketMap = new Map([[0, new Set([flashcard])]]);
    
    const updatedBuckets = update(buckets, flashcard, AnswerDifficulty.Easy);
    
    assert.strictEqual(updatedBuckets.get(1)?.has(flashcard), true);
  });

  it("should move a card down a bucket if answered hard", () => {
    const flashcard = new Flashcard("Q1", "A1", "Hint for Q1", ["tag1"]);
    const buckets: BucketMap = new Map([[1, new Set([flashcard])]]);
    
    const updatedBuckets = update(buckets, flashcard, AnswerDifficulty.Hard);
    
    assert.strictEqual(updatedBuckets.get(0)?.has(flashcard), true);
  });
});

/*
 * Testing strategy for getHint():
 *
 * TODO: Describe your testing strategy for getHint() here.
 */

describe("getHint()", () => {
  it("should generate a partial hint for single-word front", () => {
    const testCard = new Flashcard("Programming", "Coding", "", []);
    assert.strictEqual(getHint(testCard), "Progr...");
  });

  it("should generate a partial hint for multi-word front", () => {
    const testCard = new Flashcard("Object Oriented Programming", "OOP", "", []);
    assert.strictEqual(getHint(testCard), "Obj... Ori... Pro...");
  });

  it("should throw an error for empty front", () => {
    const testCard = new Flashcard("", "Definition", "", []);
    assert.throws(() => getHint(testCard), /Invalid flashcard/);
  });
});

/*
 * Testing strategy for computeProgress():
 *
 * TODO: Describe your testing strategy for computeProgress() here.
 */
describe("computeProgress()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});

describe("testting is prime", () => {
  it("", () => {
    assert.fail(
      ""
    );
  });
});