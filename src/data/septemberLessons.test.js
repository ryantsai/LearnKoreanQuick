import { describe, expect, test } from 'vitest';
import { septemberLessons } from './septemberLessons.js';

describe('September PDF lessons', () => {
  test('preserves source dialogues, open practice, and prices', () => {
    const [cafe, shopping] = septemberLessons;
    expect(cafe.sourcePdf).toBe('docs/lessons/new/0908.pdf');
    expect(shopping.sourcePdf).toBe('docs/lessons/new/0909.pdf');
    expect(cafe.dialogues[0].lines).toHaveLength(5);
    expect(shopping.dialogues[0].lines).toHaveLength(7);
    expect(cafe.vocabulary).toHaveLength(25);
    expect(shopping.guide.practice.items).toHaveLength(12);
    for (const lesson of septemberLessons) {
      expect(lesson.dialogues[1].lines.some(line => line.ko.includes('____'))).toBe(true);
      for (const dialogue of lesson.dialogues) {
        for (const line of dialogue.lines) {
          for (const printedPrice of line.ko.match(/\d+원[가-힣]*/g) ?? []) {
            const token = line.tokens.find(word => word.displayText === printedPrice);
            expect(token, `Missing clickable price ${printedPrice}`).toBeDefined();
            expect(token.text).toMatch(/^[가-힣]+$/);
          }
        }
      }
    }
  });
});
