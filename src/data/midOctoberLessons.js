// Source-grounded text from the October 13 and October 15 handouts.
// The original PDFs and source images stay outside this public repository.
import { decomposeHangulWord } from "../utils/hangul.js";

function word(text, roman, zh, partOfSpeech = "noun") {
  return { text, roman, zh, partOfSpeech, syllables: decomposeHangulWord(text, roman) };
}
const w = word;
const lexicon = [
  w("민준", "min-jun", "敏俊"), w("씨", "ssi", "先生／小姐"), w("머리가", "meo-ri-ga", "頭髮（主格）", "expression"),
  w("왜", "wae", "為什麼", "expression"), w("젖었어요", "jeot-eot-eo-yo", "濕了", "predicate"),
  w("아", "a", "啊", "expression"), w("나오기", "na-o-gi", "出來", "predicate"), w("전에", "jeon-e", "之前", "expression"),
  w("샤워했어요", "sya-wo-haet-eo-yo", "洗了澡", "predicate"), w("그래요", "geu-rae-yo", "是嗎", "predicate"),
  w("아침에", "a-chim-e", "在早上", "expression"), w("샤워해요", "sya-wo-hae-yo", "洗澡", "predicate"),
  w("네", "ne", "是", "expression"), w("보통", "bo-tong", "通常", "expression"),
  w("밥을", "ba-beul", "飯（受詞）", "expression"), w("먹기", "meok-kki", "吃", "predicate"),
  w("손을", "son-eul", "手（受詞）", "expression"), w("씻어요", "ssi-seo-yo", "洗", "predicate"),
  w("샤워하기", "sya-wo-ha-gi", "洗澡", "predicate"), w("운동해요", "un-dong-hae-yo", "運動", "predicate"),
  w("운전하기", "un-jeon-ha-gi", "開車", "predicate"), w("안전벨트를", "an-jeon-bel-teu-reul", "安全帶（受詞）", "expression"),
  w("매요", "mae-yo", "繫", "predicate"), w("자기", "ja-gi", "睡覺", "predicate"),
  w("태국", "tae-guk", "泰國"), w("드라마를", "deu-ra-ma-reul", "連續劇（受詞）", "expression"),
  w("봐요", "bwa-yo", "看", "predicate"), w("물을", "mul-eul", "水（受詞）", "expression"),
  w("마셨어요", "ma-syeot-eo-yo", "喝了", "predicate"), w("직전에", "jik-jeon-e", "前一刻", "expression"),
  w("연락을", "yeon-rak-eul", "聯絡（受詞）", "expression"), w("받았어요", "bat-ass-eo-yo", "收到了", "predicate"),
  w("퇴근하기", "toe-geun-ha-gi", "下班", "predicate"), w("컴퓨터가", "keom-pyu-teo-ga", "電腦（主格）", "expression"),
  w("고장이", "go-jang-i", "故障（主格）", "expression"), w("났어요", "nat-eo-yo", "發生了", "predicate"),
  w("아직", "a-jik", "還（尚未）", "expression"), w("방에", "bang-e", "在房間", "expression"),
  w("있어요", "i-sseo-yo", "有／在", "predicate"), w("빨리", "ppal-li", "快", "expression"),
  w("나와요", "na-wa-yo", "出來", "predicate"), w("지금", "ji-geum", "現在", "expression"),
  w("집에", "ji-be", "在家／回家", "expression"), w("어디에", "eo-di-e", "在哪裡", "expression"),
  w("가요", "ga-yo", "去", "predicate"), w("비가", "bi-ga", "雨（主格）", "expression"),
  w("와요", "wa-yo", "來", "predicate"), w("그런데", "geu-reon-de", "但是", "expression"),
  w("우산이", "u-san-i", "雨傘（主格）", "expression"), w("없어요", "eop-seo-yo", "沒有", "predicate"),
  w("저기", "jeo-gi", "那裡", "expression"), w("카페가", "ka-pe-ga", "咖啡廳（主格）", "expression"),
  w("오늘", "o-neul", "今天", "expression"), w("뭐", "mwo", "什麼", "expression"),
  w("해요", "hae-yo", "做", "predicate"), w("가오슝에", "ga-o-syung-e", "在高雄", "expression"),
  w("관우", "gwan-u", "冠宇"), w("중국어가", "jung-guk-eo-ga", "中文（主格）", "expression"),
  w("재미있어요", "jae-mi-i-sseo-yo", "有趣", "predicate"), w("재미없어요", "jae-mi-eop-seo-yo", "無趣", "predicate"),
  w("너무", "neo-mu", "太", "expression"), w("어려워요", "eo-ryeo-wo-yo", "難", "predicate"),
  w("씨는", "ssi-neun", "先生／小姐（主題）", "expression"), w("한국어가", "han-guk-eo-ga", "韓語（主格）", "expression"),
  w("어때요", "eo-ttae-yo", "如何", "predicate"), w("좀", "jom", "稍微", "expression"),
  w("어렵지만", "eo-ryeop-ji-man", "雖然難", "predicate"), w("그럼", "geu-reom", "那麼", "expression"),
  w("우리", "u-ri", "我們", "expression"), w("열심히", "yeol-sim-hi", "用心地", "expression"),
  w("공부해요", "gong-bu-hae-yo", "學習", "predicate"), w("김치가", "gim-chi-ga", "泡菜（主格）", "expression"),
  w("맵지만", "maep-ji-man", "辣但", "predicate"), w("맛있어요", "mat-iss-eo-yo", "好吃", "predicate"),
  w("학력은", "hak-nyeok-eun", "學歷（主題）", "expression"), w("낮지만", "nat-ji-man", "低但", "predicate"),
  w("능력은", "neung-nyeok-eun", "能力（主題）", "expression"), w("좋아요", "jo-a-yo", "好", "predicate"),
  w("돈은", "don-eun", "錢（主題）", "expression"), w("많지만", "man-ji-man", "多但", "predicate"),
  w("인품은", "in-pum-eun", "人品（主題）", "expression"), w("안", "an", "不", "expression"),
  w("재미있지만", "jae-mi-it-ji-man", "有趣但", "predicate"), w("한국어는", "han-guk-eo-neun", "韓語（主題）", "expression"),
  w("한국", "han-guk", "韓國"), w("음식이", "eum-sik-i", "食物（主格）", "expression"),
  w("대만", "dae-man", "臺灣"), w("물가가", "mul-ga-ga", "物價（主格）", "expression"),
  w("지만", "ji-man", "但是", "expression"),
];
const byText = new Map(lexicon.map((entry) => [entry.text, entry]));
function line(speaker, ko, zh) {
  const tokens = (ko.match(/[가-힣]+/gu) ?? []).map((text) => {
    if (!byText.has(text)) throw new Error(`Review missing token: ${text}`);
    return byText.get(text);
  });
  return { speaker, ko, zh, tokens };
}

// 來去相關動詞 (handout p.10), shared by the vocabulary and the guide grid.
const motionVerbs = [
  w("들어가다", "deul-eo-ga-da", "進去", "predicate"), w("들어오다", "deul-eo-o-da", "進來", "predicate"),
  w("나가다", "na-ga-da", "出去", "predicate"), w("나오다", "na-o-da", "出來", "predicate"),
  w("올라가다", "ol-la-ga-da", "上去", "predicate"), w("올라오다", "ol-la-o-da", "上來", "predicate"),
  w("내려가다", "nae-ryeo-ga-da", "下去", "predicate"), w("내려오다", "nae-ryeo-o-da", "下來", "predicate"),
  w("돌아가다", "dol-a-ga-da", "回去", "predicate"), w("돌아오다", "dol-a-o-da", "回來", "predicate"),
];

// -기 전에 (handout pp.3-4) and -기 직전에 (handout pp.6-8), printed examples only.
const beforeGrid = [
  w("읽기 전에", "ik-kki- -jeon-e", "讀之前", "expression"), w("입기 전에", "ip-kki- -jeon-e", "穿之前", "expression"),
  w("마시기 전에", "ma-si-gi- -jeon-e", "喝之前", "expression"), w("공부하기 전에", "gong-bu-ha-gi- -jeon-e", "學習之前", "expression"),
  w("먹기 전에", "meok-kki- -jeon-e", "吃之前", "expression"), w("가기 전에", "ga-gi- -jeon-e", "去之前", "expression"),
];
const justBeforeGrid = [
  w("읽기 직전에", "ik-kki- -jik-jeon-e", "讀前一刻", "expression"), w("입기 직전에", "ip-kki- -jik-jeon-e", "穿前一刻", "expression"),
  w("마시기 직전에", "ma-si-gi- -jik-jeon-e", "喝前一刻", "expression"), w("공부하기 직전에", "gong-bu-ha-gi- -jik-jeon-e", "學習前一刻", "expression"),
  w("먹기 직전에", "meok-kki- -jik-jeon-e", "吃前一刻", "expression"), w("가기 직전에", "ga-gi- -jik-jeon-e", "去前一刻", "expression"),
];

const vocabulary1013 = [
  w("손을 씻다", "son-eul- -ssit-da", "洗手", "predicate"),
  w("운전하다", "un-jeon-ha-da", "開車", "predicate"),
  w("안전벨트를 매다", "an-jeon-bel-teu-reul- -mae-da", "繫安全帶", "predicate"),
  w("햄버거", "haem-beo-geo", "漢堡"),
  w("돈을 찾다", "don-eul- -chat-da", "提款", "predicate"),
  w("팝콘", "pap-kon", "爆米花"),
  w("돈을 내다", "don-eul- -nae-da", "付錢", "predicate"),
  w("마감되다", "ma-gam-doe-da", "截止", "predicate"),
  w("신청하다", "sin-cheong-ha-da", "申請", "predicate"),
  w("퇴근하다", "toe-geun-ha-da", "下班", "predicate"),
  w("고장이 나다", "go-jang-i- -na-da", "故障", "predicate"),
  w("머리", "meo-ri", "頭、頭髮"),
  w("젖다", "jeot-da", "濕", "predicate"),
  ...motionVerbs,
];

const lesson1013 = {
  id: "b1-23", label: "初級1-23",
  titleKo: "나오기 전에 샤워했어요.", titleZh: "出來之前洗了澡。",
  theme: "-기 전에／-기 직전에與來去動詞", heroEmoji: "🚿",
  sourcePdf: "docs/lessons/new/1013.pdf",
  dialogues: [
    { title: "本課對話：出來之前洗了澡", lines: [
      line("관우", "민준 씨, 머리가 왜 젖었어요?", "敏俊先生，你的頭髮怎麼濕了？"),
      line("민준", "아...나오기 전에 샤워했어요.", "啊…出來之前洗了澡。"),
      line("관우", "그래요? 아침에 샤워해요?", "是嗎？早上洗澡嗎？"),
      line("민준", "네, 보통 아침에 샤워해요.", "是，通常早上洗澡。"),
    ] },
    { title: "講義例句：-기 전에 與 -기 직전에", lines: [
      line("示例", "밥을 먹기 전에 손을 씻어요.", "吃飯前洗手。"),
      line("示例", "샤워하기 전에 운동해요.", "洗澡前運動。"),
      line("示例", "운전하기 전에 안전벨트를 매요.", "開車前繫安全帶。"),
      line("示例", "자기 전에 태국 드라마를 봐요.", "睡覺前看泰國連續劇。"),
      line("示例", "밥을 먹기 전에 물을 마셨어요.", "吃飯前喝了水。"),
      line("示例", "밥을 먹기 직전에 물을 마셨어요.", "吃飯前的前一刻喝了水。"),
      line("示例", "밥을 먹기 직전에 연락을 받았어요.", "吃飯前一刻收到了聯絡。"),
      line("示例", "퇴근하기 직전에 컴퓨터가 고장이 났어요.", "下班前一刻電腦故障了。"),
    ] },
    { title: "換你說說看（保留留白）", lines: [
      line("A", "아직 방에 있어요? 빨리 나와요.", "還在房間嗎？快出來。"),
      line("B", "네, 지금 __________", "請依題意，從來去動詞中選擇作答。"),
      line("A", "지금 어디에 가요?", "現在要去哪裡？"),
      line("B", "지금 집에 __________", "請依題意，從來去動詞中選擇作答。"),
      line("A", "비가 와요. 그런데 우산이 없어요.", "下雨了，但是沒有傘。"),
      line("B", "저기 카페가 있어요. 빨리 __________", "請依題意，從來去動詞中選擇作答。"),
      line("A", "오늘 뭐 해요?", "今天做什麼？"),
      line("B", "가오슝에 __________", "請依題意回答（地點：高雄）。"),
    ] },
  ],
  vocabulary: vocabulary1013,
  guide: {
    label: "-기 전에／-기 직전에", title: "-기 전에 與 -기 직전에、來去相關動詞",
    hint: "使用講義中已印出的變化與例句；留白練習保留為開放式題目。",
    sections: [
      { heading: "第 3–4 頁：動詞語幹 + 기 전에", words: beforeGrid },
      { heading: "第 6–8 頁：動詞語幹 + 기 직전에", words: justBeforeGrid },
      { heading: "第 10 頁：來去相關動詞", words: motionVerbs },
    ],
    practice: {
      heading: "講義留白練習", hint: "只提供原講義已完成的範例，不代填未印出的答案。",
      valueSuffix: "", items: [
        { value: "第 13 頁：운동한 후에 샤워해요.", answer: w("샤워하기 전에", "sya-wo-ha-gi- -jeon-e", "洗澡之前", "expression") },
      ],
      prompts: [
        { page: "第 5 頁", ko: "前：물건을 사다 / 영화를 보다 / 전화하다 / 회사에 가다 / 노래하다　後：맥도날드에서 햄버거를 사다 / 팝콘을 사다 / 문자를 보내다 / 물을 마시다 / 돈을 찾다", zh: "請將前後內容配對，並以 -기 전에 連成一句。" },
        { page: "第 9 頁", ko: "前：돈을 내다 / 밥을 먹다 / 퇴근하다 / 나가다　後：어머니 연락을 받았습니다. / 사장님 전화를 받았습니다. / 여자 친구가 돈을 냈어요. / 비가 왔어요.", zh: "請將前後內容配對，並以 -기 직전에 連成一句。" },
        { page: "第 11 頁", ko: "아직 방에 있어요? 빨리 나와요. / 지금 어디에 가요? / 비가 와요. 그런데 우산이 없어요. / 오늘 뭐 해요?", zh: "您是 B，請使用講義單字中的來去動詞回答。" },
        { page: "第 13 頁", ko: "2. 밥을 먹은 후에 약을 먹어요. / 3. 아침을 먹은 후에 회사에 가요. / 4. 이를 닦은 후에 세수해요. / 5. 문자를 보낸 후에 전화해요. / 6. 케이크를 먹은 후에 커피를 마셔요.", zh: "請用 -기 전에 重組句子（第 1 題已完成示範）。" },
      ],
    },
    sourceNotes: [
      { heading: "來源規則（第 3、6 頁）", lines: [
        "動詞語幹 + 기 전에 表示「之前」，無論語幹有無尾音都加「기 전에」。",
        "動詞語幹 + 기 직전에 也表示「之前」，但時間比 기 전에 更短，表示「~前一刻」。",
      ] },
      { heading: "補充譯文（講義未印出）", lines: [
        "「샤워하기 전에 운동해요」「운전하기 전에 안전벨트를 매요」「자기 전에 태국 드라마를 봐요」「퇴근하기 직전에 컴퓨터가 고장이 났어요」的中文譯文，以及第 11 頁練習句的中文提示，為整理時補上；講義原頁未印出。",
      ] },
    ],
    references: [{ heading: "附錄：對話翻譯（第 16 頁）", entries: [
      { label: "冠宇", text: "敏俊先生，你的頭髮怎麼濕了？" },
      { label: "敏俊", text: "啊…出來之前洗了澡。" },
      { label: "冠宇", text: "是嗎？早上洗澡嗎？" },
      { label: "敏俊", text: "是，通常早上洗澡。" },
    ] }],
  },
};

// ㅂ不規則 adjectives (handout pp.5-6) and their printed conjugations (pp.4, 7, 14).
const irregularA = [
  w("덥다", "deop-da", "熱", "predicate"), w("춥다", "chup-da", "冷", "predicate"),
  w("어렵다", "eo-ryeop-da", "難", "predicate"), w("쉽다", "swip-da", "容易", "predicate"),
  w("무겁다", "mu-geop-da", "重", "predicate"), w("가볍다", "ga-byeop-da", "輕", "predicate"),
];
const irregularB = [
  w("맵다", "maep-da", "辣", "predicate"), w("두껍다", "du-kkeop-da", "厚", "predicate"),
  w("반갑다", "ban-gap-da", "高興（見面）", "predicate"), w("고맙다", "go-map-da", "謝謝", "predicate"),
];
const irregularForms = [
  w("더워요", "deo-wo-yo", "熱（-아요／어요 形）", "predicate"), w("추워요", "chu-wo-yo", "冷（-아요／어요 形）", "predicate"),
  w("추우면", "chu-u-myeon", "如果冷（-으면 形）", "predicate"), w("더우면", "deo-u-myeon", "如果熱（-으면 形）", "predicate"),
];

const vocabulary1015 = [
  ...irregularA, ...irregularB,
  w("열심히", "yeol-sim-hi", "用心、努力地", "expression"), w("배고파요", "bae-go-pa-yo", "肚子餓", "predicate"),
  w("매일", "mae-il", "每天"), w("능력", "neung-nyeok", "能力"), w("학력", "hak-nyeok", "學歷"),
  w("인품", "in-pum", "人品"), w("물가", "mul-ga", "物價"), w("값", "gap", "價格"),
  w("집값", "jip-gap", "房價"), w("싸다", "ssa-da", "便宜", "predicate"), w("비싸다", "bi-ssa-da", "貴", "predicate"),
];

const lesson1015 = {
  id: "b1-24", label: "初級1-24",
  titleKo: "한국어는 좀 어렵지만 재미있어요.", titleZh: "韓語雖然有點難，但很有趣。",
  theme: "ㅂ不規則變化與對立的 -지만", heroEmoji: "📚",
  sourcePdf: "docs/lessons/new/1015.pdf",
  dialogues: [
    { title: "本課對話：韓語雖然有點難", lines: [
      line("관우", "민준 씨, 중국어가 재미있어요?", "敏俊先生，中文有趣嗎？"),
      line("민준", "재미없어요. 너무 어려워요. 관우 씨는 한국어가 어때요?", "無趣。太難了。冠宇先生，韓文如何呢？"),
      line("관우", "좀 어렵지만 재미있어요.", "雖然有點難，但有趣。"),
      line("민준", "그럼 우리 열심히 공부해요.", "那我們努力學吧。"),
    ] },
    { title: "講義例句：-지만 與 ㅂ不規則", lines: [
      line("示例", "김치가 맵지만 맛있어요.", "泡菜雖然辣，但好吃。"),
      line("示例", "학력은 낮지만 능력은 좋아요.", "學歷雖然低，但能力好。"),
      line("示例", "돈은 많지만 인품은 안 좋아요.", "錢雖然多，但人品不好。"),
      line("示例", "한국어가 재미있지만 어려워요.", "韓文雖然有趣，但是難。"),
      line("示例", "한국어는 좀 어렵지만 재미있어요.", "韓語雖然有點難，但很有趣。"),
    ] },
    { title: "換你說說看（保留留白）", lines: [
      line("A", "한국어가 재미있어요?", "韓文有趣嗎？"),
      line("B", "__________ 지만 __________", "請自行填入形容詞，並使用 -지만 回答。"),
      line("A", "한국 음식이 맛있어요?", "韓國菜好吃嗎？"),
      line("B", "__________ 지만 __________", "請自行填入形容詞，並使用 -지만 回答。"),
      line("A", "대만 물가가 어때요?", "臺灣的物價如何？"),
      line("B", "__________", "請依提示「음식 값, 싸다／집값, 비싸다」，以 -지만 回答。"),
    ] },
  ],
  vocabulary: vocabulary1015,
  guide: {
    label: "ㅂ不規則與 -지만", title: "ㅂ不規則變化與 -지만",
    hint: "使用講義中已印出的變化與例句；留白練習保留為開放式題目。",
    sections: [
      { heading: "第 5 頁：ㅂ不規則單詞（一）", words: irregularA },
      { heading: "第 6 頁：ㅂ不規則單詞（二）", words: irregularB },
      { heading: "第 4、7、14 頁：ㅂ不規則變化形態", words: irregularForms },
    ],
    practice: {
      heading: "講義留白練習", hint: "只提供原講義已完成的範例，不代填未印出的答案。",
      valueSuffix: "", items: [
        { value: "第 7 頁：덥다 + 어요", answer: irregularForms[0] },
      ],
      prompts: [
        { page: "第 7 頁", ko: "춥다 / 어렵다 / 쉽다 / 무겁다 / 가볍다 / 맵다 / 두껍다 / 반갑다 / 고맙다 → ______ 아요／어요／여요", zh: "請依 ㅂ 不規則變化加上 -아요／어요／여요（덥다 → 더워요 已示範）。" },
        { page: "第 8 頁", ko: "오늘 날씨가 어때요? / 지금 눈이 와요. / 한국어가 어때요? / 가방이 무거워요?", zh: "您是 B，試著回答 A 的問題；使用 ㅂ 不規則形容詞。" },
        { page: "第 11 頁", ko: "前：학교에 갔다 / 태국어는 어렵다 / 밥을 먹었다 / 시간이 없다　後：선생님을 못 만났어요. / 매일 운동해요. / 재미있어요. / 배고파요.", zh: "請將前後內容配對，並以 -지만 連成一句。" },
        { page: "第 13 頁", ko: "한국어가 재미있어요? / 한국 음식이 맛있어요? / 대만 물가가 어때요?", zh: "您是 B，請使用 -지만 回答；第三題可依提示「음식 값, 싸다／집값, 비싸다」作答。" },
      ],
    },
    sourceNotes: [
      { heading: "來源規則（第 3–4、9 頁）", lines: [
        "ㅂ不規則：語幹最後一字具有ㅂ尾音，遇母音開頭的語尾時ㅂ轉為우（춥다 + 으면 → 추우면；춥다 + 어요 → 추워요）。",
        "語幹 + 지만 表示「但是～」，無論語幹有無尾音都加 -지만；已結束的事先加過去式語尾（가다 + 았 + 지만 → 갔지만）。",
      ] },
      { heading: "補充譯文（講義未印出）", lines: [
        "第 10 頁三個例句「김치가 맵지만 맛있어요」「학력은 낮지만 능력은 좋아요」「돈은 많지만 인품은 안 좋아요」的中文譯文，以及第 13 頁練習句的中文提示，為整理時補上；講義原頁未印出。",
      ] },
    ],
    references: [{ heading: "附錄：對話翻譯（第 16 頁）", entries: [
      { label: "冠宇", text: "敏俊先生，中文有趣嗎？" },
      { label: "敏俊", text: "無趣。太難了。冠宇先生，韓文如何呢？" },
      { label: "冠宇", text: "雖然有點難，但有趣。" },
      { label: "敏俊", text: "那我們努力學吧。" },
    ] }],
  },
};

export const midOctoberLessons = [lesson1013, lesson1015];
