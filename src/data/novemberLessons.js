// Source-grounded text from the November 9 and November 10 handouts.
// The original PDFs and source images stay outside this public repository.
import { decomposeHangulWord } from "../utils/hangul.js";

const w = (text, roman, zh, partOfSpeech = "noun") => ({
  text, roman, zh, partOfSpeech, syllables: decomposeHangulWord(text, roman),
});
const possession = [
  w("관우의 가방", "gwa-nu-e- -ga-bang", "冠宇的包包", "expression"),
  w("민준의 집", "min-ju-ne- -jip", "敏俊的家", "expression"),
  w("대만의 날씨", "dae-ma-ne- -nal-ssi", "臺灣的天氣", "expression"),
  w("관우 가방", "gwa-nu- -ga-bang", "冠宇的包包（省略 의）", "expression"),
  w("민준 집", "min-jun- -jip", "敏俊的家（省略 의）", "expression"),
  w("대만 날씨", "dae-man- -nal-ssi", "臺灣的天氣（省略 의）", "expression"),
  w("철의 여인", "cheo-re- -yeo-in", "鐵娘子", "expression"),
  w("한 잔의 커피", "han- -ja-ne- -keo-pi", "一杯咖啡", "expression"),
];
const demonstratives = [
  w("이 것", "i- -geot", "這個", "expression"), w("이 건물", "i- -geon-mul", "這棟樓", "expression"),
  w("이 책", "i- -chaek", "這本書", "expression"), w("이 컴퓨터", "i- -keom-pyu-teo", "這臺電腦", "expression"),
  w("그 것", "geu- -geot", "那個（靠近聽話者）", "expression"), w("그 사람", "geu- -sa-ram", "那個人", "expression"),
  w("그 가방", "geu- -ga-bang", "那包包", "expression"), w("그 물병", "geu- -mul-ppyeong", "那個瓶子", "expression"),
  w("저 것", "jeo- -geot", "那個（離雙方都遠）", "expression"), w("저 여자", "jeo- -yeo-ja", "那個女生", "expression"),
  w("저 버스", "jeo- -beo-seu", "那臺公車", "expression"), w("저 산", "jeo- -san", "那座山", "expression"),
];
// Preserve every standard and colloquial form in the p.12 table.
const pronounForms = [
  ["이것", "i-geot", "這個"], ["이것은", "i-geo-seun", "這個（主題）"], ["이것을", "i-geo-seul", "這個（受詞）"], ["이것이", "i-geo-si", "這個（主格）"],
  ["이거", "i-geo", "這個（口語）"], ["이거는", "i-geo-neun", "這個（口語主題）"], ["이건", "i-geon", "這個（主題縮寫）"], ["이거를", "i-geo-reul", "這個（口語受詞）"], ["이걸", "i-geol", "這個（受詞縮寫）"], ["이게", "i-ge", "這個（主格縮寫）"],
  ["그것", "geu-geot", "那個"], ["그것은", "geu-geo-seun", "那個（主題）"], ["그것을", "geu-geo-seul", "那個（受詞）"], ["그것이", "geu-geo-si", "那個（主格）"],
  ["그거", "geu-geo", "那個（口語）"], ["그거는", "geu-geo-neun", "那個（口語主題）"], ["그건", "geu-geon", "那個（主題縮寫）"], ["그거를", "geu-geo-reul", "那個（口語受詞）"], ["그걸", "geu-geol", "那個（受詞縮寫）"], ["그게", "geu-ge", "那個（主格縮寫）"],
  ["저것", "jeo-geot", "遠處那個"], ["저것은", "jeo-geo-seun", "遠處那個（主題）"], ["저것을", "jeo-geo-seul", "遠處那個（受詞）"], ["저것이", "jeo-geo-si", "遠處那個（主格）"],
  ["저거", "jeo-geo", "遠處那個（口語）"], ["저거는", "jeo-geo-neun", "遠處那個（口語主題）"], ["저건", "jeo-geon", "遠處那個（主題縮寫）"], ["저거를", "jeo-geo-reul", "遠處那個（口語受詞）"], ["저걸", "jeo-geol", "遠處那個（受詞縮寫）"], ["저게", "jeo-ge", "遠處那個（主格縮寫）"],
].map(([text, roman, zh]) => w(text, roman, zh, "expression"));
const vocabulary1109 = [
  w("새", "sae", "新", "expression"), w("중산", "jung-san", "中山"), w("지하상가", "ji-ha-sang-ga", "地下街"),
  w("이런", "i-reon", "這種", "expression"), w("유행", "yu-haeng", "流行"),
  w("가방", "ga-bang", "包包"), w("날씨", "nal-ssi", "天氣"), w("건물", "geon-mul", "樓房"),
  w("책", "chaek", "書"), w("컴퓨터", "keom-pyu-teo", "電腦"), w("사람", "sa-ram", "人"),
  w("물병", "mul-ppyeong", "瓶子、水瓶"), w("여자", "yeo-ja", "女生"), w("버스", "beo-seu", "公車"),
  w("산", "san", "山"), w("시계", "si-gye", "手錶、時鐘"), w("모자", "mo-ja", "帽子"),
  w("예쁘다", "ye-ppeu-da", "漂亮", "predicate"),
];
const activities = [
  w("운전하다", "un-jeon-ha-da", "駕駛", "predicate"),
  w("자전거를 타다", "ja-jeon-geo-reul- -ta-da", "騎腳踏車", "predicate"),
  w("오토바이를 타다", "o-to-ba-i-reul- -ta-da", "騎摩托車", "predicate"),
  w("춤을 추다", "chu-meul- -chu-da", "跳舞", "predicate"),
  w("롤러스케이트를 타다", "rol-leo-seu-ke-i-teu-reul- -ta-da", "滑直排輪（講義譯法）", "predicate"),
  w("스키를 타다", "seu-ki-reul- -ta-da", "滑雪", "predicate"),
  w("노래를 부르다", "no-rae-reul- -bu-reu-da", "唱歌", "predicate"),
  w("볼링을 치다", "bol-ling-eul- -chi-da", "打保齡球", "predicate"),
  w("스쿼시를 치다", "seu-kwo-si-reul- -chi-da", "打壁球", "predicate"),
  w("스케이트를 타다", "seu-ke-i-teu-reul- -ta-da", "滑冰", "predicate"),
];
const canForms = [
  w("먹을 수 있다", "meo-geul- -ssu- -it-tta", "可以吃", "predicate"),
  w("읽을 수 있다", "il-geul- -ssu- -it-tta", "可以讀", "predicate"),
  w("살 수 있다", "sal- -ssu- -it-tta", "可以生活／居住", "predicate"),
  w("갈 수 있다", "gal- -ssu- -it-tta", "可以去", "predicate"),
  w("올 수 있다", "ol- -ssu- -it-tta", "可以來", "predicate"),
  w("마실 수 있다", "ma-sil- -ssu- -it-tta", "可以喝", "predicate"),
  w("팔 수 있다", "pal- -ssu- -it-tta", "可以賣", "predicate"),
];
const cannotForms = [
  w("먹을 수 없다", "meo-geul- -ssu- -eop-tta", "不能吃", "predicate"),
  w("읽을 수 없다", "il-geul- -ssu- -eop-tta", "不能讀", "predicate"),
  w("살 수 없다", "sal- -ssu- -eop-tta", "不能生活／居住", "predicate"),
  w("갈 수 없다", "gal- -ssu- -eop-tta", "不能去", "predicate"),
  w("올 수 없다", "ol- -ssu- -eop-tta", "不能來", "predicate"),
  w("마실 수 없다", "ma-sil- -ssu- -eop-tta", "不能喝", "predicate"),
];
const vocabulary1110 = [
  ...activities,
  w("쓰다", "sseu-da", "使用（也有寫、苦、戴等意思）", "predicate"),
  w("휴가", "hyu-ga", "休假"), w("면허증", "myeon-heo-jjeung", "駕照"), w("비자", "bi-ja", "簽證"),
  w("글", "geul", "文章"), w("혼자", "hon-ja", "獨自", "expression"), w("혼자서", "hon-ja-seo", "獨自", "expression"),
  w("비행기표", "bi-haeng-gi-pyo", "機票"),
];
const lexicon = [
  ...vocabulary1109, ...vocabulary1110, ...pronounForms,
  ...[
    ["관우", "gwa-nu", "冠宇"], ["민준", "min-jun", "敏俊"], ["씨", "ssi", "先生／小姐"],
    ["이", "i", "這"], ["저", "jeo", "那（遠處）"], ["누구", "nu-gu", "誰"], ["거예요", "geo-ye-yo", "是…的東西嗎"],
    ["제", "je", "我的"], ["가방이에요", "ga-bang-i-e-yo", "是包包"], ["언제", "eon-je", "何時"],
    ["샀어요", "sa-sseo-yo", "買了"], ["네", "ne", "是"], ["어제", "eo-je", "昨天"],
    ["중산지하상가에서", "jung-san-ji-ha-sang-ga-e-seo", "在中山地下街"], ["예뻐요", "ye-ppeo-yo", "漂亮"],
    ["요즘", "yo-jeum", "最近"], ["가방이", "ga-bang-i", "包包（主格）"], ["유행이에요", "yu-haeng-i-e-yo", "很流行"],
    ["김치예요", "gim-chi-ye-yo", "是泡菜嗎"], ["주세요", "ju-se-yo", "請給我"], ["정희", "jeong-hi", "貞熙"],
    ["책이에요", "chae-gi-e-yo", "是書"], ["컴퓨터예요", "keom-pyu-teo-ye-yo", "是電腦嗎"],
    ["뭐예요", "mwo-ye-yo", "是什麼"], ["누구예요", "nu-gu-ye-yo", "是誰"],
    ["한국어", "han-gu-geo", "韓語"], ["모자는", "mo-ja-neun", "帽子（主題）"], ["어디에서", "eo-di-e-seo", "在哪裡"],
    ["다음", "da-eum", "下一個"], ["달에", "da-re", "在…月"], ["한국", "han-guk", "韓國"], ["가요", "ga-yo", "去"],
    ["그렇지만", "geu-reo-chi-man", "但是"], ["아직", "a-jik", "尚未"], ["안", "an", "不"],
    ["친구하고", "chin-gu-ha-go", "和朋友"], ["같이", "ga-chi", "一起"], ["아니요", "a-ni-yo", "不"],
    ["한국에", "han-gu-ge", "去韓國"], ["갈", "gal", "去（冠形）"], ["수", "ssu", "可能、能力（依存名詞）"],
    ["있어요", "i-sseo-yo", "有／可以"], ["오늘", "o-neul", "今天"], ["학교", "hak-kkyo", "學校"],
    ["학교에", "hak-kkyo-e", "去學校"], ["없어요", "eop-seo-yo", "沒有／不能"], ["자동차가", "ja-dong-cha-ga", "汽車（主格）"],
    ["제가", "je-ga", "我（主格）"], ["노래를", "no-rae-reul", "歌（受詞）"], ["잘", "jal", "擅長、好好地"],
    ["부릅니까", "bu-reum-ni-kka", "唱嗎"], ["춤도", "chum-do", "舞也"], ["춥니까", "chum-ni-kka", "跳嗎"],
    ["노래", "no-rae", "歌"], ["부르지만", "bu-reu-ji-man", "雖然唱"], ["지금", "ji-geum", "現在"],
    ["운동장에서", "un-dong-jang-e-seo", "在運動場"], ["뭐해요", "mwo-hae-yo", "做什麼"],
    ["미국에", "mi-gu-ge", "去美國"], ["왜요", "wae-yo", "為什麼"], ["집을", "ji-beul", "房子（受詞）"], ["살", "sal", "買（冠形）"],
  ].map(([text, roman, zh]) => w(text, roman, zh, "expression")),
];
const byText = new Map(lexicon.map((entry) => [entry.text, entry]));
function line(speaker, ko, zh) {
  const tokens = (ko.match(/[가-힣]+/gu) ?? []).map((text) => {
    if (!byText.has(text)) throw new Error(`Missing reviewed November token: ${text}`);
    return byText.get(text);
  });
  return { speaker, ko, zh, tokens };
}
const blank = () => line("B", "__________", "請依自己的情況回答。");

const lesson1109 = {
  id: "b1-29", label: "初級1-29", titleKo: "이건 제 가방이에요.", titleZh: "這是我的包包。",
  theme: "所有格 의、指示詞 이／그／저 與代名詞縮寫", heroEmoji: "🎒", sourcePdf: "docs/lessons/new/1109.pdf",
  dialogues: [
    { title: "本課對話：這是我的包包", lines: [
      line("민준", "이 가방 누구 거예요?", "這包包是誰的？"),
      line("관우", "이건 제 가방이에요.", "這是我的包包。"),
      line("민준", "새 가방이에요? 언제 샀어요?", "新包包嗎？什麼時候買的？"),
      line("관우", "네, 새 가방이에요. 어제 중산지하상가에서 샀어요.", "是，新包包。昨天在中山地下街買的。"),
      line("민준", "예뻐요. 요즘 이런 가방이 유행이에요.", "很漂亮，最近這種包包很流行。"),
    ] },
    { title: "講義例句：代名詞的簡寫與復原", lines: [
      line("示例", "이것이 김치예요?", "這個是泡菜嗎？"),
      line("示例", "이게 김치예요?", "這個是泡菜嗎？（主格簡寫）"),
      line("示例", "저것을 주세요.", "請給我那個。"),
      line("示例", "그것은 정희 씨 가방이에요?", "那個是貞熙小姐的包包嗎？"),
      line("示例", "이것은 제 책이에요.", "這個是我的書。"),
      line("示例", "언제 그걸 샀어요?", "什麼時候買那個的？"),
      line("示例", "이건 민준 씨 컴퓨터예요?", "這個是敏俊先生的電腦嗎？"),
    ] },
    { title: "換你說說看（保留留白）", lines: [
      line("A", "그건 뭐예요?", "那個是什麼？"), line("B", "시계 __________.", "請完成句子，說明那是時鐘或手錶。"),
      line("A", "저 사람 누구예요?", "那個人是誰？"), blank(),
      line("A", "이건 한국어 책이에요?", "這是韓語書嗎？"), blank(),
      line("A", "이 모자는 어디에서 샀어요?", "這頂帽子在哪裡買的？"), line("B", "지하상가 __________.", "請完成句子，使用提示「地下街」。"),
    ] },
  ],
  vocabulary: vocabulary1109,
  guide: {
    label: "의 與 이／그／저", title: "表所有的 의、指示詞與代名詞簡寫",
    hint: "先分清物品的主人與物品的位置，再練習 이것／그것／저것 加助詞後的口語縮寫。",
    sections: [
      { heading: "第 3-7 頁：所有格 의 及省略限制", words: possession },
      { heading: "第 8-11 頁：這、那與遠處的那", words: demonstratives },
      { heading: "第 12 頁：標準形式與口語簡寫", words: pronounForms },
      { heading: "第 14 頁：ㅡ 脫落", words: [w("예쁘다", "ye-ppeu-da", "漂亮", "predicate"), w("예뻐요", "ye-ppeo-yo", "漂亮（禮貌形）", "predicate")] },
    ],
    practice: {
      heading: "講義練習", hint: "只提供講義已印出的完成範例，其餘保留作答空間。", valueSuffix: "",
      items: [{ value: "第 13 頁：이것이 김치예요? → (    ) 김치예요?", answer: byText.get("이게") }],
      prompts: [
        { page: "第 5 頁", ko: "대만 / 한국 / 미국 / 태국 / 베트남 + 의 + 여자 / 음식 / 땅 / 김치 / 날씨 + 이/가 + 덥습니다 / 맵습니다 / 큽니다 / 예쁩니다 / 맛있습니다", zh: "選擇前後內容，以 의 和 이／가 連成句子。" },
        { page: "第 13 頁", ko: "저것을 주세요. / 그것은 정희 씨 가방이에요? / 이것은 제 책이에요. / 언제 그걸 샀어요? / 이건 민준 씨 컴퓨터예요?", zh: "將代名詞加助詞的部分簡化或復原；其餘五題保留留白。" },
        { page: "第 15 頁", ko: "그건 뭐예요? / 저 사람 누구예요? / 이건 한국어 책이에요? / 이 모자는 어디에서 샀어요?", zh: "您是 B，請完成回答；第一題提示 시계，第四題提示 지하상가。" },
      ],
    },
    sourceNotes: [
      { heading: "來源規則（第 3-12、14 頁）", lines: [
        "名詞 + 의 + 所屬名詞表示「～的～」，有無尾音都加 의。多數場合可省略 의；講義指出比喻關係（철의 여인）和數量關係（한 잔의 커피）不可省略。",
        "이 指靠近說話者的事物；그 指靠近聽話者的事物；저 指離雙方都遠的事物。第 9-11 頁以分開的 이 것／그 것／저 것 示意，第 12 頁列出 이것／그것／저것 的連寫形式。",
        "第 12 頁完整保留三組代名詞的標準形、口語形、主題、受詞與主格簡寫。",
        "第 14 頁補充 예쁘다 接 어요 時 ㅡ 脫落，成為 예뻐요。",
      ] },
      { heading: "補充譯文與附錄差異", lines: [
        "例句、練習提示、詞形表和補充詞彙的中文為整理時補上；原講義未逐項印出譯文。主對話依韓文翻譯，中文附錄第四句省略「새 가방이에요」。",
      ] },
    ],
    references: [{ heading: "附錄：對話翻譯（第 18 頁）", entries: [
      { label: "敏俊", text: "這包包是誰的？" }, { label: "冠宇", text: "這是我的包包。" },
      { label: "敏俊", text: "新包包嗎？什麼時候買的？" }, { label: "冠宇", text: "是，昨天在中山地下街買的。" },
      { label: "敏俊", text: "很漂亮，最近這種包包很流行。" },
    ] }],
  },
};

const lesson1110 = {
  id: "b1-30", label: "初級1-30", titleKo: "한국에 혼자 갈 수 있어요?", titleZh: "你可以自己去韓國嗎？",
  theme: "-(으)ㄹ 수 있다／없다 與活動動詞", heroEmoji: "✈️", sourcePdf: "docs/lessons/new/1110.pdf",
  dialogues: [
    { title: "本課對話：可以自己去韓國嗎", lines: [
      line("민준", "관우 씨, 다음 달에 한국 가요?", "冠宇先生，下個月去韓國嗎？"),
      line("관우", "네. 그렇지만 비행기표 아직 안 샀어요.", "是，但是還沒買機票。"),
      line("민준", "친구하고 같이 가요?", "跟朋友一起去嗎？"),
      line("관우", "아니요. 혼자 가요.", "不，自己去。"),
      line("민준", "한국에 혼자 갈 수 있어요?", "你可以自己去韓國嗎？"),
      line("관우", "네, 혼자 갈 수 있어요.", "是的，可以自己去。"),
    ] },
    { title: "講義例句與活動會話（保留留白）", lines: [
      line("A", "오늘 학교 가요?", "今天去學校嗎？"),
      line("B", "아니요, 오늘 학교에 갈 수 없어요.", "不，今天不能去學校。"),
      line("A", "자동차가 있어요?", "有汽車嗎？"), line("B", "아니요. 없어요. 제가 __________", "不，沒有。我……（請完成回答）。"),
      line("A", "노래를 잘 부릅니까?", "擅長唱歌嗎？"), line("B", "네, __________", "是，請完成回答。"),
      line("A", "춤도 잘 춥니까?", "也擅長跳舞嗎？"), line("B", "아니요, 노래 잘 부르지만 __________", "不，雖然歌唱得好……（請完成回答）。"),
      line("A", "지금 운동장에서 뭐해요?", "現在在運動場做什麼？"), line("B", "친구하고 __________", "和朋友……（請完成回答）。"),
    ] },
    { title: "換你說說看（保留留白）", lines: [
      line("A", "혼자 미국에 갈 수 있어요?", "可以自己去美國嗎？"), blank(), line("A", "왜요?", "為什麼？"), blank(),
      line("A", "집을 살 수 있어요?", "可以買房子嗎？"), blank(), line("A", "왜요?", "為什麼？"), blank(),
    ] },
  ],
  vocabulary: vocabulary1110,
  guide: {
    label: "-(으)ㄹ 수 있다／없다", title: "表達可以、可能與不能、無法",
    hint: "語幹有尾音用 을 수，無尾音用 ㄹ 수；ㄹ 尾音保留一個 ㄹ，再接 수 있다／없다。",
    sections: [
      { heading: "第 4 頁：可以／可能的變化", words: canForms },
      { heading: "第 7 頁：不能／無法的變化", words: cannotForms },
      { heading: "第 11 頁：活動動詞", words: activities },
    ],
    practice: {
      heading: "講義練習", hint: "保留未完成的變化、配對題與個人回答。", valueSuffix: "",
      items: [
        { value: "第 5 頁：학교에 가다", answer: w("학교에 갈 수 있다", "hak-kkyo-e- -gal- -ssu- -it-tta", "可以去學校", "predicate") },
        { value: "第 8 頁：중국에 가다", answer: w("중국에 갈 수 없다", "jung-gu-ge- -gal- -ssu- -eop-tta", "不能去中國", "predicate") },
      ],
      prompts: [
        { page: "第 5 頁", ko: "밥을 먹다 / 술을 마시다 / 한국어 책을 읽다 / 문자를 보내다 → __________", zh: "請加上適合的 -(으)ㄹ 수 있다。" },
        { page: "第 6 頁", ko: "김치는 맵지만 / 발이 아프지만 / 미국에 못 가지만 / 시간이 없지만 / 돈이 있으면 + 오토바이를 사다 / 운동하다 / 밥은 먹다 / 한국에 가다 / 제가 먹다", zh: "配對並使用 -(으)ㄹ 수 있어요 連成句子；不代填未印出的完整句。" },
        { page: "第 8 頁", ko: "일본어를 하다 / 고량주를 마시다 / 영어 책을 읽다 / 화장실을 쓰다 → __________", zh: "請加上適合的 -(으)ㄹ 수 없다。" },
        { page: "第 9 頁", ko: "말할 수 있지만 / 돈이 많이 없으면 / 휴가가 없으면 / 면허증이 없으면 / 비자가 없으면 + 오토바이를 타다 / 여행가다 / 집을 사다 / 태국에 가다 / 글을 쓰다", zh: "配對並使用 -(으)ㄹ 수 없어요 連成句子；保留原題。" },
        { page: "第 10 頁", ko: "오늘 영화 봐요? / 내일 만나요? / 태국어를 할 수 있어요? / 같이 등산가요? / 오토바이를 발 수 있어요?", zh: "請使用可以或不能的句型回答；最後一題原文印作 발，疑為 탈 的誤植。" },
        { page: "第 12 頁", ko: "자동차가 있어요? / 노래를 잘 부릅니까? / 춤도 잘 춥니까? / 지금 운동장에서 뭐해요?", zh: "運用活動動詞，完成 B 的回答。" },
        { page: "第 14 頁", ko: "혼자 미국에 갈 수 있어요? / 왜요? / 집을 살 수 있어요? / 왜요?", zh: "您是 B，依自己的情況回答並說明理由。" },
      ],
    },
    sourceNotes: [
      { heading: "來源規則（第 3-4、7 頁）", lines: [
        "動詞語幹 + (으)ㄹ 수 있다 表示可能、可以；+ (으)ㄹ 수 없다 表示不能、無法。語幹有尾音加 을 수，無尾音加 ㄹ 수。",
        "第 4 頁列出 살다 → 살 수 있다、팔다 → 팔 수 있다。此處 ㄹ 尾音直接接 수，保留一個 ㄹ；本課不將 살다（居住）與第 14 頁 사다（買）的 살 수 混為同一詞義。",
      ] },
      { heading: "來源文字與補充譯文", lines: [
        "第 10 頁最後一題印作「오토바이를 발 수 있어요?」，疑為「탈」的誤植；練習仍保留原文並提示。",
        "第 11 頁將 롤러스케이트를 타다 譯作「滑直排輪」，詞彙保留講義譯法。例句、活動會話、變化表及練習提示的中文為整理時補上。",
      ] },
    ],
    references: [{ heading: "附錄：對話翻譯（第 17 頁）", entries: [
      { label: "敏俊", text: "冠宇先生，下個月去韓國嗎？" }, { label: "冠宇", text: "是，但是還沒買機票。" },
      { label: "敏俊", text: "跟朋友一起去嗎？" }, { label: "冠宇", text: "不，自己去。" },
      { label: "敏俊", text: "你可以自己去韓國嗎？" }, { label: "冠宇", text: "是的，可以自己去。" },
    ] }],
  },
};

export const novemberLessons = [lesson1109, lesson1110];
