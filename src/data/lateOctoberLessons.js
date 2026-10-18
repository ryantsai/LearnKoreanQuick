// Source-grounded text from the October 19 and October 21 handouts.
// The original PDFs and source images stay outside this public repository.
import { decomposeHangulWord } from "../utils/hangul.js";

function word(text, roman, zh, partOfSpeech = "noun") {
  return { text, roman, zh, partOfSpeech, syllables: decomposeHangulWord(text, roman) };
}
const w = word;

const activityVerbs = [
  w("사귀다", "sa-gwi-da", "交往", "predicate"),
  w("결혼하다", "gyeol-hon-ha-da", "結婚", "predicate"),
  w("배드민턴을 치다", "bae-deu-min-teon-eul- -chi-da", "打羽毛球", "predicate"),
  w("탁구를 치다", "tak-kku-reul- -chi-da", "打乒乓球", "predicate"),
  w("당구를 치다", "dang-gu-reul- -chi-da", "打撞球", "predicate"),
  w("자전거를 타다", "ja-jeon-geo-reul- -ta-da", "騎腳踏車", "predicate"),
  w("등산하다", "deung-san-ha-da", "登山", "predicate"),
  w("이야기하다", "i-ya-gi-ha-da", "談話、聊天", "predicate"),
  w("사진을 찍다", "sa-jin-eul- -jjik-tta", "照相", "predicate"),
  w("구경하다", "gu-gyeong-ha-da", "參觀、逛逛", "predicate"),
];
const proposalQuestions = [
  w("공부할까요", "gong-bu-hal-kka-yo", "要一起學習嗎", "predicate"),
  w("학교에 갈까요", "hak-kkyo-e- -gal-kka-yo", "要一起去學校嗎", "expression"),
  w("밥을 먹을까요", "ba-beul- -meo-geul-kka-yo", "要一起吃飯嗎", "expression"),
];
const proposalStatements = [
  w("공부합시다", "gong-bu-hap-ssi-da", "一起學習吧", "predicate"),
  w("학교에 갑시다", "hak-kkyo-e- -gap-ssi-da", "一起去學校吧", "expression"),
  w("밥을 먹읍시다", "ba-beul- -meo-geup-ssi-da", "一起吃飯吧", "expression"),
];
const vocabulary1019 = [
  w("치킨을 시키다", "chi-kin-eul- -si-ki-da", "點炸雞", "predicate"),
  w("한잔하다", "han-jan-ha-da", "喝一杯", "predicate"),
  w("태권도", "tae-kkwon-do", "跆拳道"),
  w("청소하다", "cheong-so-ha-da", "打掃", "predicate"),
  w("바닥을 닦다", "ba-da-geul- -ttak-tta", "擦地板", "predicate"),
  w("테니스를 치다", "te-ni-seu-reul- -chi-da", "打網球", "predicate"),
  w("축구하다", "chuk-kku-ha-da", "踢足球", "predicate"),
  w("농구하다", "nong-gu-ha-da", "打籃球", "predicate"),
  ...activityVerbs,
  w("아직", "a-jik", "還", "expression"),
  w("몰라요", "mol-la-yo", "不知道", "predicate"),
  w("공포 영화", "gong-po- -yeong-hwa", "恐怖電影"),
];

const minutes = [
  w("일 분", "il- -bun", "一分鐘"), w("이 분", "i- -bun", "兩分鐘"),
  w("삼 분", "sam- -bun", "三分鐘"), w("십 분", "sip- -ppun", "十分鐘"),
  w("오십 분", "o-sip- -ppun", "五十分鐘"), w("오십구 분", "o-sip-kku- -bun", "五十九分鐘"),
];
const hours = [
  w("한 시간", "han- -si-gan", "一小時"), w("두 시간", "du- -si-gan", "兩小時"),
  w("세 시간", "se- -si-gan", "三小時"), w("네 시간", "ne- -si-gan", "四小時"),
  w("다섯 시간", "da-seot- -ssi-gan", "五小時"), w("여섯 시간", "yeo-seot- -ssi-gan", "六小時"),
  w("스무 시간", "seu-mu- -si-gan", "二十小時"), w("스물네 시간", "seu-mul-le- -si-gan", "二十四小時"),
];
const sinoDays = [
  w("일 일", "i- -ril", "一天"), w("이 일", "i- -il", "兩天"), w("삼 일", "sa- -mil", "三天"),
];
const nativeDays = [
  w("하루", "ha-ru", "一天"), w("이틀", "i-teul", "兩天"), w("사흘", "sa-heul", "三天"),
  w("나흘", "na-heul", "四天"), w("닷새", "dat-ssae", "五天"), w("엿새", "yeot-ssae", "六天"),
  w("이레", "i-re", "七天"), w("여드레", "yeo-deu-re", "八天"),
  w("아흐레", "a-heu-re", "九天"), w("열흘", "yeol-heul", "十天"),
];
const sinoMonths = [
  w("일 개월", "il- -gae-wol", "一個月"), w("이 개월", "i- -gae-wol", "兩個月"),
  w("삼 개월", "sam- -gae-wol", "三個月"),
];
const nativeMonths = [
  w("한 달", "han- -dal", "一個月"), w("두 달", "du- -dal", "兩個月"),
  w("세 달", "se- -dal", "三個月"), w("석 달", "seok- -ttal", "三個月（另一說法）"),
  w("네 달", "ne- -dal", "四個月"), w("넉 달", "neok- -ttal", "四個月（另一說法）"),
  w("다섯 달", "da-seot- -ttal", "五個月"), w("여섯 달", "yeo-seot- -ttal", "六個月"),
];
const vocabulary1021 = [
  w("이것", "i-geot", "這個", "expression"), w("다", "da", "全部", "expression"),
  w("하다", "ha-da", "做", "predicate"), w("쯤", "jjeum", "大約", "expression"),
  w("여기에서", "yeo-gi-e-seo", "從這裡", "expression"), w("비행 시간", "bi-haeng- -si-gan", "飛行時間"),
  w("배", "bae", "船"), w("보내다", "bo-nae-da", "寄送", "predicate"),
  w("많이", "ma-ni", "多地", "expression"), w("택시", "taek-ssi", "計程車"),
  w("길이 막히다", "gi-ri- -ma-ki-da", "塞車", "predicate"), w("정도", "jeong-do", "左右", "expression"),
];

const lexicon = [
  ...vocabulary1019, ...vocabulary1021,
  w("관우", "gwan-u", "冠宇"), w("씨", "ssi", "先生／小姐"),
  w("오늘", "o-neul", "今天", "expression"), w("퇴근한", "toe-geun-han", "下班了的", "predicate"),
  w("후에", "hu-e", "之後", "expression"), w("뭐", "mwo", "什麼", "expression"),
  w("해요", "hae-yo", "做", "predicate"), w("시간이", "si-gan-i", "時間（主格）", "expression"),
  w("있어요", "i-sseo-yo", "有／在", "predicate"), w("왜요", "wae-yo", "怎麼了", "expression"),
  w("시간", "si-gan", "時間"), w("있으면", "i-sseu-myeon", "如果有", "predicate"),
  w("같이", "ga-chi", "一起", "expression"), w("영화를", "yeong-hwa-reul", "電影（受詞）", "expression"),
  w("볼까요", "bol-kka-yo", "要一起看嗎", "predicate"), w("어떤", "eo-tteon", "哪種", "expression"),
  w("영화예요", "yeong-hwa-ye-yo", "是電影", "predicate"), w("공포", "gong-po", "恐怖"),
  w("괜찮아요", "gwaen-cha-na-yo", "可以／沒關係", "predicate"), w("네", "ne", "是／好的", "expression"),
  w("좋아요", "jo-a-yo", "好", "predicate"), w("좋아해요", "jo-a-hae-yo", "喜歡", "predicate"),
  w("공부할까요", "gong-bu-hal-kka-yo", "要一起學習嗎", "predicate"),
  w("학교에", "hak-kkyo-e", "去學校", "expression"), w("갈까요", "gal-kka-yo", "要一起去嗎", "predicate"),
  w("밥을", "ba-beul", "飯（受詞）", "expression"), w("먹을까요", "meo-geul-kka-yo", "要一起吃嗎", "predicate"),
  w("공부합시다", "gong-bu-hap-ssi-da", "一起學習吧", "predicate"),
  w("갑시다", "gap-ssi-da", "一起去吧", "predicate"), w("먹읍시다", "meo-geup-ssi-da", "一起吃吧", "predicate"),
  w("아니요", "a-ni-yo", "不", "expression"), w("전", "jeon", "我（主題）", "expression"),
  w("남자", "nam-ja", "男性"), w("친구가", "chin-gu-ga", "朋友（主格）", "expression"),
  w("지금요", "ji-geum-yo", "現在嗎", "expression"), w("무슨", "mu-seun", "什麼", "expression"),
  w("일이", "i-ri", "事情（主格）", "expression"), w("찍읍시다", "jji-geup-ssi-da", "一起拍吧", "predicate"),
  w("우리", "u-ri", "我們", "expression"), w("운동할까요", "un-dong-hal-kka-yo", "要一起運動嗎", "predicate"),
  w("그래요", "geu-rae-yo", "好／是的", "predicate"), w("커피를", "keo-pi-reul", "咖啡（受詞）", "expression"),
  w("마실까요", "ma-sil-kka-yo", "要一起喝嗎", "predicate"),
  w("내일", "nae-il", "明天"), w("나를", "na-reul", "我（受詞）", "expression"),
  w("지우펀", "ji-u-peon", "九份"), w("이", "i", "主格助詞", "expression"),
  w("어디", "eo-di", "哪裡", "expression"), w("지룽", "ji-rung", "基隆"),
  w("근처에", "geun-cheo-e", "在附近", "expression"), w("버스로", "beo-seu-ro", "搭公車", "expression"),
  w("가면", "ga-myeon", "如果去", "predicate"), w("얼마나", "eol-ma-na", "多久／多少", "expression"),
  w("걸려요", "geol-lyeo-yo", "花費（時間）", "predicate"), w("택시로", "taek-ssi-ro", "搭計程車", "expression"),
  w("가세요", "ga-se-yo", "請去", "predicate"), w("그럼", "geu-reom", "那麼", "expression"),
  w("길이", "gi-ri", "道路（主格）", "expression"), w("막히지", "ma-ki-ji", "堵塞（接否定）", "predicate"),
  w("않으면", "a-neu-myeon", "如果不", "predicate"), w("분", "bun", "分鐘"),
  w("한", "han", "一（數冠形）"), w("시간쯤", "si-gan-jjeum", "大約…小時", "expression"),
  w("걸립니다", "geol-lim-ni-da", "花費（時間，正式）", "predicate"),
  w("하루가", "ha-ru-ga", "一天（主格）", "expression"), w("가려면", "ga-ryeo-myeon", "要去的話", "predicate"),
  w("삼십", "sam-sip", "三十"), w("분이", "bun-i", "分鐘（主格）", "expression"),
  w("타이베이에", "ta-i-be-i-e", "去台北", "expression"),
  w("이것을", "i-geo-seul", "這個（受詞）", "expression"), w("하려면", "ha-ryeo-myeon", "要做的話", "predicate"),
  w("달쯤", "dal-jjeum", "大約…個月", "expression"),
  w("이틀이", "i-teu-ri", "兩天（主格）", "expression"), w("비행", "bi-haeng", "飛行"),
  w("두", "du", "二（數冠形）"), w("이십", "i-sip", "二十"),
  w("배로", "bae-ro", "用船", "expression"), w("보내면", "bo-nae-myeon", "如果寄送", "predicate"),
  w("달이", "da-ri", "月（主格）", "expression"), w("집까지", "jip-kka-ji", "到家", "expression"),
  w("비행기로", "bi-haeng-gi-ro", "搭飛機", "expression"), w("한국에", "han-gu-ge", "去韓國", "expression"),
  w("지하철역에", "ji-ha-cheol-lyeog-e", "去捷運站", "expression"),
  w("걸립니까", "geol-lim-ni-kka", "花費多久（正式疑問）", "predicate"),
  w("지룽에", "ji-rung-e", "去基隆", "expression"), w("지하철로", "ji-ha-cheol-lo", "搭捷運", "expression"),
  w("빌딩에", "bil-ding-e", "去大樓", "expression"), w("자전거로", "ja-jeon-geo-ro", "騎腳踏車", "expression"),
  w("타이난에", "ta-i-nan-e", "去台南", "expression"),
];
const byText = new Map(lexicon.map((entry) => [entry.text, entry]));
function line(speaker, ko, zh, spokenKo) {
  const tokens = (ko.match(/[가-힣]+/gu) ?? []).map((text) => {
    if (!byText.has(text)) throw new Error(`Review missing token: ${text}`);
    return byText.get(text);
  });
  return { speaker, ko, zh, tokens, ...(spokenKo ? { spokenKo } : {}) };
}

const lesson1019 = {
  id: "b1-25", label: "初級1-25",
  titleKo: "영화를 같이 볼까요?", titleZh: "一起看電影嗎？",
  theme: "提案的 -(으)ㄹ까요?／-(으)ㅂ시다與活動動詞", heroEmoji: "🎬",
  sourcePdf: "docs/lessons/new/1019.pdf",
  dialogues: [
    { title: "本課對話：一起看電影嗎", lines: [
      line("민준", "관우 씨, 오늘 퇴근한 후에 뭐 해요? 시간이 있어요?", "冠宇先生，今天下班後做什麼？有時間嗎？"),
      line("관우", "아직 몰라요. 왜요?", "還不知道，怎麼了？"),
      line("민준", "시간 있으면 같이 영화를 볼까요?", "有時間的話，要不要一起看電影？"),
      line("관우", "어떤 영화예요?", "哪種電影？"),
      line("민준", "공포 영화예요. 괜찮아요?", "恐怖電影，可以嗎？"),
      line("관우", "네, 좋아요. 공포 영화를 좋아해요.", "好的，我喜歡恐怖電影。"),
    ] },
    { title: "講義例句：提案的問句與回答", lines: [
      line("示例", "공부할까요?", "要一起學習嗎？"),
      line("示例", "학교에 갈까요?", "要一起去學校嗎？"),
      line("示例", "밥을 먹을까요?", "要一起吃飯嗎？"),
      line("示例", "공부합시다.", "一起學習吧。"),
      line("示例", "학교에 갑시다.", "一起去學校吧。"),
      line("示例", "밥을 먹읍시다.", "一起吃飯吧。"),
    ] },
    { title: "講義練習：依回答補提案（保留留白）", lines: [
      line("A", "__________", "請從講義活動動詞中選擇，補出提案問句。"),
      line("B", "아니요. 전 남자 친구가 있어요.", "不，我有男朋友。"),
      line("A", "__________", "請從講義活動動詞中選擇，補出提案問句。"),
      line("B", "지금요? 무슨 일이 있어요?", "現在嗎？有什麼事嗎？"),
      line("A", "__________", "請從講義活動動詞中選擇，補出提案問句。"),
      line("B", "네, 같이 찍읍시다.", "好，一起拍吧。"),
      line("A", "우리 운동할까요?", "我們一起運動嗎？"),
      line("B", "그래요. __________", "好，請使用講義活動動詞補出提案。"),
    ] },
    { title: "換你說說看（保留留白）", lines: [
      line("A", "시간이 있으면 같이 커피를 마실까요?", "有時間的話，要一起喝咖啡嗎？"),
      line("B", "__________", "請依自己的情況回答提案。"),
      line("A", "우리 내일 뭐 해요?", "我們明天做什麼？"),
      line("B", "__________", "請使用本課提案句型回答。"),
      line("A", "나를 좋아해요?", "你喜歡我嗎？"),
      line("B", "네, 좋아해요. 우리 __________", "是，喜歡。請補上「我們……」的提案。"),
    ] },
  ],
  vocabulary: vocabulary1019,
  guide: {
    label: "提案與活動動詞", title: "-(으)ㄹ까요?／-(으)ㅂ시다：一起做吧",
    hint: "學習提案問句與回答，再用活動動詞練習邀約；留白題目由你作答。",
    sections: [
      { heading: "第 4 頁：提案問句 -(으)ㄹ까요?", words: proposalQuestions },
      { heading: "第 6 頁：提案語尾 -(으)ㅂ시다", words: proposalStatements },
      { heading: "第 9 頁：相關動詞", words: activityVerbs },
    ],
    practice: {
      heading: "講義練習", hint: "第 8 頁保留已完成的吃晚餐範例，其餘題目保留留白。",
      valueSuffix: "", items: [
        { value: "第 8 頁：저녁을 먹다 → 提案問句", answer: w("저녁을 먹을까요", "jeo-nyeo-geul- -meo-geul-kka-yo", "要一起吃晚餐嗎", "expression") },
        { value: "第 8 頁：回答提案問句", answer: w("네, 저녁을 먹읍시다.", "ne-,- -jeo-nyeo-geul- -meo-geup-ssi-da-.", "好，一起吃晚餐吧", "expression") },
      ],
      prompts: [
        { page: "第 5 頁", ko: "불고기를 먹다 / 가방을 사다 / 야식을 사다 / 치킨을 시키다 / 한잔하다 / 태권도를 배우다 / 영화를 보다 → ______", zh: "請依有無尾音，選擇 -(으)ㄹ까요? 完成提案問句。" },
        { page: "第 7 頁", ko: "방을 청소하다 / 바닥을 닦다 / 테니스를 치다 / 커피를 마시다 / 식사하다 / 축구하다 / 농구하다 → ______", zh: "請依有無尾音，選擇 -(으)ㅂ시다 完成提案。" },
        { page: "第 8 頁", ko: "영화를 보다 / 야시장에 가다 / 도서관에서 공부하다 / 공원에서 운동하다 / 밖에서 산책하다 → ______", zh: "請仿照吃晚餐範例，使用本課兩個提案句型完成問答。" },
        { page: "第 10 頁", ko: "A: ______ / B: 아니요. 전 남자 친구가 있어요.　A: ______ / B: 지금요? 무슨 일이 있어요?　A: ______ / B: 네, 같이 찍읍시다.　A: 우리 운동할까요? / B: 그래요. ______", zh: "請運用第 9 頁活動動詞，依問答情境補出適當句子。" },
        { page: "第 12 頁", ko: "시간이 있으면 같이 커피를 마실까요? / 우리 내일 뭐 해요? / 나를 좋아해요?", zh: "您是 B，請回答 A 的提問，保留原講義未完成的答案。" },
      ],
    },
    sourceNotes: [
      { heading: "來源規則（第 3–4、6 頁）", lines: [
        "提案問句使用動詞語幹 + -(으)ㄹ까요?，表示「要不要一起～」；本課介紹的是提案用法。",
        "第 4 頁：語幹有尾音加 -을까요?，無尾音加 -ㄹ까요?；本課提案用法接動詞。",
        "-(으)ㅂ시다 表示「一起～吧」，也可回答提案問句；有尾音加 -읍시다，無尾音加 -ㅂ시다。",
        "講義提醒 -(으)ㅂ시다 雖屬格式體語尾，仍不適合對長輩、上司使用。",
      ] },
      { heading: "補充譯文（講義未印出）", lines: [
        "提案例句、第 8 頁完成範例及第 10、12 頁練習的中文譯文與作答提示為整理時補上；本課對話翻譯依第 15 頁附錄。",
      ] },
    ],
    references: [{ heading: "附錄：對話翻譯（第 15 頁）", entries: [
      { label: "敏俊", text: "冠宇先生，今天下班後做什麼？有時間嗎？" },
      { label: "冠宇", text: "還不知道，怎麼了？" },
      { label: "敏俊", text: "有時間的話，要不要一起看電影？" },
      { label: "冠宇", text: "哪種電影？" },
      { label: "敏俊", text: "恐怖電影，可以嗎？" },
      { label: "冠宇", text: "好的，我喜歡恐怖電影。" },
    ] }],
  },
};

const lesson1021 = {
  id: "b1-26", label: "初級1-26",
  titleKo: "버스로 가면 시간이 많이 걸려요.", titleZh: "坐公車去的話會花很多時間。",
  theme: "時間量與花費時間的 이／가 걸리다", heroEmoji: "🚌",
  sourcePdf: "docs/lessons/new/1021.pdf",
  dialogues: [
    { title: "本課對話：坐公車去要多久", lines: [
      line("민준", "관우 씨, 지우펀(九份)이 어디 있어요?", "冠宇先生，九份在哪裡？", "관우 씨, 지우펀이 어디 있어요?"),
      line("관우", "지룽(基隆) 근처에 있어요.", "在基隆附近。", "지룽 근처에 있어요."),
      line("민준", "버스로 가면 얼마나 걸려요?", "坐公車去要多久？"),
      line("관우", "버스로 가면 시간이 많이 걸려요. 택시로 가세요.", "坐公車要花很久時間，做計程車去。"),
      line("민준", "그럼 택시로 가면 얼마나 걸려요?", "那麼坐計程車要多久？"),
      line("관우", "길이 막히지 않으면 40 분 정도 걸려요.", "路上不塞的話，大概花四十分。", "길이 막히지 않으면 사십 분 정도 걸려요."),
    ] },
    { title: "講義例句：時間量與花多久", lines: [
      line("示例", "20분이 걸려요.", "花二十分鐘。", "이십 분이 걸려요."),
      line("示例", "한 시간이 걸립니다.", "花一小時。"),
      line("示例", "하루가 걸려요.", "花一天。"),
      line("A", "학교에 가려면 얼마나 걸려요?", "去學校要花多少時間？"),
      line("B", "삼십 분이 걸려요.", "花三十分。"),
      line("A", "타이베이에 가려면 얼마나 걸려요?", "去台北要花多少時間？"),
      line("B", "한 시간쯤 걸려요.", "花一小時。"),
      line("A", "이것을 다 하려면 시간이 얼마나 걸려요?", "做完這個要花多少時間？"),
      line("B", "한 달쯤 걸려요.", "花一個月。"),
      line("A", "여기에서 가려면 얼마나 걸려요?", "從這裡去要多久？"),
      line("B", "이틀이 걸려요.", "花兩天。"),
      line("A", "비행 시간이 얼마나 걸려요?", "飛行時間要花多久？"),
      line("B", "두 시간 이십 분이 걸려요.", "花兩小時二十分。"),
      line("A", "배로 보내면 얼마나 걸려요?", "用船運的話要多久？"),
      line("B", "두 달이 걸려요.", "花兩個月。"),
    ] },
    { title: "講義練習：花多久（保留留白）", lines: [
      line("A", "집까지 얼마나 걸려요?", "到家要多久？"),
      line("B", "__________", "請依自己的情況回答花費的時間。"),
      line("A", "비행기로 한국에 가려면 얼마나 걸려요?", "搭飛機去韓國要多久？"),
      line("B", "__________", "請依自己的情況回答花費的時間。"),
      line("A", "지하철역에 가려면 얼마나 걸립니까?", "去捷運站要多久？"),
      line("B", "__________", "請依自己的情況回答花費的時間。"),
    ] },
    { title: "換你說說看（保留留白）", lines: [
      line("A", "지룽에 가려면 얼마나 걸려요?", "去基隆要多久？"),
      line("B", "__________", "請依自己的情況回答花費的時間。"),
      line("A", "지하철로 101 빌딩에 가려면 얼마나 걸려요?", "搭捷運去 101 大樓要多久？", "지하철로 백일 빌딩에 가려면 얼마나 걸려요?"),
      line("B", "__________", "請依自己的情況回答花費的時間。"),
      line("A", "자전거로 타이난에 가려면 얼마나 걸려요?", "騎腳踏車去台南要多久？"),
      line("B", "__________", "請依自己的情況回答花費的時間。"),
    ] },
  ],
  vocabulary: vocabulary1021,
  guide: {
    label: "時間量與 걸리다", title: "分鐘、小時、天、月與 이／가 걸리다",
    hint: "先分清時間量使用哪套數詞，再以 이／가 걸리다 表示花費多少時間。",
    sections: [
      { heading: "第 3 頁：漢字數詞 + 분（分鐘）", words: minutes },
      { heading: "第 4 頁：純韓文數冠形詞 + 시간（小時）", words: hours },
      { heading: "第 5 頁：漢字數詞 + 일（天）", words: sinoDays },
      { heading: "第 5 頁：純韓文天數", words: nativeDays },
      { heading: "第 6 頁：漢字數詞 + 개월（月）", words: sinoMonths },
      { heading: "第 6 頁：純韓文數冠形詞 + 달（月）", words: nativeMonths },
    ],
    practice: {
      heading: "講義時間量練習", hint: "保留第 7 頁已印出的時間量範例，其餘空格請自行作答。",
      valueSuffix: "", items: [
        { value: "第 7 頁：一分鐘", answer: minutes[0] },
        { value: "第 7 頁：一小時", answer: hours[0] },
        { value: "第 7 頁：一天（漢字數詞）", answer: sinoDays[0] },
        { value: "第 7 頁：一天（純韓文）", answer: nativeDays[0] },
        { value: "第 7 頁：一個月（漢字數詞）", answer: sinoMonths[0] },
        { value: "第 7 頁：一個月（純韓文）", answer: nativeMonths[0] },
      ],
      prompts: [
        { page: "第 7 頁", ko: "兩分鐘／三分鐘／四分鐘 → ______　兩小時／三小時／四小時 → ______", zh: "請依範例，以正確數詞和單位說出時間量。" },
        { page: "第 7 頁", ko: "兩天／三天／四天／五天 → ______　하루 / ______ / ______ / 나흘 / 닷새", zh: "請分別練習漢字數詞與純韓文天數，保留講義原本已給的提示。" },
        { page: "第 7 頁", ko: "兩個月／三個月／四個月 → ______　한 달 / ______ / ______ / ______", zh: "請分別使用 개월 與 달 說出月份長度。" },
        { page: "第 7 頁", ko: "一小時三十分／兩小時四十分 → ______", zh: "請組合小時和分鐘兩種時間量。" },
        { page: "第 11 頁", ko: "집까지 얼마나 걸려요? / 비행기로 한국에 가려면 얼마나 걸려요? / 지하철역에 가려면 얼마나 걸립니까?", zh: "您是 B，請依自己的情況回答花費時間；講義未提供固定答案。" },
        { page: "第 13 頁", ko: "지룽에 가려면 얼마나 걸려요? / 지하철로 101 빌딩에 가려면 얼마나 걸려요? / 자전거로 타이난에 가려면 얼마나 걸려요?", zh: "您是 B，請依實際情況回答，不代填交通時間。" },
      ],
    },
    sourceNotes: [
      { heading: "來源規則（第 3–6、8–9 頁）", lines: [
        "分鐘使用漢字數詞 + 분；小時使用純韓文數冠形詞 + 시간。",
        "天數可使用漢字數詞 + 일，也可使用 하루、이틀、사흘等純韓文單字。講義提醒通常兩天以內多用純韓文，超過時多用漢字數詞。",
        "月數可使用漢字數詞 + 개월，或純韓文數冠形詞 + 달；三個月另有 석 달，四個月另有 넉 달。",
        "時間 + 이／가 걸리다 表示花費時間；前面的時間有尾音加 이，無尾音加 가。",
        "在 걸리다 前加 얼마나，即可詢問「花多久」；쯤 表示大約，정도 表示左右。",
      ] },
      { heading: "補充譯文與朗讀整理", lines: [
        "第 8 頁例句及第 11、13 頁練習的中文譯文與作答提示為整理時補上；其餘例句與本課對話譯文依講義原文。",
        "顯示文字保留九份、基隆的漢字註記與數字；朗讀版本省略漢字註記，並將 20、40、101 寫成韓文讀法。",
        "附錄的「做計程車去」為講義原文用字，保留供對照。",
      ] },
    ],
    references: [{ heading: "附錄：對話翻譯（第 16 頁）", entries: [
      { label: "敏俊", text: "冠宇先生，九份在哪裡？" },
      { label: "冠宇", text: "在基隆附近。" },
      { label: "敏俊", text: "坐公車去要多久？" },
      { label: "冠宇", text: "坐公車要花很久時間，做計程車去。" },
      { label: "敏俊", text: "那麼坐計程車要多久？" },
      { label: "冠宇", text: "路上不塞的話，大概花四十分。" },
    ] }],
  },
};

export const lateOctoberLessons = [lesson1019, lesson1021];
