import { assetPath } from "../utils/assets.js";
import { decomposeHangulWord } from "../utils/hangul.js";

const asset = (name) => assetPath(`assets/course-lessons/${name}.png`);
const w = (text, roman, zh) => ({ text, roman, zh, syllables: decomposeHangulWord(text, roman) });
const rows = (items) => items.map((item) => w(...item));
const shared = (id, items) => rows(items).map((item) => ({ ...item, image: asset(`${id}-vocab-page`) }));
const line = (speaker, ko, zh, tokens, spokenKo) => ({ speaker, ko, zh, ...(spokenKo ? { spokenKo } : {}), tokens: rows(tokens) });

const locationWords = [
  ["위", "wi", "上面"], ["아래", "a-rae", "下面"], ["밑", "mit", "底下"],
  ["왼쪽", "oen-jjok", "左邊"], ["오른쪽", "o-reun-jjok", "右邊"],
  ["앞", "ap", "前面"], ["뒤", "dwi", "後面"], ["안", "an", "裡面"], ["밖", "bak", "外面"],
  ["옆", "yeop", "旁邊"], ["근처", "geun-cheo", "附近"], ["거기", "geo-gi", "那裡"],
  ["동대문", "dong-dae-mun", "東大門"], ["을지로", "eul-ji-ro", "乙支路"],
  ["학교", "hak-gyo", "學校"], ["가방", "ga-bang", "包包"], ["시계", "si-gye", "時鐘"],
  ["책", "chaek", "書"], ["문", "mun", "門"], ["식당", "sik-dang", "餐廳"],
  ["백화점", "baek-hwa-jeom", "百貨公司"], ["은행", "eun-haeng", "銀行"],
  ["시험", "si-heom", "考試"], ["내일", "nae-il", "明天"], ["있어요", "i-sseo-yo", "有／在"],
  ["없어요", "eop-seo-yo", "沒有／不在"]
];

const transportWords = [
  ["지하철", "ji-ha-cheol", "地鐵"], ["버스", "beo-seu", "公車"], ["기차", "gi-cha", "火車"],
  ["오토바이", "o-to-ba-i", "機車"], ["자전거", "ja-jeon-geo", "腳踏車"],
  ["비행기", "bi-haeng-gi", "飛機"], ["차", "cha", "車"], ["택시", "taek-si", "計程車"],
  ["컴퓨터", "keom-pyu-teo", "電腦"], ["시계", "si-gye", "時鐘"],
  ["볼펜", "bol-pen", "原子筆"], ["칼", "kal", "刀"], ["연필", "yeon-pil", "鉛筆"],
  ["지우개", "ji-u-gae", "橡皮擦"], ["현금", "hyeon-geum", "現金"],
  ["카드", "ka-deu", "卡片"], ["전화", "jeon-hwa", "電話"], ["문자", "mun-ja", "簡訊"],
  ["글씨", "geul-ssi", "字"], ["피자", "pi-ja", "披薩"], ["고기", "go-gi", "肉"],
  ["회사", "hoe-sa", "公司"], ["학교", "hak-gyo", "學校"], ["집", "jip", "家"],
  ["한국", "han-guk", "韓國"], ["이란", "i-ran", "伊朗"], ["어떻게", "eo-tteo-ke", "怎麼／如何"],
  ["타다", "ta-da", "搭乘"], ["가다", "ga-da", "去"], ["오다", "o-da", "來"]
];

export const lateSeptemberLessons = [
  {
    id: "b1-20", label: "初級1-20", titleKo: "동대문이 어디에 있어요?", titleZh: "東大門在哪裡？",
    theme: "非格式體語尾與方位表達", sourcePdf: "docs/lessons/new/0929.pdf",
    media: { hero: asset("b1-20-dialogue-person") },
    dialogues: [
      { title: "本課對話：東大門的位置", image: asset("b1-20-dialogue-person"), objectImage: asset("b1-20-dialogue-object"), lines: [
        line("관우", "정희 씨, 동대문이 어디에 있어요?", "冠宇：正熙小姐，東大門在哪裡？", [["정희", "jeong-hui", "正熙"], ["씨", "ssi", "先生／小姐"], ["동대문이", "dong-dae-mun-i", "東大門（主語）"], ["어디에", "eo-di-e", "在哪裡"], ["있어요", "i-sseo-yo", "在／有"]]),
        line("정희", "동대문은 을지로 6가 근처에 있어요.", "正熙：東大門在乙支路六街附近。", [["동대문은", "dong-dae-mun-eun", "東大門（主題）"], ["을지로", "eul-ji-ro", "乙支路"], ["육가", "yuk-ga", "六街"], ["근처에", "geun-cheo-e", "在附近"], ["있어요", "i-sseo-yo", "在／有"]], "동대문은 을지로 육가 근처에 있어요."),
        line("관우", "저는 내일 거기에 가요. 정희 씨는요?", "冠宇：我明天要去那裡。妳呢？", [["저는", "jeo-neun", "我（主題）"], ["내일", "nae-il", "明天"], ["거기에", "geo-gi-e", "去那裡"], ["가요", "ga-yo", "去"], ["정희", "jeong-hui", "正熙"], ["씨는요", "ssi-neun-yo", "您呢？"]]),
        line("정희", "저는 내일 시험이 있어요. 그래서 학교에 가요.", "正熙：我明天有考試，所以要去學校。", [["저는", "jeo-neun", "我（主題）"], ["내일", "nae-il", "明天"], ["시험이", "si-heom-i", "考試（主語）"], ["있어요", "i-sseo-yo", "有"], ["그래서", "geu-rae-seo", "所以"], ["학교에", "hak-gyo-e", "去學校"], ["가요", "ga-yo", "去"]])
      ] },
      { title: "換你說說看（保留空格）", image: asset("b1-20-practice-person"), lines: [
        line("A", "맥도날드가 어디에 있어요?", "麥當勞在哪裡？", [["맥도날드가", "maek-do-nal-deu-ga", "麥當勞（主語）"], ["어디에", "eo-di-e", "在哪裡"], ["있어요", "i-sseo-yo", "在／有"]]),
        line("B", "____________________.", "請依實際位置回答。", [["근처에", "geun-cheo-e", "在附近"], ["있어요", "i-sseo-yo", "在／有"]]),
        line("A", "101 빌딩 앞에 뭐가 있어요?", "101 大樓前面有什麼？", [["빌딩", "bil-ding", "大樓"], ["앞에", "a-pe", "在前面"], ["뭐가", "mwo-ga", "什麼（主語）"], ["있어요", "i-sseo-yo", "有"]]),
        line("B", "____________________.", "請依實際位置回答。", [["앞에", "a-pe", "在前面"], ["있어요", "i-sseo-yo", "有"]]),
        line("A", "가방 안에 뭐가 있어요?", "包包裡面有什麼？", [["가방", "ga-bang", "包包"], ["안에", "a-ne", "在裡面"], ["뭐가", "mwo-ga", "什麼（主語）"], ["있어요", "i-sseo-yo", "有"]]),
        line("B", "____________________.", "請依自己的包包內容回答。", [["안에", "a-ne", "在裡面"], ["있어요", "i-sseo-yo", "有"]])
      ] }
    ],
    vocabulary: shared("b1-20", locationWords),
    guide: {
      label: "語尾與方位", title: "-아요／어요／여요・方位名詞＋에",
      hint: "口語禮貌形依詞幹最後母音選 -아요 或 -어요；하다 變 해요。位置用「名詞＋方位名詞＋에＋있어요／없어요」。",
      sections: [
        { heading: "非格式體語尾（第 5-10 頁）", words: rows([
          ["가요", "ga-yo", "去"], ["사요", "sa-yo", "買"], ["봐요", "bwa-yo", "看"],
          ["줘요", "jwo-yo", "給"], ["마셔요", "ma-syeo-yo", "喝"], ["먹어요", "meo-geo-yo", "吃"],
          ["읽어요", "il-geo-yo", "讀"], ["입어요", "i-beo-yo", "穿"], ["신어요", "si-neo-yo", "穿鞋"],
          ["공부해요", "gong-bu-hae-yo", "學習"], ["말해요", "ma-rae-yo", "說話"],
          ["운동해요", "un-dong-hae-yo", "運動"], ["피곤해요", "pi-gon-hae-yo", "疲倦"]
        ]) },
        { heading: "方位名詞（第 11-12 頁）", words: rows(locationWords.slice(0, 12)) },
        { heading: "地點句型（第 12 頁）", words: rows([
          ["앞에 있어요", "a-pe- -i-sseo-yo", "在前面"], ["뒤에 있어요", "dwi-e- -i-sseo-yo", "在後面"],
          ["안에 있어요", "a-ne- -i-sseo-yo", "在裡面"], ["옆에 있어요", "yeo-pe- -i-sseo-yo", "在旁邊"]
        ]) }
      ],
      practice: { heading: "語尾變化與方位", hint: "先找詞幹母音，再選 -아요／어요；하다 類變成 해요。方位名詞後接 에。", valueSuffix: "", items: [
        { value: "가다", answer: w("가요", "ga-yo", "去") }, { value: "먹다", answer: w("먹어요", "meo-geo-yo", "吃") },
        { value: "공부하다", answer: w("공부해요", "gong-bu-hae-yo", "學習") },
        { value: "時鐘在書上面", answer: w("책 위에 시계가 있어요", "chaek- -wi-e- -si-gye-ga- -i-sseo-yo", "時鐘在書上面") }
      ], prompts: [
        { page: "第 9 頁", ko: "있다／없다／자다／꿈꾸다／일어나다／세수하다／먹다／출근하다／쉬다／퇴근하다／돌아오다／보다", zh: "請把動詞或形容詞改成 -아요／어요／여요。" },
        { page: "第 13 頁", ko: "책 위에 시계가 있어요.", zh: "依圖練習描述物品位置。" },
        { page: "第 15 頁", ko: "맥도날드가 어디에 있어요?／101 빌딩 앞에 뭐가 있어요?／가방 안에 뭐가 있어요?", zh: "您是 B，請自行回答位置問題。" }
      ] },
      sourceNotes: [{ heading: "來源重點", lines: [
        "-아요／어요／여요 是常用的非格式體禮貌語尾；三種寫法依前方母音與詞幹而變。",
        "名詞＋方位名詞＋에＋있어요／없어요 表示物品或人所在的位置。",
        "本課對話位於第 14 頁，換你說說看位於第 15 頁，中文翻譯位於第 18 頁。"
      ] }],
      references: [{ heading: "附錄：對話翻譯（第 18 頁）", entries: [
        { label: "冠宇", text: "正熙小姐，東大門在哪裡？" }, { label: "正熙", text: "東大門在乙支路六街附近。" },
        { label: "冠宇", text: "我明天要去那裡。妳呢？" }, { label: "正熙", text: "我明天有考試，所以要去學校。" }
      ] }]
    }
  },
  {
    id: "b1-21", label: "初級1-21", titleKo: "지하철로 회사에 갑니다.", titleZh: "我搭捷運去公司。",
    theme: "工具手段助詞與搭乘交通工具", sourcePdf: "docs/lessons/new/0930.pdf",
    media: { hero: asset("b1-21-dialogue-person") },
    dialogues: [
      { title: "本課對話：怎麼去公司", image: asset("b1-21-dialogue-person"), objectImage: asset("b1-21-dialogue-object"), lines: [
        line("관우", "민준 씨, 차가 있어요?", "冠宇：敏俊先生，你有車嗎？", [["민준", "min-jun", "敏俊"], ["씨", "ssi", "先生／小姐"], ["차가", "cha-ga", "車（主語）"], ["있어요", "i-sseo-yo", "有"]]),
        line("민준", "아니요, 없어요.", "敏俊：不，沒有。", [["아니요", "a-ni-yo", "不／不是"], ["없어요", "eop-seo-yo", "沒有"]]),
        line("관우", "그러면 회사에 어떻게 가요?", "冠宇：那麼你怎麼去公司？", [["그러면", "geu-reo-myeon", "那麼"], ["회사에", "hoe-sa-e", "去公司"], ["어떻게", "eo-tteo-ke", "怎麼"], ["가요", "ga-yo", "去"]]),
        line("민준", "지하철로 가요. 관우 씨는요?", "敏俊：搭地鐵去。冠宇先生呢？", [["지하철로", "ji-ha-cheol-lo", "搭地鐵"], ["가요", "ga-yo", "去"], ["관우", "gwan-u", "冠宇"], ["씨는요", "ssi-neun-yo", "您呢？"]]),
        line("관우", "저는 오토바이를 타고 가요.", "冠宇：我騎機車去。", [["저는", "jeo-neun", "我（主題）"], ["오토바이를", "o-to-ba-i-reul", "機車（受詞）"], ["타고", "ta-go", "搭乘／騎，然後"], ["가요", "ga-yo", "去"]])
      ] },
      { title: "換你說說看（保留空格）", image: asset("b1-21-practice-person"), lines: [
        line("A", "한국 드라마를 어떻게 봐요?", "你怎麼看韓劇？", [["한국", "han-guk", "韓國"], ["드라마를", "deu-ra-ma-reul", "電視劇（受詞）"], ["어떻게", "eo-tteo-ke", "怎麼"], ["봐요", "bwa-yo", "看"]]),
        line("B", "컴퓨터로 ____________________.", "請用電腦作為工具回答。", [["컴퓨터로", "keom-pyu-teo-ro", "用電腦"], ["봐요", "bwa-yo", "看"]]),
        line("A", "어떻게 결제해요?", "你怎麼付款？", [["어떻게", "eo-tteo-ke", "怎麼"], ["결제해요", "gyeol-je-hae-yo", "付款"]]),
        line("B", "카드/현금으로 ____________________.", "請選擇卡片或現金回答。", [["카드로", "ka-deu-ro", "用卡片"], ["현금으로", "hyeon-geum-eu-ro", "用現金"], ["결제해요", "gyeol-je-hae-yo", "付款"]]),
        line("A", "친구하고 어떻게 연락해요?", "你怎麼聯絡朋友？", [["친구하고", "chin-gu-ha-go", "和朋友"], ["어떻게", "eo-tteo-ke", "怎麼"], ["연락해요", "yeol-la-kae-yo", "聯絡"]]),
        line("B", "전화/문자로 ____________________.", "請選擇電話或簡訊回答。", [["전화로", "jeon-hwa-ro", "用電話"], ["문자로", "mun-ja-ro", "用簡訊"], ["연락해요", "yeol-la-kae-yo", "聯絡"]])
      ] }
    ],
    vocabulary: shared("b1-21", transportWords),
    guide: {
      label: "工具與交通", title: "N(으)로・N을／를 타고 가다／오다",
      hint: "工具或方法在名詞後接 (으)로：有尾音接 으로，無尾音或 ㄹ 尾音接 로。交通工具也可用「N을／를 타고 가다／오다」。",
      sections: [
        { heading: "工具或手段（第 3-5 頁）", words: rows([
          ["컴퓨터로", "keom-pyu-teo-ro", "用電腦"], ["시계로", "si-gye-ro", "用時鐘"],
          ["볼펜으로", "bol-pen-eu-ro", "用原子筆"], ["칼로", "kal-lo", "用刀"],
          ["현금으로", "hyeon-geum-eu-ro", "用現金"], ["카드로", "ka-deu-ro", "用卡片"],
          ["전화로", "jeon-hwa-ro", "用電話"], ["문자로", "mun-ja-ro", "用簡訊"]
        ]) },
        { heading: "交通工具（第 8 頁）", words: rows(transportWords.slice(0, 8)) },
        { heading: "搭乘與移動（第 8 頁）", words: rows([
          ["지하철로 갑니다", "ji-ha-cheol-lo- -gam-ni-da", "搭地鐵去"],
          ["버스를 타고 가요", "beo-seu-reul- -ta-go- -ga-yo", "搭公車去"],
          ["기차를 타고 이란에 옵니다", "gi-cha-reul- -ta-go- -i-ran-e- -om-ni-da", "搭火車來伊朗"]
        ]) }
      ],
      practice: { heading: "說出工具與交通方法", hint: "有尾音的工具名詞接 으로；無尾音或 ㄹ 尾音接 로。搭車可用 N을／를 타고 가요。", valueSuffix: "", items: [
        { value: "用電腦", answer: w("컴퓨터로", "keom-pyu-teo-ro", "用電腦") },
        { value: "用原子筆", answer: w("볼펜으로", "bol-pen-eu-ro", "用原子筆") },
        { value: "用刀", answer: w("칼로", "kal-lo", "用刀") },
        { value: "搭地鐵去", answer: w("지하철을 타고 가요", "ji-ha-cheo-reul- -ta-go- -ga-yo", "搭地鐵去") }
      ], prompts: [
        { page: "第 6 頁", ko: "볼펜／연필／지우개／칼／버스／비행기／기차 + (으)로", zh: "請選擇正確的 로 或 으로，並造句。" },
        { page: "第 7 頁", ko: "뭘로 글씨를 써요?／학교에 어떻게 가요?／피자를 어떻게 자릅니까?", zh: "您是 B，請回答工具或交通方式。" },
        { page: "第 9 頁", ko: "회사에 어떻게 갑니까?／집에 어떻게 가요?／학교에 어떻게 가요?", zh: "請用交通工具＋타고 가다／오다 回答。" },
        { page: "第 11-12 頁", ko: "한국 드라마를 어떻게 봐요?／어떻게 결제해요?／친구하고 어떻게 연락해요?", zh: "請用電腦、卡片、現金、電話或簡訊自行回答。" }
      ] },
      sourceNotes: [{ heading: "來源重點", lines: [
        "(으)로 表示工具或方法；有尾音接 으로，無尾音或 ㄹ 尾音接 로。",
        "交通方式可用「交通工具＋(으)로 가다／오다」，也可用「交通工具＋을／를 타고 가다／오다」。",
        "本課對話位於第 10 頁，換你說說看位於第 11-12 頁，中文翻譯位於第 15 頁。"
      ] }],
      references: [{ heading: "附錄：對話翻譯（第 15 頁）", entries: [
        { label: "冠宇", text: "敏俊先生，你有車嗎？" }, { label: "敏俊", text: "不，沒有。" },
        { label: "冠宇", text: "那麼你怎麼去公司？" }, { label: "敏俊", text: "搭地鐵去。冠宇先生呢？" },
        { label: "冠宇", text: "我騎機車去。" }
      ] }]
    }
  }
];
