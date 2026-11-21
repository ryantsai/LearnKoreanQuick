import { decomposeHangulWord } from "../utils/hangul.js";

const words = (entries, partOfSpeech = "noun") => entries.map(([text, roman, zh]) => ({
  text, roman, zh, partOfSpeech, syllables: decomposeHangulWord(text, roman),
}));

const skills = words([
  ["듣기", "deut-kki", "聽"], ["말하기", "mal-ha-gi", "說"], ["읽기", "il-kki", "讀"], ["쓰기", "sseu-gi", "寫"],
  ["외국어", "oe-gu-geo", "外國語"], ["일", "il", "工作"], ["사회생활", "sa-hoe-saeng-hwal", "社交"], ["집안일", "ji-ban-nil", "家事"],
]);

const vocabulary = [
  ...skills,
  ...words([
    ["축구", "chuk-kku", "足球"], ["수영", "su-yeong", "游泳"], ["공부", "gong-bu", "學習"], ["운동", "un-dong", "運動"],
    ["한국어", "han-gu-geo", "韓語"], ["태국어", "tae-gu-geo", "泰語"], ["야구", "ya-gu", "棒球"], ["농구", "nong-gu", "籃球"],
    ["영어", "yeong-eo", "英語"], ["운전", "un-jeon", "駕駛"], ["노래", "no-rae", "歌曲"], ["컴퓨터", "keom-pyu-teo", "電腦"],
  ]),
  ...words([
    ["어렸을 때", "eo-ryeo-sseul- -ttae", "小時候"], ["젊었을 때", "jeol-meo-sseul- -ttae", "年輕的時候"],
    ["아주", "a-ju", "非常"], ["글쎄요", "geul-sse-yo", "這個嘛……、不好說"],
  ], "expression"),
  ...words([
    ["잘하다", "jal-ha-da", "很會、擅長"], ["못하다", "mo-ta-da", "不會"], ["잘 못하다", "jal- -mo-ta-da", "不太會"],
  ], "predicate"),
];

const proficient = words([
  ["축구를 잘하다", "chuk-kku-reul- -jal-ha-da", "很會踢足球"],
  ["수영을 잘하다", "su-yeong-eul- -jal-ha-da", "很會游泳"],
  ["공부를 잘하다", "gong-bu-reul- -jal-ha-da", "很會讀書"],
  ["운동을 잘하다", "un-dong-eul- -jal-ha-da", "很擅長運動"],
  ["한국어를 잘하다", "han-gu-geo-reul- -jal-ha-da", "韓語說得很好"],
  ["태국어를 잘하다", "tae-gu-geo-reul- -jal-ha-da", "泰語說得很好"],
], "predicate");
const unable = words([
  ["야구를 못하다", "ya-gu-reul- -mo-ta-da", "不會打棒球"],
  ["농구를 못하다", "nong-gu-reul- -mo-ta-da", "不會打籃球"],
  ["영어를 못하다", "yeong-eo-reul- -mo-ta-da", "不會說英語"],
  ["수영을 못하다", "su-yeong-eul- -mo-ta-da", "不會游泳"],
  ["운전을 못하다", "un-jeo-neul- -mo-ta-da", "不會開車"],
], "predicate");
const unskilled = words([
  ["노래를 잘 못하다", "no-rae-reul- -jal- -mo-ta-da", "不太會唱歌"],
  ["컴퓨터를 잘 못하다", "keom-pyu-teo-reul- -jal- -mo-ta-da", "不太會用電腦"],
  ["영어를 잘 못하다", "yeong-eo-reul- -jal- -mo-ta-da", "英語說得不太好"],
  ["공부를 잘 못하다", "gong-bu-reul- -jal- -mo-ta-da", "不太擅長讀書"],
  ["운전을 잘 못하다", "un-jeo-neul- -jal- -mo-ta-da", "不太會開車"],
], "predicate");

const lexicon = new Map([
  ...vocabulary,
  ...words([
    ["정희", "jeong-hi", "正熙（人名）"], ["관우", "gwan-u", "冠宇（人名）"], ["민철", "min-cheol", "民哲（人名）"],
    ["내일", "nae-il", "明天"], ["여자", "yeo-ja", "女性"], ["남자", "nam-ja", "男性"], ["사람", "sa-ram", "人"],
    ["한국", "han-guk", "韓國"], ["일본어", "il-bo-neo", "日語"], ["때", "ttae", "時候"],
  ]),
  ...words([
    ["씨", "ssi", "先生／小姐"], ["씨는", "ssi-neun", "先生／小姐（主題）"], ["같이", "ga-chi", "一起"],
    ["수영이요", "su-yeong-i-yo", "游泳嗎"], ["저는", "jeo-neun", "我（主題）"],
    ["잘", "jal", "好、擅長地"], ["그럼", "geu-reom", "那麼"], ["무슨", "mu-seun", "什麼樣的"],
    ["친구가", "chin-gu-ga", "朋友（主格）"], ["어렸을", "eo-ryeo-sseul", "年幼時（修飾 때）"],
    ["젊었을", "jeol-meo-sseul", "年輕時（修飾 때）"],
    ["아내가", "a-nae-ga", "妻子（主格）"], ["남편이", "nam-pyeo-ni", "丈夫（主格）"],
    ["뭐", "mwo", "什麼"], ["뭐를", "mwo-reul", "什麼（受詞）"], ["무엇을", "mu-eo-seul", "什麼（受詞）"],
    ["그", "geu", "那"], ["사람이", "sa-ra-mi", "人（主格）"], ["사람은", "sa-ra-meun", "人（主題）"],
    ["할", "hal", "做（修飾 수）"], ["수", "su", "方法、可能性（用於 할 수 있다）"],
    ["네", "ne", "是"], ["아니요", "a-ni-yo", "不"],
    ["축구를", "chuk-kku-reul", "足球（受詞）"], ["수영을", "su-yeong-eul", "游泳（受詞）"],
    ["운동을", "un-dong-eul", "運動（受詞）"], ["노래를", "no-rae-reul", "唱歌（受詞）"],
    ["요리를", "yo-ri-reul", "料理（受詞）"], ["한국어를", "han-gu-geo-reul", "韓語（受詞）"],
    ["태국어를", "tae-gu-geo-reul", "泰語（受詞）"], ["중국어를", "jung-gu-geo-reul", "中文（受詞）"],
    ["영어를", "yeong-eo-reul", "英語（受詞）"], ["운전을", "un-jeo-neul", "駕駛（受詞）"],
    ["집안일을", "ji-ban-ni-reul", "家事（受詞）"], ["공부를", "gong-bu-reul", "讀書（受詞）"],
  ], "expression"),
  ...words([
    ["해요", "hae-yo", "做"], ["그래요", "geu-rae-yo", "是嗎／是的"], ["좋아해요", "jo-a-hae-yo", "喜歡"],
    ["좋아요", "jo-a-yo", "好、喜歡"], ["있어요", "i-sseo-yo", "有"], ["합니까", "ham-ni-kka", "做嗎（正式）"],
    ["잘해요", "jal-hae-yo", "很會"], ["잘했어요", "jal-hae-sseo-yo", "以前很會"],
    ["잘했습니다", "jal-hae-sseum-ni-da", "以前很會（正式）"], ["잘합니다", "jal-ham-ni-da", "很會（正式）"],
    ["잘합니까", "jal-ham-ni-kka", "很會嗎（正式）"], ["못해요", "mo-tae-yo", "不會"],
    ["못했습니다", "mo-tae-sseum-ni-da", "以前不會（正式）"], ["못합니다", "mo-tam-ni-da", "不會（正式）"],
    ["못합니까", "mo-tam-ni-kka", "不會嗎（正式）"],
  ], "predicate"),
].map((word) => [word.text, word]));

function line(speaker, ko, zh, spokenKo) {
  const tokens = (ko.match(/[가-힣]+/gu) ?? []).map((text) => {
    if (!lexicon.has(text)) throw new Error(`Missing reviewed November 23 token: ${text}`);
    return lexicon.get(text);
  });
  return { speaker, ko, zh, tokens, ...(spokenKo ? { spokenKo } : {}) };
}

const conversation = [
  line("관우", "정희 씨, 내일 수영을 같이 해요?", "正熙小姐，明天要一起去游泳嗎？"),
  line("정희", "수영이요? 저는 수영을 잘 못해요.", "游泳？我不太會游泳。"),
  line("관우", "그래요? 그럼 무슨 운동 좋아해요?", "是嗎？那麼你喜歡甚麼運動？"),
  line("정희", "글쎄요..저는 운동을 잘 못해요.", "這個嘛……我不太會運動。", "글쎄요. 저는 운동을 잘 못해요."),
];

const answer = (ko, zh, spokenKo) => line("B", ko, zh, spokenKo);
const question = (ko, zh) => line("A", ko, zh);
const sample = (ko, zh) => line("示例", ko, zh);
const soccer = question("축구 잘해요?", "你很會踢足球嗎？");
const negativeQuestions = [
  soccer,
  question("친구가 태국어를 잘해요?", "朋友的泰語說得很好嗎？"),
  question("민철 씨는 중국어를 잘합니까?", "民哲先生的中文說得很好嗎？"),
  question("운전을 잘합니까?", "你很會開車嗎？"),
];
const negativePractice = (instruction) => negativeQuestions.flatMap((item) => [
  item, answer("아니요, __________", instruction, "아니요."),
]);

export const lesson1123 = {
  id: "b1-33",
  label: "初級1-33",
  titleKo: "운동을 잘 못해요.",
  titleZh: "我不太會運動。",
  theme: "잘하다／못하다／잘 못하다 與擅長的事",
  heroEmoji: "🏊",
  sourcePdf: "docs/lessons/new/1123.pdf",
  dialogues: [
    { title: "本課對話：我不太會運動", lines: conversation },
    { title: "講義例句：很會、不會與不太會", lines: [
      sample("친구가 축구를 잘해요.", "朋友很會踢足球。"),
      sample("어렸을 때 노래를 잘했어요.", "小時候很會唱歌。"),
      sample("젊었을 때 운동을 잘했습니다.", "年輕的時候很擅長運動。"),
      sample("한국 요리를 잘해요?", "你很會做韓國料理嗎？"),
      sample("관우 씨는 한국어를 아주 잘합니다.", "冠宇先生的韓語說得非常好。"),
      sample("여자 친구가 태국어를 못해요.", "女朋友不會說泰語。"),
      sample("정희 씨는 수영을 못해요.", "正熙小姐不會游泳。"),
      sample("젊었을 때 운동을 못했습니다.", "年輕的時候不會運動。"),
      sample("운전을 못해요?", "你不會開車嗎？"),
      sample("민철 씨는 중국어를 못합니다.", "民哲先生不會說中文。"),
      sample("남자 친구가 영어를 잘 못해요.", "男朋友的英語說得不太好。"),
      sample("민철 씨는 운전을 잘 못해요.", "民哲先生不太會開車。"),
      sample("아내가 요리를 잘 못합니다.", "妻子不太會做菜。"),
      sample("남편이 운동을 잘 못해요.", "丈夫不太會運動。"),
      sample("민철 씨는 중국어를 잘 못합니까?", "民哲先生的中文說得不太好嗎？"),
    ] },
    { title: "用 잘하다 回答", lines: [
      soccer, answer("네, __________", "請用肯定句回答。", "네."),
      question("무엇을 잘해요?", "你擅長什麼？"), answer("__________", "請依自己的情況回答。"),
      question("관우 씨는 한국어를 잘합니까?", "冠宇先生的韓語說得很好嗎？"), answer("네, __________", "請用肯定句回答。", "네."),
      question("친구가 노래를 잘합니까?", "朋友很會唱歌嗎？"), answer("네, __________", "請用肯定句回答。", "네."),
    ] },
    { title: "用 못하다 回答", lines: negativePractice("請用「不會」完成回答。") },
    { title: "用 잘 못하다 回答", lines: negativePractice("請用「不太會」完成回答。") },
    { title: "擅長的事", lines: [
      question("한국어 듣기 잘해요?", "你擅長韓語聽力嗎？"), answer("__________", "請依自己的情況回答。"),
      question("뭐를 잘해요?", "你擅長什麼？"), answer("__________", "請用擅長的事回答。"),
      question("그 사람이 영어, 일본어, 태국어를 할 수 있어요.", "那個人會說英語、日語和泰語。"),
      answer("그래요, 그 사람은 __________", "是的，那個人……（請填空）。", "그래요. 그 사람은."),
      question("여자 친구가 뭐 좋아요?", "女朋友喜歡什麼？"),
      answer("집안일 __________", "家事……（請填空）。", "집안일"),
    ] },
    { title: "換你說看看", lines: [
      question("수영을 합니까?", "你游泳嗎？"), question("축구를 합니까?", "你踢足球嗎？"),
      question("집안일을 잘합니까?", "你擅長做家事嗎？"), question("태국어를 잘합니까?", "你的泰語說得很好嗎？"),
      question("공부를 잘합니까?", "你擅長讀書嗎？"),
    ].flatMap((item) => [item, answer("네/아니요, __________", "請選擇開頭，依自己的情況回答。", "네. 아니요.")]) },
  ],
  vocabulary,
  guide: {
    label: "잘하다／못하다／잘 못하다",
    title: "說出自己擅長或不擅長的事",
    hint: "在活動或技能名詞後加 을／를，再接 잘하다（很會）、못하다（不會）或 잘 못하다（不太會）。",
    sections: [
      { heading: "第 3 頁：很會（잘하다）", words: proficient },
      { heading: "第 6 頁：不會（못하다）", words: unable },
      { heading: "第 9 頁：不太會（잘 못하다）", words: unskilled },
      { heading: "第 12 頁：擅長相關單詞", words: skills },
    ],
    practice: {
      heading: "講義練習",
      hint: "先讀範例，再到對話練習回答各頁的問題。",
      valueSuffix: "",
      items: [
        { value: "很會踢足球", answer: proficient[0] },
        { value: "不會游泳", answer: unable[3] },
        { value: "不太會開車", answer: unskilled[4] },
      ],
      prompts: [
        { page: "第 5 頁", ko: "축구 잘해요?", zh: "用 잘하다 回答擅長的事。" },
        { page: "第 8 頁", ko: "운전을 잘합니까?", zh: "用 못하다 回答不會做的事。" },
        { page: "第 11 頁", ko: "운전을 잘합니까?", zh: "用 잘 못하다 回答不太擅長的事。" },
        { page: "第 13 頁", ko: "한국어 듣기 잘해요?", zh: "用第 12 頁的技能單字回答。" },
        { page: "第 15 頁", ko: "집안일을 잘합니까?", zh: "依自己的情況回答。" },
      ],
    },
    sourceNotes: [
      { heading: "寫法與語尾", lines: [
        "잘하다、못하다 各寫成一個詞；잘 못하다 的 잘 與 못하다 中間留一個空格。",
        "用 -해요 與人交談；較正式的陳述用 -합니다，提問用 -합니까。",
      ] },
      { heading: "講義內容", lines: [
        "第 14 頁是本課對話，第 18 頁是中文翻譯。例句與練習的中文為補充翻譯。",
      ] },
    ],
    references: [{
      heading: "附錄：對話翻譯（第 18 頁）",
      entries: conversation.map(({ speaker, zh }) => ({ label: speaker === "관우" ? "冠宇" : "正熙", text: zh })),
    }],
  },
};
