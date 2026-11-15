// Source-grounded text from the November 16 and November 18 handouts.
// The original PDFs and source images stay outside this public repository.
import { decomposeHangulWord } from "../utils/hangul.js";

const w = (text, roman, zh, partOfSpeech = "noun") => ({
  text, roman, zh, partOfSpeech, syllables: decomposeHangulWord(text, roman),
});
const words = (entries, partOfSpeech = "noun") => entries.map(([text, roman, zh]) => w(text, roman, zh, partOfSpeech));
const education = words([
  ["유치원", "yu-chi-won", "幼稚園"], ["초등학교", "cho-deung-hak-kkyo", "小學"], ["중학교", "jung-hak-kkyo", "國中"],
  ["고등학교", "go-deung-hak-kkyo", "高中"], ["대학교", "dae-hak-kkyo", "大學"], ["대학원", "dae-ha-gwon", "研究所"],
  ["석사과정", "seok-ssa-gwa-jeong", "碩士課程"], ["박사과정", "bak-ssa-gwa-jeong", "博士課程"], ["전문대학", "jeon-mun-dae-hak", "專科／技職大學"],
  ["학사", "hak-ssa", "學士"], ["석사", "seok-ssa", "碩士"], ["박사", "bak-ssa", "博士"], ["학원", "ha-gwon", "補習班"],
]);
education.push(w("졸업하다", "jo-reo-pa-da", "畢業（取得學位）", "predicate"), w("수료하다", "su-ryo-ha-da", "結業（未取得學位）", "predicate"));
const purposeForms = words([
  ["먹으려고", "meo-geu-ryeo-go", "為了吃"], ["읽으려고", "il-geu-ryeo-go", "為了讀"], ["살려고", "sal-lyeo-go", "為了生活／居住"],
  ["가려고", "ga-ryeo-go", "為了去"], ["오려고", "o-ryeo-go", "為了來"], ["마시려고", "ma-si-ryeo-go", "為了喝"],
], "expression");
const intentionForms = words([
  ["받으려고 하다", "ba-deu-ryeo-go- -ha-da", "打算收取"], ["신으려고 하다", "si-neu-ryeo-go- -ha-da", "打算穿（鞋襪）"],
  ["살려고 하다", "sal-lyeo-go- -ha-da", "打算生活／居住"], ["확인하려고 하다", "hwa-gin-ha-ryeo-go- -ha-da", "打算確認"],
  ["켜려고 하다", "kyeo-ryeo-go- -ha-da", "打算開（電器）"], ["끄려고 하다", "kkeu-ryeo-go- -ha-da", "打算關（電器）"],
], "predicate");
const vocabulary1116 = [
  ...education,
  w("화장하다", "hwa-jang-ha-da", "化妝", "predicate"), w("돈을 모으다", "do-neul- -mo-eu-da", "存錢", "predicate"),
  w("부동산중개소", "bu-dong-san-jung-gae-so", "不動產仲介"), w("확인하다", "hwa-gin-ha-da", "確認", "predicate"),
  w("켜다", "kyeo-da", "開（電器）", "predicate"), w("끄다", "kkeu-da", "關（電器）", "predicate"),
  w("부족하다", "bu-jo-ka-da", "不足", "predicate"), w("못하다", "mo-ta-da", "無法", "predicate"),
  w("사실", "sa-sil", "事實"), w("구경", "gu-gyeong", "參觀、逛"),
  w("요", "yo", "表示尊敬的助詞（講義原註）", "expression"), w("디자인", "di-ja-in", "設計"),
];
const sports = words([
  ["래프팅", "rae-peu-ting", "泛舟"], ["승마", "seung-ma", "馬術"], ["역도", "yeok-tto", "舉重"], ["권투", "gwon-tu", "拳擊"],
  ["테니스장", "te-ni-seu-jang", "網球場"], ["배드민턴장", "bae-deu-min-teon-jang", "羽毛球場"], ["야구장", "ya-gu-jang", "棒球場"],
  ["당구대", "dang-gu-dae", "撞球桌"], ["탁구대", "tak-kku-dae", "桌球桌"], ["운동장", "un-dong-jang", "操場／運動場"],
]);
const negativeForms = words([
  ["받지 않다", "bat-jji- -an-ta", "不收取"], ["먹지 않다", "meok-jji- -an-ta", "不吃"],
  ["공부하지 않다", "gong-bu-ha-ji- -an-ta", "不學習"], ["복습하지 않다", "bok-sseu-pa-ji- -an-ta", "不複習"],
  ["좋지 않다", "jo-chi- -an-ta", "不好"], ["나쁘지 않다", "na-ppeu-ji- -an-ta", "不壞"],
], "predicate");
const inabilityForms = words([
  ["신지 못하다", "sin-jji- -mo-ta-da", "無法穿（鞋襪）"], ["자지 못하다", "ja-ji- -mo-ta-da", "無法睡覺"],
  ["약속하지 못하다", "yak-sso-ka-ji- -mo-ta-da", "無法約定"], ["운동하지 못하다", "un-dong-ha-ji- -mo-ta-da", "無法運動"],
  ["좋지 못하다", "jo-chi- -mo-ta-da", "不夠好"], ["예쁘지 못하다", "ye-ppeu-ji- -mo-ta-da", "不夠漂亮"],
], "predicate");
const vocabulary1118 = [
  ...sports, w("게임을 하다", "ge-i-meul- -ha-da", "玩遊戲（電玩）", "predicate"),
  w("똑똑하다", "ttok-tto-ka-da", "聰明", "predicate"), w("운전면허증", "un-jeon-myeon-heo-jjeung", "駕照"),
  w("미안하다", "mi-an-ha-da", "對不起", "predicate"), w("헬스장", "hel-sseu-jang", "健身房"),
];

// Each Hangul run used by the word inspector is reviewed independently.
const lexicon = [
  ...vocabulary1116, ...vocabulary1118,
  ...words([
    ["한국", "han-guk", "韓國"], ["갔어요", "ga-sseo-yo", "去了"], ["네", "ne", "是"], ["그렇지만", "geu-reo-chi-man", "但是"],
    ["시간이", "si-ga-ni", "時間（主格）"], ["부족해서", "bu-jo-kae-seo", "因為不足"], ["학교", "hak-kkyo", "學校"],
    ["구경을", "gu-gyeong-eul", "參觀（受詞）"], ["못했어요", "mo-tae-sseo-yo", "沒能做到"], ["구경이요", "gu-gyeong-i-yo", "參觀嗎"],
    ["왜요", "wae-yo", "為什麼"], ["아", "a", "啊"], ["사실은", "sa-si-reun", "其實"], ["내년", "nae-nyeon", "明年"],
    ["한국에", "han-gu-ge", "去韓國"], ["유학하려고", "yu-ha-ka-ryeo-go", "打算留學"], ["해요", "hae-yo", "做"],
    ["그래요", "geu-rae-yo", "是嗎"], ["뭘", "mwol", "什麼（受詞）"], ["공부해요", "gong-bu-hae-yo", "學習"],
    ["한국에서", "han-gu-ge-seo", "在韓國"], ["디자인을", "di-ja-i-neul", "設計（受詞）"], ["공부하려고", "gong-bu-ha-ryeo-go", "打算學習"],
    ["밥을", "ba-beul", "飯（受詞）"], ["먹으려고", "meo-geu-ryeo-go", "為了吃"], ["식당에", "sik-ttang-e", "去餐廳"],
    ["가요", "ga-yo", "去"], ["운동하려고", "un-dong-ha-ryeo-go", "為了運動"], ["공원에", "gong-wo-ne", "去公園"],
    ["친구를", "chin-gu-reul", "朋友（受詞）"], ["만나려고", "man-na-ryeo-go", "為了見面"], ["화장했어요", "hwa-jang-hae-sseo-yo", "化妝了"],
    ["태국", "tae-guk", "泰國"], ["회사에서", "hoe-sa-e-seo", "在公司"], ["일하려고", "il-ha-ryeo-go", "打算工作"],
    ["태국어를", "tae-gu-geo-reul", "泰語（受詞）"], ["배워요", "bae-wo-yo", "學習"], ["합니다", "ham-ni-da", "做（正式）"],
    ["친구의", "chin-gu-e", "朋友的"], ["살", "sal", "歲"], ["딸이", "tta-ri", "女兒（主格）"], ["에", "e", "在／去"],
    ["다닙니다", "da-nim-ni-da", "就讀／往來"], ["졸업한", "jo-reo-pan", "畢業之後的"], ["후에", "hu-e", "之後"],
    ["가려고", "ga-ryeo-go", "打算去"], ["계속", "gye-sok", "繼續"], ["공부하고", "gong-bu-ha-go", "學習（接續）"],
    ["싶습니다", "sip-sseum-ni-da", "想要"], ["여동생은", "yeo-dong-saeng-eun", "妹妹（主題）"], ["살입니다", "sa-rim-ni-da", "是…歲"],
    ["지금", "ji-geum", "現在"], ["대학교", "dae-hak-kkyo", "大學"], ["졸업하면", "jo-reo-pa-myeon", "畢業的話"],
    ["뭐해요", "mwo-hae-yo", "做什麼"], ["그", "geu", "那"], ["사람은", "sa-ra-meun", "人（主題）"],
    ["박사예요", "bak-ssa-ye-yo", "是博士嗎"], ["아니요", "a-ni-yo", "不是"], ["예요", "ye-yo", "是"],
    ["과정에", "gwa-jeong-e", "進入課程"], ["들어가지", "deu-reo-ga-ji", "進入（接續）"], ["않았어요", "a-na-sseo-yo", "沒有…"],
    ["왜", "wae", "為什麼"], ["한국어를", "han-gu-geo-reul", "韓語（受詞）"], ["일을", "i-reul", "工作（受詞）"],
    ["으려고", "eu-ryeo-go", "為了／打算（接續語尾）"],
    ["오늘", "o-neul", "今天"], ["저녁", "jeo-nyeok", "晚上"], ["시간", "si-gan", "時間"], ["있어요", "i-sseo-yo", "有"],
    ["헬스장에서", "hel-sseu-jang-e-seo", "在健身房"], ["같이", "ga-chi", "一起"], ["운동해요", "un-dong-hae-yo", "運動"],
    ["미안해요", "mi-an-hae-yo", "對不起"], ["발이", "ba-ri", "腳（主格）"], ["아파요", "a-pa-yo", "痛"],
    ["그래서", "geu-rae-seo", "所以"], ["오늘은", "o-neu-reun", "今天（主題）"], ["헬스장에", "hel-sseu-jang-e", "去健身房"],
    ["가지", "ga-ji", "去（接續）"], ["못해요", "mo-tae-yo", "不能"], ["학교에", "hak-kkyo-e", "去學校"],
    ["안", "an", "不"], ["못", "mot", "不能"], ["공부하지", "gong-bu-ha-ji", "學習（接續）"],
    ["않습니다", "an-sseum-ni-da", "不（正式）"], ["저는", "jeo-neun", "我（主題）"], ["밖에서", "ba-kke-seo", "在外面"],
    ["먹지", "meok-jji", "吃（接續）"], ["않아요", "a-na-yo", "不"], ["내일", "nae-il", "明天"],
    ["운동하지", "un-dong-ha-ji", "運動（接續）"], ["이", "i", "這"], ["집은", "ji-beun", "房子（主題）"],
    ["좋지", "jo-chi", "好（接續）"], ["미국에서", "mi-gu-ge-seo", "在美國"], ["못합니다", "mo-tam-ni-da", "不能（正式）"],
    ["집에", "ji-be", "在家／回家"], ["고향에", "go-hyang-e", "回故鄉"], ["얼굴이", "eol-gu-ri", "臉（主格）"],
    ["예쁘지", "ye-ppeu-ji", "漂亮（接續）"], ["어디에서", "eo-di-e-seo", "在哪裡"], ["테니스를", "te-ni-seu-reul", "網球（受詞）"],
    ["쳐요", "chyeo-yo", "打"], ["탁구를", "tak-kku-reul", "桌球（受詞）"], ["자주", "ja-ju", "經常"],
    ["아버지하고", "a-beo-ji-ha-go", "和父親"], ["무슨", "mu-seun", "什麼樣的"], ["운동을", "un-dong-eul", "運動（受詞）"],
    ["좋아해요", "jo-a-hae-yo", "喜歡"], ["어디에서", "eo-di-e-seo", "在哪裡"], ["학교에서요", "hak-kkyo-e-seo-yo", "在學校"],
    ["수영을", "su-yeong-eul", "游泳（受詞）"], ["합니까", "ham-ni-kka", "做嗎"], ["축구를", "chuk-kku-reul", "足球（受詞）"],
    ["김치를", "gim-chi-reul", "泡菜（受詞）"], ["먹습니까", "meok-sseum-ni-kka", "吃嗎"],
    ["신문을", "sin-mu-neul", "報紙（受詞）"], ["읽습니까", "ik-sseum-ni-kka", "讀嗎"],
  ], "expression"),
];
const byText = new Map(lexicon.map((entry) => [entry.text, entry]));
function line(speaker, ko, zh, spokenKo) {
  const tokens = (ko.match(/[가-힣]+/gu) ?? []).map((text) => {
    if (!byText.has(text)) throw new Error(`Missing reviewed mid-November token: ${text}`);
    return byText.get(text);
  });
  return { speaker, ko, zh, tokens, ...(spokenKo ? { spokenKo } : {}) };
}
const blank = () => line("B", "__________", "請依自己的情況回答。");

const lesson1116 = {
  id: "b1-31", label: "初級1-31", titleKo: "내년 한국에 유학하려고 해요.", titleZh: "打算明年去韓國留學。",
  theme: "目的 -(으)려고、打算 -(으)려고 하다 與學位課程", heroEmoji: "🎓", sourcePdf: "docs/lessons/new/1116.pdf",
  dialogues: [
    { title: "本課對話：打算去韓國留學", lines: [
      line("민준", "한국 갔어요?", "去了韓國了嗎？"),
      line("관우", "네. 갔어요. 그렇지만 시간이 부족해서 학교 구경을 못했어요.", "是，去了。但是時間不夠，沒參觀到學校。"),
      line("민준", "학교 구경이요? 왜요?", "參觀學校？為何？"),
      line("관우", "아..사실은 내년 한국에 유학하려고 해요.", "啊…事實上明年打算去韓國留學。"),
      line("민준", "그래요? 뭘 공부해요?", "是嗎？讀什麼呢？"),
      line("관우", "한국에서 디자인을 공부하려고 해요.", "打算在韓國讀設計。"),
    ] },
    { title: "講義例句：目的與打算", lines: [
      line("示例", "밥을 먹으려고 식당에 가요.", "為了吃飯而去餐廳。"),
      line("示例", "운동하려고 공원에 갔어요.", "為了運動而去了公園。"),
      line("示例", "친구를 만나려고 화장했어요.", "為了見朋友而化妝了。"),
      line("示例", "태국 회사에서 일하려고 태국어를 배워요.", "為了在泰國公司工作而學泰語。"),
      line("示例", "밥을 먹으려고 해요.", "打算吃飯。"),
      line("示例", "운동하려고 해요.", "打算運動。"),
      line("示例", "친구를 만나려고 해요.", "打算見朋友。"),
      line("示例", "태국 회사에서 일하려고 합니다.", "打算在泰國公司工作。"),
    ] },
    { title: "學位課程練習（保留留白）", lines: [
      line("提示", "친구의 5살 딸이 __________ 에 다닙니다.", "朋友五歲的女兒就讀……（請選擇學校）。", "친구의 다섯 살 딸이 __________ 에 다닙니다."),
      line("提示", "대학교 졸업한 후에 __________ 에 가려고 합니다. 계속 공부하고 싶습니다.", "大學畢業後打算去……，想繼續讀書。"),
      line("提示", "여동생은 15살입니다. 지금 __________ 다닙니다.", "妹妹十五歲，現在就讀……（請填空）。", "여동생은 열다섯 살입니다. 지금 __________ 다닙니다."),
      line("A", "대학교 졸업하면 뭐해요?", "大學畢業後要做什麼？"), blank(),
      line("A", "그 사람은 박사예요?", "那個人是博士嗎？"),
      line("B", "아니요, __________ 예요. 박사 과정에 들어가지 않았어요.", "不是，是……，沒有進入博士課程。"),
    ] },
    { title: "換你說說看（保留留白）", lines: [
      line("A", "왜 한국에 가요?", "為什麼去韓國？"), line("B", "__________ 으려고 __________", "請用目的加行動的句型完成回答。"),
      line("A", "왜 한국어를 배워요?", "為什麼學韓語？"), line("B", "__________ 으려고 __________", "請用目的加行動的句型完成回答。"),
      line("A", "왜 일을 해요?", "為什麼工作？"), line("B", "__________ 으려고 __________", "請以「돈을 벌다（賺錢）」作為目的完成回答。"),
    ] },
  ],
  vocabulary: vocabulary1116,
  guide: {
    label: "-(으)려고／-(으)려고 하다", title: "連接目的與行動，說出自己的打算",
    hint: "-(으)려고 放在句中連接目的與行動；-(으)려고 하다 放在句尾表達打算。",
    sections: [
      { heading: "第 4 頁：句中的目的連接語尾", words: purposeForms },
      { heading: "第 7 頁：句尾的打算", words: intentionForms },
      { heading: "第 10 頁：學位與課程", words: education },
    ],
    practice: {
      heading: "講義練習", hint: "僅列出講義已印出的詞形範例，配對題與個人回答保留留白。", valueSuffix: "",
      items: [{ value: "第 4 頁：먹다 + 으려고", answer: purposeForms[0] }],
      prompts: [
        { page: "第 6 頁", ko: "결혼하다 / 집을 사다 / 태국에 유학하다 / 신발을 사다 / 테니스를 배우다 + 태국어를 열심히 배워요. / 백화점에 갔어요. / 친구하고 운동장에 갔어요. / 돈을 모아요. / 부동산중개소에 갔어요.", zh: "請配對，以 -(으)려고 連成目的與行動的句子。" },
        { page: "第 9 頁", ko: "내년 8월에 한국에 가다 / 다음 주 타이베이 101에서 친구를 만나다 / 야시장에서 버블티를 팔다 / 서울대학교에서 공부하다 / 매일 한국 신문을 읽다", zh: "請加上 -(으)려고 하다，並搭配適當語尾完成句子。" },
        { page: "第 11 頁", ko: "친구의 5살 딸이 __________ 에 다닙니다. / 대학교 졸업한 후에 __________ 에 가려고 합니다. / 여동생은 15살입니다. 지금 __________ 다닙니다. / 대학교 졸업하면 뭐해요? / 그 사람은 박사예요?", zh: "運用學位課程單字填空，其餘回答保留開放。" },
        { page: "第 13 頁", ko: "왜 한국에 가요? / 왜 한국어를 배워요? / 왜 일을 해요?", zh: "請使用目的連接句型回答；最後一題提示 돈을 벌다。" },
      ],
    },
    sourceNotes: [
      { heading: "來源規則（第 3-8 頁）", lines: [
        "語幹有尾音接 으려고，無尾音接 려고。講義另印出 살다 → 살려고；ㄹ 尾音直接接 려고。",
        "目的 + (으)려고 + 行動：前半是目的，後半是為了達成目的所做的動作。",
        "(으)려고 하다 用於句尾，只表達打算，省略後方為達目的所做的動作。",
      ] },
      { heading: "補充譯文與發音", lines: [
        "主對話的中文依第 16 頁附錄整理；例句、詞形表和練習的中文提示為整理時補上。",
        "第 11 頁的 5살、15살 保留顯示，錄音分別念 다섯 살、열다섯 살。第 12 頁單字框將 -요 註為「表尊敬的助詞」，詞彙保留原註。",
      ] },
    ],
    references: [{ heading: "附錄：對話翻譯（第 16 頁）", entries: [
      { label: "敏俊", text: "去了韓國了嗎？" }, { label: "冠宇", text: "是，去了。但是時間不夠，沒參觀到學校。" },
      { label: "敏俊", text: "參觀學校？為何？" }, { label: "冠宇", text: "啊…事實上明年打算去韓國留學。" },
      { label: "敏俊", text: "是嗎？讀什麼呢？" }, { label: "冠宇", text: "打算在韓國讀設計。" },
    ] }],
  },
};

const lesson1118 = {
  id: "b1-32", label: "初級1-32", titleKo: "오늘은 헬스장에 가지 못해요.", titleZh: "今天無法去健身房。",
  theme: "長形否定 -지 않다／-지 못하다 與運動場所", heroEmoji: "🏋️", sourcePdf: "docs/lessons/new/1118.pdf",
  dialogues: [
    { title: "本課對話：今天無法去健身房", lines: [
      line("관우", "오늘 저녁 시간 있어요?", "今天晚上有時間嗎？"), line("민준", "네, 있어요.", "是的，有。"),
      line("관우", "헬스장에서 같이 운동해요?", "要在健身房一起運動嗎？"),
      line("민준", "미안해요. 발이 아파요. 그래서 오늘은 헬스장에 가지 못해요.", "抱歉，我腳痛。所以今天不能去健身房。"),
    ] },
    { title: "講義例句：短形與長形否定", lines: [
      line("示例", "학교에 안 가요.", "不去學校。"), line("示例", "학교에 못 가요.", "無法去學校。"),
      line("示例", "공부하지 않습니다.", "不學習。"),
      line("示例", "저는 밖에서 밥을 먹지 않아요.", "我不在外面吃飯。"),
      line("示例", "내일 학교에 가지 않습니다.", "明天不去學校。"),
      line("示例", "헬스장에서 운동하지 않습니다.", "不在健身房運動。"),
      line("示例", "이 집은 좋지 않습니다.", "這房子不好。"),
      line("示例", "미국에서 공부하지 못합니다.", "無法在美國學習。"),
      line("示例", "집에 밥을 먹지 못해요.", "無法在家吃飯（原文地點助詞見來源註記）。"),
      line("示例", "고향에 가지 못해요.", "無法回故鄉。"),
      line("示例", "얼굴이 예쁘지 못해요.", "臉不夠漂亮。"),
    ] },
    { title: "運動與場所練習（保留留白）", lines: [
      line("A", "어디에서 테니스를 쳐요?", "在哪裡打網球？"), blank(),
      line("A", "탁구를 자주 쳐요?", "常打桌球嗎？"),
      line("B", "네, 집에 __________ 있어요. 아버지하고 자주 쳐요.", "是，家裡有……，經常和父親一起打。"),
      line("A", "무슨 운동을 좋아해요?", "喜歡什麼運動？"), line("B", "저는 __________", "我……（請自行回答）。"),
      line("A", "어디에서 운동해요?", "在哪裡運動？"), line("B", "학교에서요. 학교에 __________ 있어요.", "在學校，學校有……（請填入場所）。"),
    ] },
    { title: "換你說說看（保留留白）", lines: [
      line("A", "오늘 수영을 합니까?", "今天游泳嗎？"), line("B", "아니요, __________", "不，請以長形否定完成回答。"),
      line("A", "내일 축구를 합니까?", "明天踢足球嗎？"), line("B", "아니요, __________", "不，請以長形否定完成回答。"),
      line("A", "김치를 먹습니까?", "吃泡菜嗎？"), line("B", "아니요, __________", "不，請以長形否定完成回答。"),
      line("A", "태국어를 합니까?", "會說泰語嗎？"), line("B", "아니요, __________", "不，請以長形否定完成回答。"),
      line("A", "한국 신문을 읽습니까?", "讀韓國報紙嗎？"), line("B", "아니요, __________", "不，請以長形否定完成回答。"),
    ] },
  ],
  vocabulary: vocabulary1118,
  guide: {
    label: "-지 않다／-지 못하다", title: "區分不做與無法做到，練習長形否定",
    hint: "兩種長形否定都直接加在語幹後方；再讓 않다／못하다 搭配句尾語尾。",
    sections: [
      { heading: "第 5 頁：-지 않다 的變化", words: negativeForms },
      { heading: "第 8 頁：-지 못하다 的變化", words: inabilityForms },
      { heading: "第 11 頁：運動與相關場所", words: sports },
    ],
    practice: {
      heading: "講義練習", hint: "詞形範例採講義原文，留白練習不預填答案。", valueSuffix: "",
      items: [
        { value: "第 5 頁：받다 + 지 않다", answer: negativeForms[0] },
        { value: "第 8 頁：신다 + 지 못하다", answer: inabilityForms[0] },
      ],
      prompts: [
        { page: "第 7 頁", ko: "저는 결혼하다 / 대만에서 집을 사다 / 미국에서 유학하다 / 백화점에서 옷을 사다 / 컴퓨터로 게임을 하다 / 그 남자가 좋다 / 여동생이 똑똑하다", zh: "請加上 -지 않다，並搭配適當語尾完成句子。" },
        { page: "第 10 頁", ko: "저는 결혼하다 / 대만에서 집을 사다 / 태국에서 유학하다 / 운전면허증이 없으면 운전하다 / 돈이 없으면 자동차를 사다 / 여동생이 똑똑하다", zh: "請加上 -지 못하다，並搭配適當語尾完成句子。" },
        { page: "第 12 頁", ko: "어디에서 테니스를 쳐요? / 탁구를 자주 쳐요? / 무슨 운동을 좋아해요? / 어디에서 운동해요?", zh: "您是 B，運用運動和場所詞彙完成回答。" },
        { page: "第 14 頁", ko: "오늘 수영을 합니까? / 내일 축구를 합니까? / 김치를 먹습니까? / 태국어를 합니까? / 한국 신문을 읽습니까?", zh: "您是 B，依自己的情況選擇長形否定回答。" },
      ],
    },
    sourceNotes: [
      { heading: "來源規則（第 3-9 頁）", lines: [
        "短形否定在動詞或形容詞前加 안 或 못；本課長形否定是在語幹後加 -지 않다 或 -지 못하다，不受語幹有無尾音影響。",
        "講義以 -지 않다 表達意志（或狀態）的否定，以 -지 못하다 表達能力（或狀態）的否定。形容詞加 -지 못하다 時表示不足、未達某種狀態。",
      ] },
      { heading: "來源文字與補充譯文", lines: [
        "第 9 頁左側題目印作 집에서 밥을 먹다，右側完成句卻印作 집에 밥을 먹지 못해요。例句保留右側原文；此處的動作地點通常應使用 집에서。",
        "主對話中文依第 17 頁附錄整理；例句、詞形表和練習提示的中文為整理時補上。",
      ] },
    ],
    references: [{ heading: "附錄：對話翻譯（第 17 頁）", entries: [
      { label: "冠宇", text: "今天晚上有時間嗎？" }, { label: "敏俊", text: "是的，有。" },
      { label: "冠宇", text: "要在健身房一起運動嗎？" }, { label: "敏俊", text: "抱歉，我腳痛。所以今天不能去健身房。" },
    ] }],
  },
};

export const midNovemberLessons = [lesson1116, lesson1118];
