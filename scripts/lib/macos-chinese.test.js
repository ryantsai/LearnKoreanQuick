import { expect, test } from "vitest";
import { chineseSpokenText, macosSayArguments, MEIJIA_VOICE } from "./macos-chinese.mjs";

test("uses the installed Taiwan voice at normal rate with explicit UTF-8 input files", () => {
  const args = macosSayArguments("utf8.txt", "output.aiff");
  expect(args).toEqual(["-v", MEIJIA_VOICE, "-f", "utf8.txt", "-o", "output.aiff"]);
  expect(args).not.toContain("-r");
  expect(chineseSpokenText("對不起，下班之後有事。")).toBe("對不起，下班之後有事。");
  expect(chineseSpokenText("請自行使用 -(으)면 或 -(으)ㄴ 후에 回答。"))
    .toBe("請自行使用「如果」或「之後」的句型回答。");
});
