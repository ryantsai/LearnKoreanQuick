// Source-grounded text from the complete October 8 handout.
// The original PDF and source images stay outside this public repository.
import { decomposeHangulWord } from "../utils/hangul.js";

function word(text, roman, zh, partOfSpeech = "noun") {
  return { text, roman, zh, partOfSpeech, syllables: decomposeHangulWord(text, roman) };
}
const w = word;
const lexicon = [
  w("오늘", "o-neul", "今天"), w("저녁에", "jeo-nyeo-ge", "在晚上", "expression"),
  w("시간이", "si-ga-ni", "時間（主格）", "expression"), w("있으면", "i-sseu-myeon", "如果有", "predicate"),
  w("같이", "ga-chi", "一起", "expression"), w("커피를", "keo-pi-reul", "咖啡（受詞）", "expression"),
  w("마셔요", "ma-syeo-yo", "喝", "predicate"), w("미안해요", "mi-an-hae-yo", "對不起", "predicate"),
  w("퇴근한", "toe-geun-han", "下班後（連接形）", "predicate"), w("후에", "hu-e", "之後", "expression"),
  w("일이", "i-ri", "事情（主格）", "expression"), w("있어요", "i-sseo-yo", "有", "predicate"),
  w("그래요", "geu-rae-yo", "是這樣／好的", "predicate"), w("그럼", "geu-reom", "那麼", "expression"),
  w("나중에", "na-jung-e", "下次／之後", "expression"), w("회사", "hoe-sa", "公司"),
  w("근처에", "geun-cheo-e", "在附近", "expression"), w("예쁜", "ye-ppeun", "漂亮的", "predicate"),
  w("커피숍이", "keo-pi-syo-bi", "咖啡店（主格）", "expression"), w("다음에", "da-eu-me", "下次", "expression"),
  w("거기로", "geo-gi-ro", "往那裡", "expression"), w("가요", "ga-yo", "去", "predicate"),
  w("약을", "ya-geul", "藥（受詞）", "expression"), w("먹은", "meo-geun", "吃了之後（連接形）", "predicate"),
  w("출근해요", "chul-geun-hae-yo", "去上班", "predicate"), w("운동한", "un-dong-han", "運動後（連接形）", "predicate"),
  w("자요", "ja-yo", "睡覺", "predicate"), w("밥을", "ba-beul", "飯（受詞）", "expression"),
  w("먹어요", "meo-geo-yo", "吃", "predicate"),
  w("집에", "ji-be", "回家／在家", "expression"), w("요리를", "yo-ri-reul", "料理（受詞）", "expression"),
  w("만든", "man-deun", "做好後（連接形）", "predicate"), w("샤워해요", "sya-wo-hae-yo", "洗澡", "predicate"),
  w("영화가", "yeong-hwa-ga", "電影（主格）", "expression"),
  w("재미있으면", "jae-mi-i-sseu-myeon", "如果有趣", "predicate"), w("기분이", "gi-bu-ni", "心情（主格）", "expression"),
  w("좋아요", "jo-a-yo", "好", "predicate"), w("날씨가", "nal-ssi-ga", "天氣（主格）", "expression"),
  w("나쁘면", "na-ppeu-myeon", "如果不好", "predicate"), w("밖에", "ba-kke", "外面", "expression"),
  w("안", "an", "不", "expression"), w("나가요", "na-ga-yo", "出去", "predicate"),
  w("친구하고", "chin-gu-ha-go", "和朋友", "expression"), w("놀면", "nol-myeon", "如果玩", "predicate"),
  w("재미있어요", "jae-mi-i-sseo-yo", "有趣", "predicate"),
  w("휴일에는", "hyu-i-re-neun", "休假時", "expression"), w("보통", "bo-tong", "通常", "expression"),
  w("뭘", "mwol", "什麼（受詞）", "expression"), w("해요", "hae-yo", "做", "predicate"),
  w("언제", "eon-je", "何時", "expression"), w("한국어를", "han-gu-geo-reul", "韓文（受詞）", "expression"),
  w("공부해요", "gong-bu-hae-yo", "學習", "predicate"), w("친구를", "chin-gu-reul", "朋友（受詞）", "expression"),
  w("만나면", "man-na-myeon", "如果見面", "predicate"),
];
const byText = new Map(lexicon.map((entry) => [entry.text, entry]));
function line(speaker, ko, zh) {
  const tokens = (ko.match(/[가-힣]+/gu) ?? []).map((text) => {
    if (!byText.has(text)) throw new Error(`Review missing token: ${text}`);
    return byText.get(text);
  });
  return { speaker, ko, zh, tokens };
}
const vocabulary = [
  w("아침", "a-chim", "早餐"), w("아점", "a-jeom", "早午餐"), w("브런치", "beu-reon-chi", "早午餐"),
  w("점심", "jeom-sim", "午餐"), w("저녁", "jeo-nyeok", "晚餐"), w("야식", "ya-sik", "宵夜"),
  w("간식", "gan-sik", "零食"), w("죽", "juk", "粥"), w("도시락", "do-si-rak", "便當"),
  w("컵라면", "keom-na-myeon", "杯麵"), w("약", "yak", "藥"),
  w("출근하다", "chul-geun-ha-da", "上班", "predicate"), w("퇴근하다", "toe-geun-ha-da", "下班", "predicate"),
  w("양명산", "yang-myeong-san", "陽明山"), w("나중에", "na-jung-e", "下次／之後", "expression"),
  w("예쁘다", "ye-ppeu-da", "漂亮", "predicate"), w("기분", "gi-bun", "心情"),
  w("나쁘다", "na-ppeu-da", "不好", "predicate"), w("읽다", "ik-tta", "讀", "predicate"),
  w("입다", "ip-tta", "穿", "predicate"), w("마시다", "ma-si-da", "喝", "predicate"),
  w("공부하다", "gong-bu-ha-da", "學習", "predicate"), w("만들다", "man-deul-da", "製作", "predicate"),
  w("사다", "sa-da", "買", "predicate"), w("살다", "sal-da", "住／生活", "predicate"),
  w("좋다", "jo-ta", "好", "predicate"),
];

const lesson = {
  id: "b1-22", label: "初級1-22",
  titleKo: "시간이 있으면 같이 커피를 마셔요.", titleZh: "有時間的話一起喝咖啡吧。",
  theme: "先後動作、條件句與餐點", heroEmoji: "☕",
  sourcePdf: "docs/lessons/new/20261008.pdf",
  dialogues: [
    { title: "本課對話：有時間的話一起喝咖啡吧", lines: [
      line("관우", "오늘 저녁에 시간이 있으면 같이 커피를 마셔요.", "今天晚上有時間的話，一起喝咖啡吧。"),
      line("민준", "미안해요. 퇴근한 후에 일이 있어요.", "對不起，下班之後有事。"),
      line("관우", "그래요? 그럼 나중에 같이 마셔요.", "是嗎？那麼下次一起喝吧。"),
      line("민준", "그래요. 회사 근처에 예쁜 커피숍이 있어요. 다음에 거기로 가요.", "好的，公司附近有漂亮的咖啡店，下次去那裡吧。"),
    ] },
    { title: "講義固定例句：先後動作與條件", lines: [
      line("示例", "약을 먹은 후에 출근해요.", "吃完藥後去上班。"),
      line("示例", "운동한 후에 자요.", "運動之後睡覺。"),
      line("示例", "밥을 먹은 후에 집에 가요.", "吃完飯之後回家。"),
      line("示例", "요리를 만든 후에 샤워해요.", "做好料理之後洗澡。"),
      line("示例", "시간이 있으면 밥을 같이 먹어요.", "有時間的話，一起吃飯吧。"),
      line("示例", "영화가 재미있으면 기분이 좋아요.", "電影有趣的話，心情就好。"),
      line("示例", "날씨가 나쁘면 밖에 안 나가요.", "天氣不好的話，就不出去。"),
      line("示例", "친구하고 같이 놀면 재미있어요.", "和朋友一起玩的話很有趣。"),
    ] },
    { title: "換你說說看（保留留白）", lines: [
      line("A", "휴일에는 보통 뭘 해요?", "休假時通常做什麼？"),
      line("B", "__________", "請自行使用 -(으)면 或 -(으)ㄴ 후에 回答。"),
      line("A", "보통 언제 한국어를 공부해요?", "通常何時學習韓文？"),
      line("B", "__________", "請自行使用 -(으)면 或 -(으)ㄴ 후에 回答。"),
      line("A", "친구를 만나면 보통 뭘 해요?", "和朋友見面的話，通常做什麼？"),
      line("B", "__________", "請自行使用 -(으)면 或 -(으)ㄴ 후에 回答。"),
    ] },
  ],
  vocabulary,
  guide: {
    label: "先後動作與條件句", title: "-(으)ㄴ 후에 與 -(으)면",
    hint: "使用講義中已印出的變化與例句；留白練習保留為開放式題目。",
    sections: [
      { heading: "第 3 頁：動詞 + -(으)ㄴ 후에", words: [
        w("읽은 후에", "il-geun- -hu-e", "讀了之後", "expression"),
        w("입은 후에", "i-beun- -hu-e", "穿了之後", "expression"),
        w("마신 후에", "ma-sin- -hu-e", "喝了之後", "expression"),
        w("공부한 후에", "gong-bu-han- -hu-e", "學習之後", "expression"),
        w("만든 후에", "man-deun- -hu-e", "做好之後", "expression"),
      ] },
      { heading: "第 7 頁：A/V + -(으)면", words: [
        w("읽으면", "il-geu-myeon", "如果讀", "predicate"), w("입으면", "i-beu-myeon", "如果穿", "predicate"),
        w("좋으면", "jo-eu-myeon", "如果好", "predicate"), w("사면", "sa-myeon", "如果買", "predicate"),
        w("공부하면", "gong-bu-ha-myeon", "如果學習", "predicate"), w("살면", "sal-myeon", "如果住", "predicate"),
      ] },
      { heading: "第 12 頁：餐點", words: vocabulary.slice(0, 10) },
    ],
    practice: {
      heading: "講義留白練習", hint: "只提供原講義已完成的範例，不代填未印出的答案。",
      valueSuffix: "", items: [
        { value: "第 4 頁：학교에 가다", answer: w("학교에 간 후에", "hak-kkyo-e- -gan- -hu-e", "去學校之後", "expression") },
      ],
      prompts: [
        { page: "第 4 頁", ko: "밥을 먹다 / 친구를 만나다 / 커피를 마시다 / 책을 읽다 / 요리를 만들다 → ______ 후에", zh: "請配合正確的 -(으)ㄴ 후에 型態。" },
        { page: "第 6 頁", ko: "공부하다 / 운동하다 / 밥을 먹다 / 문자를 보내다 / 책을 읽다 / 쇼핑하다 → ______；집에 가다 / 답장을 받다 / 친구를 만나다 / 커피를 마시다 / 운동하다 / 약을 먹다", zh: "請使用 -(으)ㄴ 후에，將前後動作連成一句。답장을 받다 表示收到回覆。" },
        { page: "第 8 頁", ko: "일이 있다 / 답장을 받다 / 시간이 없다 / 피곤하다 / 비가 오다 / 같이 놀다 → ______", zh: "請使用 -(으)면 形成假設語氣。" },
        { page: "第 10 頁", ko: "친구를 만나다 / 날씨가 좋다 / 안 자다 / 시간이 있다 / 쇼핑을 못 하다 → ______；운동하다 / 피곤하다 / 기분이 좋다 / 영화를 보다 / 기분이 안 좋다", zh: "請使用 -(으)면，將前半的條件與後半的內容連成一句。" },
        { page: "第 11 頁", ko: "한국어를 공부한 후에 뭘 해요? / 휴일에는 보통 뭘 해요? / 언제 친구를 만나요?", zh: "請依講義指示練習回答；原講義答案為留白。" },
      ],
    },
    sourceNotes: [
      { heading: "來源規則（第 3、7 頁）", lines: [
        "-(으)ㄴ 후에 表示動作先後；有尾音加 은，沒有尾音加 ㄴ，ㄹ 尾音先去掉 ㄹ 再加 ㄴ。",
        "-(으)면 表示條件；有尾音加 으면，沒有尾音或 ㄹ 尾音加 면。",
        "講義以 좋으면、좋아요 示範母音開始語尾前的 ㅎ 脫落。",
      ] },
      { heading: "對話翻譯差異（第 13、17 頁）", lines: [
        "韓文原句寫 퇴근한 후에 일이 있어요（下班之後有事），中文附錄具體譯成下班後要去陽明山；本課顯示韓文直譯並保留此差異說明。",
      ] },
    ],
    references: [{ heading: "附錄：對話翻譯（第 17 頁）", entries: [
      { label: "冠宇", text: "今天晚上有時間的話，一起喝咖啡吧。" },
      { label: "敏俊", text: "抱歉，下班之後要去陽明山。" },
      { label: "冠宇", text: "是嗎？那麼，下次一起喝吧。" },
      { label: "敏俊", text: "好的，公司附近有漂亮的咖啡店，下次去那裡吧。" },
    ] }],
  },
};

export const octoberLessons = [lesson];
