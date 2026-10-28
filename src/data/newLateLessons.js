import { decomposeHangulWord } from "../utils/hangul.js";

// Transcribed from the October 28 and November 3 handouts; exercises retain their blanks.
const word = (text, roman, zh, partOfSpeech = "noun") => ({ text, roman, zh, partOfSpeech, syllables: decomposeHangulWord(text, roman) });
const w = word;
const places = [
  w("지하", "ji-ha", "地下"), w("주차장", "ju-cha-jang", "停車場"), w("옥상", "ok-ssang", "屋頂"),
  w("후문", "hu-mun", "後門"), w("대문", "dae-mun", "大門"), w("사무실", "sa-mu-sil", "辦公室"),
  w("경비실", "gyeong-bi-sil", "警衛室"), w("정문", "jeong-mun", "正門"), w("남쪽", "nam-jjok", "南邊、南部"),
  w("북쪽", "buk-jjok", "北邊、北部"), w("동쪽", "dong-jjok", "東邊、東部"), w("서쪽", "seo-jjok", "西邊、西部"),
];
const entertainment = [
  w("드라마", "deu-ra-ma", "戲劇"), w("영화", "yeong-hwa", "電影"), w("예능", "ye-neung", "綜藝"),
  w("방송", "bang-song", "節目"), w("생방송", "saeng-bang-song", "直播"), w("재방송", "jae-bang-song", "重播"),
  w("가수", "ga-su", "歌手"), w("배우", "bae-u", "演員"), w("아이돌 그룹", "a-i-dol- -geu-rup", "偶像團體"),
  w("개그맨", "gae-geu-maen", "男諧星"), w("개그우먼", "gae-geu-u-meon", "女諧星"),
  w("시청하다", "si-cheong-ha-da", "收看", "predicate"), w("덕질하다", "deok-jjil-ha-da", "追星（非標準語）", "predicate"),
];
const starts = [
  w("먹기 시작하다", "meok-kki- -si-jak-ha-da", "開始吃", "predicate"),
  w("쓰기 시작하다", "sseu-gi- -si-jak-ha-da", "開始寫", "predicate"),
  w("배우기 시작하다", "bae-u-gi- -si-jak-ha-da", "開始學", "predicate"),
  w("일하기 시작하다", "il-ha-gi- -si-jak-ha-da", "開始工作", "predicate"),
];
const vocabulary1028 = [...places, w("집", "jip", "家"), w("회사", "hoe-sa", "公司"), w("학교", "hak-kkyo", "學校"), w("공항", "gong-hang", "機場"), w("백화점", "bae-kwa-jeom", "百貨公司"), w("걸어가다", "geo-reo-ga-da", "走路去", "predicate"), w("내려오다", "nae-ryeo-o-da", "下來", "predicate"), w("돌아오다", "do-ra-o-da", "回來", "predicate"), w("말레이시아", "mal-le-i-si-a", "馬來西亞")];
const vocabulary1103 = [...entertainment, w("집안일", "ji-ban-nil", "家事"), w("맛보다", "mat-ppo-da", "嚐味道", "predicate"), w("청소하다", "cheong-so-ha-da", "打掃", "predicate"), w("땅", "ttang", "土地"), w("거실", "geo-sil", "客廳"), w("안방", "an-bang", "臥室"), w("일기", "il-gi", "日記"), w("일하다", "il-ha-da", "工作", "predicate"), w("학원", "ha-gwon", "補習班"), w("배우다", "bae-u-da", "學習", "predicate")];

// Each displayed Korean token is reviewed independently for the word inspector.
const tokens = [
  ...vocabulary1028, ...vocabulary1103,
  ...[
    ["민준", "min-jun", "敏俊"], ["관우", "gwan-u", "冠宇"], ["씨", "ssi", "先生／小姐"], ["지하철로", "ji-ha-cheol-lo", "搭捷運"], ["회사에", "hoe-sa-e", "去公司"], ["가지요", "ga-ji-yo", "去吧"],
    ["네", "ne", "是"], ["가요", "ga-yo", "去"], ["버스도", "beo-seu-do", "公車也"], ["있지만", "it-jji-man", "雖然有"], ["시간이", "si-ga-ni", "時間"], ["많이", "ma-ni", "很多"], ["걸려요", "geol-lyeo-yo", "花費時間"],
    ["집에서", "ji-be-seo", "從家裡"], ["회사까지", "hoe-sa-kka-ji", "到公司"], ["얼마나", "eol-ma-na", "多久"], ["길이", "gi-ri", "道路"], ["막히지", "ma-ki-ji", "塞車（接否定）"], ["않으면", "a-neu-myeon", "如果不"], ["분", "bun", "分鐘"], ["정도", "jeong-do", "左右"],
    ["도서관에서", "do-seo-gwa-ne-seo", "在圖書館"], ["공부합니다", "gong-bu-ham-ni-da", "學習"], ["갑니다", "gam-ni-da", "去"], ["학교에서", "hak-kkyo-e-seo", "從學校"], ["왔습니다", "wat-sseum-ni-da", "來了"], ["회사에서", "hoe-sa-e-seo", "從公司"], ["돌아왔어요", "do-ra-wa-sseo-yo", "回來了"],
    ["층에서", "cheung-e-seo", "從樓層"], ["내려왔어요", "nae-ryeo-wa-sseo-yo", "下來了"], ["백화점에서", "bae-kwa-jeo-me-seo", "從百貨公司"], ["나왔습니다", "na-wat-sseum-ni-da", "出來了"], ["공항에서", "gong-hang-e-seo", "從機場"],
    ["학교까지", "hak-kkyo-kka-ji", "到學校"], ["걸어갑니다", "geo-reo-gam-ni-da", "走路去"], ["여기까지", "yeo-gi-kka-ji", "到這裡"], ["어디에서", "eo-di-e-seo", "從哪裡"], ["왔어요", "wa-sseo-yo", "來了"], ["어디에", "eo-di-e", "在哪裡"], ["있어요", "i-sseo-yo", "有／在"],
    ["뭘로", "mwol-lo", "用什麼交通工具"], ["갑니까", "gam-ni-kka", "去嗎"], ["걸립니까", "geol-lim-ni-kka", "花費多久"], ["집까지", "jip-kka-ji", "到家"], ["타이베이에서", "ta-i-be-i-e-seo", "從台北"], ["컨딩까지", "keon-ding-kka-ji", "到墾丁"],
    ["언제부터", "eon-je-bu-teo", "從何時開始"], ["한국어를", "han-gu-geo-reul", "韓語（受詞）"], ["배우기", "bae-u-gi", "學習（名詞形）"], ["시작했어요", "si-ja-kae-sseo-yo", "開始了"], ["년", "nyeon", "年"], ["전부터", "jeon-bu-teo", "從之前開始"], ["그래요", "geu-rae-yo", "是嗎"], ["배웠어요", "bae-wo-sseo-yo", "學了"], ["학원에서", "ha-gwo-ne-seo", "在補習班"], ["왜", "wae", "為什麼"], ["배우고", "bae-u-go", "學（接續）"], ["싶었어요", "si-peo-sseo-yo", "想要了"], ["아이돌", "a-i-dol", "偶像"], ["그룹을", "geu-ru-beul", "團體（受詞）"], ["좋아해서", "jo-a-hae-seo", "因為喜歡"],
    ["여기부터", "yeo-gi-bu-teo", "從這裡開始"], ["하세요", "ha-se-yo", "請做"], ["시부터", "si-bu-teo", "從…點開始"], ["준비하겠습니다", "jun-bi-ha-get-sseum-ni-da", "會準備"], ["김치부터", "gim-chi-bu-teo", "先從泡菜"], ["맛보세요", "mat-ppo-se-yo", "請品嚐"], ["방부터", "bang-bu-teo", "先從房間"], ["청소할까요", "cheong-so-hal-kka-yo", "要打掃嗎"], ["물부터", "mul-bu-teo", "先從水"], ["마셔요", "ma-syeo-yo", "喝"],
    ["오늘부터", "o-neul-bu-teo", "從今天開始"], ["일기를", "il-gi-reul", "日記（受詞）"], ["쓰기", "sseu-gi", "寫（名詞形）"], ["시작합니다", "si-ja-kam-ni-da", "開始"], ["작년부터", "jang-nyeon-bu-teo", "從去年開始"], ["다음", "da-eum", "下一個"], ["주부터", "ju-bu-teo", "從…週開始"], ["대학교에서", "dae-hak-kkyo-e-seo", "在大學"], ["일하기", "il-ha-gi", "工作（名詞形）"],
    ["씁니까", "sseum-ni-kka", "寫嗎"], ["일했어요", "il-hae-sseo-yo", "工作了"], ["비가", "bi-ga", "雨"], ["오기", "o-gi", "來（名詞形）"], ["영어를", "yeong-eo-reul", "英語（受詞）"], ["드라마를", "deu-ra-ma-reul", "戲劇（受詞）"], ["시청하기", "si-cheong-ha-gi", "收看（名詞形）"], ["대만에", "dae-ma-ne", "在台灣"], ["외국어", "oe-gu-geo", "外語"], ["학원이", "ha-gwo-ni", "補習班（主格）"], ["많아요", "ma-na-yo", "多"],
  ].map(([text, roman, zh]) => w(text, roman, zh, "expression")),
];
const byText = new Map(tokens.map((item) => [item.text, item]));
function line(speaker, ko, zh, spokenKo) {
  const parts = (ko.match(/[가-힣]+/gu) ?? []).map((text) => {
    const entry = byText.get(text);
    if (!entry) throw new Error(`Missing reviewed token: ${text}`);
    return entry;
  });
  return { speaker, ko, zh, tokens: parts, ...(spokenKo ? { spokenKo } : {}) };
}
const blank = () => line("B", "__________", "請依自己的情況回答。 ".trim());

const lesson1028 = {
  id: "b1-27", label: "初級1-27", titleKo: "집에서 회사까지 얼마나 걸려요?", titleZh: "從家去公司要多久？", theme: "起始點 에서、範圍 에서…까지 與場所名詞", heroEmoji: "🚇", sourcePdf: "docs/lessons/new/1028.pdf",
  dialogues: [
    { title: "本課對話：從家到公司", lines: [
      line("관우", "민준 씨, 지하철로 회사에 가지요?", "敏俊先生，你坐捷運去公司吧？"),
      line("민준", "네, 지하철로 가요. 버스도 있지만 시간이 많이 걸려요.", "是，我坐捷運去。雖然有公車，但是很花時間。"),
      line("관우", "집에서 회사까지 얼마나 걸려요?", "從家裡到公司要多久？"),
      line("민준", "길이 막히지 않으면 30분 정도 걸려요.", "路上不塞的話大概三十分鐘。", "길이 막히지 않으면 삼십 분 정도 걸려요."),
    ] },
    { title: "講義例句：起點與範圍", lines: [
      line("示例", "도서관에서 공부합니다.", "在圖書館讀書。"),
      line("示例", "집에서 회사에 가요.", "從家裡去公司。"),
      line("示例", "학교에서 왔습니다.", "從學校來了。"),
      line("示例", "회사에서 돌아왔어요.", "從公司回來了。"),
      line("示例", "3층에서 내려왔어요.", "從三樓下來了。", "삼 층에서 내려왔어요."),
      line("示例", "백화점에서 나왔습니다.", "從百貨公司出來了。"),
      line("示例", "공항에서 나왔습니다.", "從機場出來了。"),
      line("示例", "집에서 학교까지 걸어갑니다.", "從家走到學校。"),
      line("示例", "학교에서 여기까지 왔습니다.", "從學校來到這裡。"),
    ] },
    { title: "換你說說看（保留留白）", lines: [
      line("A", "어디에서 왔어요?", "你從哪裡來？"), blank(),
      line("A", "뭘로 회사에 갑니까? 얼마나 걸립니까?", "搭什麼去公司？要多久？"), blank(),
      line("A", "학교에서 집까지 얼마나 걸려요?", "從學校到家要多久？"), blank(),
      line("A", "길이 막히지 않으면 타이베이에서 컨딩까지 얼마나 걸려요?", "不塞車的話，從台北到墾丁要多久？"), blank(),
    ] },
  ], vocabulary: vocabulary1028,
  guide: {
    label: "從哪裡到哪裡", title: "에서、까지 與場所名詞", hint: "以移動動詞辨認起點，並用 까지 表示終點。",
    sections: [{ heading: "第 10 頁：場所與方向", words: places }, { heading: "第 5、7 頁：移動動詞", words: vocabulary1028.slice(17, 20) }],
    practice: { heading: "講義練習", hint: "保留講義留白；依題目連接或自行回答。", valueSuffix: "", items: [{ value: "停車場", answer: places[1] }, { value: "屋頂", answer: places[2] }], prompts: [
      { page: "第 6 頁", ko: "어디에서 왔어요? / 민준 씨는 한국 사람입니까? / 선생님은 어디 사람입니까? 어디에서 왔습니까?", zh: "使用 에서 回答，保留講義的空格。" },
      { page: "第 9 頁", ko: "1층 / 대만 / 학교 / 여기 / 말레이시아 + 에서 … 한국 / 타이중 / 9층 / 집 / 대만 + 까지", zh: "將起點、終點與題目提供的動詞或時間連成句子。" },
      { page: "第 11 頁", ko: "차(車)가 어디에 있어요? / 실례지만 주차장이 어디에 있습니까? / 컨딩(墾丁)이 어디에 있어요? / 여기서 가면 얼마나 걸려요?", zh: "依場所或實際情況回答。" },
      { page: "第 13 頁", ko: "뭘로 회사에 갑니까? / 학교에서 집까지 얼마나 걸려요?", zh: "依自己的情況回答，不代填交通時間。" },
    ] },
    sourceNotes: [{ heading: "講義重點（第 3–8 頁）", lines: ["에서 可表示動作場所，也可和移動動詞搭配表示起點。", "名詞 + 에서 … 名詞 + 까지 表示從某處到某處；兩個助詞不因尾音改變。"] }],
    references: [{ heading: "附錄：對話翻譯（第 16 頁）", entries: [
      { label: "冠宇", text: "敏俊先生，你坐捷運去公司吧？" }, { label: "敏俊", text: "是，我坐捷運去。雖然有公車，但是很花時間。" }, { label: "冠宇", text: "從家裡到公司要多久？" }, { label: "敏俊", text: "路上不塞的話大概三十分鐘。" },
    ] }],
  },
};

const lesson1103 = {
  id: "b1-28", label: "初級1-28", titleKo: "언제부터 한국어를 배우기 시작했어요?", titleZh: "何時開始學韓文？", theme: "開始的 부터、-기 시작하다 與影視娛樂", heroEmoji: "🎬", sourcePdf: "docs/lessons/new/1103.pdf",
  dialogues: [
    { title: "本課對話：何時開始學韓語", lines: [
      line("민준", "언제부터 한국어를 배우기 시작했어요?", "從什麼時候開始學韓語？"),
      line("관우", "2년 전부터 배우기 시작했어요.", "兩年前開始學的。", "이 년 전부터 배우기 시작했어요."),
      line("민준", "그래요? 어디에서 배웠어요?", "是嗎？在哪裡學的？"),
      line("관우", "학원에서 배웠어요.", "在補習班學的。"),
      line("민준", "왜 한국어를 배우고 싶었어요?", "為什麼想學韓語？"),
      line("관우", "아이돌 그룹을 좋아해서 배우기 시작했어요.", "因為喜歡偶像團體，所以開始學。"),
    ] },
    { title: "講義例句：부터與開始做", lines: [
      line("示例", "여기부터 하세요.", "請從這裡開始做。"),
      line("示例", "3시부터 준비하겠습니다.", "從三點開始準備。", "세 시부터 준비하겠습니다."),
      line("示例", "김치부터 맛보세요.", "請先品嚐泡菜。"),
      line("示例", "방부터 청소할까요?", "要先打掃房間嗎？"),
      line("示例", "물부터 마셔요.", "先喝水。"),
      line("示例", "오늘부터 일기를 쓰기 시작합니다.", "從今天開始寫日記。"),
      line("示例", "작년부터 한국어를 배우기 시작했어요.", "從去年開始學韓語。"),
      line("示例", "다음 주부터 대학교에서 일하기 시작합니다.", "從下週開始在大學工作。"),
    ] },
    { title: "換你說說看（保留留白）", lines: [
      line("A", "언제부터 한국어를 배웠어요?", "從何時開始學韓語？"), blank(),
      line("A", "언제부터 일기를 씁니까?", "從何時開始寫日記？"), blank(),
      line("A", "언제부터 비가 오기 시작했어요?", "從何時開始下雨？"), blank(),
      line("A", "언제부터 영어를 배우기 시작했어요?", "從何時開始學英語？"), blank(),
      line("A", "언제부터 드라마를 시청하기 시작했어요?", "從何時開始看戲劇？"), blank(),
      line("A", "대만에 외국어 학원이 많아요?", "台灣有很多外語補習班嗎？"), blank(),
    ] },
  ], vocabulary: vocabulary1103,
  guide: {
    label: "從何時開始", title: "부터、-기 시작하다 與影視娛樂", hint: "用 부터 表示開始，動詞語幹加 -기 시작하다 表示開始做某事。",
    sections: [{ heading: "第 7 頁：開始做某事", words: starts }, { heading: "第 10 頁：影視娛樂", words: entertainment }],
    practice: { heading: "講義練習", hint: "按講義提示自行回答，保留原本空格。", valueSuffix: "", items: [{ value: "戲劇", answer: entertainment[0] }, { value: "收看", answer: entertainment[11] }], prompts: [
      { page: "第 6 頁", ko: "점심 시간은 언제예요? → 12시부터 1시까지예요. / 회의 시간은 언제예요? / 근무 시간이 어떻게 되세요?", zh: "午餐時間的回答為講義提供的範例；其餘自行回答。" },
      { page: "第 9 頁", ko: "언제부터 한국어를 배웠어요? / 언제부터 일기를 씁니까? / 언제부터 일했어요? / 언제부터 비가 오기 시작했어요?", zh: "依自己的情況用 부터 和 -기 시작하다 回答。" },
      { page: "第 11 頁", ko: "음악 방송을 보고 (　)에게 관심이 생겼어요. / 이건 (　)이에요. / 한국 (　)를 좋아해서 한국 드라마를 (　)기 시작했어요. / 저는 이 (　)의 노래를 다 들었어요.", zh: "用講義提供的影視單字完成句子；答案保留空白。" },
      { page: "第 13 頁", ko: "언제부터 영어를 배우기 시작했어요? / 언제부터 드라마를 시청하기 시작했어요? / 대만에 외국어 학원이 많아요?", zh: "請依自己的情況回答。" },
    ] },
    sourceNotes: [
      { heading: "講義重點（第 3–8 頁）", lines: ["에서 多用於場所起點；부터 主要表示時間或行為的開始，也可與 까지 搭配表示範圍。", "動詞語幹 + 기 시작하다 表示開始做某事；語幹有無尾音都接 기 시작하다。"] },
      { heading: "對話譯文差異", lines: ["第 16 頁附錄前四句與第 12 頁對話相符；後兩句講的是台灣的韓語補習班，與韓文對話中的學習動機不同。本課對話後兩句中文依韓文補譯。"] },
    ],
    references: [{ heading: "附錄：對話翻譯原文（第 16 頁）", entries: [
      { label: "敏俊", text: "何時開始學韓語的？" }, { label: "冠宇", text: "兩年前開始學的。" }, { label: "敏俊", text: "是嗎？在哪裡學的？" }, { label: "冠宇", text: "在補習班學的。" }, { label: "敏俊", text: "台灣有很多韓語補習班嗎？" }, { label: "冠宇", text: "是的，最近韓語補習班很多。" },
    ] }],
  },
};
export const newLateLessons = [lesson1028, lesson1103];
