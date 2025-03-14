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
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});

/*
 * Testing strategy for update():
 *
 * TODO: Describe your testing strategy for update() here.
 */
describe("update()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});

/*
 * Testing strategy for getHint():
 *
 * TODO: Describe your testing strategy for getHint() here.
 */
describe("getHint()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
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