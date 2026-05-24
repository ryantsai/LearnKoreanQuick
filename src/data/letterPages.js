import { assetPath } from "../utils/assets.js";
import { decomposeHangulWord } from "../utils/hangul.js";

// Keep this array aligned with the letterPages declaration order below.
const pageMemoryImages = [
  assetPath("assets/letter-pages/memory-pages/01.png"),
  assetPath("assets/letter-pages/memory-pages/02.png"),
  assetPath("assets/letter-pages/memory-pages/03.png"),
  assetPath("assets/letter-pages/memory-pages/04.png"),
  assetPath("assets/letter-pages/memory-pages/05.png"),
  assetPath("assets/letter-pages/memory-pages/06.png"),
  assetPath("assets/letter-pages/memory-pages/07.png"),
  assetPath("assets/letter-pages/memory-pages/08.png"),
  assetPath("assets/letter-pages/memory-pages/09.png"),
  assetPath("assets/letter-pages/memory-pages/10.png"),
  assetPath("assets/letter-pages/memory-pages/11.png"),
  assetPath("assets/letter-pages/memory-pages/12.png"),
  assetPath("assets/letter-pages/memory-pages/13.png"),
  assetPath("assets/letter-pages/memory-pages/14.png"),
  assetPath("assets/letter-pages/memory-pages/15.png"),
  assetPath("assets/letter-pages/memory-pages/16.png"),
  assetPath("assets/letter-pages/memory-pages/17.png"),
  assetPath("assets/letter-pages/memory-pages/18.png"),
  assetPath("assets/letter-pages/memory-pages/19.png"),
  assetPath("assets/letter-pages/memory-pages/20.png"),
  assetPath("assets/letter-pages/memory-pages/21.png"),
  assetPath("assets/letter-pages/memory-pages/22.png"),
  assetPath("assets/letter-pages/memory-pages/23.png"),
  assetPath("assets/letter-pages/memory-pages/24.png"),
  assetPath("assets/letter-pages/memory-pages/25.png"),
  assetPath("assets/letter-pages/memory-pages/26.png"),
  assetPath("assets/letter-pages/memory-pages/27.png"),
  assetPath("assets/letter-pages/memory-pages/28.png"),
  assetPath("assets/letter-pages/memory-pages/29.png"),
  assetPath("assets/letter-pages/memory-pages/30.png"),
  assetPath("assets/letter-pages/memory-pages/31.png"),
  assetPath("assets/letter-pages/memory-pages/32.png"),
  assetPath("assets/letter-pages/memory-pages/33.png"),
  assetPath("assets/letter-pages/memory-pages/34.png"),
  assetPath("assets/letter-pages/memory-pages/35.png"),
  assetPath("assets/letter-pages/memory-pages/36.png"),
  assetPath("assets/letter-pages/memory-pages/37.png"),
  assetPath("assets/letter-pages/memory-pages/38.png"),
  assetPath("assets/letter-pages/memory-pages/39.png"),
  assetPath("assets/letter-pages/memory-pages/40.png")
];

let pageSequence = 0;

function makePage(symbol, roman, theme, words) {
  const pageIndex = pageSequence;
  pageSequence += 1;
  const firstWordIndex = pageIndex * 5;
  const enrichedWords = words.map((word, wordIndex) => ({
    ...word,
    image: assetPath(`assets/letter-pages/words/word-${String(firstWordIndex + wordIndex + 1).padStart(3, "0")}.png`),
    syllables: decomposeHangulWord(word.hangul, word.roman)
  }));

  return {
    id: `page-${symbol}`,
    symbol,
    roman,
    title: `${symbol} · ${roman}`,
    memoryImage: pageMemoryImages[pageIndex],
    memoryTip: `把 ${symbol} 想成一個會在單字裡發光的小積木。先找出它，再把旁邊的子音接上去，聲音就會自己拼起來。`,
    playfulNote: `今天的任務：看到 ${symbol} 就在心裡按一下小鈴鐺，提醒自己這個音正在幫韓文字變有生命。`,
    story: makeFunnyStory(symbol, roman, enrichedWords, pageIndex),
    words: enrichedWords
  };
}

const storyExtrasBySymbol = {
  "ㅏ": {
    line: "加映任務：把韓服、漢江和市場貼在故事角落，讓 ㅏ 像逛首爾一樣一路張嘴前進。",
    words: [
      { hangul: "한복", zh: "韓服", roman: "han-bok" },
      { hangul: "한강", zh: "漢江", roman: "han-gang" },
      { hangul: "시장", zh: "市場", roman: "si-jang" }
    ]
  },
  "ㅐ": {
    line: "扁嘴偵探又查到三個新線索：色彩、發現和拍照，全部都要用 ae 的扁扁嘴型蓋章。",
    words: [
      { hangul: "색깔", zh: "顏色", roman: "saek-kkal" },
      { hangul: "발견", zh: "發現", roman: "bal-gyeon" },
      { hangul: "촬영", zh: "拍攝", roman: "chwa-ryeong" }
    ]
  },
  "ㅑ": {
    line: "夜市球隊突然開宵夜會，椰子水、香味和藥局都被喊成 ya 的加油口號。",
    words: [
      { hangul: "야식", zh: "宵夜", roman: "ya-sik" },
      { hangul: "향기", zh: "香氣", roman: "hyang-gi" },
      { hangul: "약국", zh: "藥局", roman: "yak-guk" }
    ]
  },
  "ㅒ": {
    line: "悄悄話電台插播一段：얘네、얘야、쟤네 全都像小孩指來指去，yae 一出聲就很有畫面。",
    words: [
      { hangul: "얘네", zh: "這些孩子／這些人", roman: "yae-ne" },
      { hangul: "얘야", zh: "孩子呀", roman: "yae-ya" },
      { hangul: "쟤네", zh: "那些孩子／那些人", roman: "jyae-ne" }
    ]
  },
  "ㅓ": {
    line: "迷路公車開過城市，轉進廚房，又在鏡子前停車；eo 的聲音像方向盤慢慢轉大圈。",
    words: [
      { hangul: "도시", zh: "城市", roman: "do-si" },
      { hangul: "부엌", zh: "廚房", roman: "bu-eok" },
      { hangul: "거울", zh: "鏡子", roman: "geo-ul" }
    ]
  },
  "ㅔ": {
    line: "睡衣派對追加三張邀請卡：世界、郵件、電梯，e 音像按鈴一樣短短亮起。",
    words: [
      { hangul: "세계", zh: "世界", roman: "se-gye" },
      { hangul: "메일", zh: "電子郵件", roman: "me-il" },
      { hangul: "엘리베이터", zh: "電梯", roman: "el-li-be-i-teo" }
    ]
  },
  "ㅕ": {
    line: "旅行隊多帶了護照、車站和紀念品，yeo 一念出來，整隊就像準備出發。",
    words: [
      { hangul: "여권", zh: "護照", roman: "yeo-kkwon" },
      { hangul: "역", zh: "車站", roman: "yeok" },
      { hangul: "기념품", zh: "紀念品", roman: "gi-nyeom-pum" }
    ]
  },
  "ㅖ": {
    line: "藝術展的 VIP 區放了禮貌、計畫和預約，ye 聽起來像正式場合的亮晶晶門鈴。",
    words: [
      { hangul: "예의", zh: "禮貌", roman: "ye-ui" },
      { hangul: "계획", zh: "計畫", roman: "gye-hoek" },
      { hangul: "예약", zh: "預約", roman: "ye-yak" }
    ]
  },
  "ㅗ": {
    line: "圓嘴賽車場旁邊開了圖書館、照相館和公園，o 音像一個個圓形路標。",
    words: [
      { hangul: "도서관", zh: "圖書館", roman: "do-seo-gwan" },
      { hangul: "사진관", zh: "照相館", roman: "sa-jin-gwan" },
      { hangul: "공원", zh: "公園", roman: "gong-won" }
    ]
  },
  "ㅘ": {
    line: "電話亭又收到畫家、觀光和水果三通電話，wa 像大家一起說「哇」。",
    words: [
      { hangul: "화가", zh: "畫家", roman: "hwa-ga" },
      { hangul: "관광", zh: "觀光", roman: "gwan-gwang" },
      { hangul: "과일", zh: "水果", roman: "gwa-il" }
    ]
  },
  "ㅙ": {
    line: "問答節目準備了超市、對話和矮桌，wae 的嘴型像先圓後扁的小問號。",
    words: [
      { hangul: "슈퍼마켓", zh: "超市", roman: "syu-peo-ma-ket" },
      { hangul: "대화", zh: "對話", roman: "dae-hwa" },
      { hangul: "왜소", zh: "矮小", roman: "wae-so" }
    ]
  },
  "ㅚ": {
    line: "外出公司把外交、聚會和灰色印在名片上，oe 像一個往外轉的小滑音。",
    words: [
      { hangul: "외교", zh: "外交", roman: "oe-gyo" },
      { hangul: "모임", zh: "聚會", roman: "mo-im" },
      { hangul: "회색", zh: "灰色", roman: "hoe-saek" }
    ]
  },
  "ㅛ": {
    line: "料理主播加播教育、孝順和表情，yo 像把嘴唇捲成小小料理鍋。",
    words: [
      { hangul: "교육", zh: "教育", roman: "gyo-yuk" },
      { hangul: "효도", zh: "孝順", roman: "hyo-do" },
      { hangul: "표정", zh: "表情", roman: "pyo-jeong" }
    ]
  },
  "ㅜ": {
    line: "牛奶舞會請來朋友、足球和郵局，u 音像杯子底下圓圓的回聲。",
    words: [
      { hangul: "친구", zh: "朋友", roman: "chin-gu" },
      { hangul: "축구", zh: "足球", roman: "chuk-gu" },
      { hangul: "우체국", zh: "郵局", roman: "u-che-guk" }
    ]
  },
  "ㅝ": {
    line: "冷笑話販賣機又吐出願望、月光和原味，wo 像硬幣滾進機器的圓聲。",
    words: [
      { hangul: "소원", zh: "願望", roman: "so-won" },
      { hangul: "월광", zh: "月光", roman: "wol-gwang" },
      { hangul: "원래", zh: "原本", roman: "wol-lae" }
    ]
  },
  "ㅞ": {
    line: "時尚秀的新配件是網站、軌跡和問答，we 像波浪先捲再亮。",
    words: [
      { hangul: "웹사이트", zh: "網站", roman: "web-sa-i-teu" },
      { hangul: "궤적", zh: "軌跡", roman: "gwe-jeok" },
      { hangul: "퀘스트", zh: "任務", roman: "kwe-seu-teu" }
    ]
  },
  "ㅟ": {
    line: "藏寶圖標出危險、廚房和休息，wi 像聲音往上滑到地圖角落。",
    words: [
      { hangul: "위험", zh: "危險", roman: "wi-heom" },
      { hangul: "취미", zh: "興趣", roman: "chwi-mi" },
      { hangul: "휴식", zh: "休息", roman: "hyu-sik" }
    ]
  },
  "ㅠ": {
    line: "新聞台播出留學、柚子和流行，yu 像一道亮亮的滑梯從嘴邊溜走。",
    words: [
      { hangul: "유학", zh: "留學", roman: "yu-hak" },
      { hangul: "유자", zh: "柚子", roman: "yu-ja" },
      { hangul: "유행", zh: "流行", roman: "yu-haeng" }
    ]
  },
  "ㅡ": {
    line: "食物銀行把韓文字、微笑和音樂存進保險箱，eu 音要把嘴拉平才打得開。",
    words: [
      { hangul: "한글", zh: "韓文字", roman: "han-geul" },
      { hangul: "미소", zh: "微笑", roman: "mi-so" },
      { hangul: "음악", zh: "音樂", roman: "eu-mak" }
    ]
  },
  "ㅢ": {
    line: "椅子會議新增議題：白衣、意見、希望，ui 像從 ㅡ 滑到 ㅣ 的小電梯。",
    words: [
      { hangul: "흰색", zh: "白色", roman: "huin-saek" },
      { hangul: "의견", zh: "意見", roman: "ui-gyeon" },
      { hangul: "희망", zh: "希望", roman: "hui-mang" }
    ]
  },
  "ㅣ": {
    line: "火車站加開機器、地圖和秘密車廂，i 音像一條直直的鐵軌。",
    words: [
      { hangul: "기계", zh: "機器", roman: "gi-gye" },
      { hangul: "지도", zh: "地圖", roman: "ji-do" },
      { hangul: "비밀", zh: "秘密", roman: "bi-mil" }
    ]
  },
  "ㄱ": {
    line: "露營隊長把韓國、價格和歌手排進行程，ㄱ 像咔一聲打開背包扣。",
    words: [
      { hangul: "한국", zh: "韓國", roman: "han-guk" },
      { hangul: "가격", zh: "價格", roman: "ga-gyeok" },
      { hangul: "가수", zh: "歌手", roman: "ga-su" }
    ]
  },
  "ㄲ": {
    line: "才藝秀把蜂蜜味升級成꼭、깜짝、깨끗，ㄲ 像緊緊彈出的驚喜按鈕。",
    words: [
      { hangul: "꼭", zh: "一定／緊緊地", roman: "kkok" },
      { hangul: "깜짝", zh: "嚇一跳", roman: "kkam-jjak" },
      { hangul: "깨끗", zh: "乾淨", roman: "kkae-kkeut" }
    ]
  },
  "ㄴ": {
    line: "鼻音地圖多了今天、年紀和南山，ㄴ 像路口轉角，念起來很穩。",
    words: [
      { hangul: "오늘", zh: "今天", roman: "o-neul" },
      { hangul: "나이", zh: "年紀", roman: "na-i" },
      { hangul: "남산", zh: "南山", roman: "nam-san" }
    ]
  },
  "ㄷ": {
    line: "豆腐橋旁邊有大門、茶道和圖章，ㄷ 像方方的橋墩站得很直。",
    words: [
      { hangul: "대문", zh: "大門", roman: "dae-mun" },
      { hangul: "다도", zh: "茶道", roman: "da-do" },
      { hangul: "도장", zh: "印章", roman: "do-jang" }
    ]
  },
  "ㄸ": {
    line: "熱舞課加練暖暖、分開和擦拭，ㄸ 像腳尖用力踩下去。",
    words: [
      { hangul: "따뜻해", zh: "溫暖", roman: "tta-tteut-hae" },
      { hangul: "따로", zh: "分開", roman: "tta-ro" },
      { hangul: "닦다", zh: "擦拭", roman: "ttak-da" }
    ]
  },
  "ㄹ": {
    line: "舌尖樂團加了道路、日曆和料理長，ㄹ 像舌頭輕輕彈一下又轉彎。",
    words: [
      { hangul: "도로", zh: "道路", roman: "do-ro" },
      { hangul: "달력", zh: "日曆", roman: "dal-lyeok" },
      { hangul: "요리사", zh: "廚師", roman: "yo-ri-sa" }
    ]
  },
  "ㅁ": {
    line: "方形咖啡館推出味道、村子和媽媽菜單，ㅁ 像嘴唇先合起來再打開。",
    words: [
      { hangul: "맛", zh: "味道", roman: "mat" },
      { hangul: "마을", zh: "村子", roman: "ma-eul" },
      { hangul: "엄마", zh: "媽媽", roman: "eom-ma" }
    ]
  },
  "ㅂ": {
    line: "海邊公車多停靠釜山、拌飯和袋子站，ㅂ 像車門砰一聲打開。",
    words: [
      { hangul: "부산", zh: "釜山", roman: "bu-san" },
      { hangul: "비빔밥", zh: "拌飯", roman: "bi-bim-bap" },
      { hangul: "봉투", zh: "袋子", roman: "bong-tu" }
    ]
  },
  "ㅃ": {
    line: "烘焙賽的新口令是빨간색、뻔뻔、뿜다，ㅃ 像麵團突然膨起來。",
    words: [
      { hangul: "빨간색", zh: "紅色", roman: "ppal-gan-saek" },
      { hangul: "뻔뻔", zh: "厚臉皮", roman: "ppeon-ppeon" },
      { hangul: "뿜다", zh: "噴出", roman: "ppum-da" }
    ]
  },
  "ㅅ": {
    line: "代課老師把首爾、照片和禮物寫上黑板，ㅅ 像一口輕輕滑出的氣。",
    words: [
      { hangul: "서울", zh: "首爾", roman: "seo-ul" },
      { hangul: "사진", zh: "照片", roman: "sa-jin" },
      { hangul: "선물", zh: "禮物", roman: "seon-mul" }
    ]
  },
  "ㅆ": {
    line: "超市廣播新增便條、雙胞胎和堆積，ㅆ 像把 s 音壓緊再放出來。",
    words: [
      { hangul: "쪽지", zh: "便條", roman: "jjok-ji" },
      { hangul: "쌍둥이", zh: "雙胞胎", roman: "ssang-dung-i" },
      { hangul: "쌓다", zh: "堆積", roman: "ssat-da" }
    ]
  },
  "ㅇ": {
    line: "隱形主持人把語言、旅行和音符放到結尾，ㅇ 開頭安靜，收尾變成 ng。",
    words: [
      { hangul: "언어", zh: "語言", roman: "eo-neo" },
      { hangul: "여행", zh: "旅行", roman: "yeo-haeng" },
      { hangul: "음표", zh: "音符", roman: "eum-pyo" }
    ]
  },
  "ㅈ": {
    line: "外送公司新接到濟州、紙和地鐵訂單，ㅈ 像車輪開始轉的 j 聲。",
    words: [
      { hangul: "제주", zh: "濟州", roman: "je-ju" },
      { hangul: "종이", zh: "紙", roman: "jong-i" },
      { hangul: "지하철", zh: "地鐵", roman: "ji-ha-cheol" }
    ]
  },
  "ㅉ": {
    line: "廚房辯論賽追加짜장면、찌르다、쫄깃，ㅉ 像筷子夾到彈牙麵條。",
    words: [
      { hangul: "짜장면", zh: "炸醬麵", roman: "jja-jang-myeon" },
      { hangul: "찌르다", zh: "刺／戳", roman: "jji-reu-da" },
      { hangul: "쫄깃", zh: "有嚼勁", roman: "jjol-git" }
    ]
  },
  "ㅊ": {
    line: "下午茶列車加開清溪川、邀請和行李站，ㅊ 像車掌吹出一口氣。",
    words: [
      { hangul: "청계천", zh: "清溪川", roman: "cheong-gye-cheon" },
      { hangul: "초대", zh: "邀請", roman: "cho-dae" },
      { hangul: "짐차", zh: "行李車", roman: "jim-cha" }
    ]
  },
  "ㅋ": {
    line: "攝影師多拍了韓式卡拉 OK、尺寸和卡片，ㅋ 像快門吐出一口亮亮的氣。",
    words: [
      { hangul: "코인노래방", zh: "投幣式練歌房", roman: "ko-in-no-rae-bang" },
      { hangul: "크기", zh: "大小", roman: "keu-gi" },
      { hangul: "카드", zh: "卡片", roman: "ka-deu" }
    ]
  },
  "ㅌ": {
    line: "透明劇場加入跆拳道、土曜和塔，ㅌ 像跳上台時吐出的清脆 t。",
    words: [
      { hangul: "태권도", zh: "跆拳道", roman: "tae-kwon-do" },
      { hangul: "토요일", zh: "星期六", roman: "to-yo-il" },
      { hangul: "타워", zh: "塔", roman: "ta-wo" }
    ]
  },
  "ㅍ": {
    line: "披薩郵局新增郵票、便利店和藍色信封，ㅍ 像吹一下就蓋好章。",
    words: [
      { hangul: "우표", zh: "郵票", roman: "u-pyo" },
      { hangul: "편의점", zh: "便利店", roman: "pyeon-ui-jeom" },
      { hangul: "파란색", zh: "藍色", roman: "pa-ran-saek" }
    ]
  },
  "ㅎ": {
    line: "校長早會請大家念韓食、韓屋和和平，ㅎ 像一口溫柔的風把字吹亮。",
    words: [
      { hangul: "한식", zh: "韓食", roman: "han-sik" },
      { hangul: "한옥", zh: "韓屋", roman: "han-ok" },
      { hangul: "평화", zh: "和平", roman: "pyeong-hwa" }
    ]
  }
};

const funnyStoryScenes = [
  {
    title: "寶寶司令的啊啊閱兵",
    setup: ({ symbol, roman }) => `${symbol} 今天自封早餐司令，要求每個點名都要用「${roman}」拉長三秒。`,
    pieces: ["先把 ", " 放進嬰兒車，又命令 ", " 戴上蘋果安全帽。接著 ", " 背錯書包，撞到 ", " 的樹幹，最後 ", " 滑進香蕉隊伍裡。"],
    ending: ({ symbol }) => `全隊笑到敬禮歪掉，只有 ${symbol} 很得意，因為大家都把嘴巴張得超標準。`
  },
  {
    title: "扁嘴偵探找 ae",
    setup: ({ symbol, roman }) => `${symbol} 開了一間扁嘴偵探社，所有線索都要念成「${roman}」才算有效。`,
    pieces: ["第一個證人是 ", "，牠說 ", " 偷走了雲朵拖鞋。", " 假裝是船逃跑，被 ", " 照得發亮，最後藏進 ", " 的書頁裡。"],
    ending: ({ symbol }) => `案件破了以後，${symbol} 發給大家一張「嘴角拉平也能很帥」獎狀。`
  },
  {
    title: "夜市棒球隊亂揮棒",
    setup: ({ symbol, roman }) => `${symbol} 在夜市組棒球隊，口號是先喊「${roman}」，再假裝很專業。`,
    pieces: ["第一棒 ", " 把球打進 ", " 攤位，", " 老闆追著球跑。", " 坐在板凳講戰術，", " 在戶外當啦啦隊。"],
    ending: ({ symbol }) => `比分沒人記得，但 ${symbol} 的口號大到連棉花糖都震成球形。`
  },
  {
    title: "孩子們的悄悄話電台",
    setup: ({ symbol, roman }) => `${symbol} 架起紙杯電台，播音前一定要咬清「${roman}」。`,
    pieces: ["主持人 ", " 說今天主題是 ", "，可是 ", " 一直插播零食新聞。", " 在旁邊裝神祕，", " 乾脆組成合唱團。"],
    ending: ({ symbol }) => `電台收聽率只有三個人，但 ${symbol} 宣布這是「小而閃亮的大成功」。`
  },
  {
    title: "迷路咖啡公車",
    setup: ({ symbol, roman }) => `${symbol} 當起公車司機，發車聲不是叭叭，而是「${roman}」。`,
    pieces: ["車上坐著 ", "，她問 ", " 才知道大家迷路了。", " 灑出咖啡香，", " 忘了停站，最後全車開到 ", " 門口。"],
    ending: ({ symbol }) => `乘客下車時都買了一本地圖，${symbol} 則買了更大的方向盤。`
  },
  {
    title: "螃蟹菜單睡衣派對",
    setup: ({ symbol, roman }) => `${symbol} 辦睡衣派對，入場暗號是乾脆的一聲「${roman}」。`,
    pieces: ["門口的 ", " 說「", "」，可是 ", " 還在洗臉。", " 把菜單當枕頭，", " 睡到差點點了一份夢。"],
    ending: ({ symbol }) => `${symbol} 最後宣布枕頭可以加點，但不能加辣。大家點頭點到又想睡。`
  },
  {
    title: "旅行箱自己去醫院",
    setup: ({ symbol, roman }) => `${symbol} 帶隊旅行，規定迷路時先說「${roman}」再看地圖。`,
    pieces: ["隊員 ", " 問 ", " 是不是入口，", " 卻把車票塞進冬天的口袋。", " 打噴嚏，最後大家陪 ", " 去掛號。"],
    ending: ({ symbol }) => `${symbol} 在候診室畫了新路線，路線彎到連護士都笑了。`
  },
  {
    title: "正式回答藝術展",
    setup: ({ symbol, roman }) => `${symbol} 開藝術展，每件作品旁都貼著「請優雅念 ${roman}」。`,
    pieces: ["入口作品叫 ", "，旁邊掛著 ", " 招牌。", " 滴答滴答當配樂，", " 滾成雕像，", " 負責假裝懂藝術。"],
    ending: ({ symbol }) => `觀眾鼓掌時，${symbol} 小聲說：其實最美的作品是大家的發音。`
  },
  {
    title: "圓嘴小黃瓜賽車",
    setup: ({ symbol, roman }) => `${symbol} 舉辦圓嘴賽車，車手起跑都要喊「${roman}」。`,
    pieces: ["", " 開著小黃瓜車，", " 在後面烤肉加速。", " 的帽子飛走，", " 撒鹽當雪，", " 變成彎彎賽道。"],
    ending: ({ symbol }) => `冠軍獎盃是圓的，${symbol} 抱著它練嘴型，差點把自己照成輪胎。`
  },
  {
    title: "哇聲餅乾電話亭",
    setup: ({ symbol, roman }) => `${symbol} 經營一台會驚呼的電話亭，投幣聲就是「${roman}」。`,
    pieces: ["第一通電話只有 ", "，第二通送來 ", "。", " 把餅乾屑講成密碼，", " 忙著接線，", " 問電話亭有沒有廁紙。"],
    ending: ({ symbol }) => `${symbol} 決定把電話亭改名「哇，誰又打來了」。`
  },
  {
    title: "為什麼小劇場",
    setup: ({ symbol, roman }) => `${symbol} 主持問答節目，所有問題都用「${roman}」開場。`,
    pieces: ["觀眾先問 ", "，接著 ", " 舉蹄發問。", " 說沒關係，", " 說因為因為，", " 則宣布可以收工。"],
    ending: ({ symbol }) => `答案越講越亂，${symbol} 卻很滿意：至少每個為什麼都很響亮。`
  },
  {
    title: "外出公司牛肉會議",
    setup: ({ symbol, roman }) => `${symbol} 穿西裝上班，打卡時一定要說「${roman}」。`,
    pieces: ["早會題目是 ", "，", " 做簡報做到一半想 ", "。", " 負責照鏡子，", " 把午餐牛肉當成年度策略。"],
    ending: ({ symbol }) => `${symbol} 寫下會議結論：外出可以，忘記發音不可以。`
  },
  {
    title: "料理鍋的最近新聞",
    setup: ({ symbol, roman }) => `${symbol} 當料理主播，開場白是香噴噴的「${roman}」。`,
    pieces: ["今天主菜 ", " 先跳進鍋，", " 在旁邊算費用。", " 整間教室聞香集合，", " 舉著牛奶杯，", " 報導最近很餓。"],
    ending: ({ symbol }) => `新聞結束後，${symbol} 發現麥克風其實是一根湯匙。`
  },
  {
    title: "牛奶門前的皮鞋舞",
    setup: ({ symbol, roman }) => `${symbol} 開舞會，低音鼓只會咚咚念「${roman}」。`,
    pieces: ["", " 當飲料總監，", " 穿皮鞋跳踢踏。", " 滾成西瓜燈球，", " 一邊補水，", " 把門當成舞台出口。"],
    ending: ({ symbol }) => `舞會散場時，${symbol} 還在地板上找那個最圓的 u 音。`
  },
  {
    title: "星期一硬幣冷笑話",
    setup: ({ symbol, roman }) => `${symbol} 發明冷笑話販賣機，每個笑話售價一個「${roman}」。`,
    pieces: ["第一則叫 ", "，第二則由 ", " 投幣。", " 星期一笑不出來，", " 問「什麼」，", " 說冷到答案結冰。"],
    ending: ({ symbol }) => `${symbol} 覺得冷笑話很成功，因為大家真的開始發抖。`
  },
  {
    title: "婚禮毛衣波浪秀",
    setup: ({ symbol, roman }) => `${symbol} 辦時尚秀，模特兒走台步時要閃亮念「${roman}」。`,
    pieces: ["司儀 ", " 端著托盤，", " 放婚禮音樂。", " 穿毛衣走紅毯，", " 沿軌道轉圈，", " 做出波浪謝幕。"],
    ending: ({ symbol }) => `${symbol} 給全場最佳造型：一件會發音的毛衣。`
  },
  {
    title: "上面耳朵位置圖",
    setup: ({ symbol, roman }) => `${symbol} 畫藏寶圖，箭頭一律朝上並標註「${roman}」。`,
    pieces: ["寶藏在 ", "，但 ", " 聽錯方向。", " 跑去後面，", " 又躲到 ", "，最後 ", " 才找到正確位置。"],
    ending: ({ symbol }) => `${symbol} 把地圖翻過來，發現寶藏其實是大家的笑聲。`
  },
  {
    title: "玻璃牛奶新聞台",
    setup: ({ symbol, roman }) => `${symbol} 當晨間主播，播新聞前要用「${roman}」清喉嚨。`,
    pieces: ["頭條是 ", " 變透明，", " 被倒進高腳杯。", " 急著拿衛生紙，", " 播報國際新聞，", " 忽然紅到上熱搜。"],
    ending: ({ symbol }) => `導播對 ${symbol} 比讚，雖然字幕把牛奶打成了月光。`
  },
  {
    title: "平嘴食物銀行",
    setup: ({ symbol, roman }) => `${symbol} 開了一家很嚴肅的食物銀行，密碼是平平的「${roman}」。`,
    pieces: ["第一筆存款是 ", "，", " 排隊領號碼牌。", " 畫出存摺，", " 說今天陰天，", " 表示感覺有點餓。"],
    ending: ({ symbol }) => `${symbol} 把利息改成點心，客戶滿意到嘴角完全拉平。`
  },
  {
    title: "椅子醫生會議",
    setup: ({ symbol, roman }) => `${symbol} 召開椅子會議，發言前先滑一聲「${roman}」。`,
    pieces: ["主席是 ", "，旁邊坐著 ", "。", " 的議程太長，", " 一直提醒注意，", " 問這場會議的意思。"],
    ending: ({ symbol }) => `會議結論很短：${symbol} 很會滑，椅子很會坐。`
  },
  {
    title: "牙齒火車泡菜鐘",
    setup: ({ symbol, roman }) => `${symbol} 把教室改成火車站，驗票聲是清亮的「${roman}」。`,
    pieces: ["月台上有 ", " 當站長，", " 嗚嗚進站。", " 帶著泡菜便當，", " 來送行，", " 負責滴答報時。"],
    ending: ({ symbol }) => `${symbol} 發現火車晚點三分鐘，但大家剛好多練三次發音。`
  },
  {
    title: "書包烤肉火車雲",
    setup: ({ symbol, roman }) => `${symbol} 當露營隊長，點火前一定要說「${roman}」。`,
    pieces: ["", " 裝滿餐具，", " 負責烤肉。", " 開火車送柴，", " 飄過來遮太陽，", " 當晚餐的驚喜嘉賓。"],
    ending: ({ symbol }) => `${symbol} 宣布露營成功，雖然帳篷聞起來像泡菜。`
  },
  {
    title: "緊緊花夢蜂蜜秀",
    setup: ({ symbol, roman }) => `${symbol} 辦緊張才藝秀，登台前要用力念「${roman}」。`,
    pieces: ["", " 變成舞台花束，", " 表演睡著。", " 黏在麥克風上，", " 叫醒全場，", " 用尾巴謝幕。"],
    ending: ({ symbol }) => `${symbol} 給大家滿分，因為每個 kk 都像彈簧一樣跳出來。`
  },
  {
    title: "樹國姐姐雪歌",
    setup: ({ symbol, roman }) => `${symbol} 畫了一張鼻音地圖，路標都寫著「${roman}」。`,
    pieces: ["地圖從 ", " 出發，穿過 ", "。", " 在路邊發便當，", " 變成雪花路標，", " 唱歌幫大家導航。"],
    ending: ({ symbol }) => `${symbol} 聽完歌才發現，整張地圖其實畫成了微笑。`
  },
  {
    title: "豆腐橋月亮錢包",
    setup: ({ symbol, roman }) => `${symbol} 蓋了一座方方的橋，通行費是一聲「${roman}」。`,
    pieces: ["橋名叫 ", "，通往 ", "。", " 用豆腐當磚頭，", " 在橋下發亮，", " 說沒有零錢也能過。"],
    ending: ({ symbol }) => `${symbol} 很驕傲，雖然豆腐橋每走一步都會晃一下。`
  },
  {
    title: "草莓土地年糕熱舞",
    setup: ({ symbol, roman }) => `${symbol} 開健身課，所有動作都要繃緊念「${roman}」。`,
    pieces: ["暖身吃 ", "，然後 ", " 負責數拍。", " 當瑜伽墊，", " 彈起來，", " 熱到大家開始扇風。"],
    ending: ({ symbol }) => `${symbol} 宣布下課，因為連發音都做完深蹲了。`
  },
  {
    title: "拉麵機器人緞帶歌",
    setup: ({ symbol, roman }) => `${symbol} 帶一支舌尖樂團，開唱前先彈一下「${roman}」。`,
    pieces: ["主唱 ", " 端著湯，", " 負責機械舞。", " 綁上緞帶，", " 甩頭髮打節奏，", " 把副歌唱成彩帶。"],
    ending: ({ symbol }) => `${symbol} 聽到安可聲，立刻把舌頭又彈了一下。`
  },
  {
    title: "方杯水門帽子",
    setup: ({ symbol, roman }) => `${symbol} 經營方形咖啡館，點餐要先閉嘴再念「${roman}」。`,
    pieces: ["今天特調是 ", "，", " 負責洗杯子。", " 在收銀台談心，", " 戴著帽子巡桌，", " 一開一關當門鈴。"],
    ending: ({ symbol }) => `${symbol} 覺得生意很好，因為每個客人都像在哼小調。`
  },
  {
    title: "香蕉公車雨飯海",
    setup: ({ symbol, roman }) => `${symbol} 開海邊公車，發車時砰的一聲「${roman}」。`,
    pieces: ["第一站 ", "，第二站 ", "。", " 在窗外下雨，", " 把飯盒抱緊，", " 在終點站拍浪。"],
    ending: ({ symbol }) => `${symbol} 把車票曬乾，發現每張都印著胖胖的 ㅂ。`
  },
  {
    title: "麵包根親親快跑",
    setup: ({ symbol, roman }) => `${symbol} 辦快速烘焙賽，倒數時要爆出「${roman}」。`,
    pieces: ["", " 先膨起來，", " 抓住桌腳。", " 在烤箱裡報時，", " 啵啵加油，", " 催大家快點出爐。"],
    ending: ({ symbol }) => `${symbol} 拿到金牌，獎品是一個還會冒氣的麵包。`
  },
  {
    title: "蘋果老師鹽鐘",
    setup: ({ symbol, roman }) => `${symbol} 當代課老師，黑板上只寫一個清楚的「${roman}」。`,
    pieces: ["點名先叫 ", "，再叫 ", "。", " 把鹽當粉筆，", " 滴答提醒下課，", " 說今天作業是微笑。"],
    ending: ({ symbol }) => `${symbol} 批改作業時發現，大家都把 s 寫得像蛇形跑道。`
  },
  {
    title: "米種子苦味特價",
    setup: ({ symbol, roman }) => `${symbol} 開超市廣播，特價品要用很集中的「${roman}」喊。`,
    pieces: ["一號貨架是 ", "，二號貨架是 ", "。", " 說標籤寫錯會苦，", " 說便宜到眨眼，", " 的香氣突然插隊。"],
    ending: ({ symbol }) => `${symbol} 廣播到缺貨，因為顧客都想買那個最緊的 ss 音。`
  },
  {
    title: "安靜圓圈變尾音",
    setup: ({ symbol, roman }) => `${symbol} 是今天的隱形主持人，開頭安靜，結尾才變成「${roman}」。`,
    pieces: ["", " 先睡醒，", " 切小黃瓜。", " 倒牛奶時很安靜，", " 流過橋下，", " 在房間裡發出 ng 的回音。"],
    ending: ({ symbol }) => `${symbol} 笑著說：我不搶開場，但我很會收尾。`
  },
  {
    title: "汽車錢包果汁晚餐",
    setup: ({ symbol, roman }) => `${symbol} 開外送公司，按門鈴前先念「${roman}」。`,
    pieces: ["", " 負責開車，", " 負責付錢。", " 灑了一點果汁，", " 點了晚餐，", " 騎車追著收據跑。"],
    ending: ({ symbol }) => `${symbol} 結算今天營收：三杯果汁、一個笑聲、很多 j。`
  },
  {
    title: "鹹邊果醬湯鍋",
    setup: ({ symbol, roman }) => `${symbol} 辦廚房辯論賽，發言都要緊緊念「${roman}」。`,
    pieces: ["第一題是 ", " 到底多鹹，第二題由 ", " 選邊。", " 把果醬塗上講稿，", " 冒泡抗議，", " 說兩個一對剛剛好。"],
    ending: ({ symbol }) => `${symbol} 敲下湯匙槌，宣布今天的論點很黏，但發音很清楚。`
  },
  {
    title: "茶車朋友巧克力",
    setup: ({ symbol, roman }) => `${symbol} 開下午茶列車，車掌吹氣喊「${roman}」。`,
    pieces: ["第一杯是 ", "，第一位乘客是 ", "。", " 穿裙子轉圈，", " 翻書找座位，", " 當甜點壓軸。"],
    ending: ({ symbol }) => `${symbol} 收票時發現，全車都在偷偷念 ch。`
  },
  {
    title: "相機咖啡鼻子餅乾",
    setup: ({ symbol, roman }) => `${symbol} 當攝影師，快門聲是有空氣感的「${roman}」。`,
    pieces: ["", " 對準鏡頭，", " 端來咖啡。", " 搶著當特寫，", " 說鑰匙不見了，", " 用餅乾排出線索。"],
    ending: ({ symbol }) => `${symbol} 拍到最佳照片：一個鼻子聞到餅乾的瞬間。`
  },
  {
    title: "搭桌透明番茄",
    setup: ({ symbol, roman }) => `${symbol} 開透明劇場，入場要吐氣念「${roman}」。`,
    pieces: ["主演 ", " 一跳上台，", " 說要搭車。", " 變成桌子，", " 忽然透明，", " 滾來滾去搶戲。"],
    ending: ({ symbol }) => `${symbol} 拉上布幕，觀眾還在找那顆逃跑的番茄。`
  },
  {
    title: "蔥披薩葡萄信票",
    setup: ({ symbol, roman }) => `${symbol} 開郵局披薩店，蓋章聲是噗的一聲「${roman}」。`,
    pieces: ["", " 負責撒蔥，", " 負責切披薩。", " 滾進信封，", " 寫信投訴，", " 買票排隊等外送。"],
    ending: ({ symbol }) => `${symbol} 把收據摺成飛機，發現它飛起來也會念 p。`
  },
  {
    title: "天空學校湖衛生紙",
    setup: ({ symbol, roman }) => `${symbol} 當校長，早會先呼一口氣說「${roman}」。`,
    pieces: ["早操看 ", "，鐘聲來自 ", "。", " 在湖邊集合，", " 飛來救急，", " 把幸福貼在公布欄。"],
    ending: ({ symbol }) => `${symbol} 宣布今天放晴，因為每個 h 都像小風一樣吹過。`
  }
];

function makeFunnyStory(symbol, roman, words, pageIndex) {
  const storyWords = words.slice(0, 5).map((word) => word.hangul);
  const scene = funnyStoryScenes[pageIndex % funnyStoryScenes.length];
  const extras = storyExtrasBySymbol[symbol];
  const newWords = extras.words.map((word) => ({
    ...word,
    syllables: decomposeHangulWord(word.hangul, word.roman)
  }));
  const values = { symbol, roman };

  return {
    title: `${symbol} ${scene.title}`,
    setup: scene.setup(values),
    ending: `${scene.ending(values)} 點故事裡的韓文字，偷看它的意思和拆音。`,
    bonusLine: extras.line,
    newWords,
    tokens: [
      { type: "text", value: scene.pieces[0] },
      { type: "word", value: storyWords[0] },
      { type: "text", value: scene.pieces[1] },
      { type: "word", value: storyWords[1] },
      { type: "text", value: scene.pieces[2] },
      { type: "word", value: storyWords[2] },
      { type: "text", value: scene.pieces[3] },
      { type: "word", value: storyWords[3] },
      { type: "text", value: scene.pieces[4] },
      { type: "word", value: storyWords[4] },
      { type: "text", value: scene.pieces[5] }
    ]
  };
}

export const letterPages = [
  makePage("ㅏ", "a", "vowels", [
    { hangul: "아기", zh: "嬰兒", roman: "a-gi", note: "一看到 ㅏ，就像寶寶張嘴說「啊」。" },
    { hangul: "사과", zh: "蘋果", roman: "sa-gwa", note: "紅蘋果咬一口，嘴巴自然打開成 ㅏ。" },
    { hangul: "가방", zh: "書包", roman: "ga-bang", note: "背書包出門，ga 的聲音先跳出來。" },
    { hangul: "나무", zh: "樹", roman: "na-mu", note: "樹幹直直站，na 的 ㅏ 很清楚。" },
    { hangul: "바나나", zh: "香蕉", roman: "ba-na-na", note: "香蕉有三段，像 ㅏ 一路滑下來。" }
  ]),
  makePage("ㅐ", "ae", "vowels", [
    { hangul: "개", zh: "狗", roman: "gae", note: "看到狗狗搖尾巴，嘴角拉扁念 ae。" },
    { hangul: "새", zh: "鳥", roman: "sae", note: "小鳥叫一聲，ae 像短短飛起來。" },
    { hangul: "배", zh: "梨／船", roman: "bae", note: "一個字兩個意思，ae 是辨認鑰匙。" },
    { hangul: "해", zh: "太陽", roman: "hae", note: "太陽升起，hae 的聲音亮亮的。" },
    { hangul: "책", zh: "書", roman: "chaek", note: "翻開書頁，ae 藏在中間。" }
  ]),
  makePage("ㅑ", "ya", "vowels", [
    { hangul: "야구", zh: "棒球", roman: "ya-gu", note: "球飛出去時喊 ya，聲音很有動作。" },
    { hangul: "야채", zh: "蔬菜", roman: "ya-chae", note: "蔬菜盤一端上桌，ya 先開場。" },
    { hangul: "야시장", zh: "夜市", roman: "ya-si-jang", note: "夜市很熱鬧，ya 像招呼聲。" },
    { hangul: "이야기", zh: "故事", roman: "i-ya-gi", note: "講故事時，ya 在中間轉個彎。" },
    { hangul: "야외", zh: "戶外", roman: "ya-oe", note: "走到戶外，ya 像把門推開。" }
  ]),
  makePage("ㅒ", "yae", "vowels", [
    { hangul: "얘", zh: "這孩子", roman: "yae", note: "yae 像 ya 加上一點扁扁的 ae。" },
    { hangul: "얘기", zh: "故事／談話", roman: "yae-gi", note: "聊天開頭的 yae，像小話題冒泡。" },
    { hangul: "쟤", zh: "那孩子", roman: "jyae", note: "指向遠方時，yae 躲在쟤裡。" },
    { hangul: "걔", zh: "那個人", roman: "gyae", note: "gyae 很短，適合拿來記 ㅒ 的形狀。" },
    { hangul: "얘들", zh: "孩子們", roman: "yae-deul", note: "一群孩子跑來，yae 先帶隊。" }
  ]),
  makePage("ㅓ", "eo", "vowels", [
    { hangul: "어머니", zh: "母親", roman: "eo-meo-ni", note: "eo 是放鬆的開口音，像溫柔回應。" },
    { hangul: "어디", zh: "哪裡", roman: "eo-di", note: "迷路時問 eo-di，eo 很容易記。" },
    { hangul: "커피", zh: "咖啡", roman: "keo-pi", note: "咖啡香一飄，keo 的 eo 跟著出現。" },
    { hangul: "버스", zh: "公車", roman: "beo-seu", note: "等公車時，beo 的嘴型放鬆。" },
    { hangul: "서점", zh: "書店", roman: "seo-jeom", note: "走進書店，seo 的 eo 像翻頁聲。" }
  ]),
  makePage("ㅔ", "e", "vowels", [
    { hangul: "네", zh: "是／好的", roman: "ne", note: "回答 네，e 短而清楚。" },
    { hangul: "게", zh: "螃蟹", roman: "ge", note: "螃蟹橫著走，ge 的 e 很平穩。" },
    { hangul: "세수", zh: "洗臉", roman: "se-su", note: "洗臉醒來，se 的 e 亮一下。" },
    { hangul: "메뉴", zh: "菜單", roman: "me-nyu", note: "點餐先看 menu，me 很好記。" },
    { hangul: "베개", zh: "枕頭", roman: "be-gae", note: "躺上枕頭，be 的 e 輕輕落下。" }
  ]),
  makePage("ㅕ", "yeo", "vowels", [
    { hangul: "여자", zh: "女性", roman: "yeo-ja", note: "yeo 像先用 y 把聲音推開。" },
    { hangul: "여기", zh: "這裡", roman: "yeo-gi", note: "指著這裡說 yeo-gi，yeo 很明顯。" },
    { hangul: "여행", zh: "旅行", roman: "yeo-haeng", note: "旅行的第一步，就是 yeo 起跑。" },
    { hangul: "겨울", zh: "冬天", roman: "gyeo-ul", note: "冬天空氣冷，gyeo 聽起來清爽。" },
    { hangul: "병원", zh: "醫院", roman: "byeong-won", note: "byeong 的 yeo 藏在中間，要慢慢找。" }
  ]),
  makePage("ㅖ", "ye", "vowels", [
    { hangul: "예", zh: "是／對", roman: "ye", note: "正式回答 예，ye 乾淨俐落。" },
    { hangul: "예쁜", zh: "漂亮的", roman: "ye-ppeun", note: "漂亮的東西一出現，ye 先亮起來。" },
    { hangul: "시계", zh: "時鐘", roman: "si-gye", note: "時鐘滴答，gye 的 ye 在後面。" },
    { hangul: "계란", zh: "雞蛋", roman: "gye-ran", note: "雞蛋圓圓的，gye 像敲開蛋殼。" },
    { hangul: "예술", zh: "藝術", roman: "ye-sul", note: "藝術感開場，就是 ye 的聲音。" }
  ]),
  makePage("ㅗ", "o", "vowels", [
    { hangul: "오이", zh: "小黃瓜", roman: "o-i", note: "o 像圓圓嘴型，小黃瓜也圓圓切片。" },
    { hangul: "고기", zh: "肉", roman: "go-gi", note: "烤肉香出現，go 的 o 很飽滿。" },
    { hangul: "모자", zh: "帽子", roman: "mo-ja", note: "帽子像扣在頭上的 o。" },
    { hangul: "소금", zh: "鹽", roman: "so-geum", note: "撒一點鹽，so 很短很好念。" },
    { hangul: "도로", zh: "道路", roman: "do-ro", note: "道路一圈一圈轉，o 音反覆出現。" }
  ]),
  makePage("ㅘ", "wa", "vowels", [
    { hangul: "와", zh: "哇／和", roman: "wa", note: "看到驚喜就說 wa，超好記。" },
    { hangul: "사과", zh: "蘋果", roman: "sa-gwa", note: "gwa 裡的 wa 像蘋果圓弧。" },
    { hangul: "과자", zh: "餅乾", roman: "gwa-ja", note: "餅乾咬一口，gwa 清脆出現。" },
    { hangul: "전화", zh: "電話", roman: "jeon-hwa", note: "電話響時，hwa 在後面接起來。" },
    { hangul: "화장실", zh: "廁所", roman: "hwa-jang-sil", note: "找廁所時，hwa 是第一個線索。" }
  ]),
  makePage("ㅙ", "wae", "vowels", [
    { hangul: "왜", zh: "為什麼", roman: "wae", note: "問為什麼時，wae 像疑問泡泡。" },
    { hangul: "돼지", zh: "豬", roman: "dwae-ji", note: "dwae 的嘴型先圓再扁。" },
    { hangul: "괜찮아", zh: "沒關係", roman: "gwaen-chan-a", note: "常用句裡的 gwaen 很值得記。" },
    { hangul: "왜냐하면", zh: "因為", roman: "wae-nya-ha-myeon", note: "解釋原因時，wae 先登場。" },
    { hangul: "돼요", zh: "可以", roman: "dwae-yo", note: "回答可以時，dwae 很常出現。" }
  ]),
  makePage("ㅚ", "oe", "vowels", [
    { hangul: "외국", zh: "外國", roman: "oe-guk", note: "oe 像往外看的聲音。" },
    { hangul: "회사", zh: "公司", roman: "hoe-sa", note: "上班去公司，hoe 裡有 ㅚ。" },
    { hangul: "외출", zh: "外出", roman: "oe-chul", note: "準備外出，oe 是第一步。" },
    { hangul: "외모", zh: "外貌", roman: "oe-mo", note: "看外表時，oe 在前面。" },
    { hangul: "쇠고기", zh: "牛肉", roman: "soe-go-gi", note: "soe 的 ㅚ 像味道轉一下。" }
  ]),
  makePage("ㅛ", "yo", "vowels", [
    { hangul: "요리", zh: "料理", roman: "yo-ri", note: "料理開始，yo 像鍋子冒香氣。" },
    { hangul: "요금", zh: "費用", roman: "yo-geum", note: "看費用時，yo 先出現。" },
    { hangul: "교실", zh: "教室", roman: "gyo-sil", note: "教室裡的 gyo 很常見。" },
    { hangul: "우유", zh: "牛奶", roman: "u-yu", note: "雖然是 yu，也能比較 yo 的形狀。" },
    { hangul: "요즘", zh: "最近", roman: "yo-jeum", note: "最近常說 요즘，yo 很實用。" }
  ]),
  makePage("ㅜ", "u", "vowels", [
    { hangul: "우유", zh: "牛奶", roman: "u-yu", note: "牛奶白白的，u 音很圓。" },
    { hangul: "구두", zh: "皮鞋", roman: "gu-du", note: "走路咚咚，gu-du 都有 u。" },
    { hangul: "수박", zh: "西瓜", roman: "su-bak", note: "西瓜切開，su 的 u 很清涼。" },
    { hangul: "물", zh: "水", roman: "mul", note: "喝水時，u 音短短滑過。" },
    { hangul: "문", zh: "門", roman: "mun", note: "推門一聲，mun 的 u 在中間。" }
  ]),
  makePage("ㅝ", "wo", "vowels", [
    { hangul: "워터", zh: "水／water", roman: "wo-teo", note: "外來語裡 wo 很好聽出來。" },
    { hangul: "원", zh: "韓元／圓", roman: "won", note: "won 像硬幣圓圓滾。" },
    { hangul: "월요일", zh: "星期一", roman: "wo-ryo-il", note: "星期一從 wo 開始暖身。" },
    { hangul: "뭐", zh: "什麼", roman: "mwo", note: "問什麼時，mwo 很常用。" },
    { hangul: "추워", zh: "冷", roman: "chu-wo", note: "覺得冷時，wo 在句尾縮一下。" }
  ]),
  makePage("ㅞ", "we", "vowels", [
    { hangul: "웨이터", zh: "服務生", roman: "we-i-teo", note: "餐廳裡 we-i-teo 很像英文。" },
    { hangul: "웨딩", zh: "婚禮", roman: "we-ding", note: "外來語 wedding 讓 we 好記。" },
    { hangul: "스웨터", zh: "毛衣", roman: "seu-we-teo", note: "穿毛衣時，we 躲在中間。" },
    { hangul: "궤도", zh: "軌道", roman: "gwe-do", note: "gwe 像沿著軌道轉彎。" },
    { hangul: "웨이브", zh: "波浪", roman: "we-i-beu", note: "wave 的 we 像波浪起頭。" }
  ]),
  makePage("ㅟ", "wi", "vowels", [
    { hangul: "위", zh: "上面", roman: "wi", note: "wi 像把聲音往上推。" },
    { hangul: "귀", zh: "耳朵", roman: "gwi", note: "耳朵聽見 gwi，記住 ㅟ。" },
    { hangul: "쥐", zh: "老鼠", roman: "jwi", note: "jwi 很短，像小老鼠快速跑過。" },
    { hangul: "뒤", zh: "後面", roman: "dwi", note: "往後看，dwi 在嘴裡轉一下。" },
    { hangul: "위치", zh: "位置", roman: "wi-chi", note: "找位置時，wi 先定位。" }
  ]),
  makePage("ㅠ", "yu", "vowels", [
    { hangul: "유리", zh: "玻璃", roman: "yu-ri", note: "玻璃亮亮的，yu 像滑光。" },
    { hangul: "우유", zh: "牛奶", roman: "u-yu", note: "第二個音就是 yu，很適合練。" },
    { hangul: "휴지", zh: "衛生紙", roman: "hyu-ji", note: "拿衛生紙時，hyu 很清楚。" },
    { hangul: "뉴스", zh: "新聞", roman: "nyu-seu", note: "news 的 nyu 很像英文。" },
    { hangul: "유명", zh: "有名", roman: "yu-myeong", note: "有名的東西一出場，yu 先亮相。" }
  ]),
  makePage("ㅡ", "eu", "vowels", [
    { hangul: "음식", zh: "食物", roman: "eum-sik", note: "eu 要把嘴拉平，像偷笑一下。" },
    { hangul: "은행", zh: "銀行", roman: "eun-haeng", note: "去銀行，eun 的聲音很實用。" },
    { hangul: "그림", zh: "圖畫", roman: "geu-rim", note: "畫圖時 geu 很常出現。" },
    { hangul: "흐림", zh: "陰天", roman: "heu-rim", note: "陰天灰灰的，heu 很柔和。" },
    { hangul: "느낌", zh: "感覺", roman: "neu-kkim", note: "感覺出現時，neu 很適合慢念。" }
  ]),
  makePage("ㅢ", "ui", "vowels", [
    { hangul: "의자", zh: "椅子", roman: "ui-ja", note: "椅子坐下去，ui 像一口氣滑過。" },
    { hangul: "의사", zh: "醫生", roman: "ui-sa", note: "看醫生時，ui 是第一個聲音。" },
    { hangul: "회의", zh: "會議", roman: "hoe-ui", note: "會議裡有兩個滑動母音，很好練。" },
    { hangul: "주의", zh: "注意", roman: "ju-ui", note: "注意這個字，ui 在後面提醒你。" },
    { hangul: "의미", zh: "意思", roman: "ui-mi", note: "找意思時，ui 先開門。" }
  ]),
  makePage("ㅣ", "i", "vowels", [
    { hangul: "이", zh: "牙齒／二", roman: "i", note: "i 像直直一條線，聲音也乾淨。" },
    { hangul: "기차", zh: "火車", roman: "gi-cha", note: "火車啟動，gi 的 i 很亮。" },
    { hangul: "김치", zh: "泡菜", roman: "gim-chi", note: "泡菜入口，兩個 i 都很醒目。" },
    { hangul: "친구", zh: "朋友", roman: "chin-gu", note: "朋友見面，chin 的 i 短短跳出來。" },
    { hangul: "시계", zh: "時鐘", roman: "si-gye", note: "時鐘滴答，si 的 i 像秒針。" }
  ]),
  makePage("ㄱ", "g/k", "consonants", [
    { hangul: "가방", zh: "書包", roman: "ga-bang", note: "ㄱ 像書包扣環，ga 一扣就出發。" },
    { hangul: "고기", zh: "肉", roman: "go-gi", note: "烤肉香讓 go-gi 很好記。" },
    { hangul: "기차", zh: "火車", roman: "gi-cha", note: "火車咔咔跑，ㄱ 很像起步聲。" },
    { hangul: "구름", zh: "雲", roman: "gu-reum", note: "雲飄過，gu 的 ㄱ 輕輕開始。" },
    { hangul: "김치", zh: "泡菜", roman: "gim-chi", note: "韓國代表食物，ㄱ 必學。" }
  ]),
  makePage("ㄲ", "kk", "consonants", [
    { hangul: "꽃", zh: "花", roman: "kkot", note: "ㄲ 是緊緊的 k，像花苞用力打開。" },
    { hangul: "꿈", zh: "夢", roman: "kkum", note: "夢像偷偷藏起來，kk 很集中。" },
    { hangul: "꿀", zh: "蜂蜜", roman: "kkul", note: "蜂蜜黏黏的，kkul 聲音也黏住。" },
    { hangul: "까치", zh: "喜鵲", roman: "kka-chi", note: "喜鵲叫聲清脆，kka 很有力。" },
    { hangul: "꼬리", zh: "尾巴", roman: "kko-ri", note: "尾巴捲起來，ㄲ 像捲緊的聲音。" }
  ]),
  makePage("ㄴ", "n", "consonants", [
    { hangul: "나무", zh: "樹", roman: "na-mu", note: "ㄴ 像樹枝轉角，na 很清楚。" },
    { hangul: "나라", zh: "國家", roman: "na-ra", note: "國家的 na 開頭很常見。" },
    { hangul: "누나", zh: "姐姐", roman: "nu-na", note: "叫姐姐時，n 音重複兩次。" },
    { hangul: "눈", zh: "眼睛／雪", roman: "nun", note: "눈 前後都是 ㄴ，像兩扇門。" },
    { hangul: "노래", zh: "歌曲", roman: "no-rae", note: "唱歌時 no 先開聲。" }
  ]),
  makePage("ㄷ", "d/t", "consonants", [
    { hangul: "다리", zh: "腿／橋", roman: "da-ri", note: "ㄷ 像橋的邊角，da 很穩。" },
    { hangul: "도시", zh: "城市", roman: "do-si", note: "城市道路方方正正，像 ㄷ。" },
    { hangul: "두부", zh: "豆腐", roman: "du-bu", note: "豆腐方塊讓 ㄷ 更好記。" },
    { hangul: "달", zh: "月亮", roman: "dal", note: "月亮升起，dal 聲音短而亮。" },
    { hangul: "돈", zh: "錢", roman: "don", note: "돈 很常用，ㄷ 開頭要熟。" }
  ]),
  makePage("ㄸ", "tt", "consonants", [
    { hangul: "딸기", zh: "草莓", roman: "ttal-gi", note: "ㄸ 是緊緊的 t，像咬草莓前用力一下。" },
    { hangul: "딸", zh: "女兒", roman: "ttal", note: "短短一字，很適合練 ㄸ。" },
    { hangul: "땅", zh: "土地", roman: "ttang", note: "腳踩土地，ttang 很紮實。" },
    { hangul: "떡", zh: "年糕", roman: "tteok", note: "年糕 Q 彈，tteok 也很有彈性。" },
    { hangul: "뜨거워", zh: "熱", roman: "tteu-geo-wo", note: "覺得燙時，tteu 會很快跳出來。" }
  ]),
  makePage("ㄹ", "r/l", "consonants", [
    { hangul: "라면", zh: "拉麵", roman: "ra-myeon", note: "ㄹ 像舌頭輕輕彈一下。" },
    { hangul: "로봇", zh: "機器人", roman: "ro-bot", note: "機器人走路，ro 很有節奏。" },
    { hangul: "리본", zh: "緞帶", roman: "ri-bon", note: "緞帶繞圈，ㄹ 也像轉彎。" },
    { hangul: "머리", zh: "頭髮／頭", roman: "meo-ri", note: "ri 在後面輕輕收尾。" },
    { hangul: "노래", zh: "歌曲", roman: "no-rae", note: "唱歌會用到 rae，ㄹ 很常見。" }
  ]),
  makePage("ㅁ", "m", "consonants", [
    { hangul: "물", zh: "水", roman: "mul", note: "ㅁ 像方杯子，裝著水。" },
    { hangul: "머리", zh: "頭", roman: "meo-ri", note: "摸摸頭，meo 的 ㅁ 先出來。" },
    { hangul: "마음", zh: "心情", roman: "ma-eum", note: "心情在心裡，ma 很柔和。" },
    { hangul: "모자", zh: "帽子", roman: "mo-ja", note: "帽子像蓋住方方的 ㅁ。" },
    { hangul: "문", zh: "門", roman: "mun", note: "ㅁ 像一扇門，非常好記。" }
  ]),
  makePage("ㅂ", "b/p", "consonants", [
    { hangul: "바나나", zh: "香蕉", roman: "ba-na-na", note: "ba 一開頭，香蕉就出場。" },
    { hangul: "버스", zh: "公車", roman: "beo-seu", note: "公車啟動，ㅂ 像車頭。" },
    { hangul: "비", zh: "雨", roman: "bi", note: "雨滴落下，bi 很短。" },
    { hangul: "밥", zh: "飯", roman: "bap", note: "밥 前後都有 ㅂ，很適合練。" },
    { hangul: "바다", zh: "海", roman: "ba-da", note: "海浪拍上來，ba 很開闊。" }
  ]),
  makePage("ㅃ", "pp", "consonants", [
    { hangul: "빵", zh: "麵包", roman: "ppang", note: "麵包膨起來，ppang 很有力。" },
    { hangul: "뿌리", zh: "根", roman: "ppu-ri", note: "樹根抓緊地面，pp 很緊。" },
    { hangul: "뻐꾸기", zh: "布穀鳥", roman: "ppeo-kku-gi", note: "鳥叫聲重重的，ppeo 很好玩。" },
    { hangul: "뽀뽀", zh: "親親", roman: "ppo-ppo", note: "重複兩次，pp 馬上記住。" },
    { hangul: "빨리", zh: "快點", roman: "ppal-li", note: "催快點時，ppal 很有衝勁。" }
  ]),
  makePage("ㅅ", "s", "consonants", [
    { hangul: "사과", zh: "蘋果", roman: "sa-gwa", note: "sa 像咬蘋果前吸一口氣。" },
    { hangul: "사람", zh: "人", roman: "sa-ram", note: "很常用的字，ㅅ 要先熟。" },
    { hangul: "소금", zh: "鹽", roman: "so-geum", note: "撒鹽時，so 短短出現。" },
    { hangul: "시계", zh: "時鐘", roman: "si-gye", note: "秒針滴答，si 很清楚。" },
    { hangul: "선생님", zh: "老師", roman: "seon-saeng-nim", note: "老師這個字裡 ㅅ 出現兩次。" }
  ]),
  makePage("ㅆ", "ss", "consonants", [
    { hangul: "쌀", zh: "米", roman: "ssal", note: "米粒小小的，ssal 音很集中。" },
    { hangul: "씨", zh: "種子／先生稱呼", roman: "ssi", note: "短短一字，ss 很清楚。" },
    { hangul: "쓰다", zh: "寫／苦", roman: "sseu-da", note: "寫字用力，sseu 很緊。" },
    { hangul: "싸다", zh: "便宜", roman: "ssa-da", note: "看到便宜就記 ssa。" },
    { hangul: "쑥", zh: "艾草", roman: "ssuk", note: "ssuk 像香氣突然冒出來。" }
  ]),
  makePage("ㅇ", "ng/silent", "consonants", [
    { hangul: "아기", zh: "嬰兒", roman: "a-gi", note: "ㅇ 在開頭不發音，像安靜的圓圈。" },
    { hangul: "오이", zh: "小黃瓜", roman: "o-i", note: "兩個開頭 ㅇ 都安靜站著。" },
    { hangul: "우유", zh: "牛奶", roman: "u-yu", note: "ㅇ 幫母音站穩，不搶聲音。" },
    { hangul: "강", zh: "河", roman: "gang", note: "在收尾時 ㅇ 變成 ng。" },
    { hangul: "방", zh: "房間", roman: "bang", note: "bang 的尾音就是 ㅇ 的 ng。" }
  ]),
  makePage("ㅈ", "j", "consonants", [
    { hangul: "자동차", zh: "汽車", roman: "ja-dong-cha", note: "車子啟動，ja 先出發。" },
    { hangul: "지갑", zh: "錢包", roman: "ji-gap", note: "拿錢包時，ji 很常聽到。" },
    { hangul: "주스", zh: "果汁", roman: "ju-seu", note: "喝果汁，ju 很清楚。" },
    { hangul: "저녁", zh: "晚餐", roman: "jeo-nyeok", note: "晚餐時間，jeo 開頭要熟。" },
    { hangul: "자전거", zh: "腳踏車", roman: "ja-jeon-geo", note: "腳踏車有兩個 j 音可以練。" }
  ]),
  makePage("ㅉ", "jj", "consonants", [
    { hangul: "짜다", zh: "鹹", roman: "jja-da", note: "吃到太鹹，jja 會很用力。" },
    { hangul: "쪽", zh: "邊／側", roman: "jjok", note: "指一邊時，jjok 短而緊。" },
    { hangul: "쨈", zh: "果醬", roman: "jjaem", note: "果醬甜甜黏黏，jjaem 很好記。" },
    { hangul: "찌개", zh: "湯鍋", roman: "jji-gae", note: "熱湯鍋冒泡，jji 很有力。" },
    { hangul: "짝", zh: "一對", roman: "jjak", note: "兩個配成一對，jjak 像拍一下。" }
  ]),
  makePage("ㅊ", "ch", "consonants", [
    { hangul: "차", zh: "車／茶", roman: "cha", note: "cha 是最直覺的 ㅊ 練習。" },
    { hangul: "친구", zh: "朋友", roman: "chin-gu", note: "朋友見面，chin 很常用。" },
    { hangul: "치마", zh: "裙子", roman: "chi-ma", note: "裙擺轉一圈，chi 先出現。" },
    { hangul: "책", zh: "書", roman: "chaek", note: "打開書，chaek 聲音清楚。" },
    { hangul: "초콜릿", zh: "巧克力", roman: "cho-kol-lit", note: "巧克力開頭就是 cho。" }
  ]),
  makePage("ㅋ", "k", "consonants", [
    { hangul: "카메라", zh: "相機", roman: "ka-me-ra", note: "按下快門，ka 很有空氣感。" },
    { hangul: "커피", zh: "咖啡", roman: "keo-pi", note: "咖啡香配 keo，很好記。" },
    { hangul: "코", zh: "鼻子", roman: "ko", note: "ko 短短一字，送氣很明顯。" },
    { hangul: "키", zh: "身高／鑰匙", roman: "ki", note: "ki 像鑰匙打開門，短音很亮。" },
    { hangul: "쿠키", zh: "餅乾", roman: "ku-ki", note: "cookie 的 ku-ki 很像英文。" }
  ]),
  makePage("ㅌ", "t", "consonants", [
    { hangul: "토끼", zh: "兔子", roman: "to-kki", note: "兔子跳一下，to 很有彈性。" },
    { hangul: "타다", zh: "搭乘", roman: "ta-da", note: "搭車時 ta 先出發。" },
    { hangul: "테이블", zh: "桌子", roman: "te-i-beul", note: "table 的 te 很像英文。" },
    { hangul: "투명", zh: "透明", roman: "tu-myeong", note: "透明玻璃裡，tu 很清楚。" },
    { hangul: "토마토", zh: "番茄", roman: "to-ma-to", note: "番茄有兩個 to，超適合練。" }
  ]),
  makePage("ㅍ", "p", "consonants", [
    { hangul: "파", zh: "蔥", roman: "pa", note: "pa 短短一聲，送氣像吹一下。" },
    { hangul: "피자", zh: "披薩", roman: "pi-ja", note: "pizza 的 pi 很熟悉。" },
    { hangul: "포도", zh: "葡萄", roman: "po-do", note: "葡萄一顆顆，po 很圓。" },
    { hangul: "편지", zh: "信", roman: "pyeon-ji", note: "寫信時，pyeon 開頭很有空氣。" },
    { hangul: "표", zh: "票", roman: "pyo", note: "買票時，pyo 短而亮。" }
  ]),
  makePage("ㅎ", "h", "consonants", [
    { hangul: "하늘", zh: "天空", roman: "ha-neul", note: "抬頭看天空，ha 很開闊。" },
    { hangul: "학교", zh: "學校", roman: "hak-gyo", note: "學校每天見，ㅎ 必熟。" },
    { hangul: "호수", zh: "湖", roman: "ho-su", note: "湖面呼一口氣，ho 很柔。" },
    { hangul: "휴지", zh: "衛生紙", roman: "hyu-ji", note: "hyu 像輕輕吹氣，聲音很柔。" },
    { hangul: "행복", zh: "幸福", roman: "haeng-bok", note: "幸福的 haeng 聲音亮亮的。" }
  ])
];
