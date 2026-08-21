import { decomposeHangulWord } from "../utils/hangul.js";

function word(text, roman, zh, emoji = "✦") {
  return {
    text,
    roman,
    zh,
    emoji,
    syllables: decomposeHangulWord(text, roman)
  };
}

function line(speaker, ko, zh, tokens) {
  return { speaker, ko, zh, tokens };
}

function phrase(text, roman, zh) {
  return word(text, roman, zh, "💬");
}

const travelVocabulary = [
  // The first stop: polite words that make every interaction easier.
  word("안녕하세요", "an-nyeong-ha-se-yo", "您好", "👋"),
  word("감사합니다", "gam-sa-ham-ni-da", "謝謝", "🙇"),
  word("죄송합니다", "joe-song-ham-ni-da", "對不起／不好意思", "🙏"),
  word("주세요", "ju-se-yo", "請給我／請…", "🤲"),
  word("잠시만요", "jam-si-man-yo", "請等一下", "⏳"),
  word("괜찮아요", "gwaen-chan-a-yo", "沒關係／可以", "👌"),

  // Airport and getting around.
  word("한국", "han-guk", "韓國", "🇰🇷"),
  word("여행", "yeo-haeng", "旅行", "🧳"),
  word("공항", "gong-hang", "機場", "✈️"),
  word("여권", "yeo-gwon", "護照", "🛂"),
  word("짐", "jim", "行李", "🧳"),
  word("출구", "chul-gu", "出口", "🚪"),
  word("화장실", "hwa-jang-sil", "洗手間", "🚻"),
  word("지하철", "ji-ha-cheol", "地鐵", "🚇"),
  word("버스", "beo-seu", "公車", "🚌"),
  word("택시", "taek-si", "計程車", "🚕"),
  word("기차", "gi-cha", "火車", "🚆"),
  word("표", "pyo", "票", "🎫"),
  word("어디", "eo-di", "哪裡", "📍"),
  word("왼쪽", "oen-jjok", "左邊", "⬅️"),
  word("오른쪽", "o-reun-jjok", "右邊", "➡️"),

  // A safe hotel check-in.
  word("호텔", "ho-tel", "飯店", "🏨"),
  word("예약", "ye-yak", "預約／訂房", "📅"),
  word("체크인", "che-keu-in", "入住手續", "🛎️"),
  word("방", "bang", "房間", "🛏️"),
  word("열쇠", "yeol-soe", "鑰匙", "🔑"),
  word("문제", "mun-je", "問題", "⚠️"),

  // Food and café essentials.
  word("식당", "sik-ttang", "餐廳", "🍽️"),
  word("메뉴판", "me-nyu-pan", "菜單", "📖"),
  word("물", "mul", "水", "💧"),
  word("커피", "keo-pi", "咖啡", "☕"),
  word("음식", "eum-sik", "食物", "🍜"),
  word("맛있어요", "ma-si-sseo-yo", "好吃", "😋"),
  word("매워요", "mae-wo-yo", "辣", "🌶️"),
  word("추천", "chu-cheon", "推薦", "⭐"),
  word("계산서", "gye-san-seo", "帳單", "🧾"),

  // Shopping and small problems.
  word("얼마예요", "eol-ma-ye-yo", "多少錢？", "💰"),
  word("비싸요", "bi-ssa-yo", "很貴", "💸"),
  word("싸요", "ssa-yo", "便宜", "🏷️"),
  word("카드", "ka-deu", "信用卡／卡片", "💳"),
  word("현금", "hyeon-geum", "現金", "💵"),
  word("영수증", "yeong-su-jeung", "收據", "🧾"),
  word("도와주세요", "do-wa-ju-se-yo", "請幫幫我", "🆘"),
  word("잃어버렸어요", "il-heo-beo-ryeo-sseo-yo", "弄丟了", "🔎"),
  word("경찰", "gyeong-chal", "警察", "👮")
];

const byText = new Map(travelVocabulary.map((item) => [item.text, item]));

function token(text, roman, zh) {
  return byText.get(text) ?? word(text, roman, zh);
}

const travel = {
  안녕하세요: byText.get("안녕하세요"),
  감사합니다: byText.get("감사합니다"),
  죄송합니다: byText.get("죄송합니다"),
  주세요: byText.get("주세요"),
  잠시만요: byText.get("잠시만요"),
  괜찮아요: byText.get("괜찮아요"),
  한국: byText.get("한국"),
  여행: byText.get("여행"),
  공항: byText.get("공항"),
  여권: byText.get("여권"),
  짐: byText.get("짐"),
  출구: byText.get("출구"),
  화장실: byText.get("화장실"),
  지하철: byText.get("지하철"),
  버스: byText.get("버스"),
  택시: byText.get("택시"),
  기차: byText.get("기차"),
  표: byText.get("표"),
  어디: byText.get("어디"),
  왼쪽: byText.get("왼쪽"),
  오른쪽: byText.get("오른쪽"),
  호텔: byText.get("호텔"),
  예약: byText.get("예약"),
  체크인: byText.get("체크인"),
  방: byText.get("방"),
  열쇠: byText.get("열쇠"),
  문제: byText.get("문제"),
  식당: byText.get("식당"),
  메뉴판: byText.get("메뉴판"),
  물: byText.get("물"),
  커피: byText.get("커피"),
  음식: byText.get("음식"),
  맛있어요: byText.get("맛있어요"),
  매워요: byText.get("매워요"),
  추천: byText.get("추천"),
  계산서: byText.get("계산서"),
  얼마예요: byText.get("얼마예요"),
  비싸요: byText.get("비싸요"),
  싸요: byText.get("싸요"),
  카드: byText.get("카드"),
  현금: byText.get("현금"),
  영수증: byText.get("영수증"),
  도와주세요: byText.get("도와주세요"),
  잃어버렸어요: byText.get("잃어버렸어요"),
  경찰: byText.get("경찰")
};

const extra = {
  처음: token("처음", "cheo-eum", "第一次"),
  한국에: token("한국에", "han-gu-ge", "在韓國／到韓國"),
  왔어요: token("왔어요", "wa-sseo-yo", "來了／到了"),
  한국어를: token("한국어를", "han-gu-geo-reul", "韓語（受詞）"),
  한국어: token("한국어", "han-gu-geo", "韓語"),
  잘: token("잘", "jal", "好好地／很會"),
  못해요: token("못해요", "mot-hae-yo", "不會／做不到"),
  천천히: token("천천히", "cheon-cheon-hi", "慢慢地"),
  말해: token("말해", "mal-hae", "說"),
  어떻게: token("어떻게", "eo-tteo-ke", "怎麼／如何"),
  가요: token("가요", "ga-yo", "去／怎麼走"),
  타고: token("타고", "ta-go", "搭乘後／搭著"),
  싶어요: token("싶어요", "sip-eo-yo", "想要"),
  어디에서: token("어디에서", "eo-di-e-seo", "在哪裡／從哪裡"),
  사요: token("사요", "sa-yo", "買"),
  공항에서: token("공항에서", "gong-hang-e-seo", "在機場"),
  호텔까지: token("호텔까지", "ho-tel-kka-ji", "到飯店為止"),
  지하철을: token("지하철을", "ji-ha-cheol-eul", "地鐵（受詞）"),
  표는: token("표는", "pyo-neun", "票（主題）"),
  오른쪽으로: token("오른쪽으로", "o-reun-jjok-eu-ro", "往右邊"),
  가세요: token("가세요", "ga-se-yo", "請走／請往…"),
  왼쪽이에요: token("왼쪽이에요", "oen-jjok-i-e-yo", "在左邊"),
  예약했어요: token("예약했어요", "ye-yak-hae-sseo-yo", "預約了"),
  체크인하고: token("체크인하고", "che-keu-in-ha-go", "辦理入住並且"),
  하고: token("하고", "ha-go", "和／做…並且"),
  여권을: token("여권을", "yeo-gwon-eul", "護照（受詞）"),
  보여: token("보여", "bo-yeo", "出示／給看"),
  방에: token("방에", "bang-e", "在房間／對房間"),
  문제가: token("문제가", "mun-je-ga", "問題（主語）"),
  있어요: token("있어요", "it-seo-yo", "有／在"),
  잃어버렸어요: travel.잃어버렸어요,
  저기요: token("저기요", "jeo-gi-yo", "不好意思／請問"),
  이거: token("이거", "i-geo", "這個"),
  뭐예요: token("뭐예요", "mwo-ye-yo", "是什麼？"),
  추천해: token("추천해", "chu-cheon-hae", "推薦"),
  안: token("안", "an", "不／沒"),
  매운: token("매운", "mae-un", "辣的"),
  화장실은: token("화장실은", "hwa-jang-sil-eun", "洗手間（主題）"),
  오른쪽이에요: token("오른쪽이에요", "o-reun-jjok-i-e-yo", "在右邊"),
  계산서: travel.계산서,
  돼요: token("돼요", "dwae-yo", "可以嗎／可以"),
  조금: token("조금", "jo-geum", "一點／有點"),
  더: token("더", "deo", "更／再"),
  싼: token("싼", "ssan", "便宜的"),
  거: token("거", "geo", "東西／個（口語）"),
  지갑을: token("지갑을", "ji-gap-eul", "錢包（受詞）"),
  불러: token("불러", "bul-leo", "叫來"),
  화장실이: token("화장실이", "hwa-jang-sil-i", "洗手間（主語）")
};

export const specialCourses = [
  {
    id: "travel-korean-essentials",
    label: "Special 01",
    titleKo: "한국 여행, 시작해요!",
    titleZh: "韓國旅行生存韓語",
    theme: "旅行韓語 · 從機場到點餐的高頻口語",
    description: "把影片裡的 140 句旅行口語濃縮成 5 個情境、45 個先學會就能用的單字。",
    isSpecial: true,
    initialView: "guide",
    heroEmoji: "🧳",
    sourceUrl: "https://youtu.be/OCjVc69Xt1o?si=Yvs3Rjc6rMxsw_HA",
    media: {},
    dialogues: [
      {
        title: "先打招呼",
        lines: [
          line("A", "안녕하세요. 한국에 처음 왔어요.", "你好，我第一次來韓國。", [travel.안녕하세요, extra.한국에, extra.처음, extra.왔어요]),
          line("B", "안녕하세요. 반갑습니다.", "你好，很高興認識你。", [travel.안녕하세요, token("반갑습니다", "ban-gap-seum-ni-da", "很高興認識你")]),
          line("A", "한국어를 잘 못해요. 천천히 말해 주세요.", "我不太會韓語，請慢慢說。", [extra.한국어를, extra.잘, extra.못해요, extra.천천히, extra.말해, travel.주세요])
        ]
      },
      {
        title: "機場與交通",
        lines: [
          line("A", "공항에서 호텔까지 어떻게 가요?", "從機場到飯店怎麼走？", [extra.공항에서, extra.호텔까지, extra.어떻게, extra.가요]),
          line("B", "지하철을 타고 싶어요.", "我想搭地鐵。", [extra.지하철을, extra.타고, extra.싶어요]),
          line("A", "표는 어디에서 사요?", "車票在哪裡買？", [extra.표는, extra.어디에서, extra.사요]),
          line("B", "화장실은 오른쪽이에요.", "洗手間在右邊。", [extra.화장실은, extra.오른쪽이에요])
        ]
      },
      {
        title: "飯店入住",
        lines: [
          line("A", "예약했어요. 체크인하고 싶어요.", "我有預約，想辦理入住。", [extra.예약했어요, extra.체크인하고, extra.싶어요]),
          line("B", "여권을 보여 주세요.", "請出示護照。", [extra.여권을, extra.보여, travel.주세요]),
          line("A", "방에 문제가 있어요.", "房間有問題。", [extra.방에, extra.문제가, extra.있어요]),
          line("B", "잠시만요. 확인해 드릴게요.", "請稍等，我幫您確認。", [travel.잠시만요, token("확인해", "hwa-gin-hae", "確認"), token("드릴게요", "deu-ril-ge-yo", "會為您做")])
        ]
      },
      {
        title: "餐廳與咖啡",
        lines: [
          line("A", "저기요, 메뉴판 주세요.", "不好意思，請給我菜單。", [extra.저기요, travel.메뉴판, travel.주세요]),
          line("B", "이거 뭐예요? 추천해 주세요.", "這個是什麼？請推薦給我。", [extra.이거, extra.뭐예요, extra.추천해, travel.주세요]),
          line("A", "물 주세요. 안 매운 음식 있어요?", "請給我水。有不辣的食物嗎？", [travel.물, travel.주세요, extra.안, extra.매운, travel.음식, extra.있어요]),
          line("B", "계산서 주세요. 카드 돼요?", "請給我帳單。可以刷卡嗎？", [travel.계산서, travel.주세요, travel.카드, extra.돼요])
        ]
      },
      {
        title: "購物與求助",
        lines: [
          line("A", "이거 얼마예요?", "這個多少錢？", [extra.이거, travel.얼마예요]),
          line("B", "조금 비싸요. 더 싼 거 있어요?", "有點貴，有更便宜的嗎？", [extra.조금, travel.비싸요, extra.더, extra.싼, extra.거, extra.있어요]),
          line("A", "카드 돼요? 영수증 주세요.", "可以刷卡嗎？請給我收據。", [travel.카드, extra.돼요, travel.영수증, travel.주세요]),
          line("B", "지갑을 잃어버렸어요. 도와주세요.", "我的錢包弄丟了，請幫幫我。", [extra.지갑을, extra.잃어버렸어요, travel.도와주세요])
        ]
      }
    ],
    vocabulary: travelVocabulary,
    guide: {
      label: "旅遊單字地圖",
      title: "先背這 6 組旅行關鍵字",
      hint: "先點單字聽發音，再用左側情境短句把它說出來；中文＋韓文播放適合第一次複習。",
      sections: [
        {
          heading: "1 · 禮貌與求助",
          words: [travel.안녕하세요, travel.감사합니다, travel.죄송합니다, travel.주세요, travel.잠시만요, travel.괜찮아요, travel.도와주세요]
        },
        {
          heading: "2 · 機場與移動",
          words: [travel.한국, travel.여행, travel.공항, travel.여권, travel.짐, travel.출구, travel.화장실, travel.표]
        },
        {
          heading: "3 · 交通與方向",
          words: [travel.지하철, travel.버스, travel.택시, travel.기차, travel.어디, travel.왼쪽, travel.오른쪽]
        },
        {
          heading: "4 · 飯店入住",
          words: [travel.호텔, travel.예약, travel.체크인, travel.방, travel.열쇠, travel.문제]
        },
        {
          heading: "5 · 用餐必備",
          words: [travel.식당, travel.메뉴판, travel.물, travel.커피, travel.음식, travel.맛있어요, travel.매워요, travel.추천, travel.계산서]
        },
        {
          heading: "6 · 購物與遺失物",
          words: [travel.얼마예요, travel.비싸요, travel.싸요, travel.카드, travel.현금, travel.영수증, travel.잃어버렸어요, travel.경찰]
        }
      ],
      practice: {
        heading: "四句先開口",
        hint: "把中文情境換成韓文；點擊答案即可聽一次，再回到情境短句跟讀。",
        valueSuffix: "",
        items: [
          { value: "問洗手間在哪裡", answer: phrase("화장실이 어디예요", "hwa-jang-sil-i-eo-di-ye-yo", "洗手間在哪裡？") },
          { value: "請給我水", answer: phrase("물 주세요", "mul-ju-se-yo", "請給我水。") },
          { value: "請推薦", answer: phrase("추천해 주세요", "chu-cheon-hae-ju-se-yo", "請推薦給我。") },
          { value: "請幫幫我", answer: phrase("도와주세요", "do-wa-ju-se-yo", "請幫幫我。") }
        ],
        prompts: [
          { page: "交通", ko: "공항에서 ______까지 어떻게 가요?", zh: "把空格換成你的目的地，例如 호텔。", pattern: "地點 + 까지 + 어떻게 가요?" },
          { page: "餐廳", ko: "______ 주세요.", zh: "把空格換成你想要的食物或飲料，例如 물／커피。", pattern: "名詞 + 주세요" },
          { page: "購物", ko: "이거 얼마예요?", zh: "拿起任何商品都可以直接問價格。", pattern: "이거 = 這個；얼마예요? = 多少錢？" }
        ]
      },
      sourceNotes: [
        {
          heading: "這堂特別課怎麼整理",
          lines: [
            "參考連結影片「萬用韓語旅行口語練習」的零基礎、附讀音、情境式練習方向，先取最常在旅途中遇到的機場、交通、住宿、用餐、購物與求助場景。",
            "這一頁把大量句子拆成可以替換的關鍵字：先背單字，再把它放回左側短句；不需要一次記完 140 句。",
            "羅馬拼音只作入口提示；熟悉後請以播放鍵與韓文字形為主。"
          ]
        }
      ]
    }
  }
];
