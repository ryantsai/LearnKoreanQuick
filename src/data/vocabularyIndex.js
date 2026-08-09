const koreanPattern = /[가-힣]/;
const singleWordPattern = /^(?:[가-힣]+|[A-Za-z]+[가-힣]+)$/u;
const finalJamo = [
  "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ",
  "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];
const initialJamo = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const representativeFinal = {
  ㄱ: "ㄱ", ㄲ: "ㄱ", ㄳ: "ㄱ", ㅋ: "ㄱ", ㄺ: "ㄱ",
  ㄴ: "ㄴ", ㄵ: "ㄴ", ㄶ: "ㄴ",
  ㄷ: "ㄷ", ㅅ: "ㄷ", ㅆ: "ㄷ", ㅈ: "ㄷ", ㅊ: "ㄷ", ㅌ: "ㄷ", ㅎ: "ㄷ",
  ㄹ: "ㄹ", ㄻ: "ㄹ", ㄼ: "ㄹ", ㄽ: "ㄹ", ㄾ: "ㄹ", ㄿ: "ㄹ", ㅀ: "ㄹ",
  ㅁ: "ㅁ", ㅂ: "ㅂ", ㅄ: "ㅂ", ㅍ: "ㅂ", ㅇ: "ㅇ"
};
const liaisonSplit = {
  ㄳ: ["ㄱ", "ㅅ"], ㄵ: ["ㄴ", "ㅈ"], ㄶ: ["ㄴ", ""], ㄺ: ["ㄹ", "ㄱ"], ㄻ: ["ㄹ", "ㅁ"],
  ㄼ: ["ㄹ", "ㅂ"], ㄽ: ["ㄹ", "ㅅ"], ㄾ: ["ㄹ", "ㅌ"], ㄿ: ["ㄹ", "ㅍ"], ㅀ: ["ㄹ", ""], ㅄ: ["ㅂ", "ㅅ"]
};

function getLastHangulBlock(text) {
  return [...text].reverse().find((character) => koreanPattern.test(character)) ?? "";
}

function getFinalConsonant(text) {
  const block = getLastHangulBlock(text);
  if (!block) return "";
  return finalJamo[(block.charCodeAt(0) - 0xac00) % 28] ?? "";
}

function replaceLastHangul(text, transform) {
  const characters = [...text];
  for (let index = characters.length - 1; index >= 0; index -= 1) {
    if (koreanPattern.test(characters[index])) {
      characters[index] = transform(characters[index]);
      break;
    }
  }
  return characters.join("");
}

function changeFinal(block, nextFinal) {
  const offset = block.charCodeAt(0) - 0xac00;
  const currentFinal = offset % 28;
  return String.fromCharCode(block.charCodeAt(0) - currentFinal + finalJamo.indexOf(nextFinal));
}

function changeInitial(block, nextInitial) {
  const offset = block.charCodeAt(0) - 0xac00;
  const medialAndFinal = offset % 588;
  return String.fromCharCode(0xac00 + initialJamo.indexOf(nextInitial) * 588 + medialAndFinal);
}

function stripTrailingPunctuation(text) {
  return text.trim().replace(/[^A-Za-z0-9가-힣]+$/u, "");
}

function pronounceAtRest(text, batchim) {
  if (!batchim) return text;
  return replaceLastHangul(text, (block) => changeFinal(block, representativeFinal[batchim] ?? batchim));
}

function connectToI(text, batchim) {
  if (!batchim) return `${text}가`;
  if (batchim === "ㅇ") return `${text}이`;

  const split = liaisonSplit[batchim];
  const remainingFinal = split?.[0] ?? "";
  let movedInitial = split?.[1] ?? batchim;
  if (batchim === "ㅎ") movedInitial = "";
  if (batchim === "ㄷ") movedInitial = "ㅈ";
  if (batchim === "ㅌ") movedInitial = "ㅊ";

  const stem = replaceLastHangul(text, (block) => changeFinal(block, remainingFinal));
  const next = movedInitial ? changeInitial("이", movedInitial) : "이";
  return `${stem}${next}`;
}

function connectToMan(text, batchim) {
  if (!batchim) return `${text}만`;
  let pronouncedFinal = representativeFinal[batchim] ?? batchim;
  if (pronouncedFinal === "ㄱ") pronouncedFinal = "ㅇ";
  if (pronouncedFinal === "ㄷ") pronouncedFinal = "ㄴ";
  if (pronouncedFinal === "ㅂ") pronouncedFinal = "ㅁ";
  return `${replaceLastHangul(text, (block) => changeFinal(block, pronouncedFinal))}만`;
}

function connectToHago(text, batchim) {
  if (!batchim) return `${text}하고`;
  const baseFinal = representativeFinal[batchim] ?? batchim;
  const aspirated = { ㄱ: "ㅋ", ㄷ: "ㅌ", ㅂ: "ㅍ" }[baseFinal];
  if (!aspirated) return `${pronounceAtRest(text, batchim)}하고`;
  const stem = replaceLastHangul(text, (block) => changeFinal(block, ""));
  return `${stem}${changeInitial("하", aspirated)}고`;
}

function addCandidate(bucket, lesson, item, context = null) {
  if (!item?.text || !singleWordPattern.test(item.text.trim())) return;

  const key = item.text.trim();
  const current = bucket.get(key) ?? {
    ...item,
    lessons: [],
    contexts: []
  };

  if (!current.lessons.some((entry) => entry.id === lesson.id)) {
    current.lessons.push({ id: lesson.id, label: lesson.label });
  }

  if (context && !current.contexts.some((entry) => entry.ko === context.ko)) {
    current.contexts.push(context);
  }

  bucket.set(key, current);
}

export function getPronunciationNote(text) {
  const batchim = getFinalConsonant(text);
  if (batchim) return `先找最後收音 ${batchim}，再看下一個音節的第一個音。不要只背羅馬拼音。`;
  return "這個詞沒有句尾收音；連接下一個音節時，重點是保持母音完整並清楚帶出下一個起首音。";
}

export function getPronunciationCases(text, roman) {
  const base = stripTrailingPunctuation(text);
  const batchim = getFinalConsonant(text);
  const cases = [
    {
      label: "1. 先念單字",
      condition: batchim ? `句尾收音：${batchim} → ${representativeFinal[batchim] ?? batchim}` : "無收音",
      explanation: batchim
        ? "句尾先收住，不要自行加上「ㅡ」或其他母音。韓語句尾實際只保留七種代表收音。"
        : "把最後的母音念完整，不要額外補收音。",
      written: base,
      pronounced: pronounceAtRest(base, batchim),
      drill: `慢念 ${roman}，再按發音鍵聽自然語速。`
    }
  ];

  if (batchim) {
    cases.push({
      label: "2. 接母音：連音",
      condition: `${batchim} + 이（ㅇ 不發音）`,
      explanation: batchim === "ㅇ"
        ? "ㅇ 收音 [ŋ] 不能移到音節開頭，所以保留原位，再接 이。"
        : "把收音移到下一音節開頭；先分開慢念，再合成一口氣念。ㄷ／ㅌ 接 이 時會進一步變成 ㅈ／ㅊ。",
      written: `${base}이`,
      pronounced: connectToI(base, batchim),
      drill: `${base}｜이 → ${connectToI(base, batchim)}`
    });
    cases.push({
      label: "3. 接鼻音：聽音變",
      condition: `${representativeFinal[batchim] ?? batchim} + ㅁ`,
      explanation: /[ㄱㄲㅋㄳㄺㄷㅅㅆㅈㅊㅌㅎㅂㅍㄼㄿㅄ]/.test(batchim)
        ? "為了讓口腔動作更順，阻塞音遇到 ㅁ 時會鼻音化：ㄱ→ㅇ、ㄷ→ㄴ、ㅂ→ㅁ。"
        : "這個收音本身不是需要鼻音化的阻塞音，因此接 ㅁ 時維持原收音。",
      written: `${base}만`,
      pronounced: connectToMan(base, batchim),
      drill: `${base}｜만 → ${connectToMan(base, batchim)}`
    });
    if (/[ㄱㄲㅋㄳㄺㄷㅅㅆㅈㅊㅌㅎㅂㅍㄼㄿㅄ]/.test(batchim)) {
      cases.push({
        label: "4. 接 ㅎ：送氣化",
        condition: `${representativeFinal[batchim] ?? batchim} + ㅎ`,
        explanation: "ㄱ／ㄷ／ㅂ 類收音遇到 ㅎ 時，兩個音合併成 ㅋ／ㅌ／ㅍ；把手放嘴前確認氣流。",
        written: `${base}하고`,
        pronounced: connectToHago(base, batchim),
        drill: `${base}｜하고 → ${connectToHago(base, batchim)}`
      });
    }
  } else {
    cases.push({
      label: "2. 接母音助詞",
      condition: "無收音 + 가",
      explanation: "沒有收音可以移動，所以保持最後母音，再直接接下一音節。",
      written: `${base}가`,
      pronounced: `${base}가`,
      drill: `${base}｜가 → ${base}가`
    });
    cases.push({
      label: "3. 接子音助詞",
      condition: "無收音 + 만",
      explanation: "先把最後母音收完整，再清楚開始 ㅁ；兩個音節不要黏成一個音。",
      written: `${base}만`,
      pronounced: `${base}만`,
      drill: `${base}｜만 → ${base}만`
    });
  }

  if (/[ㅋㅌㅍㅊ]/.test(text)) {
    cases.push({
      label: "最小對比：氣音",
      condition: "平音 ↔ 氣音 ↔ 緊音",
      explanation: "這些音要明顯送氣；可以把手放在嘴前確認有一股氣流。",
      written: "가 ↔ 카 ↔ 까",
      pronounced: "가 ↔ 카 ↔ 까",
      drill: "慢念三次，再打亂順序辨認：가–카–까"
    });
  } else if (/[ㄲㄸㅃㅆㅉ]/.test(text)) {
    cases.push({
      label: "最小對比：緊音",
      condition: "平音 ↔ 緊音 ↔ 氣音",
      explanation: "喉部保持緊實、聲音短而集中；不要像氣音那樣噴出大量氣流。",
      written: "자 ↔ 짜 ↔ 차",
      pronounced: "자 ↔ 짜 ↔ 차",
      drill: "手放嘴前：짜 幾乎不送氣，차 有明顯氣流。"
    });
  }

  return cases;
}

export function buildVocabularyIndex(lessons) {
  const bucket = new Map();

  for (const lesson of lessons) {
    for (const dialogue of lesson.dialogues ?? []) {
      for (const dialogueLine of dialogue.lines ?? []) {
        const context = { ko: dialogueLine.ko, zh: dialogueLine.zh, label: dialogue.title };
        for (const token of dialogueLine.tokens ?? []) addCandidate(bucket, lesson, token, context);
      }
    }

    for (const item of lesson.vocabulary ?? []) addCandidate(bucket, lesson, item);
    for (const item of lesson.notes ?? []) addCandidate(bucket, lesson, item);

    for (const section of lesson.guide?.sections ?? []) {
      for (const item of section.words ?? []) addCandidate(bucket, lesson, item);
    }
    for (const practice of lesson.guide?.practice?.items ?? []) {
      addCandidate(bucket, lesson, practice.answer, {
        ko: practice.answer.text,
        zh: practice.answer.zh,
        label: lesson.guide.practice.heading
      });
    }
  }

  return [...bucket.values()]
    .map((item) => ({
      ...item,
      explanation: `「${item.text}」表示${item.zh.replace(/[。.]$/, "")}。`,
      pronunciationNote: getPronunciationNote(item.text),
      pronunciationCases: getPronunciationCases(item.text, item.roman),
      examples: [
        ...item.contexts.slice(0, 2),
        {
          ko: `오늘 “${item.text}” 표현을 연습합니다.`,
          zh: `今天練習「${item.text}」這個表達。`,
          label: "學習語境"
        }
      ].slice(0, 2)
    }))
    .sort((a, b) => a.text.localeCompare(b.text, "ko"));
}
