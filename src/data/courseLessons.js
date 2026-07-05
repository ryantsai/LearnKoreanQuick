import { assetPath } from "../utils/assets.js";
import { decomposeHangulWord } from "../utils/hangul.js";

const courseAsset = (name) => assetPath(`assets/course-lessons/${name}.png`);

function word(text, roman, zh) {
  return {
    text,
    roman,
    zh,
    syllables: decomposeHangulWord(text, roman)
  };
}

function withVocabImages(lessonId, words) {
  return words.map((item, index) => ({
    ...item,
    image: courseAsset(`${lessonId}-vocab-${String(index + 1).padStart(2, "0")}`)
  }));
}

function line(speaker, ko, zh, tokens) {
  return { speaker, ko, zh, tokens };
}

const l21 = [
  word("관우", "gwan-u", "關宇（人名）"),
  word("씨", "ssi", "先生/小姐，禮貌稱呼"),
  word("취미가", "chwi-mi-ga", "興趣（主語）"),
  word("뭡니까", "mwom-ni-kka", "是什麼？"),
  word("제", "je", "我的"),
  word("취미는", "chwi-mi-neun", "興趣（主題）"),
  word("여자입니다", "yeo-ja-im-ni-da", "是女人"),
  word("여자", "yeo-ja", "女人"),
  word("여자요", "yeo-ja-yo", "女人嗎？"),
  word("혹시", "hok-si", "該不會/或許"),
  word("요가입니까", "yo-ga-im-ni-kka", "是瑜伽嗎？"),
  word("네", "ne", "是"),
  word("요가입니다", "yo-ga-im-ni-da", "是瑜伽"),
  word("안녕하세요", "an-nyeong-ha-se-yo", "您好"),
  word("저는", "jeo-neun", "我是"),
  word("지민입니다", "ji-min-im-ni-da", "我是智敏"),
  word("유미입니다", "yu-mi-im-ni-da", "我是由美"),
  word("만나서", "man-na-seo", "見面後"),
  word("반갑습니다", "ban-gap-seum-ni-da", "很高興"),
  word("시간", "si-gan", "時間"),
  word("있으면", "it-seu-myeon", "如果有"),
  word("뭘", "mwol", "什麼"),
  word("합니까", "ham-ni-kka", "做嗎？"),
  word("쇼핑하기입니다", "syo-ping-ha-gi-im-ni-da", "是逛街購物"),
  word("세일", "se-il", "特價"),
  word("좋아하니까요", "jo-a-ha-ni-kka-yo", "因為喜歡"),
  word("친한", "chin-han", "親近的"),
  word("친구하고", "chin-gu-ha-go", "和朋友"),
  word("똑같아요", "ttok-ga-ta-yo", "一模一樣"),
  word("다음에", "da-eum-e", "下次"),
  word("같이", "ga-chi", "一起"),
  word("놀아요", "no-ra-yo", "玩吧")
];

const l22 = [
  word("많이", "man-i", "很多"),
  word("이야기해서", "i-ya-gi-hae-seo", "因為說話"),
  word("몸이", "mom-i", "身體（主語）"),
  word("아픕니다", "a-peum-ni-da", "痛/不舒服"),
  word("몸이요", "mom-i-yo", "身體嗎？"),
  word("그럼", "geu-reom", "那麼"),
  word("어디가", "eo-di-ga", "哪裡（主語）"),
  word("아픕니까", "a-peum-ni-kka", "痛嗎？"),
  word("목이", "mok-i", "喉嚨/脖子（主語）"),
  word("그렇군요", "geu-reot-gun-yo", "原來如此"),
  word("이따가", "i-tta-ga", "等一下"),
  word("병원에", "byeong-won-e", "去醫院"),
  word("갑시다", "gap-si-da", "一起去吧"),
  word("의사", "ui-sa", "醫生"),
  word("어디가", "eo-di-ga", "哪裡"),
  word("불편합니까", "bul-pyeon-ham-ni-kka", "不舒服嗎？"),
  word("머리가", "meo-ri-ga", "頭（主語）"),
  word("어제부터", "eo-je-bu-teo", "從昨天起"),
  word("너무", "neo-mu", "太/很"),
  word("피곤해서", "pi-gon-hae-seo", "因為疲累"),
  word("그런가", "geu-reon-ga", "可能那樣"),
  word("봐요", "bwa-yo", "看來"),
  word("몸", "mom", "身體"),
  word("조심하세요", "jo-sim-ha-se-yo", "請保重"),
  word("알겠습니다", "al-get-seum-ni-da", "我知道了"),
  word("주사", "ju-sa", "針"),
  word("놔드리고", "nwa-deu-ri-go", "幫您打"),
  word("약", "yak", "藥"),
  word("드릴게요", "deu-ril-ge-yo", "會給您"),
  word("푹", "puk", "充分地"),
  word("쉬세요", "swi-se-yo", "請休息"),
  word("감사합니다", "gam-sa-ham-ni-da", "謝謝"),
  word("안녕히", "an-nyeong-hi", "平安地"),
  word("계세요", "gye-se-yo", "請留步")
];

const l23 = [
  word("저기요", "jeo-gi-yo", "不好意思"),
  word("커피", "keo-pi", "咖啡"),
  word("하나", "ha-na", "一個"),
  word("얼마예요", "eol-ma-ye-yo", "多少錢？"),
  word("커피요", "keo-pi-yo", "咖啡嗎？"),
  word("한", "han", "一"),
  word("잔", "jan", "杯"),
  word("이천오백원이에요", "i-cheon-o-baek-won-i-e-yo", "是二千五百韓元"),
  word("어서오세요", "eo-seo-o-se-yo", "歡迎光臨"),
  word("무엇을", "mu-eot-eul", "什麼（受詞）"),
  word("드릴까요", "deu-ril-kka-yo", "要給您嗎？"),
  word("커피하고", "keo-pi-ha-go", "咖啡和"),
  word("와플", "wa-peul", "鬆餅"),
  word("주세요", "ju-se-yo", "請給我"),
  word("모두", "mo-du", "全部"),
  word("오천원이에요", "o-cheon-won-i-e-yo", "是五千韓元"),
  word("오천이백원", "o-cheon-i-baek-won", "五千二百韓元"),
  word("아니에요", "a-ni-e-yo", "不是嗎？"),
  word("여기", "yeo-gi", "這裡"),
  word("보세요", "bo-se-yo", "請看"),
  word("같이", "ga-chi", "一起"),
  word("사면", "sa-myeon", "買的話"),
  word("세트가", "se-teu-ga", "套餐（主語）"),
  word("돼요", "dwae-yo", "成為/可以"),
  word("알겠습니다", "al-get-seum-ni-da", "我知道了"),
  word("감사합니다", "gam-sa-ham-ni-da", "謝謝")
];

const l24 = [
  word("이모", "i-mo", "阿姨（親切稱呼）"),
  word("차가운", "cha-ga-un", "冰的/冰涼的"),
  word("무", "mu", "蘿蔔"),
  word("주세요", "ju-se-yo", "請給我"),
  word("죄송합니다", "joe-song-ham-ni-da", "對不起"),
  word("물", "mul", "水"),
  word("잠시만요", "jam-si-man-yo", "請稍等一下"),
  word("물건", "mul-geon", "東西/物品"),
  word("다", "da", "全部/都"),
  word("챙겼지요", "chaeng-gyeot-ji-yo", "收拾好了吧？"),
  word("클렌징", "keul-len-jing", "卸妝乳"),
  word("있고", "it-go", "有，而且"),
  word("칫솔도", "chit-sol-do", "牙刷也"),
  word("보조", "bo-jo", "輔助"),
  word("배터리", "bae-teo-ri", "電池"),
  word("잠깐", "jam-kkan", "等一下"),
  word("오늘", "o-neul", "今天"),
  word("삼십일", "sam-sip-il", "三十一"),
  word("일이에요", "il-i-e-yo", "是…日"),
  word("며칠이에요", "myeo-chil-i-e-yo", "是幾號？"),
  word("무슨", "mu-seun", "什麼"),
  word("요일이에요", "yo-il-i-e-yo", "是星期幾？"),
  word("음", "eum", "嗯"),
  word("수요일이에요", "su-yo-il-i-e-yo", "是星期三"),
  word("여행가는", "yeo-haeng-ga-neun", "去旅行的"),
  word("날이", "nal-i", "日子（主語）"),
  word("내일이에요", "nae-il-i-e-yo", "是明天"),
  word("날짜를", "nal-jja-reul", "把日期"),
  word("헷갈렸네요", "het-gal-lyeot-ne-yo", "搞混了"),
  word("내일", "nae-il", "明天"),
  word("일찍", "il-jjik", "早一點"),
  word("옵시다", "op-si-da", "來吧/出發吧")
];

const l25 = [
  word("바닷물", "ba-dan-mul", "海水（唸作 바단물）"),
  word("너무", "neo-mu", "太/很"),
  word("예뻐요", "ye-ppeo-yo", "漂亮"),
  word("바닥", "ba-dak", "地板"),
  word("바닥에", "ba-dag-e", "在地板上"),
  word("있는", "in-neun", "在/有的"),
  word("물이요", "mu-ri-yo", "是水嗎？"),
  word("아니요", "a-ni-yo", "不是"),
  word("저기", "jeo-gi", "那邊"),
  word("진짜", "jin-jja", "真的"),
  word("아름다워요", "a-reum-da-wo-yo", "美麗/漂亮"),
  word("수업", "su-eop", "課程"),
  word("끝난", "kkeun-nan", "結束的"),
  word("후에", "hu-e", "之後"),
  word("어디에", "eo-di-e", "去哪裡"),
  word("가요", "ga-yo", "去"),
  word("오토바이로", "o-to-ba-i-ro", "坐摩托車"),
  word("터미널에", "teo-mi-neor-e", "去客運站"),
  word("왜", "wae", "為什麼"),
  word("오토바이", "o-to-ba-i", "摩托車"),
  word("타고", "ta-go", "搭乘"),
  word("오토바이가", "o-to-ba-i-ga", "摩托車（主語）"),
  word("더", "deo", "更"),
  word("빨라요", "ppal-la-yo", "快"),
  word("그건", "geu-geon", "那個"),
  word("그래요", "geu-rae-yo", "沒錯/是的"),
  word("조심해서", "jo-sim-hae-seo", "小心地"),
  word("알겠어요", "al-ge-sseo-yo", "我知道了")
];

const l26 = [
  word("크게", "keu-ge", "大聲地"),
  word("웃는게", "un-neun-ge", "笑這件事（唸作 운는게）"),
  word("공간에", "gong-gan-e", "對空間（唸作 공가네）"),
  word("좋아요", "jo-a-yo", "好"),
  word("공간", "gong-gan", "空間"),
  word("이라고요", "i-ra-go-yo", "你說…嗎？"),
  word("건강", "geon-gang", "健康"),
  word("발음이", "ba-reum-i", "發音（主語）"),
  word("너무", "neo-mu", "太/很"),
  word("비슷해서", "bi-seu-tae-seo", "因為太相似"),
  word("착각했어요", "chak-ga-kae-sseo-yo", "搞錯了/誤會了"),
  word("괜찮아요", "gwaen-cha-na-yo", "沒關係"),
  word("이제부터", "i-je-bu-teo", "從現在起"),
  word("많이", "ma-ni", "很多"),
  word("웃어야겠어요", "u-seo-ya-ge-sseo-yo", "得多笑才行"),
  word("한국어", "han-gu-geo", "韓語"),
  word("이상해서", "i-sang-hae-seo", "因為很奇怪"),
  word("어떡해요", "eo-tteo-kae-yo", "怎麼辦？"),
  word("그럼", "geu-reom", "那麼"),
  word("같이", "ga-chi", "一起"),
  word("연습할까요", "yeon-seu-pal-kka-yo", "要一起練習嗎？"),
  word("책만", "chaeng-man", "只看書"),
  word("보는", "bo-neun", "看的"),
  word("것은", "geo-seun", "事情/東西"),
  word("싫어요", "si-reo-yo", "討厭/不喜歡"),
  word("재미있게", "jae-mi-it-ge", "有趣地"),
  word("연습하는", "yeon-seu-pa-neun", "練習的"),
  word("방법", "bang-beop", "方法"),
  word("없어요", "eop-seo-yo", "沒有嗎？"),
  word("잰말놀이", "jaen-mal-no-ri", "繞口令"),
  word("볼까요", "bol-kka-yo", "要試試看嗎？"),
  word("한국관광공사", "han-guk-gwan-gwang-gong-sa", "韓國觀光公社"),
  word("곽진광", "gwak-jin-gwang", "郭振光（人名）"),
  word("관광과장", "gwan-gwang-gwa-jang", "觀光科長"),
  word("철수책상은", "cheol-su-chaek-sang-eun", "哲秀的書桌是"),
  word("철책상", "cheol-chaek-sang", "鐵書桌")
];

// === 初級 1 系列（new format，與 L2 系列分開）===
const b11 = [
  word("안녕하세요", "an-nyeong-ha-se-yo", "您好"),
  word("저는", "jeo-neun", "我（主題）"),
  word("임관우입니다", "im-gwan-u-im-ni-da", "我是林冠宇"),
  word("만나서", "man-na-seo", "見面後"),
  word("반갑습니다", "ban-gap-seum-ni-da", "很高興（認識你）"),
  word("김민준입니다", "gim-min-jun-im-ni-da", "我是金敏俊"),
  word("김민준", "gim-min-jun", "金敏俊（人名）"),
  word("씨는", "ssi-neun", "先生/小姐（主題）"),
  word("한국", "han-guk", "韓國"),
  word("사람입니까", "sa-ram-im-ni-kka", "是…人嗎？"),
  word("네", "ne", "是"),
  word("사람입니다", "sa-ram-im-ni-da", "是…人"),
  word("임관우", "im-gwan-u", "林冠宇（人名）"),
  word("대만", "dae-man", "台灣")
];

const b12 = [
  word("여기는", "yeo-gi-neun", "這裡（主題）"),
  word("라오허지에", "ra-o-heo-ji-e", "饒河街"),
  word("야시장입니까", "ya-si-jang-im-ni-kka", "是夜市嗎？"),
  word("아니요", "a-ni-yo", "不是"),
  word("야시장이", "ya-si-jang-i", "夜市（主語）"),
  word("아닙니다", "a-nim-ni-da", "不是"),
  word("쓰린", "sseu-rin", "士林"),
  word("야시장입니다", "ya-si-jang-im-ni-da", "是夜市"),
  word("버블티입니까", "beo-beul-ti-im-ni-kka", "是珍奶嗎？"),
  word("버블티는", "beo-beul-ti-neun", "珍奶（主題）"),
  word("대만", "dae-man", "台灣"),
  word("음식입니까", "eum-sik-im-ni-kka", "是…食物嗎？"),
  word("네", "ne", "是"),
  word("음식입니다", "eum-sik-im-ni-da", "是…食物"),
  word("대접해", "dae-jeo-pae", "招待/接待"),
  word("주셔서", "ju-syeo-seo", "為我（做）"),
  word("감사합니다", "gam-sa-ham-ni-da", "謝謝"),
  word("안녕히", "an-nyeong-hi", "平安地"),
  word("가세요", "ga-se-yo", "請走（再見）")
];

const b13 = [
  word("오늘", "o-neul", "今天"),
  word("날씨가", "nal-ssi-ga", "天氣（主語）"),
  word("어떻습니까", "eo-tteo-seum-ni-kka", "如何？／怎麼樣？"),
  word("좀", "jom", "稍微／一點"),
  word("덥습니다", "deop-seum-ni-da", "熱"),
  word("거기도", "geo-gi-do", "那裡也"),
  word("덥습니까", "deop-seum-ni-kka", "熱嗎？"),
  word("아니요", "a-ni-yo", "不"),
  word("시원합니다", "si-won-ham-ni-da", "涼爽"),
  word("요즘", "yo-jeum", "最近"),
  word("한국", "han-guk", "韓國"),
  word("좋습니다", "jo-seum-ni-da", "好"),
  word("한국어가", "han-gu-geo-ga", "韓語（主語）"),
  word("어렵습니까", "eo-ryeop-seum-ni-kka", "難嗎？"),
  word("네", "ne", "是"),
  word("어렵습니다", "eo-ryeop-seum-ni-da", "難"),
  word("하지만", "ha-ji-man", "但是"),
  word("재미있습니다", "jae-mi-it-seum-ni-da", "有趣")
];

const b14 = [
  word("여기가", "yeo-gi-ga", "這裡（主語）"),
  word("어디입니까", "eo-di-im-ni-kka", "是哪裡？"),
  word("가오슝입니다", "ga-o-syung-im-ni-da", "是高雄"),
  word("가오슝은", "ga-o-syung-eun", "高雄（主題）"),
  word("대만의", "dae-man-ui", "台灣的"),
  word("부산입니다", "bu-san-im-ni-da", "是釜山"),
  word("아주", "a-ju", "非常"),
  word("덥습니다", "deop-seum-ni-da", "熱"),
  word("그렇습니까", "geu-reo-seum-ni-kka", "是嗎？"),
  word("음료수", "eum-nyo-su", "飲料"),
  word("가게가", "ga-ge-ga", "店（主語）"),
  word("많습니까", "man-seum-ni-kka", "多嗎？"),
  word("네", "ne", "是"),
  word("많습니다", "man-seum-ni-da", "多"),
  word("버블티", "beo-beul-ti", "珍奶"),
  word("종류도", "jong-nyu-do", "種類也"),
  word("좋습니다", "jo-seum-ni-da", "好"),
  word("버블티는", "beo-beul-ti-neun", "珍奶（主題）"),
  word("제가", "je-ga", "我（主語）"),
  word("제일", "je-il", "最"),
  word("좋아하는", "jo-a-ha-neun", "喜歡的"),
  word("음료수입니다", "eum-nyo-su-im-ni-da", "是飲料")
];

export const courseLessons = [
  {
    id: "l2-1",
    label: "L2-1",
    titleKo: "취미가 뭡니까?",
    titleZh: "你的興趣是什麼？",
    theme: "興趣與休閒活動",
    sourcePdf: "docs/lessons/L2-1PDF Viewer.pdf",
    media: {
      hero: courseAsset("l2-1-dialogue-person")
    },
    dialogues: [
      {
        title: "情境對話",
        image: courseAsset("l2-1-dialogue-person"),
        objectImage: courseAsset("l2-1-dialogue-object"),
        lines: [
          line("유미", "관우 씨, 취미가 뭡니까?", "關宇，你的興趣是什麼？", [l21[0], l21[1], l21[2], l21[3]]),
          line("관우", "제 취미는 여자입니다.", "我的興趣是女人。", [l21[4], l21[5], l21[6]]),
          line("유미", "여자! 여자요? 혹시 요가입니까?", "女人！女人嗎？該不會是瑜伽嗎？", [l21[7], l21[8], l21[9], l21[10]]),
          line("관우", "아...네, 요가입니다.", "啊...是，是瑜伽。", [word("아", "a", "啊"), l21[11], l21[12]])
        ]
      },
      {
        title: "對話練習",
        image: courseAsset("l2-1-practice-person"),
        objectImage: courseAsset("l2-1-practice-visual"),
        lines: [
          line("지민", "안녕하세요. 저는 지민입니다. 만나서 반갑습니다.", "您好。我是智敏。很高興認識你。", [l21[13], l21[14], l21[15], l21[17], l21[18]]),
          line("유미", "안녕하세요. 저는 유미입니다. 만나서 반갑습니다.", "您好。我是由美。很高興認識你。", [l21[13], l21[14], l21[16], l21[17], l21[18]]),
          line("지민", "유미 씨, 시간 있으면 뭘 합니까?", "由美，如果有時間會做什麼？", [word("유미", "yu-mi", "由美"), l21[1], l21[19], l21[20], l21[21], l21[22]]),
          line("유미", "제 취미는 쇼핑하기입니다. 세일 좋아하니까요.", "我的興趣是逛街。因為我喜歡特價。", [l21[4], l21[5], l21[23], l21[24], l21[25]]),
          line("지민", "제 친한 친구하고 똑같아요. 다음에 같이 놀아요.", "和我的好朋友一模一樣。下次一起玩吧。", [l21[4], l21[26], l21[27], l21[28], l21[29], l21[30], l21[31]])
        ]
      }
    ],
    vocabulary: withVocabImages("l2-1", [
      word("스포츠", "seu-po-cheu", "運動"),
      word("야구", "ya-gu", "棒球"),
      word("요가", "yo-ga", "瑜伽"),
      word("책을 읽기", "chae-geul il-gi", "讀書"),
      word("소설", "so-seol", "小說"),
      word("잡지", "jap-ji", "雜誌"),
      word("사진 찍기", "sa-jin jjik-gi", "拍照"),
      word("쇼핑하기", "syo-ping-ha-gi", "逛街/購物"),
      word("잠을 자기", "ja-meul ja-gi", "睡覺"),
      word("여행하기", "yeo-haeng-ha-gi", "旅行"),
      word("노래하기", "no-rae-ha-gi", "唱歌"),
      word("게임하기", "ge-im-ha-gi", "玩遊戲")
    ])
  },
  {
    id: "l2-2",
    label: "L2-2",
    titleKo: "몸이 아픕니다",
    titleZh: "身體不舒服",
    theme: "身體部位與看病",
    sourcePdf: "docs/lessons/L2-2PDF Viewer.pdf",
    media: {
      hero: courseAsset("l2-2-dialogue-person")
    },
    dialogues: [
      {
        title: "情境對話",
        image: courseAsset("l2-2-dialogue-person"),
        lines: [
          line("유미", "많이 이야기해서 몸이 아픕니다.", "因為說太多話，身體不舒服。", [l22[0], l22[1], l22[2], l22[3]]),
          line("관우", "몸이요? 그럼 어디가 아픕니까?", "身體嗎？那麼哪裡痛？", [l22[4], l22[5], l22[6], l22[7]]),
          line("유미", "아...목이 아픕니다.", "啊...喉嚨痛。", [word("아", "a", "啊"), l22[8], l22[3]]),
          line("관우", "그렇군요. 이따가 병원에 갑시다.", "原來如此。等一下去醫院吧。", [l22[9], l22[10], l22[11], l22[12]])
        ]
      },
      {
        title: "醫院對話練習",
        image: courseAsset("l2-2-practice-person"),
        objectImage: courseAsset("l2-2-practice-visual"),
        lines: [
          line("의사", "어디가 불편합니까?", "哪裡不舒服？", [l22[6], l22[15]]),
          line("환자", "제 머리가 어제부터 아픕니다.", "我的頭從昨天開始痛。", [word("제", "je", "我的"), l22[16], l22[17], l22[3]]),
          line("의사", "너무 피곤해서 그런가 봐요. 몸 조심하세요.", "可能是太累了。請保重身體。", [l22[18], l22[19], l22[20], l22[21], l22[22], l22[23]]),
          line("환자", "네, 알겠습니다.", "好的，我知道了。", [word("네", "ne", "是/好的"), l22[24]]),
          line("의사", "이따가 주사 놔드리고 약 드릴게요. 푹 쉬세요.", "等一下幫您打針並給藥。請好好休息。", [l22[10], l22[25], l22[26], l22[27], l22[28], l22[29], l22[30]]),
          line("환자", "네, 감사합니다. 안녕히 계세요.", "好的，謝謝。再見。", [word("네", "ne", "是/好的"), l22[31], l22[32], l22[33]])
        ]
      }
    ],
    vocabulary: withVocabImages("l2-2", [
      word("머리", "meo-ri", "頭"),
      word("가슴", "ga-seum", "胸口"),
      word("허리", "heo-ri", "腰"),
      word("가렵다", "ga-ryeop-da", "癢"),
      word("압통", "ap-tong", "壓痛"),
      word("붓다", "but-da", "腫起來"),
      word("진통제", "jin-tong-je", "止痛藥"),
      word("캡슐", "kaep-syul", "膠囊"),
      word("연고", "yeon-go", "藥膏"),
      word("입원", "ib-won", "住院"),
      word("검사", "geom-sa", "檢查"),
      word("수술", "su-sul", "手術")
    ])
  },
  {
    id: "l2-3",
    label: "L2-3",
    titleKo: "이거 얼마예요?",
    titleZh: "這個多少錢？",
    theme: "咖啡廳點餐與價格",
    sourcePdf: "docs/lessons/L2-3PDF Viewer.pdf",
    media: {
      hero: courseAsset("l2-3-dialogue-person")
    },
    dialogues: [
      {
        title: "情境對話",
        image: courseAsset("l2-3-dialogue-person"),
        objectImage: courseAsset("l2-3-dialogue-object"),
        lines: [
          line("유미", "저기요, 커피 하나 얼마예요?", "不好意思，一杯咖啡多少錢？", [l23[0], l23[1], l23[2], l23[3]]),
          line("점원", "커피요?", "咖啡嗎？", [l23[4]]),
          line("유미", "네, 하나 얼마예요?", "是，一個多少錢？", [word("네", "ne", "是"), l23[2], l23[3]]),
          line("점원", "커피 한 잔 이천오백원이에요.", "一杯咖啡是二千五百韓元。", [l23[1], l23[5], l23[6], l23[7]])
        ]
      },
      {
        title: "咖啡廳對話練習",
        image: courseAsset("l2-3-practice-person"),
        objectImage: courseAsset("l2-3-practice-visual"),
        lines: [
          line("점원", "어서오세요, 무엇을 드릴까요?", "歡迎光臨，要點什麼？", [l23[8], l23[9], l23[10]]),
          line("유미", "커피하고 와플 주세요.", "請給我咖啡和鬆餅。", [l23[11], l23[12], l23[13]]),
          line("점원", "모두 오천원이에요.", "全部是五千韓元。", [l23[14], l23[15]]),
          line("유미", "네? 오천이백원 아니에요?", "咦？不是五千二百韓元嗎？", [word("네", "ne", "咦/是"), l23[16], l23[17]]),
          line("점원", "여기 보세요. 커피하고 와플 같이 사면 세트가 돼요.", "請看這裡。咖啡和鬆餅一起買會變套餐。", [l23[18], l23[19], l23[11], l23[12], l23[20], l23[21], l23[22], l23[23]]),
          line("유미", "아~알겠습니다. 감사합니다.", "啊，我知道了。謝謝。", [word("아", "a", "啊"), l23[24], l23[25]])
        ]
      }
    ],
    vocabulary: withVocabImages("l2-3", [
      word("녹차", "nok-cha", "綠茶"),
      word("라떼", "ra-tte", "拿鐵"),
      word("고구마", "go-gu-ma", "地瓜"),
      word("허브차", "heo-beu-cha", "花草茶"),
      word("핫초코", "hat-cho-ko", "熱巧克力"),
      word("카페모카", "ka-pe-mo-ka", "摩卡咖啡"),
      word("주스", "ju-seu", "果汁"),
      word("스무디", "seu-mu-di", "冰沙"),
      word("세트", "se-teu", "套餐"),
      word("빙수", "bing-su", "刨冰"),
      word("와플", "wa-peul", "鬆餅"),
      word("조각케이크", "jo-gak-ke-i-keu", "切片蛋糕")
    ]),
    notes: [
      word("이천오백원", "i-cheon-o-baek-won", "2,500 韓元"),
      word("오천원", "o-cheon-won", "5,000 韓元"),
      word("오천이백원", "o-cheon-i-baek-won", "5,200 韓元")
    ],
    guide: {
      label: "數字",
      title: "學習說出數字",
      hint: "點擊任一數字即可聽發音，並查看拼音與音節拆解。",
      sections: [
        {
          heading: null,
          words: [
            word("일", "il", "1"),
            word("이", "i", "2"),
            word("삼", "sam", "3"),
            word("사", "sa", "4"),
            word("오", "o", "5"),
            word("육", "yuk", "6"),
            word("칠", "chil", "7"),
            word("팔", "pal", "8"),
            word("구", "gu", "9"),
            word("십", "sip", "10"),
            word("백", "baek", "100"),
            word("이백", "i-baek", "200"),
            word("천", "cheon", "1,000"),
            word("삼천", "sam-cheon", "3,000"),
            word("만", "man", "10,000"),
            word("사만", "sa-man", "40,000"),
            word("십만", "sip-man", "100,000"),
            word("육십만", "yuk-sip-man", "600,000")
          ]
        }
      ],
      practice: {
        heading: "練習說出價錢",
        hint: "每題金額的韓文答案與發音如下，點擊即可聽發音。",
        valueSuffix: " 원",
        items: [
          { value: "300", answer: word("삼백", "sam-baek", "300 원") },
          { value: "659", answer: word("육백오십구", "yuk-baek-o-sip-gu", "659 원") },
          { value: "1,500", answer: word("천오백", "cheon-o-baek", "1,500 원") },
          { value: "4,300", answer: word("사천삼백", "sa-cheon-sam-baek", "4,300 원") },
          { value: "6,208", answer: word("육천이백팔", "yuk-cheon-i-baek-pal", "6,208 원") },
          { value: "19,154", answer: word("만구천백오십사", "man-gu-cheon-baek-o-sip-sa", "19,154 원") },
          { value: "83,400", answer: word("팔만삼천사백", "pal-man-sam-cheon-sa-baek", "83,400 원") },
          { value: "500,689", answer: word("오십만육백팔십구", "o-sip-man-yuk-baek-pal-sip-gu", "500,689 원") }
        ]
      }
    }
  },
  {
    id: "l2-4",
    label: "L2-4",
    titleKo: "여행 합시다!",
    titleZh: "一起去旅行吧！",
    theme: "旅行準備與日期說法",
    sourcePdf: "docs/lessons/L2-4PDF Viewer.pdf",
    media: {
      hero: courseAsset("l2-4-dialogue-person")
    },
    dialogues: [
      {
        title: "情境對話",
        image: courseAsset("l2-4-dialogue-person"),
        objectImage: courseAsset("l2-4-dialogue-object"),
        lines: [
          line("유미", "이모, 차가운 무 주세요.", "阿姨，請給我冰的蘿蔔。", [l24[0], l24[1], l24[2], l24[3]]),
          line("이모", "차가운 무?", "冰的蘿蔔？", [l24[1], l24[2]]),
          line("유미", "아, 죄송합니다. 물 주세요.", "啊，對不起。請給我水。", [word("아", "a", "啊"), l24[4], l24[5], l24[3]]),
          line("이모", "네~ 잠시만요.", "好的~ 請稍等一下。", [word("네", "ne", "好的"), l24[6]])
        ]
      },
      {
        title: "旅行對話練習",
        image: courseAsset("l2-4-practice-person"),
        objectImage: courseAsset("l2-4-practice-visual"),
        lines: [
          line("관우", "물건 다 챙겼지요?", "東西都收拾好了嗎？", [l24[7], l24[8], l24[9]]),
          line("유미", "클렌징 있고, 칫솔도 있고, 보조 배터리……", "有卸妝乳，也有牙刷，行動電源……", [l24[10], l24[11], l24[12], l24[11], l24[13], l24[14]]),
          line("관우", "잠깐, 오늘 며칠이에요? 무슨 요일이에요?", "等等，今天幾號？星期幾？", [l24[15], l24[16], l24[19], l24[20], l24[21]]),
          line("유미", "음…오늘 삼십일 일이에요. 수요일이에요.", "嗯…今天31號。星期三。", [l24[22], l24[16], l24[17], l24[18], l24[23]]),
          line("관우", "여행가는 날이 내일이에요.", "出發旅行的日子是明天。", [l24[24], l24[25], l24[26]]),
          line("유미", "날짜를 헷갈렸네요. 내일 일찍 옵시다.", "我把日期搞混了。明天早點出發吧。", [l24[27], l24[28], l24[29], l24[30], l24[31]])
        ]
      }
    ],
    vocabulary: withVocabImages("l2-4", [
      word("지갑", "ji-gap", "錢包/皮夾"),
      word("백팩", "baek-paek", "後背包"),
      word("캐리어", "kae-ri-eo", "行李箱"),
      word("포인트 카드", "po-in-teu ka-deu", "點數卡/集點卡"),
      word("주민등록증", "ju-min-deung-nok-jjeung", "身分證"),
      word("동전", "dong-jeon", "硬幣"),
      word("칫솔", "chit-sol", "牙刷"),
      word("손수건", "son-su-geon", "手帕"),
      word("클렌징", "keul-len-jing", "卸妝乳"),
      word("휴대폰", "hyu-dae-pon", "手機"),
      word("셀카봉", "sel-ka-bong", "自拍棒"),
      word("보조 배터리", "bo-jo bae-teo-ri", "行動電源")
    ]),
    guide: {
      label: "日期",
      title: "學習說出星期、日期、月份",
      hint: "點擊任一單字即可聽發音，並查看拼音與音節拆解。",
      sections: [
        {
          heading: "星期（요일）",
          words: [
            word("월요일", "wo-ryo-il", "星期一"),
            word("화요일", "hwa-yo-il", "星期二"),
            word("수요일", "su-yo-il", "星期三"),
            word("목요일", "mo-gyo-il", "星期四"),
            word("금요일", "geu-myo-il", "星期五"),
            word("토요일", "to-yo-il", "星期六"),
            word("일요일", "i-ryo-il", "星期日")
          ]
        },
        {
          heading: "月份（월）",
          words: [
            word("일월", "il-wol", "1月"),
            word("이월", "i-wol", "2月"),
            word("삼월", "sam-wol", "3月"),
            word("사월", "sa-wol", "4月"),
            word("오월", "o-wol", "5月"),
            word("유월", "yu-wol", "6月"),
            word("칠월", "chil-wol", "7月"),
            word("팔월", "pal-wol", "8月"),
            word("구월", "gu-wol", "9月"),
            word("시월", "si-wol", "10月"),
            word("십일월", "sip-il-wol", "11月"),
            word("십이월", "sip-i-wol", "12月")
          ]
        },
        {
          heading: "日期（일）",
          words: [
            word("일일", "il-il", "1日"),
            word("이일", "i-il", "2日"),
            word("삼일", "sam-il", "3日"),
            word("사일", "sa-il", "4日"),
            word("오일", "o-il", "5日"),
            word("육일", "yuk-il", "6日"),
            word("십일", "sip-il", "10日"),
            word("십오일", "sip-o-il", "15日"),
            word("이십일", "i-sip-il", "20日"),
            word("이십육일", "i-sip-yuk-il", "26日"),
            word("삼십일", "sam-sip-il", "30日"),
            word("삼십일일", "sam-sip-il-il", "31日")
          ]
        }
      ],
      practice: {
        heading: "練習說出日期、月份",
        hint: "把日期念成「○월 ○일」，韓文答案與發音如下，點擊即可聽發音。",
        valueSuffix: "",
        items: [
          { value: "3/10", answer: word("삼월 십일", "sam-wol sip-il", "3月10日") },
          { value: "6/9", answer: word("유월 구일", "yu-wol gu-il", "6月9日") },
          { value: "5/14", answer: word("오월 십사일", "o-wol sip-sa-il", "5月14日") },
          { value: "7/16", answer: word("칠월 십육일", "chil-wol sip-yuk-il", "7月16日") },
          { value: "12/31", answer: word("십이월 삼십일일", "sip-i-wol sam-sip-il-il", "12月31日") },
          { value: "10/10", answer: word("시월 십일", "si-wol sip-il", "10月10日") },
          { value: "8/13", answer: word("팔월 십삼일", "pal-wol sip-sam-il", "8月13日（목요일）") },
          { value: "5/1", answer: word("오월 일일", "o-wol il-il", "5月1日（화요일）") },
          { value: "9/28", answer: word("구월 이십팔일", "gu-wol i-sip-pal-il", "9月28日（토요일）") }
        ]
      }
    }
  },
  {
    id: "l2-5",
    label: "L2-5",
    titleKo: "어디에 가요?",
    titleZh: "你要去哪裡？",
    theme: "交通工具與地點",
    sourcePdf: "docs/lessons/L2-5PDF Viewer.pdf",
    media: {
      hero: courseAsset("l2-5-dialogue-person")
    },
    dialogues: [
      {
        title: "情境對話",
        image: courseAsset("l2-5-dialogue-person"),
        objectImage: courseAsset("l2-5-dialogue-object"),
        lines: [
          line("관우", "‘바닷물’ 너무 예뻐요.", "「海水」太美了。", [l25[0], l25[1], l25[2]]),
          line("유미", "‘바닥’물? 바닥에 있는 물이요?", "「地板」水？是在地板上的水嗎？", [l25[3], l25[4], l25[5], l25[6]]),
          line("관우", "아니요. 저~기 ‘바닷물’이요.", "不是。是那邊的「海水」。", [l25[7], l25[8], l25[0]]),
          line("유미", "아…진짜 아름다워요.", "啊…真的好美。", [word("아", "a", "啊"), l25[9], l25[10]])
        ]
      },
      {
        title: "對話練習",
        image: courseAsset("l2-5-practice-person"),
        objectImage: courseAsset("l2-5-practice-visual"),
        lines: [
          line("관우", "수업 끝난 후에 어디에 가요?", "下課後要去哪裡？", [l25[11], l25[12], l25[13], l25[14], l25[15]]),
          line("유미", "오토바이로 터미널에 가요.", "我坐摩托車去客運站。", [l25[16], l25[17], l25[15]]),
          line("관우", "왜 오토바이 타고 가요?", "為什麼坐摩托車去？", [l25[18], l25[19], l25[20], l25[15]]),
          line("유미", "오토바이가 더 빨라요.", "摩托車比較快。", [l25[21], l25[22], l25[23]]),
          line("관우", "그건 그래요. 조심해서 가요.", "那倒是。小心點去。", [l25[24], l25[25], l25[26], l25[15]]),
          line("유미", "네, 알겠어요.", "好的，我知道了。", [word("네", "ne", "是/好的"), l25[27]])
        ]
      }
    ],
    vocabulary: withVocabImages("l2-5", [
      word("버스 정류장", "beo-seu jeong-nyu-jang", "公車站"),
      word("지하철역", "ji-ha-cheo-ryeok", "地鐵站"),
      word("터미널", "teo-mi-neol", "客運站"),
      word("비행기", "bi-haeng-gi", "飛機"),
      word("고속 철도", "go-sok cheol-do", "高速鐵路"),
      word("도보", "do-bo", "步行"),
      word("은행", "eun-haeng", "銀行"),
      word("편의점", "pyeo-nui-jeom", "便利商店"),
      word("헬스장", "hel-seu-jang", "健身房"),
      word("국내", "gung-nae", "國內"),
      word("박물관", "bang-mul-gwan", "博物館"),
      word("평후", "pyeong-hu", "澎湖")
    ])
  },
  {
    id: "l2-6",
    label: "L2-6",
    titleKo: "한국말 잘하고 싶어요.",
    titleZh: "我希望韓文能講好一點",
    theme: "繞口令與表達喜好",
    sourcePdf: "docs/lessons/L2-6PDF Viewer.pdf",
    media: {
      hero: courseAsset("l2-6-dialogue-person")
    },
    dialogues: [
      {
        title: "情境對話",
        image: courseAsset("l2-6-dialogue-person"),
        objectImage: courseAsset("l2-6-dialogue-object"),
        lines: [
          line("관우", "크게 웃는게 ‘공간’에 좋아요.", "大笑對「空間」很好。", [l26[0], l26[1], l26[2], l26[3]]),
          line("유미", "‘공간’이라고요?", "你說「空間」？", [l26[4], l26[5]]),
          line("관우", "아…‘건강’. 발음이 너무 비슷해서 착각했어요.", "啊…是「健康」。發音太像了，所以說錯了。", [word("아", "a", "啊"), l26[6], l26[7], l26[8], l26[9], l26[10]]),
          line("유미", "괜찮아요. 이제부터 많이 웃어야겠어요.", "沒關係。從現在起要多笑一點了。", [l26[11], l26[12], l26[13], l26[14]])
        ]
      },
      {
        title: "對話練習",
        image: courseAsset("l2-6-practice-person"),
        objectImage: courseAsset("l2-6-practice-visual"),
        lines: [
          line("유미", "한국어 발음이 이상해서 어떡해요?", "韓語發音很奇怪，怎麼辦？", [l26[15], l26[7], l26[16], l26[17]]),
          line("관우", "그럼 같이 연습할까요?", "那要不要一起練習？", [l26[18], l26[19], l26[20]]),
          line("유미", "책만 보는 것은 싫어요. 재미있게 연습하는 방법 없어요?", "只看書很無聊。有沒有有趣一點的練習方法？", [l26[21], l26[22], l26[23], l26[24], l26[25], l26[26], l26[27], l26[28]]),
          line("관우", "잰말놀이 해 볼까요? 한국관광공사 곽진광 관광과장.", "要不要玩繞口令？「韓國觀光公社郭振光觀光科長」。", [l26[29], word("해", "hae", "做"), l26[30], l26[31], l26[32], l26[33]]),
          line("유미", "철수책상은 철책상.", "「哲秀的書桌是鐵書桌」。", [l26[34], l26[35]])
        ]
      }
    ],
    vocabulary: withVocabImages("l2-6", [
      word("야채", "ya-chae", "蔬菜"),
      word("고기", "go-gi", "肉"),
      word("과일", "gwa-il", "水果"),
      word("조깅", "jo-ging", "慢跑"),
      word("수영", "su-yeong", "游泳"),
      word("사이클링", "sa-i-keul-ling", "自行車運動"),
      word("잰말놀이", "jaen-mal-no-ri", "繞口令"),
      word("닭싸움", "dak-ssa-um", "鬥雞遊戲"),
      word("윷놀이", "yun-no-ri", "擲柶遊戲"),
      word("좋아해요", "jo-a-hae-yo", "喜歡"),
      word("싫어해요", "si-reo-hae-yo", "討厭"),
      word("제가", "je-ga", "我（主語）")
    ])
  },
  {
    id: "b1-1",
    label: "初級1-1",
    titleKo: "안녕하세요. 저는 대만 사람입니다.",
    titleZh: "你好，我是台灣人。",
    theme: "問候與自我介紹",
    sourcePdf: "docs/lessons/new/L1PDF Viewer.pdf",
    media: {
      hero: courseAsset("b1-1-dialogue-person")
    },
    dialogues: [
      {
        title: "本課對話",
        image: courseAsset("b1-1-dialogue-person"),
        objectImage: courseAsset("b1-1-dialogue-object"),
        lines: [
          line("관우", "안녕하세요. 저는 임관우입니다. 만나서 반갑습니다.", "您好。我是林冠宇。很高興認識你。", [b11[0], b11[1], b11[2], b11[3], b11[4]]),
          line("민준", "안녕하세요. 저는 김민준입니다. 반갑습니다.", "您好。我是金敏俊。很高興認識你。", [b11[0], b11[1], b11[5], b11[4]]),
          line("관우", "김민준 씨는 한국 사람입니까?", "金敏俊先生是韓國人嗎？", [b11[6], b11[7], b11[8], b11[9]]),
          line("민준", "네, 저는 한국 사람입니다. 임관우 씨는 대만 사람입니까?", "是，我是韓國人。林冠宇先生是台灣人嗎？", [b11[10], b11[1], b11[8], b11[11], b11[12], b11[7], b11[13], b11[9]]),
          line("관우", "네. 저는 대만 사람입니다.", "是。我是台灣人。", [b11[10], b11[1], b11[13], b11[11]])
        ]
      }
    ],
    vocabulary: withVocabImages("b1-1", [
      word("대만", "dae-man", "台灣"),
      word("한국", "han-guk", "韓國"),
      word("일본", "il-bon", "日本"),
      word("타이베이", "ta-i-be-i", "台北"),
      word("타이중", "ta-i-jung", "台中"),
      word("타이난", "ta-i-nan", "台南"),
      word("가오슝", "ga-o-syung", "高雄"),
      word("선생님", "seon-saeng-nim", "老師"),
      word("김치", "gim-chi", "泡菜"),
      word("떡볶이", "tteok-bok-i", "辣炒年糕"),
      word("찌파이", "jji-pa-i", "雞排"),
      word("버블티", "beo-beul-ti", "珍珠奶茶")
    ]),
    guide: {
      label: "句型",
      title: "「N은/는 N입니다」自我介紹",
      hint: "點擊任一單字即可聽發音，並查看拼音與音節拆解。",
      sections: [
        {
          heading: "問候・道別（인사）",
          words: [
            word("안녕하세요", "an-nyeong-ha-se-yo", "您好（非正式敬語）"),
            word("안녕하십니까", "an-nyeong-ha-sim-ni-kka", "您好（正式敬語）"),
            word("안녕", "an-nyeong", "嗨/再見（半語）"),
            word("만나서 반갑습니다", "man-na-seo ban-gap-seum-ni-da", "幸會/很高興認識你"),
            word("처음 뵙겠습니다", "cheo-eum boep-get-seum-ni-da", "初次見面"),
            word("네", "ne", "是"),
            word("아니요", "a-ni-yo", "不是")
          ]
        },
        {
          heading: "自我介紹用語",
          words: [
            word("저", "jeo", "我"),
            word("저는", "jeo-neun", "我（主題）"),
            word("씨", "ssi", "先生/小姐（禮貌稱呼）"),
            word("사람", "sa-ram", "人"),
            word("학생", "hak-saeng", "學生"),
            word("회사원", "hoe-sa-won", "上班族"),
            word("입니다", "im-ni-da", "是（陳述）"),
            word("입니까", "im-ni-kka", "是…嗎？（疑問）")
          ]
        }
      ],
      practice: {
        heading: "練習說出「我是…」",
        hint: "把中文念成韓語句子，答案與發音如下，點擊即可聽發音。",
        valueSuffix: "",
        items: [
          { value: "我是台灣人", answer: word("저는 대만 사람입니다", "jeo-neun dae-man sa-ram-im-ni-da", "我是台灣人") },
          { value: "我是韓國人", answer: word("저는 한국 사람입니다", "jeo-neun han-guk sa-ram-im-ni-da", "我是韓國人") },
          { value: "我是日本人", answer: word("저는 일본 사람입니다", "jeo-neun il-bon sa-ram-im-ni-da", "我是日本人") },
          { value: "我是台北人", answer: word("저는 타이베이 사람입니다", "jeo-neun ta-i-be-i sa-ram-im-ni-da", "我是台北人") },
          { value: "我是學生", answer: word("저는 학생입니다", "jeo-neun hak-saeng-im-ni-da", "我是學生") },
          { value: "我是上班族", answer: word("저는 회사원입니다", "jeo-neun hoe-sa-won-im-ni-da", "我是上班族") },
          { value: "你是韓國人嗎？", answer: word("한국 사람입니까?", "han-guk sa-ram-im-ni-kka", "（你）是韓國人嗎？") },
          { value: "你是老師嗎？", answer: word("선생님입니까?", "seon-saeng-nim-im-ni-kka", "（你）是老師嗎？") }
        ]
      }
    }
  },
  {
    id: "b1-2",
    label: "初級1-2",
    titleKo: "저는 학생이 아닙니다. 회사원입니다.",
    titleZh: "我不是學生，是上班族。",
    theme: "職業與「不是」的說法",
    sourcePdf: "docs/lessons/new/L2PDF Viewer.pdf",
    media: {
      hero: courseAsset("b1-2-dialogue-person")
    },
    dialogues: [
      {
        title: "本課對話",
        image: courseAsset("b1-2-dialogue-person"),
        objectImage: courseAsset("b1-2-dialogue-object"),
        lines: [
          line("민준", "여기는 라오허지에 야시장입니까?", "這裡是饒河街夜市嗎？", [b12[0], b12[1], b12[2]]),
          line("관우", "아니요, 라오허지에 야시장이 아닙니다. 쓰린 야시장입니다.", "不，不是饒河街夜市，是士林夜市。", [b12[3], b12[1], b12[4], b12[5], b12[6], b12[7]]),
          line("민준", "버블티입니까? 버블티는 대만 음식입니까?", "是珍珠奶茶嗎？珍珠奶茶是台灣食物嗎？", [b12[8], b12[9], b12[10], b12[11]]),
          line("관우", "네, 대만 음식입니다.", "是的，是台灣食物。", [b12[12], b12[10], b12[13]]),
          line("민준", "대접해 주셔서 감사합니다. 안녕히 가세요.", "謝謝招待。再見。", [b12[14], b12[15], b12[16], b12[17], b12[18]]),
          line("관우", "네, 안녕히 가세요.", "好，再見。", [b12[12], b12[17], b12[18]])
        ]
      }
    ],
    vocabulary: withVocabImages("b1-2", [
      word("회사원", "hoe-sa-won", "上班族"),
      word("공무원", "gong-mu-won", "公務員"),
      word("의사", "ui-sa", "醫師"),
      word("간호사", "gan-ho-sa", "護理師"),
      word("요리사", "yo-ri-sa", "廚師"),
      word("주부", "ju-bu", "家庭主婦"),
      word("선생님", "seon-saeng-nim", "老師"),
      word("학생", "hak-saeng", "學生"),
      word("버블티", "beo-beul-ti", "珍珠奶茶"),
      word("야시장", "ya-si-jang", "夜市"),
      word("여자", "yeo-ja", "女生"),
      word("남자", "nam-ja", "男生")
    ]),
    guide: {
      label: "句型",
      title: "「N이/가 아닙니다」表達不是",
      hint: "點擊任一單字即可聽發音，並查看拼音與音節拆解。",
      sections: [
        {
          heading: "道別與感謝（인사）",
          words: [
            word("안녕히 가세요", "an-nyeong-hi ga-se-yo", "再見（對方要離開時）"),
            word("안녕히 계세요", "an-nyeong-hi gye-se-yo", "再見（請留步）"),
            word("감사합니다", "gam-sa-ham-ni-da", "謝謝"),
            word("도와주셔서 감사합니다", "do-wa-ju-syeo-seo gam-sa-ham-ni-da", "謝謝幫忙"),
            word("대접해 주셔서 감사합니다", "dae-jeo-pae ju-syeo-seo gam-sa-ham-ni-da", "謝謝招待"),
            word("수고하셨습니다", "su-go-ha-syeot-seum-ni-da", "辛苦了")
          ]
        },
        {
          heading: "「不是」句型用語",
          words: [
            word("아닙니다", "a-nim-ni-da", "不是"),
            word("아닙니까", "a-nim-ni-kka", "不是…嗎？"),
            word("여기", "yeo-gi", "這裡"),
            word("집", "jip", "家"),
            word("여동생", "yeo-dong-saeng", "妹妹"),
            word("남동생", "nam-dong-saeng", "弟弟")
          ]
        }
      ],
      practice: {
        heading: "練習說出「不是…」",
        hint: "把中文念成韓語句子，答案與發音如下，點擊即可聽發音。",
        valueSuffix: "",
        items: [
          { value: "我不是學生", answer: word("저는 학생이 아닙니다", "jeo-neun hak-saeng-i a-nim-ni-da", "我不是學生") },
          { value: "我不是上班族", answer: word("저는 회사원이 아닙니다", "jeo-neun hoe-sa-won-i a-nim-ni-da", "我不是上班族") },
          { value: "林冠宇不是老師", answer: word("임관우 씨는 선생님이 아닙니다", "im-gwan-u ssi-neun seon-saeng-nim-i a-nim-ni-da", "林冠宇先生不是老師") },
          { value: "妹妹不是護理師", answer: word("여동생은 간호사가 아닙니다", "yeo-dong-saeng-eun gan-ho-sa-ga a-nim-ni-da", "妹妹不是護理師") },
          { value: "你不是醫師嗎？", answer: word("의사가 아닙니까?", "ui-sa-ga a-nim-ni-kka", "（你）不是醫師嗎？") },
          { value: "這裡不是台北嗎？", answer: word("여기는 타이베이가 아닙니까?", "yeo-gi-neun ta-i-be-i-ga a-nim-ni-kka", "這裡不是台北嗎？") },
          { value: "珍奶不是台灣食物嗎？", answer: word("버블티는 대만 음식이 아닙니까?", "beo-beul-ti-neun dae-man eum-sik-i a-nim-ni-kka", "珍珠奶茶不是台灣食物嗎？") },
          { value: "弟弟不是學生嗎？", answer: word("남동생은 학생이 아닙니까?", "nam-dong-saeng-eun hak-saeng-i a-nim-ni-kka", "弟弟不是學生嗎？") }
        ]
      }
    }
  },
  {
    id: "b1-3",
    label: "初級1-3",
    titleKo: "오늘 날씨가 어떻습니까?",
    titleZh: "今天天氣如何？",
    theme: "天氣與主格助詞 이/가",
    sourcePdf: "docs/lessons/new/L3PDF Viewer.pdf",
    media: {
      hero: courseAsset("b1-3-dialogue-person")
    },
    dialogues: [
      {
        title: "本課對話",
        image: courseAsset("b1-3-dialogue-person"),
        objectImage: courseAsset("b1-3-dialogue-object"),
        lines: [
          line("민준", "오늘 날씨가 어떻습니까?", "今天天氣如何？", [b13[0], b13[1], b13[2]]),
          line("관우", "좀 덥습니다. 거기도 덥습니까?", "有點熱。那裡也熱嗎？", [b13[3], b13[4], b13[5], b13[6]]),
          line("민준", "아니요, 시원합니다. 요즘 한국 날씨가 좋습니다.", "不，很涼爽。最近韓國天氣很好。", [b13[7], b13[8], b13[9], b13[10], b13[1], b13[11]]),
          line("민준", "한국어가 어렵습니까?", "韓語難嗎？", [b13[12], b13[13]]),
          line("관우", "네, 좀 어렵습니다. 하지만 재미있습니다.", "是，有點難。但是很有趣。", [b13[14], b13[3], b13[15], b13[16], b13[17]])
        ]
      }
    ],
    vocabulary: withVocabImages("b1-3", [
      word("비가 오다", "bi-ga-o-da", "下雨"),
      word("눈이 오다", "nun-i-o-da", "下雪"),
      word("구름이 많다", "gu-reum-i-man-ta", "多雲"),
      word("바람이 불다", "ba-ram-i-bul-da", "刮風"),
      word("흐리다", "heu-ri-da", "天陰"),
      word("안개가 끼다", "an-gae-ga-kki-da", "起霧"),
      word("천둥이 치다", "cheon-dung-i-chi-da", "打雷"),
      word("태풍이 오다", "tae-pung-i-o-da", "颱風（來）"),
      word("좋다", "jo-ta", "好"),
      word("덥다", "deop-da", "熱"),
      word("춥다", "chup-da", "冷"),
      word("맛있다", "mat-it-da", "好吃")
    ]),
    guide: {
      label: "句型",
      title: "「N이/가」主格助詞與「-ㅂ니다/습니다」",
      hint: "點擊任一單字即可聽發音，並查看拼音與音節拆解。",
      sections: [
        {
          heading: "天氣形容詞（형용사）",
          words: [
            word("좋다", "jo-ta", "好"),
            word("나쁘다", "na-ppeu-da", "壞"),
            word("덥다", "deop-da", "熱"),
            word("춥다", "chup-da", "冷"),
            word("시원하다", "si-won-ha-da", "涼爽"),
            word("예쁘다", "ye-ppeu-da", "漂亮"),
            word("맛있다", "mat-it-da", "好吃")
          ]
        },
        {
          heading: "韓語知識・漢字詞（한자어）",
          words: [
            word("감사", "gam-sa", "感謝（漢字「感謝」，意義相同）"),
            word("운동", "un-dong", "運動（漢字「運動」，意義相同）"),
            word("시간", "si-gan", "時間（漢字「時間」，意義相同）"),
            word("공부", "gong-bu", "讀書（漢字「工夫」，意義不同）"),
            word("만두", "man-du", "餃子（漢字「饅頭」，意義不同）"),
            word("유리", "yu-ri", "玻璃（漢字「琉璃」，意義不同）")
          ]
        }
      ],
      practice: {
        heading: "練習說出天氣句",
        hint: "把中文念成韓語句子，答案與發音如下，點擊即可聽發音。",
        valueSuffix: "",
        items: [
          { value: "天氣好嗎？", answer: word("날씨가 좋습니까?", "nal-ssi-ga jo-seum-ni-kka", "天氣好嗎？") },
          { value: "天氣很好", answer: word("날씨가 좋습니다", "nal-ssi-ga jo-seum-ni-da", "天氣很好") },
          { value: "台灣熱嗎？", answer: word("대만이 덥습니까?", "dae-man-i deop-seum-ni-kka", "台灣熱嗎？") },
          { value: "台灣很熱", answer: word("대만이 덥습니다", "dae-man-i deop-seum-ni-da", "台灣很熱") },
          { value: "韓國冷嗎？", answer: word("한국이 춥습니까?", "han-gu-gi chup-seum-ni-kka", "韓國冷嗎？") },
          { value: "韓國很冷", answer: word("한국이 춥습니다", "han-gu-gi chup-seum-ni-da", "韓國很冷") },
          { value: "學生很多", answer: word("학생이 많습니다", "hak-saeng-i man-seum-ni-da", "學生很多") },
          { value: "泡菜好吃", answer: word("김치가 맛있습니다", "gim-chi-ga mat-it-seum-ni-da", "泡菜好吃") }
        ]
      }
    }
  },
  {
    id: "b1-4",
    label: "初級1-4",
    titleKo: "버블티는 제가 제일 좋아하는 음료수입니다.",
    titleZh: "珍奶是我最喜歡的飲料。",
    theme: "飲料與主題補助詞 은/는",
    sourcePdf: "docs/lessons/new/L4PDF Viewer.pdf",
    media: {
      hero: courseAsset("b1-4-dialogue-person")
    },
    dialogues: [
      {
        title: "本課對話",
        image: courseAsset("b1-4-dialogue-person"),
        objectImage: courseAsset("b1-4-dialogue-object"),
        lines: [
          line("민준", "여기가 어디입니까?", "這裡是哪裡？", [b14[0], b14[1]]),
          line("관우", "가오슝입니다. 가오슝은 대만의 부산입니다. 아주 덥습니다.", "這是高雄。高雄是台灣的釜山。非常熱。", [b14[2], b14[3], b14[4], b14[5], b14[6], b14[7]]),
          line("민준", "그렇습니까? 음료수 가게가 많습니까?", "是嗎？飲料店很多嗎？", [b14[8], b14[9], b14[10], b14[11]]),
          line("관우", "네, 많습니다. 버블티 종류도 많습니다.", "是的，很多。珍奶的種類也很多。", [b14[12], b14[13], b14[14], b14[15], b14[13]]),
          line("민준", "좋습니다. 버블티는 제가 제일 좋아하는 음료수입니다.", "很好。珍奶是我最喜歡的飲料。", [b14[16], b14[17], b14[18], b14[19], b14[20], b14[21]])
        ]
      }
    ],
    vocabulary: withVocabImages("b1-4", [
      word("차", "cha", "茶"),
      word("홍차", "hong-cha", "紅茶"),
      word("우롱차", "u-rong-cha", "烏龍茶"),
      word("녹차", "nok-cha", "綠茶"),
      word("콜라", "kol-la", "可樂"),
      word("사이다", "sa-i-da", "汽水"),
      word("주스", "ju-seu", "果汁"),
      word("우유", "u-yu", "牛奶"),
      word("버블티", "beo-beul-ti", "珍奶"),
      word("밀크티", "mil-keu-ti", "奶茶"),
      word("커피", "keo-pi", "咖啡"),
      word("물", "mul", "水")
    ]),
    guide: {
      label: "句型",
      title: "「N은/는」主題補助詞與「主題-解說」句",
      hint: "點擊任一單字即可聽發音，並查看拼音與音節拆解。",
      sections: [
        {
          heading: "主題補助詞 은/는（주제 보조사）",
          words: [
            word("은", "eun", "主題補助詞（前字有尾音）"),
            word("는", "neun", "主題補助詞（前字無尾音）"),
            word("저는", "jeo-neun", "我（主題）"),
            word("대만의", "dae-man-ui", "台灣的"),
            word("수도", "su-do", "首都"),
            word("특산품", "teuk-san-pum", "特產品"),
            word("음료수", "eum-nyo-su", "飲料")
          ]
        },
        {
          heading: "「主題-解說」句型單字",
          words: [
            word("갈비탕", "gal-bi-tang", "排骨湯"),
            word("군인", "gun-in", "軍人"),
            word("나라", "na-ra", "國家"),
            word("지킵니다", "ji-kim-ni-da", "守護"),
            word("반드시", "ban-deu-si", "必定"),
            word("죽습니다", "juk-seum-ni-da", "死")
          ]
        }
      ],
      practice: {
        heading: "練習用 은/는 造主題句",
        hint: "把中文念成韓語句子，答案與發音如下，點擊即可聽發音。",
        valueSuffix: "",
        items: [
          { value: "我是台灣人", answer: word("저는 대만 사람입니다", "jeo-neun dae-man sa-ram-im-ni-da", "我是台灣人") },
          { value: "泡菜是韓國食物", answer: word("김치는 한국 음식입니다", "gim-chi-neun han-guk eum-sik-im-ni-da", "泡菜是韓國食物") },
          { value: "排骨湯是韓國食物", answer: word("갈비탕은 한국 음식입니다", "gal-bi-tang-eun han-guk eum-sik-im-ni-da", "排骨湯是韓國食物") },
          { value: "珍奶是台灣的飲料", answer: word("버블티는 대만의 음료수입니다", "beo-beul-ti-neun dae-man-ui eum-nyo-su-im-ni-da", "珍奶是台灣的飲料") },
          { value: "台北是台灣的首都", answer: word("타이베이는 대만의 수도입니다", "ta-i-be-i-neun dae-man-ui su-do-im-ni-da", "台北是台灣的首都") },
          { value: "軍人守護國家", answer: word("군인은 나라를 지킵니다", "gun-in-eun na-ra-reul ji-kim-ni-da", "軍人守護國家") },
          { value: "人必定得死", answer: word("사람은 반드시 죽습니다", "sa-ram-eun ban-deu-si juk-seum-ni-da", "人必定得死") },
          { value: "綠茶是中國人的飲料", answer: word("녹차는 중국 사람의 음료수입니다", "nok-cha-neun jung-guk sa-ram-ui eum-nyo-su-im-ni-da", "綠茶是中國人的飲料") }
        ]
      }
    }
  }
];
