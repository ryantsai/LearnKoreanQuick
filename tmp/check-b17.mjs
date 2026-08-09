import { courseLessons } from "../src/data/courseLessons.js";
const lesson = courseLessons.find((item) => item.id === "b1-7");
const words = [
  ...lesson.dialogues.flatMap((dialogue) => dialogue.lines.flatMap((item) => item.tokens)),
  ...lesson.vocabulary,
  ...lesson.guide.sections.flatMap((section) => section.words),
  ...lesson.guide.practice.items.map((item) => item.answer)
];
for (const item of words) {
  const textLength = [...item.text].length;
  const segmentLength = item.roman.split("-").filter(Boolean).length;
  if (textLength !== segmentLength) {
    console.log(JSON.stringify(item.text), JSON.stringify(item.roman), textLength, segmentLength);
  }
}
