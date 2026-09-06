import { assetPath } from "../utils/assets.js";
import { decomposeHangulWord } from "../utils/hangul.js";

const asset = (name) => assetPath(`assets/course-lessons/${name}.png`);
const w = (text, roman, zh) => ({ text, roman, zh, syllables: decomposeHangulWord(text, roman) });
const words = (rows) => rows.map((row) => w(...row));
const priceReadings = {
  "2000원입니다": "이천원입니다", "16000원입니다": "만육천원입니다",
  "15000원에": "만오천원에", "52000원입니다": "오만이천원입니다", "50000원에": "오만원에",
};
const l = (speaker, ko, zh, rows) => ({ speaker, ko, zh, tokens: words(rows).map((token) => {
  const displayText = Object.keys(priceReadings).find((price) => ko.includes(price) && priceReadings[price] === token.text);
  return displayText ? { ...token, displayText } : token;
}) });
const shared = (id, rows) => words(rows).map((item) => ({ ...item, image: asset(`${id}-vocab-page`) }));

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
  }
];
