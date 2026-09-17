import { assetPath } from "../utils/assets.js";
import { decomposeHangulWord } from "../utils/hangul.js";

const asset = (name) => assetPath(`assets/course-lessons/${name}.png`);
const w = (text, roman, zh) => ({ text, roman, zh, syllables: decomposeHangulWord(text, roman) });
const words = (rows) => rows.map((row) => w(...row));
const priceReadings = {
  "2000원입니다": "이천원입니다", "16000원입니다": "만육천원입니다",
  "15000원에": "만오천원에", "52000원입니다": "오만이천원입니다", "50000원에": "오만원에",
  "16일에": "십육일에",
};
const l = (speaker, ko, zh, rows) => ({ speaker, ko, zh,
  ...(ko.startsWith('3/27') ? { spokenKo: '삼월 이십칠일' } : {}),
  tokens: words(rows).map((token) => {
  const displayText = Object.keys(priceReadings).find((price) => ko.includes(price) && priceReadings[price] === token.text);
  return displayText ? { ...token, displayText } : token;
}) });
const shared = (id, rows) => words(rows).map((item) => ({ ...item, image: asset(`${id}-vocab-page`) }));
const withImage = (imageName, rows) => words(rows).map((item) => ({ ...item, image: asset(imageName) }));

const skincare = [
  ["스킨", "seu-kin", "化妝水"], ["로션", "ro-syeon", "乳液"],
  ["크림", "keu-rim", "乳霜"], ["선크림", "seon-keu-rim", "防曬乳"],
  ["에센스", "e-sen-seu", "精華液"], ["향수", "hyang-su", "香水"],
  ["립밤", "rip-bam", "護唇膏"], ["매니큐어", "mae-ni-kyu-eo", "指甲油"],
];
const bathroom = [
  ["샴푸", "syam-pu", "洗髮精"], ["린스", "rin-seu", "潤髮乳"],
  ["비누", "bi-nu", "肥皂"], ["바디워시", "ba-di-wo-si", "沐浴乳"],
  ["바디로션", "ba-di-ro-syeon", "乳液（身體用）"], ["클렌징", "keul-len-jing", "洗面乳"],
  ["쉐이빙폼", "swe-i-bing-pom", "刮鬍膏"], ["면도기", "myeon-do-gi", "刮鬍刀"],
  ["면도날", "myeon-do-nal", "刮鬍刀片"], ["수건", "su-geon", "毛巾"],
  ["목욕타월", "mo-gyok-ta-wol", "浴巾"], ["드라이기", "deu-ra-i-gi", "吹風機"],
  ["손톱깎이", "son-top-kkak-i", "指甲剪"], ["가위", "ga-wi", "剪刀"],
  ["머리끈", "meo-ri-kkeun", "髮帶"],
];
const cosmetics = [...skincare, ...bathroom];

const months = [
  ["일월", "il-wol", "1月"], ["이월", "i-wol", "2月"], ["삼월", "sam-wol", "3月"],
  ["사월", "sa-wol", "4月"], ["오월", "o-wol", "5月"], ["유월", "yu-wol", "6月"],
  ["칠월", "chil-wol", "7月"], ["팔월", "pal-wol", "8月"], ["구월", "gu-wol", "9月"],
  ["시월", "si-wol", "10月"], ["십일월", "sip-il-wol", "11月"], ["십이월", "sip-i-wol", "12月"],
];
const dates = [
  ["일일", "il-il", "1日"], ["이일", "i-il", "2日"], ["삼일", "sam-il", "3日"],
  ["사일", "sa-il", "4日"], ["오일", "o-il", "5日"], ["육일", "yuk-il", "6日"],
  ["칠일", "chil-il", "7日"], ["팔일", "pal-il", "8日"], ["구일", "gu-il", "9日"],
  ["십일", "sip-il", "10日"], ["십일일", "sip-il-il", "11日"], ["십이일", "sip-i-il", "12日"],
  ["이십일", "i-sip-il", "20日"], ["삼십일", "sam-sip-il", "30日"], ["삼십일일", "sam-sip-il-il", "31日"],
];
const relativeDays = [
  ["그끄저께", "geu-kkeu-jeo-kke", "大前天"], ["그저께", "geu-jeo-kke", "前天"],
  ["어제", "eo-je", "昨天"], ["오늘", "o-neul", "今天"], ["내일", "nae-il", "明天"],
  ["모레", "mo-re", "後天"], ["글피", "geul-pi", "大後天"], ["그글피", "geu-geul-pi", "大大後天"],
];
const seasons = [
  ["봄", "bom", "春"], ["여름", "yeo-reum", "夏"], ["가을", "ga-eul", "秋"], ["겨울", "gyeo-ul", "冬"],
];
const weekWords = [
  ["다음 주", "da-eum- -ju", "下星期"], ["이번 주", "i-beon- -ju", "這星期"], ["지난주", "ji-nan-ju", "上星期"],
];
const calendarVocabulary = [...months, ...relativeDays, ...seasons, ...weekWords];

const desserts = [
  ["치즈 케이크", "chi-jeu- -ke-i-keu", "起司蛋糕"],
  ["고구마 케이크", "go-gu-ma- -ke-i-keu", "地瓜蛋糕"],
  ["초콜릿 브라우니", "cho-kol-lit- -beu-ra-u-ni", "巧克力布朗尼"],
  ["쿠키", "ku-ki", "餅乾"], ["샐러드", "sael-leo-deu", "沙拉"],
  ["베이글", "be-i-geul", "貝果"], ["샌드위치", "saen-deu-wi-chi", "三明治"],
  ["토스트", "to-seu-teu", "吐司"], ["와플", "wa-peul", "鬆餅"],
  ["버거", "beo-geo", "漢堡"], ["아이스크림", "a-i-seu-keu-rim", "冰淇淋"], ["빙수", "bing-su", "刨冰"]
];
const drinks = [
  ["에스프레소", "e-seu-peu-re-so", "濃縮咖啡"],
  ["카라멜 마키아또", "ka-ra-mel- -ma-ki-a-tto", "焦糖瑪奇朵"],
  ["카푸치노", "ka-pu-chi-no", "卡布奇諾"], ["아메리카노", "a-me-ri-ka-no", "美式咖啡"],
  ["카페 모카", "ka-pe- -mo-ka", "摩卡咖啡"], ["카페라떼", "ka-pe-ra-tte", "拿鐵"],
  ["바닐라 라떼", "ba-nil-la- -ra-tte", "香草拿鐵"], ["카라멜 라떼", "ka-ra-mel- -ra-tte", "焦糖拿鐵"],
  ["핫 초콜릿", "hat- -cho-kol-lit", "熱巧克力"], ["아이스 초콜릿", "a-i-seu- -cho-kol-lit", "冰巧克力"],
  ["그린티 라떼", "geu-rin-ti- -ra-tte", "綠茶拿鐵"], ["고구마 라떼", "go-gu-ma- -ra-tte", "地瓜拿鐵"],
  ["홍차 라떼", "hong-cha- -ra-tte", "紅茶拿鐵"]
];
const requests = [
  ["주세요", "ju-se-yo", "請給我（一般禮貌）"], ["주십시오", "ju-sip-ssi-o", "請給我（正式敬語）"],
  ["마요네즈", "ma-yo-ne-jeu", "美乃滋"], ["버터", "beo-teo", "奶油"],
  ["후추 가루", "hu-chu- -ga-ru", "胡椒粉"], ["소금", "so-geum", "鹽"],
  ["설탕", "seol-tang", "砂糖"], ["고추장", "go-chu-jang", "韓式辣椒醬"],
  ["리포트", "ri-po-teu", "報告"], ["신청서", "sin-cheong-seo", "申請書"],
  ["우표", "u-pyo", "郵票"], ["신분증", "sin-bun-jjeung", "身分證"],
  ["여권", "yeo-gwon", "護照"], ["사진", "sa-jin", "照片"], ["영수증", "yeong-su-jeung", "收據"]
];
const shopping = [
  ["얼마", "eol-ma", "多少"], ["가격", "ga-gyeok", "價格"], ["몸무게", "mom-mu-ge", "體重"],
  ["키", "ki", "身高"], ["요금", "yo-geum", "費用"], ["월급", "wol-geup", "月薪"],
  ["박스", "bak-seu", "箱"], ["줄", "jul", "條／卷"], ["원", "won", "韓圓"],
  ["사과", "sa-gwa", "蘋果"], ["딸기", "ttal-gi", "草莓"], ["주인", "ju-in", "店老闆"],
  ["깎다", "kkak-tta", "削減／殺價"], ["할인", "ha-rin", "折扣"],
  ["환불하다", "hwan-bul-ha-da", "退貨退款"], ["교환하다", "gyo-hwan-ha-da", "交換／換貨"],
  ["비쌉니다", "bi-ssam-ni-da", "很貴"], ["드립니다", "deu-rim-ni-da", "給您（謙讓語）"]
];
const currency = [
  ["십 원", "sib- -won", "十韓圓"], ["오십 원", "o-sib- -won", "五十韓圓"],
  ["백 원", "bae- -gwon", "一百韓圓"], ["오백 원", "o-bae- -gwon", "五百韓圓"],
  ["천 원", "cheo- -nwon", "一千韓圓"], ["오천 원", "o-cheo- -nwon", "五千韓圓"],
  ["만 원", "ma- -nwon", "一萬韓圓"], ["오만 원", "o-ma- -nwon", "五萬韓圓"]
];

export const septemberLessons = [
  {
    id: "b1-15", label: "初級1-15", titleKo: "커피하고 케이크 주세요", titleZh: "請給我咖啡和蛋糕。",
    theme: "禮貌請求、甜點與飲料點餐", sourcePdf: "docs/lessons/new/0908.pdf",
    media: { hero: asset("b1-15-dialogue-person") },
    dialogues: [
      { title: "本課對話：在咖啡廳", image: asset("b1-15-dialogue-person"), objectImage: asset("b1-15-dialogue-object"), lines: [
        l("점원", "뭘 드릴까요?", "店員：請問您要什麼？", [["뭘", "mwol", "什麼（무엇을 的縮寫）"], ["드릴까요", "deu-ril-kka-yo", "要給您嗎？"]]),
        l("민준", "커피하고 케이크 주세요.", "敏俊：請給我咖啡和蛋糕。", [["커피하고", "keo-pi-ha-go", "咖啡和"], ["케이크", "ke-i-keu", "蛋糕"], requests[0]]),
        l("점원", "어떤 커피 드릴까요?", "店員：要哪一種咖啡呢？", [["어떤", "eo-tteon", "哪一種"], ["커피", "keo-pi", "咖啡"], ["드릴까요", "deu-ril-kka-yo", "要給您嗎？"]]),
        l("민준", "아이스 커피 주세요.", "敏俊：請給我冰咖啡。", [["아이스", "a-i-seu", "冰的"], ["커피", "keo-pi", "咖啡"], requests[0]]),
        l("점원", "네, 잠깐만 기다리세요.", "店員：好的，請稍等。", [["네", "ne", "好的"], ["잠깐만", "jam-kkan-man", "一下下"], ["기다리세요", "gi-da-ri-se-yo", "請等候"]])
      ] },
      { title: "換你說說看（保留空格）", image: asset("b1-15-practice-person"), lines: [
        l("점원", "뭘 드릴까요?", "店員：請問您要什麼？", [["뭘", "mwol", "什麼"], ["드릴까요", "deu-ril-kka-yo", "要給您嗎？"]]),
        l("B", "____________________.", "請選擇一種飲料，用 주세요 點餐。", [requests[0]]),
        l("점원", "뭘 드릴까요?", "店員：請問您要什麼？（另一個情境）", [["뭘", "mwol", "什麼"], ["드릴까요", "deu-ril-kka-yo", "要給您嗎？"]]),
        l("B", "____________________.", "請點一份甜點。", [desserts[0], requests[0]]),
        l("점원", "죄송합니다. __________ 없습니다.", "店員：抱歉，沒有您點的品項。請補上品名。", [["죄송합니다", "joe-song-ham-ni-da", "抱歉"], ["없습니다", "eop-sseum-ni-da", "沒有"]]),
        l("B", "그러면 __________ 주세요.", "那麼，請給我另一種品項。", [["그러면", "geu-reo-myeon", "那麼"], requests[0]])
      ] }
    ],
    vocabulary: [
      ...words(desserts).map((item, i) => ({ ...item, image: asset(`b1-15-vocab-${String(i + 1).padStart(2, "0")}`) })),
      ...shared("b1-15", drinks)
    ],
    guide: {
      label: "點餐與請求", title: "N을／를 주세요・N을／를 주십시오",
      hint: "주세요 用於一般禮貌場合，주십시오 較正式。名詞有收音用 을，沒有收音用 를；口語常省略助詞。點餐可加數量與量詞。",
      sections: [
        { heading: "請求物品：一般與正式場合（第 3–7 頁）", words: words(requests) },
        { heading: "情境練習補充詞（第 5、7 頁）", words: words([
          ["라면", "ra-myeon", "泡麵"], ["콜라", "kol-la", "可樂"], ["주스", "ju-seu", "果汁"],
          ["버블티", "beo-beul-ti", "珍珠奶茶"], ["짬뽕", "jjam-ppong", "辣海鮮麵"],
          ["갈비탕", "gal-bi-tang", "牛小排湯"], ["햄버거", "haem-beo-geo", "漢堡"],
          ["치킨", "chi-kin", "炸雞"], ["홍차", "hong-cha", "紅茶"], ["밀크티", "mil-keu-ti", "奶茶"],
          ["증명서", "jeung-myeong-seo", "證明書"], ["계좌번호", "gye-jwa-beon-ho", "帳號"],
          ["전화번호", "jeon-hwa-beon-ho", "電話號碼"]
        ]) },
        { heading: "甜點（第 8–9 頁）", words: words(desserts) },
        { heading: "飲料（第 11 頁）", words: words(drinks) }
      ],
      practice: {
        heading: "照著點餐", hint: "品名 + 數量 + 개／잔 + 주세요。多項品名用 하고 或 그리고 連接。", valueSuffix: "",
        items: [
          { value: "請給我鹽", answer: w("소금을 주세요", "so-geu-meul- -ju-se-yo", "請給我鹽") },
          { value: "請給我護照（正式）", answer: w("여권을 주십시오", "yeo-gwo-neul- -ju-sip-ssi-o", "請給我護照") },
          { value: "一個起司蛋糕", answer: w("치즈 케이크 한 개 주세요", "chi-jeu- -ke-i-keu- -han- -gae- -ju-se-yo", "請給我一個起司蛋糕") },
          { value: "兩杯摩卡咖啡", answer: w("카페 모카 두 잔 주세요", "ka-pe- -mo-ka- -du- -jan- -ju-se-yo", "請給我兩杯摩卡咖啡") }
        ],
        prompts: [
          { page: "第 5 頁", ko: "라면 / 콜라 / 주스 / 버블티 / 짬뽕 / 갈비탕 / 햄버거 / 치킨 / 홍차 / 밀크티", zh: "依韓式餐廳、咖啡廳、中式餐廳、炸雞店、飲料店情境，用 주세요 要東西。" },
          { page: "第 7 頁", ko: "신분증 / 신청서 / 증명서 / 우표 / 계좌번호 / 전화번호 / 영수증", zh: "依銀行、百貨公司、學校、郵局、公司的情境，用 주십시오 要東西。" },
          { page: "第 10 頁", ko: "치즈 케이크 한 개, 샐러드 두 개 그리고 와플 한 개 주세요.", zh: "範例：一個起司蛋糕、兩份沙拉和一份鬆餅。請自行換成三種點心並加上數量。" },
          { page: "第 12 頁", ko: "카페 모카 두 잔, 카푸치노 열 잔하고 그린티 라떼 한 잔 주세요.", zh: "來源範例有三種飲料；練習題要求自行點四種，並說出數量。" }
        ]
      },
      sourceNotes: [{ heading: "來源重點", lines: ["本課對話在第 13 頁，開放式練習在第 14 頁，中文翻譯在第 17 頁。", "주세요 和 주십시오 都能禮貌地請求物品，差別在語體正式程度。", "保留原課件飲料名稱；카라멜 마키아또 也常寫作 카라멜 마키아토。", "單字照片取自原課件第 8–9 頁；原作者與照片來源見第 18–20 頁。"] }],
      references: [{ heading: "附錄：對話翻譯（第 17 頁）", entries: [
        { label: "店員", text: "請問您要什麼？" }, { label: "敏俊", text: "請給我咖啡跟蛋糕。" },
        { label: "店員", text: "要哪種咖啡呢？" }, { label: "敏俊", text: "請給我冰咖啡。" }, { label: "店員", text: "好的，請等一下。" }
      ] }]
    }
  },
  {
    id: "b1-16", label: "初級1-16", titleKo: "이거 얼마입니까?", titleZh: "這個多少錢？",
    theme: "詢問價格、韓圓與購物表達", sourcePdf: "docs/lessons/new/0909.pdf",
    media: { hero: asset("b1-16-dialogue-person") },
    dialogues: [
      { title: "本課對話：水果店", image: asset("b1-16-dialogue-person"), objectImage: asset("b1-16-dialogue-object"), lines: [
        l("민준", "이거 얼마입니까?", "敏俊：這個多少錢？", [["이거", "i-geo", "這個"], ["얼마입니까", "eol-ma-im-ni-kka", "是多少？"]]),
        l("주인", "사과는 세 개에 2000원입니다.", "老闆：蘋果三個兩千韓圓。", [["사과는", "sa-gwa-neun", "蘋果（主題）"], ["세", "se", "三（數冠形）"], ["개에", "gae-e", "每…個（計價基準）"], ["이천원입니다", "i-cheo-nwo-nim-ni-da", "是兩千韓圓"]]),
        l("민준", "딸기는 얼마입니까?", "敏俊：草莓多少錢呢？", [["딸기는", "ttal-gi-neun", "草莓（主題）"], ["얼마입니까", "eol-ma-im-ni-kka", "是多少？"]]),
        l("주인", "한 박스에 16000원입니다.", "老闆：一箱一萬六千韓圓。", [["한", "han", "一（數冠形）"], ["박스에", "bak-seu-e", "每箱"], ["만육천원입니다", "man-yuk-cheo-nwo-nim-ni-da", "是一萬六千韓圓"]]),
        l("민준", "좀 비쌉니다. 좀 깎아 주세요.", "敏俊：有點貴，請便宜一點。", [["좀", "jom", "有點／稍微"], shopping[16], ["좀", "jom", "稍微"], ["깎아", "kka-kka", "減價"], requests[0]]),
        l("주인", "그럼 15000원에 드립니다.", "老闆：那麼一萬五千韓圓賣給您。", [["그럼", "geu-reom", "那麼"], ["만오천원에", "ma-no-cheo-nwo-ne", "以一萬五千韓圓"], shopping[17]]),
        l("민준", "네, 그럼 사과 세 개하고 딸기 한 박스 주세요.", "敏俊：好，那請給我三個蘋果和一箱草莓。", [["네", "ne", "好"], ["그럼", "geu-reom", "那麼"], shopping[9], ["세", "se", "三"], ["개하고", "gae-ha-go", "個和"], shopping[10], ["한", "han", "一"], shopping[6], requests[0]])
      ] },
      { title: "換你說說看（保留空格）", image: asset("b1-16-practice-person"), lines: [
        l("A", "사과 얼마입니까?", "水果店：蘋果多少錢？（提示：三個五千韓圓）", [shopping[9], ["얼마입니까", "eol-ma-im-ni-kka", "是多少？"]]),
        l("B", "____________________.", "請用三個五千韓圓回答。", [["세", "se", "三"], ["개에", "gae-e", "每…個"], ["오천원입니다", "o-cheo-nwo-nim-ni-da", "是五千韓圓"]]),
        l("A", "모두 52000원입니다.", "百貨公司：總共五萬兩千韓圓。", [["모두", "mo-du", "總共"], ["오만이천원입니다", "o-ma-ni-cheo-nwo-nim-ni-da", "是五萬兩千韓圓"]]),
        l("B", "____________________.", "請試著殺價。", [["깎아", "kka-kka", "減價"], requests[0]]),
        l("A", "그럼, 50000원에 드립니다.", "那麼，五萬韓圓賣給您。", [["그럼", "geu-reom", "那麼"], ["오만원에", "o-ma-nwo-ne", "以五萬韓圓"], shopping[17]]),
        l("A", "몸무게가 얼마입니까?", "醫院：體重是多少？", [["몸무게가", "mom-mu-ge-ga", "體重（主語）"], ["얼마입니까", "eol-ma-im-ni-kka", "是多少？"]]),
        l("B", "____________________.", "請依自己的體重回答。", [shopping[2]]),
        l("A", "키가 얼마입니까?", "身高是多少？", [["키가", "ki-ga", "身高（主語）"], ["얼마입니까", "eol-ma-im-ni-kka", "是多少？"]]),
        l("B", "____________________.", "請依自己的身高回答。", [shopping[3]])
      ] }
    ],
    vocabulary: shared("b1-16", shopping),
    guide: {
      label: "價格與購物", title: "얼마입니까?・數量 + 單位 + 에",
      hint: "얼마 可問價格或數量。名詞 + 數量 + 單位 + 에 表示計價基準，例如 사과 한 개에 얼마입니까?。金額用漢字數詞 + 원。",
      sections: [
        { heading: "價格、數量與購物（第 3–6、11 頁）", words: words(shopping) },
        { heading: "回答價格與數量（第 6 頁）", words: words([
          ["만 원입니다", "ma- -nwo-nim-ni-da", "價格是一萬韓圓"],
          ["오십 킬로그램입니다", "o-sip- -kil-lo-geu-ra-mim-ni-da", "體重是五十公斤"],
          ["백칠십 센티미터입니다", "baek-chil-ssip- -sen-ti-mi-teo-im-ni-da", "身高是一百七十公分"],
          ["십만 원입니다", "sim-ma- -nwo-nim-ni-da", "費用是十萬韓圓"],
          ["삼백오십만 원입니다", "sam-bae-go-sim-ma- -nwo-nim-ni-da", "月薪是三百五十萬韓圓"],
          ["이천오백 원입니다", "i-cheo-no-bae- -gwo-nim-ni-da", "一條紫菜飯捲是兩千五百韓圓"]
        ]) },
        { heading: "韓圓面額（第 8、15 頁）", words: words(currency) },
        { heading: "購物常用句", words: [
          w("좀 비쌉니다", "jom- -bi-ssam-ni-da", "有點貴"), w("깎아 주세요", "kka-kka- -ju-se-yo", "請便宜一點"),
          w("할인해 주세요", "ha-rin-hae- -ju-se-yo", "請打折"), w("환불해 주세요", "hwan-bul-hae- -ju-se-yo", "請退款"),
          w("교환해 주세요", "gyo-hwan-hae- -ju-se-yo", "請換貨")
        ] }
      ],
      practice: {
        heading: "說出價格（第 9–10 頁）", hint: "用漢字數詞讀出金額，再加 원입니다。題目金額照原課件保留。", valueSuffix: "",
        items: [
          { value: "汽水 ₩1,000", answer: w("천 원", "cheo- -nwon", "一千韓圓") },
          { value: "便當 ₩5,000", answer: w("오천 원", "o-cheo- -nwon", "五千韓圓") },
          { value: "烤雞 ₩15,000", answer: w("만오천 원", "ma-no-cheo- -nwon", "一萬五千韓圓") },
          { value: "西瓜 ₩30,000", answer: w("삼만 원", "sam-ma- -nwon", "三萬韓圓") },
          { value: "鞋子 ₩80,000", answer: w("팔만 원", "pal-ma- -nwon", "八萬韓圓") },
          { value: "人參 ₩100,000", answer: w("십만 원", "sim-ma- -nwon", "十萬韓圓") },
          { value: "汽車 ₩25,000,000", answer: w("이천오백만 원", "i-cheo-no-baeng-ma- -nwon", "兩千五百萬韓圓") },
          { value: "電腦 ₩1,200,000", answer: w("백이십만 원", "bae-gi-sim-ma- -nwon", "一百二十萬韓圓") },
          { value: "手錶 ₩455,000", answer: w("사십오만오천 원", "sa-si-bo-ma-no-cheo- -nwon", "四十五萬五千韓圓") },
          { value: "手機 ₩1,120,000", answer: w("백십이만 원", "baek-ssi-bi-ma- -nwon", "一百一十二萬韓圓") },
          { value: "房子 ₩250,000,000", answer: w("이억오천만 원", "i-eo-go-cheon-ma- -nwon", "兩億五千萬韓圓") },
          { value: "冰淇淋 ₩3,500", answer: w("삼천오백 원", "sam-cheo-no-bae- -gwon", "三千五百韓圓") }
        ],
        prompts: [
          { page: "第 5 頁", ko: "주스 한 병에 얼마입니까?", zh: "一瓶果汁多少錢？換成咖啡一杯、草莓一箱、紫菜飯捲一條再練習。" },
          { page: "第 6 頁", ko: "가격이 / 몸무게가 / 키가 / 요금이 / 월급이 얼마입니까?", zh: "來源回答：一萬韓圓／50 公斤／170 公分／十萬韓圓／350 萬韓圓。" },
          { page: "第 7 頁", ko: "____________________", zh: "請翻譯：珍奶一杯多少錢？雞排一個多少錢？身高多少？體重多少？可樂五瓶多少錢？" },
          { page: "第 12 頁", ko: "____________________", zh: "依情境說出適當句子：覺得太貴、問價格、要換貨、要退貨、要折扣。" },
          { page: "第 14 頁", ko: "사과 얼마입니까?", zh: "用三個五千韓圓回答，再練習百貨公司殺價和醫院詢問身高體重。" }
        ]
      },
      sourceNotes: [{ heading: "來源重點", lines: ["本課對話位於第 13 頁，換你說說看位於第 14 頁，中文翻譯位於第 17 頁。", "原課件以 얼마 詢問身高與體重；日常也常用 키가 몇 센티미터예요?、몸무게가 몇 킬로그램이에요?。", "對話保留來源阿拉伯數字；可點選詞卡聽韓文金額讀法。", "鈔票與硬幣插圖來源為原課件第 8、18 頁的韓國銀行資料。"] }],
      references: [{ heading: "附錄：對話翻譯（第 17 頁）", entries: [
        { label: "敏俊", text: "這個多少錢？" }, { label: "老闆", text: "蘋果三個兩千韓圓。" },
        { label: "敏俊", text: "草莓多少呢？" }, { label: "老闆", text: "草莓一箱一萬六千韓圓。" },
        { label: "敏俊", text: "有點貴，算便宜一點。" }, { label: "老闆", text: "那麼一萬五千韓圓給你。" },
        { label: "敏俊", text: "好，那麼請給我三個蘋果，還有一箱草莓。" }
      ] }]
    }
  },
  {
    id: "b1-17", label: "初級1-17", titleKo: "이건 로션이에요?", titleZh: "這個是乳液嗎？",
    theme: "非格式體語尾與美妝品單字", sourcePdf: "docs/lessons/new/0914.pdf",
    media: { hero: asset("b1-17-dialogue-person") },
    dialogues: [
      { title: "本課對話：在藥妝店", image: asset("b1-17-dialogue-person"), objectImage: asset("b1-17-dialogue-object"), lines: [
        l("민준", "이건 로션이에요?", "敏俊：這個是乳液嗎？", [["이건", "i-geon", "這個（이것은 的縮寫）"], ["로션이에요", "ro-syeon-i-e-yo", "是乳液嗎？"]]),
        l("점원", "로션이 아니에요. 에센스예요.", "店員：不是乳液，是精華液。", [["로션이", "ro-syeon-i", "乳液（主語）"], ["아니에요", "a-ni-e-yo", "不是"], ["에센스예요", "e-sen-seu-ye-yo", "是精華液"]]),
        l("민준", "그러면 로션은 어디에 있습니까?", "敏俊：那麼乳液在哪裡？", [["그러면", "geu-reo-myeon", "那麼"], ["로션은", "ro-syeon-eun", "乳液（主題）"], ["어디에", "eo-di-e", "在哪裡"], ["있습니까", "it-seum-ni-kka", "有嗎？／在嗎？"]]),
        l("점원", "저쪽에 있습니다.", "店員：在那邊。", [["저쪽에", "jeo-jjok-e", "在那邊"], ["있습니다", "it-seum-ni-da", "在／有"]]),
        l("민준", "네, 감사합니다.", "敏俊：好，謝謝。", [["네", "ne", "好／是"], ["감사합니다", "gam-sa-ham-ni-da", "謝謝"]])
      ] },
      { title: "換你說說看（保留空格）", image: asset("b1-17-practice-person"), objectImage: asset("b1-17-practice-visual"), lines: [
        l("A", "한국 사람이에요?", "是韓國人嗎？", [["한국", "han-guk", "韓國"], ["사람이에요", "sa-ram-i-e-yo", "是人嗎？"]]),
        l("B", "아니요. ____________________.", "不是。請用非格式體語尾回答。", [["아니요", "a-ni-yo", "不／不是"]]),
        l("A", "여기가 타이난이에요?", "這裡是台南嗎？", [["여기가", "yeo-gi-ga", "這裡（主語）"], ["타이난이에요", "ta-i-nan-i-e-yo", "是台南嗎？"]]),
        l("B", "아니요, ____________________.", "不是，請用非格式體語尾回答。", [["아니요", "a-ni-yo", "不／不是"]]),
        l("A", "학생이에요?", "是學生嗎？", [["학생이에요", "hak-saeng-i-e-yo", "是學生嗎？"]]),
        l("B", "네/아니요, ____________________.", "請選擇肯定或否定，再完成句子。", [["네", "ne", "是／好"], ["아니요", "a-ni-yo", "不／不是"]]),
        l("A", "김치는 대만 음식이에요?", "泡菜是台灣食物嗎？", [["김치는", "gim-chi-neun", "泡菜（主題）"], ["대만", "dae-man", "台灣"], ["음식이에요", "eum-sik-i-e-yo", "是食物嗎？"]]),
        l("B", "____________________.", "請用 아니에요 完整回答。", [["아니에요", "a-ni-e-yo", "不是"]])
      ] }
    ],
    vocabulary: [
      ...withImage("b1-17-vocab-page-1", skincare),
      ...withImage("b1-17-vocab-page-2", bathroom)
    ],
    guide: {
      label: "非格式體語尾", title: "N이에요／예요・N이／가 아니에요",
      hint: "이에요／예요 和 아니에요 用於一般禮貌場合；有尾音的名詞接 이에요 或 이 아니에요，沒有尾音的名詞接 예요 或 가 아니에요。",
      sections: [
        { heading: "是：有尾音用 이에요，無尾音用 예요（第 3–5 頁）", words: words([
          ["이에요", "i-e-yo", "是（接在有尾音名詞後）"], ["예요", "ye-yo", "是（接在無尾音名詞後）"],
          ["학생이에요", "hak-saeng-i-e-yo", "是學生"], ["한국 사람이에요", "han-guk- -sa-ram-i-e-yo", "是韓國人"],
          ["타이베이는 대만의 수도예요", "ta-i-be-i-neun- -dae-man-ui- -su-do-ye-yo", "台北是台灣的首都"],
          ["그 건물은 학교예요", "geu- -geon-mu-reun- -hak-gyo-ye-yo", "那棟建築物是學校"],
          ["이것은 시계예요", "i-geo-seun- -si-gye-ye-yo", "這是手錶"]
        ]) },
        { heading: "不是：N이／가 아니에요（第 6–8 頁）", words: words([
          ["아니에요", "a-ni-e-yo", "不是"], ["학생이 아니에요", "hak-saeng-i- -a-ni-e-yo", "不是學生"],
          ["술은 음료수가 아니에요", "su-reun- -eum-nyo-su-ga- -a-ni-e-yo", "酒不是飲料"],
          ["선생님은 남자가 아니에요", "seon-saeng-ni-meun- -nam-ja-ga- -a-ni-e-yo", "老師不是男性"],
          ["김치는 과자가 아니에요", "gim-chi-neun- -gwa-ja-ga- -a-ni-e-yo", "泡菜不是餅乾零食"],
          ["태국은 섬나라가 아니에요", "tae-gu-geun- -seom-na-ra-ga- -a-ni-e-yo", "泰國不是島國"]
        ]) },
        { heading: "美妝品（第 9–12 頁）", words: words(cosmetics) },
        { heading: "對話補充詞", words: words([
          ["건물", "geon-mul", "建築物／樓"], ["시계", "si-gye", "手錶"], ["과자", "gwa-ja", "餅乾／零食"],
          ["섬나라", "seom-na-ra", "島國"], ["드럭스토어", "deu-reok-seu-to-eo", "藥妝店"], ["저쪽", "jeo-jjok", "那邊"]
        ]) }
      ],
      practice: {
        heading: "完成 이에요／예요 與 아니에요", hint: "先判斷名詞最後有沒有收音，再選 이에요／예요；否定句用 이／가 아니에요。", valueSuffix: "",
        items: [
          { value: "我是學生", answer: w("학생이에요", "hak-saeng-i-e-yo", "是學生") },
          { value: "台北是台灣的首都", answer: w("타이베이는 대만의 수도예요", "ta-i-be-i-neun- -dae-man-ui- -su-do-ye-yo", "台北是台灣的首都") },
          { value: "不是韓國人", answer: w("한국 사람이 아니에요", "han-guk- -sa-ram-i- -a-ni-e-yo", "不是韓國人") },
          { value: "不是乳液，是精華液", answer: w("로션이 아니에요. 에센스예요.", "ro-syeon-i- -a-ni-e-yo- -e-sen-seu-ye-yo", "不是乳液，是精華液") }
        ],
        prompts: [
          { page: "第 5 頁", ko: "저는 학생 / 타이베이는 대만의 수도 / 버블티는 대만 음식 / 선생님은 여자 / 관우 씨는 대만 사람", zh: "請替每個名詞選擇 이에요 或 예요，說出完整句子。" },
          { page: "第 8 頁", ko: "선생님은 한국 사람 / 저는 대학생 / 버블티는 대만 음료수 / 타이난은 대만의 수도 / 관우 씨는 태국 사람", zh: "請替每個名詞選擇 이 아니에요 或 가 아니에요。" },
          { page: "第 14 頁", ko: "한국 사람이에요? / 여기가 타이난이에요? / 학생이에요? / 김치는 대만 음식이에요?", zh: "扮演 B，使用 이에요／예요 或 아니에요 回答 A 的問題。" }
        ]
      },
      sourceNotes: [{ heading: "來源重點", lines: [
        "이에요／예요 是一般禮貌的『是』；이에요 接有尾音名詞，예요 接無尾音名詞。",
        "아니에요 是一般禮貌的『不是』；有尾音用 이 아니에요，無尾音用 가 아니에요。",
        "保留原課件的美妝品單字；스킨 在此指化妝水，不是英文 skin 的一般意思。",
        "本課對話位於第 13 頁，換你說說看位於第 14 頁，中文翻譯位於第 17 頁。"
      ] }],
      references: [{ heading: "附錄：對話翻譯（第 17 頁）", entries: [
        { label: "敏俊", text: "這是乳液嗎？" }, { label: "店員", text: "不是乳液，是精華液。" },
        { label: "敏俊", text: "那麼乳液在哪裡？" }, { label: "店員", text: "在那邊。" }, { label: "敏俊", text: "好，謝謝。" }
      ] }]
    }
  },
  {
    id: "b1-18", label: "初級1-18", titleKo: "며칠 한국에 갑니까?", titleZh: "幾號去韓國？",
    theme: "月份、日期與時間表達", sourcePdf: "docs/lessons/new/0916.pdf",
    media: { hero: asset("b1-18-dialogue-person") },
    dialogues: [
      { title: "本課對話：旅行日期", image: asset("b1-18-dialogue-person"), objectImage: asset("b1-18-dialogue-object"), lines: [
        l("관우", "다음 주 언제 시간 있습니까?", "冠宇：下星期何時有空？", [["다음", "da-eum", "下／下一個"], ["주", "ju", "星期／週"], ["언제", "eon-je", "何時"], ["시간", "si-gan", "時間"], ["있습니까", "it-seum-ni-kka", "有嗎？"]]),
        l("민준", "다음 주 시간이 없습니다. 한국에 갑니다.", "敏俊：下星期沒空。回韓國。", [["다음", "da-eum", "下／下一個"], ["주", "ju", "星期／週"], ["시간이", "si-gan-i", "時間（主語）"], ["없습니다", "eop-seum-ni-da", "沒有"], ["한국에", "han-guk-e", "去韓國"], ["갑니다", "gam-ni-da", "去"]]),
        l("관우", "그렇습니까? 며칠 한국에 갑니까?", "冠宇：是嗎？幾號去韓國？", [["그렇습니까", "geu-reo-seum-ni-kka", "是嗎？"], ["며칠", "myeo-chil", "幾號／哪一天"], ["한국에", "han-guk-e", "去韓國"], ["갑니까", "gam-ni-kka", "去嗎？"]]),
        l("민준", "16일에 갑니다.", "敏俊：16號去。", [["십육일에", "sip-yuk-il-e", "16號（讀作 십육일）"], ["갑니다", "gam-ni-da", "去"]])
      ] },
      { title: "換你說說看（保留空格）", image: asset("b1-18-practice-person"), objectImage: asset("b1-18-practice-visual"), lines: [
        l("A", "언제 일본에 갑니까?", "什麼時候去日本？", [["언제", "eon-je", "何時"], ["일본에", "il-bon-e", "去日本"], ["갑니까", "gam-ni-kka", "去嗎？"]]),
        l("B", "3/27 → ____________________", "請把 3/27 念成韓文日期。", [["삼월 이십칠일", "sam-wol- -i-sip-chil-il", "3月27日"]]),
        l("A", "생일이 언제입니까?", "生日是什麼時候？", [["생일이", "saeng-il-i", "生日（主語）"], ["언제입니까", "eon-je-im-ni-kka", "是什麼時候？"]]),
        l("B", "____________________.", "請回答自己的生日。", [["생일", "saeng-il", "生日"]]),
        l("A", "언제 시간이 있습니까?", "什麼時候有空？", [["언제", "eon-je", "何時"], ["시간이", "si-gan-i", "時間（主語）"], ["있습니까", "it-seum-ni-kka", "有嗎？"]]),
        l("B", "____________________.", "請用日期或相對時間回答。", [["시간", "si-gan", "時間"]])
      ] }
    ],
    vocabulary: withImage("b1-18-vocab-page", calendarVocabulary),
    guide: {
      label: "月份與日期", title: "月份、日期與時間에",
      hint: "月份和日期使用漢字數詞加 월／일；要說在某個具體時間或日期做事，就在時間後加 에。어제、오늘、내일 等相對時間詞通常不加 에。",
      sections: [
        { heading: "月份（월）", words: words(months) },
        { heading: "日期（일）", words: words(dates) },
        { heading: "相對時間：通常不加 에（第 11 頁）", words: words(relativeDays) },
        { heading: "時間、地點與動作（第 10 頁）", words: words([
          ["내일", "nae-il", "明天"], ["4월 15일", "sa-wol- -sip-o-il", "4月15日"], ["모레", "mo-re", "後天"],
          ["6월 10일", "yu-wol- -sip-il", "6月10日"], ["10월 5일", "si-wol- -o-il", "10月5日"], ["그저께", "geu-jeo-kke", "前天"],
          ["학교", "hak-gyo", "學校"], ["백화점", "baek-hwa-jeom", "百貨公司"], ["집", "jip", "家"],
          ["고향", "go-hyang", "故鄉"], ["회사", "hoe-sa", "公司"], ["식당", "sik-ttang", "餐廳"],
          ["공부합니다", "gong-bu-ham-ni-da", "學習"], ["쇼핑했습니다", "syo-ping-haet-seum-ni-da", "逛街了"],
          ["동생을 만납니다", "dong-saeng-eul- -man-nam-ni-da", "見弟弟／妹妹"], ["회의를 합니다", "hoe-ui-reul- -ham-ni-da", "開會"],
          ["불고기를 먹었습니다", "bul-go-gi-reul- -meo-geot-seum-ni-da", "吃了烤肉"]
        ]) },
        { heading: "季節與星期周次（第 12、14 頁）", words: words([...seasons, ...weekWords, ["며칠", "myeo-chil", "幾號／哪一天"], ["언제", "eon-je", "何時"]]) },
        { heading: "時間助詞 에（第 9 頁）", words: words([
          ["2월 14일에", "i-wol- -sip-sa-il-e", "在2月14日"], ["10월 10일에", "si-wol- -sip-il-e", "在10月10日"],
          ["4월 10일에", "sa-wol- -sip-il-e", "在4月10日"], ["댁", "daek", "家的尊稱"]
        ]) }
      ],
      practice: {
        heading: "說出月份、日期與時間", hint: "具體日期後加 에；日期本身讀作「○월 ○일」。注意 6月是 유월，10月是 시월。", valueSuffix: "",
        items: [
          { value: "1月", answer: w("일월", "il-wol", "1月") },
          { value: "6月", answer: w("유월", "yu-wol", "6月") },
          { value: "10/17", answer: w("시월 십칠일", "si-wol- -sip-chil-il", "10月17日") },
          { value: "2/14＋看電影", answer: w("이월 십사일에 여자 친구하고 영화 봅니다", "i-wol- -sip-sa-il-e- -yeo-ja- -chin-gu-ha-go- -yeong-hwa- -bom-ni-da", "2月14日和女朋友看電影") },
          { value: "10/10＋去韓國", answer: w("시월 십일에 한국에 갑니다", "si-wol- -sip-il-e- -han-guk-e- -gam-ni-da", "10月10日去韓國") },
          { value: "10/5＋在故鄉見弟弟", answer: w("시월 오일에 고향에서 동생을 만납니다", "si-wol- -o-il-e- -go-hyang-e-seo- -dong-saeng-eul- -man-nam-ni-da", "10月5日在故鄉見弟弟") },
          { value: "明天在學校讀書", answer: w("내일 학교에서 공부합니다", "nae-il- -hak-gyo-e-seo- -gong-bu-ham-ni-da", "明天在學校讀書") }
        ],
        prompts: [
          { page: "第 4 頁", ko: "一月／二月／三月／四月／五月／六月／七月／八月／九月／十月／十一月／十二月", zh: "隨機挑一個月份，說出它的韓文；特別注意 유월、시월。" },
          { page: "第 6 頁", ko: "13日／1日／6日／29日／21日／20日／30日／31日／15日", zh: "隨機挑一個日期，使用漢字數詞加 일 說出韓文。" },
          { page: "第 10 頁", ko: "時間：내일／4월 15일／모레／6월 10일／10월 5일／그저께；地點：학교／백화점／집／고향／회사／식당", zh: "從時間、地點、動作欄各選一項，造出完整句子。" },
          { page: "第 11 頁", ko: "어제 어디에 갔습니까? / 오늘 뭐 합니까? / 내일 시간이 있습니까?", zh: "相對時間詞前面不加 에，請回答三個問題。" },
          { page: "第 13 頁", ko: "어느 계절을 좋아합니까? / ____에는 사람들이 바다에 갑니다. / 한국의 ____은 춥습니다.", zh: "用 봄、여름、가을、겨울 說出你喜歡的季節並完成句子。" },
          { page: "第 15 頁", ko: "언제 일본에 갑니까? / 생일이 언제입니까? / 언제 시간이 있습니까?", zh: "用具體日期或相對時間回答開放式問題。" }
        ]
      },
      sourceNotes: [{ heading: "來源重點", lines: [
        "月份與日期用漢字數詞加 월／일；6月的固定讀法是 유월，10月是 시월。",
        "說明具體時間或日期時，在後方加 에，例如 10월 10일에 한국에 갑니다。",
        "어제、오늘、내일、모레 等相對時間詞通常直接放在句中，不加 에；本課也整理韓國四季。",
        "本課對話位於第 14 頁，換你說說看位於第 15 頁，中文翻譯位於第 18 頁。"
      ] }],
      references: [{ heading: "附錄：對話翻譯（第 18 頁）", entries: [
        { label: "冠宇", text: "下星期何時有空？" }, { label: "敏俊", text: "下星期沒空。回韓國。" },
        { label: "冠宇", text: "是嗎？幾號回去？" }, { label: "敏俊", text: "16號去。" }
      ] }]
    }
  }
];
