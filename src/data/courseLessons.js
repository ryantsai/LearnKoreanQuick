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

function withSharedVocabImage(imageName, words) {
  return words.map((item) => ({ ...item, image: courseAsset(imageName) }));
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

const b15 = [
  word("불고기를", "bul-go-gi-reul", "烤牛肉（目的語）"),
  word("좋아합니까", "jo-a-ham-ni-kka", "喜歡嗎？"),
  word("네", "ne", "是"),
  word("좋아합니다", "jo-a-ham-ni-da", "喜歡"),
  word("아주", "a-ju", "非常"),
  word("맛있습니다", "mat-it-seum-ni-da", "好吃"),
  word("그럼", "geu-reom", "那麼"),
  word("같이", "ga-chi", "一起（發音「가치」）"),
  word("먹습니까", "meok-seum-ni-kka", "吃嗎？"),
  word("좋습니다", "jo-seum-ni-da", "好")
];

const b16 = [
  word("한국", "han-guk", "韓國"),
  word("날씨", "nal-ssi", "天氣"),
  word("어떻습니까", "eo-tteo-seum-ni-kka", "如何？"),
  word("북쪽은", "buk-jjo-geun", "北部（主題）"),
  word("시원합니다", "si-won-ham-ni-da", "涼爽"),
  word("그렇지만", "geu-reo-chi-man", "但是（發音「그러치만」）"),
  word("남쪽은", "nam-jjo-geun", "南部（主題）"),
  word("덥습니다", "deop-seum-ni-da", "熱"),
  word("그럼", "geu-reom", "那麼"),
  word("음식", "eum-sik", "食物"),
  word("음식은", "eum-si-geun", "食物（主題）"),
  word("맵습니다", "maep-seum-ni-da", "辣")
];

const b17 = [
  // 本課對話（第 11 頁）
  word("민준", "min-jun", "敏俊（人名）"),
  word("씨", "ssi", "先生／小姐（禮貌稱呼）"),
  word("오늘", "o-neul", "今天"),
  word("시간이", "si-gan-i", "時間（主語）"),
  word("있습니까", "it-seum-ni-kka", "有嗎？／有時間嗎？"),
  word("오후에는", "o-hu-e-neun", "下午（主題）"),
  word("괜찮습니다", "gwaen-chan-seum-ni-da", "可以／沒關係"),
  word("무슨", "mu-seun", "什麼（後接名詞）"),
  word("일이", "il-i", "事情（主語）"),
  word("같이", "ga-chi", "一起（發音「가치」）"),
  word("운동합니까", "un-dong-ham-ni-kka", "運動嗎？"),
  word("네", "ne", "是／好的"),
  word("그런데", "geu-reon-de", "可是／不過"),
  word("어디에서", "eo-di-e-seo", "在哪裡"),
  word("공원에서", "gong-won-e-seo", "在公園"),
  word("운동합니다", "un-dong-ham-ni-da", "運動"),

  // 相關單字照片（第 8、9 頁）
  word("비행기를 타다", "bi-haeng-gi-reul- -ta-da", "搭飛機"),
  word("배를 타다", "bae-reul- -ta-da", "搭船"),
  word("기차를 타다", "gi-cha-reul- -ta-da", "搭火車"),
  word("지하철을 타다", "ji-ha-cheol-eul- -ta-da", "搭地鐵"),
  word("버스를 타다", "beo-seu-reul- -ta-da", "搭公車"),
  word("주차를 하다", "ju-cha-reul- -ha-da", "停車"),
  word("게임을 하다", "ge-im-eul- -ha-da", "打電玩"),
  word("노래를 하다", "no-rae-reul- -ha-da", "唱歌"),
  word("찜질을 하다", "jjim-jil-eul- -ha-da", "汗蒸／熱療"),
  word("영화를 보다", "yeong-hwa-reul- -bo-da", "看電影"),
  word("커피를 마시다", "keo-pi-reul- -ma-si-da", "喝咖啡"),
  word("차를 마시다", "cha-reul- -ma-si-da", "喝茶")
];

const b18 = [
  // Main dialogue vocabulary (page 11)
  word("관우", "gwan-u", "冠宇（人名）"),
  word("씨", "ssi", "先生／小姐（禮貌稱呼）"),
  word("운동하고", "un-dong-ha-go", "運動後／運動並且"),
  word("집에서", "ji-be-seo", "在家"),
  word("저녁을", "jeo-nyeo-geul", "晚餐（受詞）"),
  word("먹습니까", "meok-seum-ni-kka", "吃嗎？"),
  word("아니요", "a-ni-yo", "不／不是"),
  word("백화점에서", "baek-hwa-jeom-e-seo", "在百貨公司"),
  word("먹습니다", "meok-seum-ni-da", "吃"),
  word("먹고", "meok-go", "吃了之後／吃並且"),
  word("바로", "ba-ro", "直接"),
  word("집에", "ji-be", "到家／回家"),
  word("갑니까", "gap-ni-kka", "去嗎？"),
  word("밥을", "ba-beul", "飯（受詞）"),
  word("커피숍에서", "keo-pi-syop-e-seo", "在咖啡店"),
  word("커피를", "keo-pi-reul", "咖啡（受詞）"),
  word("마십니다", "ma-sim-ni-da", "喝"),
  word("영화를", "yeong-hwa-reul", "電影（受詞）"),
  word("봅니까", "bom-ni-kka", "看嗎？"),
  word("샤워하고", "sya-wo-ha-go", "洗澡後／洗澡並且"),
  word("운동합니까", "un-dong-ham-ni-kka", "運動嗎？"),

  // -(으)고 examples and the page 9 verb-order table
  word("밥을 먹다", "ba-beul- -meok-da", "吃飯"),
  word("커피를 마시다", "keo-pi-reul- -ma-si-da", "喝咖啡"),
  word("공부하다", "gong-bu-ha-da", "念書"),
  word("텔레비전을 보다", "tel-le-bi-jeon-eul- -bo-da", "看電視"),
  word("운동하다", "un-dong-ha-da", "運動"),
  word("샤워하다", "sya-wo-ha-da", "洗澡"),
  word("아침을 먹다", "a-chim-eul- -meok-da", "吃早餐"),
  word("회사에 가다", "hoe-sa-e- -ga-da", "去公司"),
  word("세수하다", "se-su-ha-da", "洗臉"),
  word("이를 닦다", "i-reul- -ttak-da", "刷牙"),
  word("바지를 입다", "ba-ji-reul- -ip-da", "穿褲"),
  word("양말을 신다", "yang-mal-eul- -sin-da", "穿襪"),
  word("국물을 먹다", "guk-mul-eul- -meok-da", "喝湯"),
  word("숙제를 하다", "suk-je-reul- -ha-da", "做作業"),
  word("물을 마시다", "mul-eul- -ma-si-da", "喝水"),
  word("차를 사다", "cha-reul- -sa-da", "買車"),
  word("집을 사다", "jib-eul- -sa-da", "買房"),
  word("저녁을 먹다", "jeo-nyeok-eul- -meok-da", "吃晚餐"),
  word("영화를 보다", "yeong-hwa-reul- -bo-da", "看電影")
];

const b19 = [
  word("민준", "min-jun", "敏俊（人名）"),
  word("씨", "ssi", "先生／小姐（禮貌稱呼）"),
  word("땀이", "ttam-i", "汗（主語）"),
  word("납니다", "nam-ni-da", "流出／冒出"),
  word("덥습니까", "deop-seum-ni-kka", "熱嗎？"),
  word("요즘", "yo-jeum", "最近"),
  word("왜", "wae", "為什麼"),
  word("이렇게", "i-reo-ke", "這麼／如此"),
  word("원래", "wol-lae", "本來／原本"),
  word("대만이", "dae-man-i", "台灣（主語）"),
  word("습하고", "seu-pa-go", "潮濕而且…"),
  word("덥습니다", "deop-seum-ni-da", "很熱"),
  word("그렇습니까", "geu-reo-seum-ni-kka", "是這樣嗎？"),
  word("한국은", "han-gu-geun", "韓國（主題）"),
  word("건조하고", "geon-jo-ha-go", "乾燥而且…"),
  word("춥습니다", "chup-seum-ni-da", "很冷")
];

const b110 = [
  word("같이", "ga-chi", "一起"),
  word("운동을", "un-dong-eul", "運動（受詞）"),
  word("합니까", "ham-ni-kka", "做嗎？"),
  word("다음에", "da-eum-e", "下次"),
  word("합시다", "hap-si-da", "一起做吧"),
  word("오늘", "o-neul", "今天"),
  word("안", "an", "不／不要（意志否定）"),
  word("아니요", "a-ni-yo", "不／不是"),
  word("못", "mot", "不能／無法（能力否定）"),
  word("합니다", "ham-ni-da", "做"),
  word("지금", "ji-geum", "現在"),
  word("발이", "ba-ri", "腳（主語）"),
  word("아픕니다", "a-peum-ni-da", "疼痛／不舒服")
];

const b111 = [
  word("작년", "jak-nyeon", "去年"),
  word("올해", "ol-hae", "今年"),
  word("내년", "nae-nyeon", "明年"),
  word("지난주", "ji-nan-ju", "上週"),
  word("이번주", "i-beon-ju", "本週"),
  word("다음주", "da-eum-ju", "下週"),
  word("어제", "eo-je", "昨天"),
  word("오늘", "o-neul", "今天"),
  word("내일", "nae-il", "明天"),
  word("아침", "a-chim", "早上"),
  word("점심", "jeom-sim", "中午"),
  word("오후", "o-hu", "下午"),
  word("저녁", "jeo-nyeok", "傍晚／晚餐"),
  word("밤", "bam", "晚上"),
  word("새벽", "sae-byeok", "清晨"),
  word("언제", "eon-je", "何時"),
  word("관우", "gwan-u", "冠宇（人名）"),
  word("민준", "min-jun", "敏俊（人名）"),
  word("뭐", "mwo", "什麼"),
  word("했습니까", "haet-seum-ni-kka", "做了嗎？"),
  word("친구를", "chin-gu-reul", "朋友（受詞）"),
  word("만났습니다", "man-nat-seum-ni-da", "見面了"),
  word("어디에서", "eo-di-e-seo", "在哪裡"),
  word("커피숍에서", "keo-pi-syop-e-seo", "在咖啡店"),
  word("커피를", "keo-pi-reul", "咖啡（受詞）"),
  word("마시고", "ma-si-go", "喝了之後／喝並且…"),
  word("한국", "han-guk", "韓國"),
  word("식당에서", "sik-dang-e-seo", "在餐廳"),
  word("저녁을", "jeo-nyeok-eul", "晚餐（受詞）"),
  word("먹었습니다", "meok-eot-seum-ni-da", "吃了")
];

const b112 = [
  word("짬뽕", "jjam-ppong", "什錦麵／辣海鮮麵"),
  word("자장면", "ja-jang-myeon", "炸醬麵"),
  word("만두", "man-du", "餃子"),
  word("볶음밥", "bok-keum-bap", "炒飯"),
  word("탕수육", "tang-su-yuk", "糖醋肉"),
  word("김치찌개", "gim-chi-jji-gae", "泡菜鍋"),
  word("순두부찌개", "sun-du-bu-jji-gae", "豆腐鍋"),
  word("부대찌개", "bu-dae-jji-gae", "部隊鍋"),
  word("삼계탕", "sam-gye-tang", "蔘雞湯"),
  word("된장찌개", "doen-jang-jji-gae", "大醬湯"),
  word("미역국", "mi-yeok-guk", "海帶湯"),
  word("돈가스", "don-ga-seu", "炸豬排（飯）"),
  word("맥주", "maek-ju", "啤酒"),
  word("소주", "so-ju", "燒酒"),
  word("막걸리", "mak-geol-li", "馬格利／濁米酒"),
  word("양주", "yang-ju", "洋酒"),
  word("레드와인", "re-deu-wa-in", "紅葡萄酒"),
  word("화이트와인", "hwa-i-teu-wa-in", "白葡萄酒"),
  word("위스키", "wi-seu-ki", "威士忌"),
  word("고량주", "go-ryang-ju", "高粱酒"),
  word("관우", "gwan-u", "冠宇（人名）"),
  word("민준", "min-jun", "敏俊（人名）"),
  word("점심을", "jeom-sim-eul", "午餐（受詞）"),
  word("같이", "ga-chi", "一起"),
  word("먹습니까", "meok-seum-ni-kka", "吃嗎？"),
  word("아까", "a-kka", "剛才"),
  word("먹었습니다", "meok-eot-seum-ni-da", "吃了"),
  word("뭐", "mwo", "什麼"),
  word("한국", "han-guk", "韓國"),
  word("식당에서", "sik-dang-e-seo", "在餐廳"),
  word("김밥하고", "gim-bap-ha-go", "紫菜飯捲和…"),
  word("라면을", "ra-myeon-eul", "泡麵（受詞）")
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
  },
  {
    id: "b1-5",
    label: "初級1-5",
    titleKo: "저녁을 같이 먹습니까?",
    titleZh: "一起吃晚餐嗎？",
    theme: "動詞與目的語助詞 을/를",
    sourcePdf: "docs/lessons/new/L5.pdf",
    media: {
      hero: courseAsset("b1-5-dialogue-person")
    },
    dialogues: [
      {
        title: "本課對話",
        image: courseAsset("b1-5-dialogue-person"),
        objectImage: courseAsset("b1-5-dialogue-object"),
        lines: [
          line("관우", "불고기를 좋아합니까?", "喜歡烤牛肉嗎？", [b15[0], b15[1]]),
          line("민준", "네, 좋아합니다. 아주 맛있습니다.", "是的，喜歡。非常好吃。", [b15[2], b15[3], b15[4], b15[5]]),
          line("관우", "그럼, 불고기를 같이 먹습니까?", "那麼，一起吃烤牛肉嗎？", [b15[6], b15[0], b15[7], b15[8]]),
          line("민준", "네, 좋습니다.", "是，好的。", [b15[2], b15[9]])
        ]
      }
    ],
    vocabulary: withVocabImages("b1-5", [
      word("음악", "eum-ak", "音樂"),
      word("신문", "sin-mun", "報紙"),
      word("한국어", "han-gu-geo", "韓語"),
      word("영화", "yeong-hwa", "電影"),
      word("옷", "ot", "衣服"),
      word("신발", "sin-bal", "鞋子"),
      word("듣다", "deut-da", "聽"),
      word("말하다", "mal-ha-da", "說"),
      word("읽다", "ik-da", "讀"),
      word("쓰다", "sseu-da", "寫"),
      word("보다", "bo-da", "看"),
      word("사다", "sa-da", "買")
    ]),
    guide: {
      label: "句型",
      title: "「N을/를」目的語助詞與動詞句",
      hint: "點擊任一單字即可聽發音，並查看拼音與音節拆解。",
      sections: [
        {
          heading: "常用動詞（동사）",
          words: [
            word("듣다", "deut-da", "聽"),
            word("말하다", "mal-ha-da", "說"),
            word("읽다", "ik-da", "讀"),
            word("쓰다", "sseu-da", "寫"),
            word("보다", "bo-da", "看"),
            word("사다", "sa-da", "買"),
            word("입다", "ip-da", "穿（衣物）"),
            word("신다", "sin-da", "穿（鞋襪）"),
            word("먹다", "meok-da", "吃")
          ]
        },
        {
          heading: "動作的對象（목적어）",
          words: [
            word("음악", "eum-ak", "音樂"),
            word("신문", "sin-mun", "報紙"),
            word("소설책", "so-seol-chaek", "小說書"),
            word("영화", "yeong-hwa", "電影"),
            word("옷", "ot", "衣服"),
            word("신발", "sin-bal", "鞋子")
          ]
        }
      ],
      practice: {
        heading: "練習用 을/를 造動詞句",
        hint: "把中文念成韓語句子，答案與發音如下，點擊即可聽發音。",
        valueSuffix: "",
        items: [
          { value: "聽音樂", answer: word("음악을 듣습니다", "eum-a-geul deut-seum-ni-da", "聽音樂") },
          { value: "讀報紙", answer: word("신문을 읽습니다", "sin-mun-eul ik-seum-ni-da", "讀報紙") },
          { value: "說韓語", answer: word("한국어를 말합니다", "han-gu-geo-reul mal-ham-ni-da", "說韓語") },
          { value: "看電影", answer: word("영화를 봅니다", "yeong-hwa-reul bom-ni-da", "看電影") },
          { value: "買衣服嗎？", answer: word("옷을 삽니까?", "o-seul sam-ni-kka", "買衣服嗎？") },
          { value: "穿鞋子嗎？", answer: word("신발을 신습니까?", "sin-bal-eul sin-seum-ni-kka", "穿鞋子嗎？") },
          { value: "吃早餐", answer: word("아침을 먹습니다", "a-chim-eul meok-seum-ni-da", "吃早餐") },
          { value: "一起吃晚餐嗎？", answer: word("저녁을 같이 먹습니까?", "jeo-nyeok-eul ga-chi meok-seum-ni-kka", "一起吃晚餐嗎？") }
        ]
      }
    }
  },
  {
    id: "b1-6",
    label: "初級1-6",
    titleKo: "대만은 덥습니다. 그렇지만 한국은 춥습니다.",
    titleZh: "台灣熱，但是韓國冷。",
    theme: "對比補助詞 은/는 與相對形容詞",
    sourcePdf: "docs/lessons/new/L6.pdf",
    media: {
      hero: courseAsset("b1-6-dialogue-person")
    },
    dialogues: [
      {
        title: "本課對話",
        image: courseAsset("b1-6-dialogue-person"),
        objectImage: courseAsset("b1-6-dialogue-object"),
        lines: [
          line("관우", "한국 날씨 어떻습니까?", "韓國天氣如何呢？", [b16[0], b16[1], b16[2]]),
          line("민준", "북쪽은 시원합니다. 그렇지만 남쪽은 덥습니다.", "北部涼爽，但是南部熱。", [b16[3], b16[4], b16[5], b16[6], b16[7]]),
          line("관우", "그럼 한국 음식 어떻습니까?", "那麼韓國食物如何呢？", [b16[8], b16[0], b16[9], b16[2]]),
          line("민준", "한국 음식은 맵습니다.", "韓國食物辣。", [b16[0], b16[10], b16[11]])
        ]
      }
    ],
    vocabulary: withVocabImages("b1-6", [
      word("어렵다", "eo-ryeop-da", "難"),
      word("쉽다", "swip-da", "簡單"),
      word("작다", "jak-da", "小"),
      word("크다", "keu-da", "大"),
      word("적다", "jeok-da", "少"),
      word("많다", "man-ta", "多"),
      word("무겁다", "mu-geop-da", "重"),
      word("가볍다", "ga-byeop-da", "輕"),
      word("라면", "ra-myeon", "泡麵"),
      word("맛없다", "mat-eop-da", "不好吃"),
      word("북쪽", "buk-jjok", "北部"),
      word("남쪽", "nam-jjok", "南部")
    ]),
    guide: {
      label: "句型",
      title: "「N은/는」對比補助詞與相對形容詞",
      hint: "點擊任一單字即可聽發音，並查看拼音與音節拆解。",
      sections: [
        {
          heading: "相對形容詞（형용사）",
          words: [
            word("크다", "keu-da", "大"),
            word("작다", "jak-da", "小"),
            word("어렵다", "eo-ryeop-da", "難"),
            word("쉽다", "swip-da", "簡單"),
            word("많다", "man-ta", "多"),
            word("적다", "jeok-da", "少"),
            word("무겁다", "mu-geop-da", "重"),
            word("가볍다", "ga-byeop-da", "輕")
          ]
        },
        {
          heading: "對比句常用單字",
          words: [
            word("그렇지만", "geu-reo-chi-man", "但是"),
            word("안", "an", "不（表否定）"),
            word("맵다", "maep-da", "辣"),
            word("맛있다", "mat-it-da", "好吃"),
            word("맛없다", "mat-eop-da", "不好吃"),
            word("북쪽", "buk-jjok", "北部"),
            word("남쪽", "nam-jjok", "南部")
          ]
        }
      ],
      practice: {
        heading: "練習用 은/는 造對比句",
        hint: "把中文念成韓語句子，答案與發音如下，點擊即可聽發音。",
        valueSuffix: "",
        items: [
          { value: "台灣熱，但是韓國冷", answer: word("대만은 덥습니다. 그렇지만 한국은 춥습니다", "dae-man-eun deop-seum-ni-da. geu-reo-chi-man han-gug-eun chup-seum-ni-da", "台灣熱，但是韓國冷") },
          { value: "美國大，但是台灣小", answer: word("미국은 큽니다. 그렇지만 대만은 작습니다", "mi-gug-eun keum-ni-da. geu-reo-chi-man dae-man-eun jak-seum-ni-da", "美國大，但是台灣小") },
          { value: "排骨湯好吃，但是泡麵不好吃", answer: word("갈비탕은 맛있습니다. 그렇지만 라면은 맛없습니다", "gal-bi-tang-eun mat-it-seum-ni-da. geu-reo-chi-man ra-myeon-eun mat-eop-seum-ni-da", "排骨湯好吃，但是泡麵不好吃") },
          { value: "韓語難，但是英語簡單", answer: word("한국어는 어렵습니다. 그렇지만 영어는 쉽습니다", "han-gu-geo-neun eo-ryeop-seum-ni-da. geu-reo-chi-man yeong-eo-neun swip-seum-ni-da", "韓語難，但是英語簡單") },
          { value: "冠宇好，但是敏俊壞", answer: word("관우는 좋습니다. 그렇지만 민준은 나쁩니다", "gwan-u-neun jo-seum-ni-da. geu-reo-chi-man min-jun-eun na-ppeum-ni-da", "冠宇好，但是敏俊壞") },
          { value: "辣炒年糕辣，但是雞排不辣", answer: word("떡볶이는 맵습니다. 그렇지만 찌파이는 안 맵습니다", "tteok-bok-i-neun maep-seum-ni-da. geu-reo-chi-man jji-pa-i-neun an maep-seum-ni-da", "辣炒年糕辣，但是雞排不辣") },
          { value: "北部涼爽，但是南部熱", answer: word("북쪽은 시원합니다. 그렇지만 남쪽은 덥습니다", "buk-jjok-eun si-won-ham-ni-da. geu-reo-chi-man nam-jjok-eun deop-seum-ni-da", "北部涼爽，但是南部熱") },
          { value: "男生多，但是女生少", answer: word("남자는 많습니다. 그렇지만 여자는 적습니다", "nam-ja-neun man-seum-ni-da. geu-reo-chi-man yeo-ja-neun jeok-seum-ni-da", "男生多，但是女生少") }
        ]
      }
    }
  },
  {
    id: "b1-7",
    label: "初級1-7",
    titleKo: "공원에서 운동합니다.",
    titleZh: "在公園運動。",
    theme: "場所助詞 에서 與場所相關動詞",
    sourcePdf: "docs/lessons/new/0804.pdf",
    media: {
      hero: courseAsset("b1-7-dialogue-person")
    },
    dialogues: [
      {
        title: "本課對話",
        image: courseAsset("b1-7-dialogue-person"),
        objectImage: courseAsset("b1-7-dialogue-object"),
        lines: [
          line("관우", "민준 씨, 오늘 시간이 있습니까?", "敏俊先生，今天有時間嗎？", [b17[0], b17[1], b17[2], b17[3], b17[4]]),
          line("민준", "오후에는 괜찮습니다. 무슨 일이 있습니까?", "下午可以。有什麼事嗎？", [b17[5], b17[6], b17[7], b17[8], b17[4]]),
          line("관우", "같이 운동합니까?", "一起運動嗎？", [b17[9], b17[10]]),
          line("민준", "네. 그런데 어디에서 운동합니까?", "是。不過，要在哪裡運動呢？", [b17[11], b17[12], b17[13], b17[10]]),
          line("관우", "공원에서 운동합니다.", "在公園運動。", [b17[14], b17[15]])
        ]
      }
    ],
    vocabulary: withVocabImages("b1-7", [
      b17[16], b17[17], b17[18], b17[19], b17[20], b17[21],
      b17[22], b17[23], b17[24], b17[25], b17[26], b17[27]
    ]),
    guide: {
      label: "句型與附錄",
      title: "「~에서」動作場所與「名詞 + 하다」",
      hint: "點擊任一單字即可聽發音，並查看拼音與音節拆解；來源頁面的說明、留白題與附錄均保留。",
      sections: [
        {
          heading: "場所助詞 ~에서（第 3-4 頁）",
          words: [
            word("에서", "e-seo", "表示動作場所的助詞；中文通常翻譯為「在～做～」"),
            word("학교에서", "hak-gyo-e-seo", "在學校"),
            word("공부하다", "gong-bu-ha-da", "念書"),
            word("식당에서", "sik-dang-e-seo", "在餐廳"),
            word("먹다", "meok-da", "吃"),
            word("호텔에서", "ho-tel-e-seo", "在飯店"),
            word("자다", "ja-da", "睡覺"),
            word("도서관", "do-seo-gwan", "圖書館"),
            word("쉬다", "swi-da", "休息")
          ]
        },
        {
          heading: "~에서 ~을/를 動詞（第 5-7 頁）",
          words: [
            word("집에서", "jip-e-seo", "在家"),
            word("라면을", "ra-myeon-eul", "拉麵（受詞）"),
            word("백화점에서", "baek-hwa-jeom-e-seo", "在百貨公司"),
            word("옷을", "o-seul", "衣服（受詞）"),
            word("텔레비전을", "tel-le-bi-jeon-eul", "電視（受詞）"),
            word("밥을", "ba-beul", "飯（受詞）"),
            word("영어를", "yeong-eo-reul", "英語（受詞）"),
            word("배우다", "bae-u-da", "學習"),
            word("사진을", "sa-jin-eul", "照片（受詞）"),
            word("찍다", "jjik-da", "拍攝")
          ]
        },
        {
          heading: "場所與相關動詞（第 8-10 頁）",
          words: [
            word("공항", "gong-hang", "機場"),
            word("선착장", "seon-chak-jang", "碼頭"),
            word("기차역", "gi-cha-yeok", "火車站"),
            word("지하철역", "ji-ha-cheol-yeok", "地鐵站"),
            word("버스 정류장", "beo-seu- -jeong-nyu-jang", "公車站"),
            word("주차장", "ju-cha-jang", "停車場"),
            word("PC방", "P-C-bang", "網咖"),
            word("노래방", "no-rae-bang", "KTV"),
            word("찜질방", "jjim-jil-bang", "汗蒸幕"),
            word("DVD방", "D-V-D-bang", "電影院（DVD 房）"),
            word("커피숍", "keo-pi-syop", "咖啡廳"),
            word("찻집", "chat-jip", "茶店")
          ]
        },
        {
          heading: "名詞 + 하다（第 13-14 頁）",
          words: [
            word("운동", "un-dong", "運動（名詞）"),
            word("운동하다", "un-dong-ha-da", "運動（動詞）"),
            word("노래", "no-rae", "歌曲（名詞）"),
            word("노래하다", "no-rae-ha-da", "唱歌（動詞）"),
            word("복습", "bok-seup", "複習（名詞）"),
            word("복습하다", "bok-seup-ha-da", "複習（動詞）"),
            word("하다", "ha-da", "做；加在部分名詞後形成動詞")
          ]
        },
        {
          heading: "本課對話關鍵字（第 11-12 頁）",
          words: [
            b17[2], b17[5], b17[6], b17[7], b17[8], b17[9], b17[12], b17[13], b17[14], b17[15],
            word("주말", "ju-mal", "週末")
          ]
        }
      ],
      practice: {
        heading: "固定例句（第 3、5、6、15 頁）",
        hint: "以下保留來源中已印出的例句；第 10、12 頁的開放式留白題顯示在下方，不替教材填入答案。",
        valueSuffix: "",
        items: [
          { value: "在學校念書", answer: word("학교에서 공부합니다", "hak-gyo-e-seo- -gong-bu-ham-ni-da", "在學校念書") },
          { value: "在餐廳吃飯", answer: word("식당에서 먹습니다", "sik-dang-e-seo- -meok-seum-ni-da", "在餐廳吃飯") },
          { value: "在飯店睡覺", answer: word("호텔에서 잡니다", "ho-tel-e-seo- -jam-ni-da", "在飯店睡覺") },
          { value: "在家吃拉麵", answer: word("집에서 라면을 먹습니다", "jip-e-seo- -ra-myeon-eul- -meok-seum-ni-da", "在家吃拉麵") },
          { value: "在百貨公司買衣服", answer: word("백화점에서 옷을 삽니다", "baek-hwa-jeom-e-seo- -o-seul- -sam-ni-da", "在百貨公司買衣服") },
          { value: "在學校學英語", answer: word("학교에서 영어를 배웁니다", "hak-gyo-e-seo- -yeong-eo-reul- -bae-um-ni-da", "在學校學英語") },
          { value: "在公園拍照嗎？", answer: word("공원에서 사진을 찍습니까", "gong-won-e-seo- -sa-jin-eul- -jjik-seum-ni-kka", "在公園拍照嗎？") },
          { value: "在百貨公司買衣服嗎？", answer: word("백화점에서 옷을 삽니까", "baek-hwa-jeom-e-seo- -o-seul- -sam-ni-kka", "在百貨公司買衣服嗎？") },
          { value: "在公園運動", answer: word("공원에서 운동합니다", "gong-won-e-seo- -un-dong-ham-ni-da", "在公園運動") }
        ],
        prompts: [
          { page: "第 10 頁", ko: "어디에서 비행기를 탑니까?", zh: "你在哪裡搭飛機？" },
          { page: "第 10 頁", ko: "커피숍에서 뭐 합니까?", zh: "在咖啡廳做什麼？" },
          { page: "第 10 頁", ko: "노래방 ____________?", zh: "在 KTV ____________？（來源保留空格）" },
          { page: "第 10 頁", ko: "DVD방 ____________?", zh: "在 DVD 房 ____________？（來源保留空格）" },
          { page: "第 12 頁", ko: "어디에서 옷을 삽니까?", zh: "你在哪裡買衣服？（請以 B 的身分回答）" },
          { page: "第 12 頁", ko: "주말에 뭐 합니까?", zh: "週末做什麼？（請以 B 的身分回答）", pattern: "回答格式：________에서 __________" }
        ]
      },
      sourceNotes: [
        {
          heading: "來源逐頁筆記：第 1-2 頁",
          lines: [
            "第 1 頁｜초급 한국어 韓國語初級 1；공원에서 운동합니다.｜在公園運動。",
            "第 2 頁｜本課學習目標：① 表達在哪裡做什麼。（使用 -에서 + 動詞） ② 搭配其他助詞，使用「~에서 ~을/를 動詞」的句型 ③ 與場所相關的動詞。"
          ]
        },
        {
          heading: "來源逐頁筆記：第 3-4 頁",
          lines: [
            "第 3 頁｜1-1 表達「在（哪裡）做（什麼）」；助詞：~에서。助詞「에서」最常被使用於代表「動作場所」，因此其後方絕大多數都接動詞；中文翻譯成「在～做～」。",
            "第 3 頁例句｜학교에서 공부합니다.／식당에서 먹습니다.／호텔에서 잡니다.；單字：공부하다 念書。",
            "第 4 頁｜1-2 練習：試著表達在哪裡做什麼；場所：집、식당、호텔、도서관；動詞：자다、먹다、공부하다、쉬다；單字：도서관 圖書館。"
          ]
        },
        {
          heading: "來源逐頁筆記：第 5-7 頁",
          lines: [
            "第 5 頁｜2-1 使用「~에서 ~을/를 動詞」句型（1）：除了「학교에서 공부합니다.」，絕大多數句子都有明確的目的語，也就是做什麼（東西）。",
            "第 5 頁例句｜식당에서 라면을 먹습니다.／백화점에서 옷을 삽니다.／집에서 텔레비전을 봅니다.。",
            "第 6 頁｜場所（在哪？）：집、학교、공원、백화점；目的語（什麼？）：밥、영어、사진、옷；動詞（動作）：먹다、배우다、찍다、사다。例句：집에서 밥을 먹습니다.／학교에서 영어를 배웁니다.／공원에서 사진을 찍습니까?／백화점에서 옷을 삽니까?",
            "第 7 頁｜練習：試著詢問在哪做什麼（~에서 ~을/를 ~ㅂ니까/습니까?）；場所：야시장、대만、한국、백화점；目的語：가방、야식、한국어、콘서트；動詞：보다、배우다、사다、먹다；콘서트 演唱會。"
          ]
        },
        {
          heading: "來源逐頁筆記：第 8-9 頁",
          lines: [
            "第 8 頁｜3-1 搭配之前學過的場所，學一些相關動詞（1）：공항 機場／선착장 碼頭／기차역 火車站；비행기를 타다 搭飛機／배를 타다 搭船／기차를 타다 搭火車。",
            "第 8 頁下排｜지하철역 地鐵站／버스 정류장 公車站／주차장 停車場；지하철을 타다 搭地鐵／버스를 타다 搭公車／주차를 하다 停車。照片取自維基共享資源。",
            "第 9 頁｜PC방 網咖／노래방 KTV／찜질방 汗蒸幕；게임을 하다 打電玩／노래를 하다 唱歌／찜질을 하다 熱療。",
            "第 9 頁下排｜DVD방 電影院／커피숍 咖啡廳／찻집 茶店；영화(DVD)를 보다 看電影／커피를 마시다 喝咖啡／차를 마시다 喝茶。照片取自維基共享資源。"
          ]
        },
        {
          heading: "來源逐頁筆記：第 10-12 頁",
          lines: [
            "第 10 頁｜3-2 練習：利用剛剛學過的單字，試著造出句子；來源保留四組問句與回答空格，單字表為비행기를 타다、배를 타다、기차를 타다、지하철을 타다、버스를 타다、노래를 하다、영화를 보다、차를 마시다、주차를 하다、찜질을 하다、커피를 마시다、게임을 하다。",
            "第 11 頁｜本課對話：관우、민준；對話翻譯見下方附錄。",
            "第 12 頁｜換你說說看：您是 B，試著回答 A 的提問；어디에서 옷을 삽니까?／주말에 뭐 합니까?；單字：주말 週末。空格不填入答案。"
          ]
        },
        {
          heading: "來源逐頁筆記：第 13-16 頁",
          lines: [
            "第 13 頁｜韓語知識 - 名詞 + 하다（1）：韓語有一些動詞是透過「名詞 + 하다」產生；하다 本身意思為「做」，加在部分名詞後，與該名詞形成動詞時，通常意義轉為與該名詞相關的動作。例：운동（名詞：運動）+하다 → 운동하다（動詞：運動）；노래（名詞：歌曲）+하다 → 노래하다（動詞：唱歌）；복습（名詞：複習）+하다 → 복습하다（動詞：複習）。",
            "第 14 頁｜因為這些動詞是「名詞 + 하다」而來，有時也可拆開成原來的型態；把名詞與하다拆開寫，名詞就變成動詞的目的語，因此後面可以再加上助詞을/를。例：운동하다 → 운동을 하다；노래하다 → 노래를 하다；복습하다 → 복습을 하다。",
            "第 15 頁｜重點整理：表達在哪裡所做什麼（使用 -에서 + 動詞）；搭配其他助詞，使用「~에서 ~을/를 動詞」的句型；與場所相關的動詞。例：학교에서 공부합니다.／집에서 밥을 먹습니다.；공항에서 비행기를 타다／선착장에서 배를 타다／기차역에서 기차를 타다。",
            "第 16 頁｜課程結束：수고하셨습니다.｜辛苦了。"
          ]
        }
      ],
      references: [
        {
          heading: "附錄：對話翻譯（第 17 頁）",
          entries: [
            { label: "冠宇", text: "敏俊先生，今天有時間嗎？" },
            { label: "敏俊", text: "下午可以。有什麼事嗎？" },
            { label: "冠宇", text: "一起運動嗎？" },
            { label: "敏俊", text: "是，（然而）在哪裡運動呢？" },
            { label: "冠宇", text: "在公園運動。" }
          ]
        },
        {
          heading: "附錄：照片來源與作者（第 18-20 頁）",
          entries: [
            { label: "地鐵站｜作者 Marcopolis", text: "來源：https://commons.wikimedia.org/wiki/File:Seoul_Station_(Seoul_metro)_002.jpg" },
            { label: "公車站｜作者 Aranaraaya", text: "來源：https://zh.wikipedia.org/wiki/File:Re20140723_063759.jpg" },
            { label: "停車場｜作者 최광모", text: "來源：https://zh.wikipedia.org/wiki/File:2014%EB%85%84_9%EC%9B%94_6%EC%9D%BC_%EA%B3%BC%EC%B2%9C%EC%8B%9C_%EC%A3%BC%EA%B3%B82%EB%8B%A8%EC%A7%80%EB%B3%B5%ED%95%A9%EC%83%81%EA%B0%8006.jpg" },
            { label: "網咖｜作者 Ss이준 (lhj8396)", text: "來源：https://zh.wikipedia.org/wiki/File:World_of_Tanks_PC_bang_LAN_party_Bunker_Rush_Season_2_in_Antinora_%26_Flying_Cat_2.jpg" },
            { label: "汗蒸幕｜作者 WhiteNight7", text: "來源：https://commons.wikimedia.org/wiki/File:jimjilbang-room.jpg" }
          ]
        }
      ]
    }
  },
  {
    id: "b1-8",
    label: "初級1-8",
    titleKo: "밥을 먹고 커피숍에서 커피를 마십니다.",
    titleZh: "吃完飯後在咖啡店喝咖啡。",
    theme: "連結語尾 -고 的先後順序",
    sourcePdf: "docs/lessons/new/0806.pdf",
    media: {
      hero: courseAsset("b1-8-dialogue-person")
    },
    dialogues: [
      {
        title: "本課對話",
        image: courseAsset("b1-8-dialogue-person"),
        objectImage: courseAsset("b1-8-dialogue-object"),
        lines: [
          line("민준", "관우 씨, 운동하고 집에서 저녁을 먹습니까?", "敏俊：冠宇先生，運動後在家吃晚餐嗎？", [b18[0], b18[1], b18[2], b18[3], b18[4], b18[5]]),
          line("관우", "아니요, 백화점에서 저녁을 먹습니다.", "冠宇：不，在百貨公司吃晚餐。", [b18[6], b18[7], b18[4], b18[8]]),
          line("민준", "저녁을 먹고 바로 집에 갑니까?", "敏俊：吃完晚餐後直接回家嗎？", [b18[4], b18[9], b18[10], b18[11], b18[12]]),
          line("관우", "아니요, 밥을 먹고 커피숍에서 커피를 마십니다.", "冠宇：不，吃完飯後在咖啡店喝咖啡。", [b18[6], b18[13], b18[9], b18[14], b18[15], b18[16]])
        ]
      },
      {
        title: "句型練習（保留空格）",
        image: courseAsset("b1-8-practice-visual"),
        objectImage: courseAsset("b1-8-practice-visual"),
        lines: [
          line("提示", "밥을 먹다 + 커피를 마시다 → ______", "請用 -고 連成完整句子（來源頁面保留空格）。", [b18[21], b18[22]]),
          line("提示", "공부하다 + 텔레비전을 보다 → ______", "請用 -고 連成完整句子（來源頁面保留空格）。", [b18[23], b18[24]]),
          line("提示", "운동하다 + 샤워하다 → ______", "請用 -고 連成完整句子（來源頁面保留空格）。", [b18[25], b18[26]]),
          line("提示", "아침을 먹다 + 회사에 가다 → ______", "請用 -고 連成完整句子（來源頁面保留空格）。", [b18[27], b18[28]])
        ]
      },
      {
        title: "順序練習（保留空格）",
        image: courseAsset("b1-8-practice-person"),
        objectImage: courseAsset("b1-8-practice-visual"),
        lines: [
          line("示例", "세수하다 / 이를 닦다 → 세수하고 이를 닦습니다. / 이를 닦고 세수합니다.", "示例：先洗臉再刷牙，或先刷牙再洗臉。", [b18[29], b18[30]]),
          line("提示", "바지를 입다 / 양말을 신다 → ______ / ______", "請說出先後順序；來源頁面保留兩個空格。", [b18[31], b18[32]]),
          line("提示", "국물을 먹다 / 밥을 먹다 → ______ / ______", "請說出先後順序；來源頁面保留兩個空格。", [b18[33], b18[21]]),
          line("提示", "숙제를 하다 / 텔레비전을 보다 → ______ / ______", "請說出先後順序；來源頁面保留兩個空格。", [b18[34], b18[24]])
        ]
      },
      {
        title: "換你說看看（B 的空格）",
        image: courseAsset("b1-8-practice-person"),
        objectImage: courseAsset("b1-8-practice-person"),
        lines: [
          line("A", "저녁을 먹고 영화를 봅니까?", "吃完晚餐後看電影嗎？", [b18[4], b18[9], b18[17], b18[18]]),
          line("B", "아니요, ______", "不，請自行填寫回答（來源頁面空白）。", [b18[6]]),
          line("A", "샤워하고 운동합니까?", "洗澡後運動嗎？", [b18[19], b18[20]]),
          line("B", "아니요, ______", "不，請自行填寫回答（來源頁面空白）。", [b18[6]])
        ]
      }
    ],
    vocabulary: withVocabImages("b1-8", [
      b18[29], b18[31], b18[33], b18[34], b18[25], b18[27], b18[36], b18[38],
      b18[30], b18[32], b18[21], b18[24], b18[35], b18[28], b18[37], b18[39],
      b18[26], b18[10]
    ]),
    guide: {
      label: "句型與翻譯",
      title: "連結語尾 -고：先後動作",
      hint: "點擊任一單字即可聽發音，查看拼音與音節拆解；中文說明與附錄翻譯均依來源頁面保留。",
      sections: [
        {
          heading: "學習目標（頁 2）",
          words: [
            word("목표", "mok-pyo", "① 表達先做什麼之後，再做什麼。(-고)；② 具有先後性的動詞。")
          ]
        },
        {
          heading: "連結語尾 -고（頁 3）",
          words: [
            word("연결어미", "yeon-gyeol-eo-mi", "連結語尾；-고 可表動作順序，也可表示同時具有兩種狀態。"),
            word("고", "go", "本課的 -고 表示動作先後順序。"),
            word("조사", "jo-sa", "助詞主要加在名詞後方（少部分加在助詞、副詞與語尾等）。"),
            word("어미", "eo-mi", "語尾主要加在動詞與形容詞後方（少部分加在語尾後）。")
          ]
        },
        {
          heading: "使用規則（頁 4、7）",
          words: [
            word("동사", "dong-sa", "表先後時必須加在動詞後方；形容詞通常沒有先後關係。"),
            word("어간", "eo-gan", "-고 接於詞幹之後；使用時直接去除動詞原型的 다 即可添加。"),
            word("주어", "ju-eo", "表先後時，前後動作的主語通常都是同一人。"),
            word("순서", "sun-seo", "前後內容對調，動作順序也會改變。")
          ]
        },
        {
          heading: "先後動作詞組（頁 6、9）",
          words: [
            b18[21], b18[22], b18[23], b18[24], b18[25], b18[26], b18[27], b18[28],
            b18[29], b18[30], b18[31], b18[32], b18[33], b18[34], b18[35], b18[36], b18[37], b18[38], b18[39]
          ]
        },
        {
          heading: "附錄：對話翻譯（頁 15）",
          words: [
            word("민준①", "min-jun-1", "敏俊：冠宇先生，運動之後回家吃晚餐嗎？"),
            word("관우①", "gwan-u-1", "冠宇：不，在百貨公司吃晚餐。"),
            word("민준②", "min-jun-2", "敏俊：吃完晚餐後直接回家嗎？"),
            word("관우②", "gwan-u-2", "冠宇：不，吃完飯後在咖啡廳喝咖啡。")
          ]
        },
        {
          heading: "重點整理（頁 13）",
          words: [
            word("정리", "jeong-ri", "學會表達先做後做：밥을 먹고 커피를 마십니다；공부하고 텔레비전을 봅니다。"),
            word("복습", "bok-seup", "具有先後性的動詞：숙제를 하다／텔레비전을 보다；세수하다／이를 닦다。")
          ]
        },
        {
          heading: "課程結束（頁 14）",
          words: [
            word("수고하셨습니다", "su-go-ha-syeot-seum-ni-da", "辛苦了。")
          ]
        }
      ],
      practice: {
        heading: "固定例句（頁 5、6、7、10）",
        hint: "以下是來源中有印出答案的例句；頁 8、10、12 的空格練習保留在對話分頁，未填入新答案。",
        valueSuffix: "",
        items: [
          { value: "吃飯後喝咖啡", answer: word("밥을 먹고 커피를 마십니다.", "bab-eul- -meok-go- -keo-pi-reul- -ma-sim-ni-da-.", "吃飯後喝咖啡") },
          { value: "念書後看電視", answer: word("공부하고 텔레비전을 봅니다.", "gong-bu-ha-go- -tel-le-bi-jeon-eul- -bom-ni-da-.", "念書後看電視") },
          { value: "運動後洗澡", answer: word("운동하고 샤워합니다.", "un-dong-ha-go- -sya-wo-ham-ni-da-.", "運動後洗澡") },
          { value: "吃早餐後去公司", answer: word("아침을 먹고 회사에 갑니다.", "a-chim-eul- -meok-go- -hoe-sa-e- -gam-ni-da-.", "吃早餐後去公司") },
          { value: "先洗臉再刷牙", answer: word("세수하고 이를 닦습니다.", "se-su-ha-go- -i-reul- -ttak-seum-ni-da-.", "先洗臉再刷牙") },
          { value: "先刷牙再洗臉", answer: word("이를 닦고 세수합니다.", "i-reul- -ttak-go- -se-su-ham-ni-da-.", "先刷牙再洗臉") },
          { value: "喝咖啡後吃飯", answer: word("커피를 마시고 밥을 먹습니다.", "keo-pi-reul- -ma-si-go- -ba-beul- -meok-seum-ni-da-.", "喝咖啡後吃飯") },
          { value: "看電視後念書", answer: word("텔레비전을 보고 공부합니다.", "tel-le-bi-jeon-eul- -bo-go- -gong-bu-ham-ni-da-.", "看電視後念書") }
        ],
        prompts: [
          { page: "第 8 頁", ko: "밥을 먹다 + 커피를 마시다 → ______", zh: "請按照先後組成完整句子；來源頁面保留空格。", pattern: "-고" },
          { page: "第 8 頁", ko: "공부하다 + 텔레비전을 보다 → ______", zh: "請按照先後組成完整句子；來源頁面保留空格。", pattern: "-고" },
          { page: "第 8 頁", ko: "운동하다 + 샤워하다 → ______", zh: "請按照先後組成完整句子；來源頁面保留空格。", pattern: "-고" },
          { page: "第 8 頁", ko: "아침을 먹다 + 회사에 가다 → ______", zh: "請按照先後組成完整句子；來源頁面保留空格。", pattern: "-고" },
          { page: "第 10 頁", ko: "바지를 입다 / 양말을 신다 → ______ / ______", zh: "請說出先後順序；來源頁面保留兩個空格。", pattern: "-고" },
          { page: "第 10 頁", ko: "국물을 먹다 / 밥을 먹다 → ______ / ______", zh: "請說出先後順序；來源頁面保留兩個空格。", pattern: "-고" },
          { page: "第 10 頁", ko: "숙제를 하다 / 텔레비전을 보다 → ______ / ______", zh: "請說出先後順序；來源頁面保留兩個空格。", pattern: "-고" },
          { page: "第 12 頁", ko: "A: 저녁을 먹고 영화를 봅니까?  B: 아니요, ______", zh: "您是 B，請自行回答 A 的問題；來源頁面沒有固定答案。", pattern: "-고" },
          { page: "第 12 頁", ko: "A: 샤워하고 운동합니까?  B: 아니요, ______", zh: "您是 B，請自行回答 A 的問題；來源頁面沒有固定答案。", pattern: "-고" }
        ]
      },
      sourceNotes: [
        {
          heading: "來源重點（第 3–7 頁）",
          lines: [
            "-고 可表示動作順序，也可表示同時具有兩種狀態；本課只學動作順序。",
            "表先後時 -고 接在動詞後方，直接去掉動詞原型的 다；前後動作的主語通常是同一人。",
            "前後內容對調，動作順序也會改變：밥을 먹고 커피를 마십니다 ↔ 커피를 마시고 밥을 먹습니다。"
          ]
        }
      ],
      references: [
        {
          heading: "附錄：對話翻譯（第 15 頁）",
          entries: [
            { label: "敏俊", text: "冠宇先生，運動之後回家吃晚餐嗎？" },
            { label: "冠宇", text: "不，在百貨公司吃晚餐。" },
            { label: "敏俊", text: "吃完晚餐後直接回家嗎？" },
            { label: "冠宇", text: "不，吃完飯後在咖啡廳喝咖啡。" }
          ]
        }
      ]
    }
  },
  {
    id: "b1-9",
    label: "初級1-9",
    titleKo: "대만이 습하고 덥습니다.",
    titleZh: "台灣潮濕又炎熱。",
    theme: "用 -고 並列狀態與動作",
    sourcePdf: "docs/lessons/new/0811.pdf",
    media: { hero: courseAsset("b1-9-dialogue-person") },
    dialogues: [
      {
        title: "本課對話",
        image: courseAsset("b1-9-dialogue-person"),
        objectImage: courseAsset("b1-9-dialogue-object"),
        lines: [
          line("관우", "민준 씨, 땀이 납니다. 덥습니까?", "敏俊先生，你流汗了。很熱嗎？", [b19[0], b19[1], b19[2], b19[3], b19[4]]),
          line("민준", "네, 요즘 왜 이렇게 덥습니까?", "是啊，最近為什麼這麼熱？", [word("네", "ne", "是／好的"), b19[5], b19[6], b19[7], b19[4]]),
          line("관우", "원래 이렇게 덥습니다. 대만이 습하고 덥습니다.", "本來就這麼熱。台灣潮濕又炎熱。", [b19[8], b19[7], b19[11], b19[9], b19[10], b19[11]]),
          line("민준", "그렇습니까? 한국은 건조하고 춥습니다.", "是這樣嗎？韓國乾燥又寒冷。", [b19[12], b19[13], b19[14], b19[15]])
        ]
      },
      {
        title: "換你說看看",
        image: courseAsset("b1-9-practice-person"),
        objectImage: courseAsset("b1-9-practice-visual"),
        lines: [
          line("A", "대만 날씨가 어떻습니까?", "台灣天氣如何？", [word("대만", "dae-man", "台灣"), word("날씨가", "nal-ssi-ga", "天氣（主語）"), word("어떻습니까", "eo-tteo-seum-ni-kka", "如何？")]),
          line("B", "대만이 습하고 덥습니다.", "台灣潮濕又炎熱。", [b19[9], b19[10], b19[11]]),
          line("A", "요즘 뭐 합니까?", "最近做什麼？", [b19[5], word("뭐", "mwo", "什麼"), word("합니까", "ham-ni-kka", "做嗎？")]),
          line("B", "요즘 한국어를 배우고 한국 음악을 듣습니다.", "最近學韓語，也聽韓國音樂。", [b19[5], word("한국어를", "han-gu-geo-reul", "韓語（受詞）"), word("배우고", "bae-u-go", "學習並且…"), word("한국", "han-guk", "韓國"), word("음악을", "eu-ma-geul", "音樂（受詞）"), word("듣습니다", "deut-seum-ni-da", "聽")])
        ]
      }
    ],
    vocabulary: withSharedVocabImage("b1-9-vocab-page", [
      word("싸다", "ssa-da", "便宜"),
      word("품질이 좋다", "pum-ji-ri- -jo-ta", "品質好"),
      word("피곤하다", "pi-gon-ha-da", "疲倦"),
      word("배가 고프다", "bae-ga- -go-peu-da", "肚子餓"),
      word("달다", "dal-da", "甜"),
      word("맛있다", "ma-sit-da", "好吃"),
      word("쓰다", "sseu-da", "苦"),
      word("맛없다", "ma-deop-da", "不好吃"),
      word("습하다", "seu-pa-da", "潮濕"),
      word("덥다", "deop-da", "熱"),
      word("건조하다", "geon-jo-ha-da", "乾燥"),
      word("춥다", "chup-da", "冷")
    ]),
    guide: {
      label: "句型與翻譯",
      title: "連結語尾 -고：並列兩種狀態或動作",
      hint: "這一課的 -고 不強調先後，而是把同時成立的描述並列起來。",
      sections: [
        { heading: "狀態並列", words: [word("좋고 예쁩니다", "jot-go- -ye-ppeum-ni-da", "又好又漂亮"), word("습하고 덥습니다", "seu-pa-go- -deop-seum-ni-da", "又潮濕又熱"), word("어둡고 더럽습니다", "eo-dup-go- -deo-reop-seum-ni-da", "又暗又髒")] },
        { heading: "動作並列", words: [word("음악을 듣고 책을 봅니다", "eu-ma-geul- -deut-go- -chae-geul- -bom-ni-da", "聽音樂也看書"), word("한국어를 배우고 음악을 듣습니다", "han-gu-geo-reul- -bae-u-go- -eu-ma-geul- -deut-seum-ni-da", "學韓語也聽音樂")] }
      ],
      practice: {
        heading: "固定例句",
        hint: "點擊例句可聽發音，並比較前後調換後語意仍相同的用法。",
        valueSuffix: "",
        items: [
          { value: "房間又亮又乾淨", answer: word("방이 밝고 깨끗합니다", "bang-i- -bal-go- -kkae-kkeu-tam-ni-da", "房間又亮又乾淨") },
          { value: "教室又暗又髒", answer: word("교실이 어둡고 더럽습니다", "gyo-si-ri- -eo-dup-go- -deo-reop-seum-ni-da", "教室又暗又髒") },
          { value: "今天又冷又下雪", answer: word("오늘은 춥고 눈이 옵니다", "o-neu-reun- -chup-go- -nun-i- -om-ni-da", "今天又冷又下雪") }
        ]
      },
      sourceNotes: [{ heading: "來源重點", lines: ["-고 接在詞幹後，直接去除原形的 다 再加 고。", "本課的 -고 表示並列；前後內容可以對調，基本語意不變。"] }]
    }
  },
  {
    id: "b1-10",
    label: "初級1-10",
    titleKo: "오늘 운동을 안 합니까?",
    titleZh: "今天不運動嗎？",
    theme: "안 與 못 的短形否定",
    sourcePdf: "docs/lessons/new/0813.pdf",
    media: { hero: courseAsset("b1-10-dialogue-person") },
    dialogues: [
      {
        title: "本課對話",
        image: courseAsset("b1-10-dialogue-person"),
        objectImage: courseAsset("b1-10-dialogue-object"),
        lines: [
          line("민준", "같이 운동을 합니까?", "一起運動嗎？", [b110[0], b110[1], b110[2]]),
          line("관우", "다음에 합시다.", "下次吧。", [b110[3], b110[4]]),
          line("민준", "오늘 운동을 안 합니까?", "今天不運動嗎？", [b110[5], b110[1], b110[6], b110[2]]),
          line("관우", "아니요. 운동을 못 합니다. 지금 발이 아픕니다.", "不，我沒辦法運動。現在腳痛。", [b110[7], b110[1], b110[8], b110[9], b110[10], b110[11], b110[12]])
        ]
      },
      {
        title: "換你說說看",
        image: courseAsset("b1-10-practice-person"),
        objectImage: courseAsset("b1-10-practice-visual"),
        lines: [
          line("A", "오늘 수영을 합니까?", "今天游泳嗎？", [b110[5], word("수영을", "su-yeong-eul", "游泳（受詞）"), b110[2]]),
          line("B", "아니요, 오늘 수영을 안 합니다.", "不，今天不游泳。", [b110[7], b110[5], word("수영을", "su-yeong-eul", "游泳（受詞）"), b110[6], b110[9]]),
          line("A", "태국 신문을 읽습니까?", "讀泰國報紙嗎？", [word("태국", "tae-guk", "泰國"), word("신문을", "sin-mu-neul", "報紙（受詞）"), word("읽습니까", "ik-seum-ni-kka", "讀嗎？")]),
          line("B", "아니요, 태국 신문을 못 읽습니다.", "不，我沒辦法讀泰國報紙。", [b110[7], word("태국", "tae-guk", "泰國"), word("신문을", "sin-mu-neul", "報紙（受詞）"), b110[8], word("읽습니다", "ik-seum-ni-da", "閱讀")])
        ]
      }
    ],
    vocabulary: withSharedVocabImage("b1-10-vocab-page", [
      word("안", "an", "不／不要；表示主觀意志否定"),
      word("못", "mot", "不能／無法；表示能力或條件不允許"),
      word("가다", "ga-da", "去"),
      word("보다", "bo-da", "看"),
      word("먹다", "meok-da", "吃"),
      word("읽다", "ik-da", "讀"),
      word("예쁘다", "ye-ppeu-da", "漂亮"),
      word("공부하다", "gong-bu-ha-da", "念書／學習"),
      word("운동하다", "un-dong-ha-da", "運動"),
      word("노래하다", "no-rae-ha-da", "唱歌"),
      word("다음에", "da-eum-e", "下次"),
      word("아프다", "a-peu-da", "疼痛／不舒服")
    ]),
    guide: {
      label: "否定表現",
      title: "안（不做）與 못（做不到）",
      hint: "안 表示意志上的不做；못 表示能力或條件上無法做到。하다 類動詞要把 안／못 放在 하다 前。",
      sections: [
        { heading: "意志否定：안", words: [word("안 갑니다", "an- -gam-ni-da", "不去"), word("안 봅니다", "an- -bom-ni-da", "不看"), word("공부 안 합니다", "gong-bu- -an- -ham-ni-da", "不念書")] },
        { heading: "能力否定：못", words: [word("못 갑니다", "mot- -gam-ni-da", "不能去"), word("못 봅니다", "mot- -bom-ni-da", "不能看"), word("운동 못 합니다", "un-dong- -mot- -ham-ni-da", "不能運動")] }
      ],
      practice: {
        heading: "固定例句",
        hint: "比較說話者是選擇不做，還是因為能力或情況而做不到。",
        valueSuffix: "",
        items: [
          { value: "今天不去學校", answer: word("오늘 학교에 안 갑니다", "o-neul- -hak-gyo-e- -an- -gam-ni-da", "今天不去學校") },
          { value: "我不吃泡菜", answer: word("저는 김치를 안 먹습니다", "jeo-neun- -gim-chi-reul- -an- -meok-seum-ni-da", "我不吃泡菜") },
          { value: "今天不能去公司", answer: word("오늘 회사에 못 갑니다", "o-neul- -hoe-sa-e- -mot- -gam-ni-da", "今天不能去公司") },
          { value: "我不能讀日文書", answer: word("제가 일본어 책을 못 읽습니다", "je-ga- -il-bo-neo- -chae-geul- -mot- -ik-seum-ni-da", "我不能讀日文書") }
        ]
      },
      sourceNotes: [{ heading: "來源重點", lines: ["短形否定直接放在一般動詞或形容詞前。", "공부하다、운동하다、노래하다 等 하다 類詞，把 안／못 放在 하다 前。"] }]
    }
  },
  {
    id: "b1-11",
    label: "初級1-11",
    titleKo: "어제 뭐 했습니까?",
    titleZh: "昨天做了什麼？",
    theme: "過去時態 -았／었／였- 與時間副詞",
    sourcePdf: "docs/lessons/new/0817.pdf",
    media: { hero: courseAsset("b1-11-dialogue-person") },
    dialogues: [
      {
        title: "本課對話",
        image: courseAsset("b1-11-dialogue-person"),
        objectImage: courseAsset("b1-11-dialogue-object"),
        lines: [
          line("관우", "어제 뭐 했습니까?", "冠宇：昨天做了什麼？", [b111[6], b111[18], b111[19]]),
          line("민준", "어제 친구를 만났습니다.", "敏俊：昨天見了朋友。", [b111[6], b111[20], b111[21]]),
          line("관우", "어디에서 친구를 만났습니까?", "冠宇：在哪裡見了朋友？", [b111[22], b111[20], word("만났습니까", "man-nat-seum-ni-kka", "見面了嗎？")]),
          line("민준", "커피숍에서 만났습니다. 커피숍에서 커피를 마시고 한국 식당에서 저녁을 먹었습니다.", "敏俊：在咖啡店見面。在咖啡店喝完咖啡後，又在韓國餐廳吃了晚餐。", [b111[23], b111[21], b111[23], b111[24], b111[25], b111[26], b111[27], b111[28], b111[29]])
        ]
      },
      {
        title: "換你說說看（保留空格）",
        image: courseAsset("b1-11-practice-person"),
        objectImage: courseAsset("b1-11-practice-visual"),
        lines: [
          line("A", "어제 뭐 했습니까?", "昨天做了什麼？", [b111[6], b111[18], b111[19]]),
          line("B", "어제 ____에서 ____________________.", "請填入昨天去過的場所與做過的事情。", [b111[6], b111[22]]),
          line("A", "그리고 뭐 했습니까?", "然後做了什麼？", [word("그리고", "geu-ri-go", "然後／而且"), b111[18], b111[19]]),
          line("B", "그리고 ____________________.", "請用過去式補上另一件事情。", [word("그리고", "geu-ri-go", "然後／而且"), b111[19]])
        ]
      }
    ],
    vocabulary: withSharedVocabImage("b1-11-vocab-page", [
      b111[0], b111[1], b111[2], b111[3], b111[4], b111[5], b111[6], b111[7],
      b111[8], b111[9], b111[10], b111[11], b111[12], b111[13], b111[14], b111[15]
    ]),
    guide: {
      label: "時態與翻譯",
      title: "過去時態 -았／었／였-",
      hint: "先去掉原形的 다，再依詞幹最後母音選擇 았、었；하다 類詞與 였 結合後縮寫成 했。來源中的開放式練習保留空格。",
      sections: [
        {
          heading: "詞幹母音為 ㅏ／ㅗ：使用 았",
          words: [
            word("갔습니다", "gat-seum-ni-da", "去了（가다 → 가 + 았 → 갔）"),
            word("잤습니다", "jat-seum-ni-da", "睡了（자다 → 자 + 았 → 잤）"),
            word("봤습니다", "bwat-seum-ni-da", "看了（보다 → 보 + 았 → 봤）"),
            word("왔습니다", "wat-seum-ni-da", "來了（오다 → 오 + 았 → 왔）")
          ]
        },
        {
          heading: "其他母音：使用 었；하다：使用 였 → 했",
          words: [
            word("먹었습니다", "meok-eot-seum-ni-da", "吃了（먹다 → 먹 + 었）"),
            word("읽었습니다", "il-geot-seum-ni-da", "讀了（읽다 → 읽 + 었）"),
            word("입었습니다", "i-beot-seum-ni-da", "穿了（입다 → 입 + 었）"),
            word("마셨습니다", "ma-syeot-seum-ni-da", "喝了（마시다 → 마시 + 었）"),
            word("공부했습니다", "gong-bu-haet-seum-ni-da", "念書了（공부하다 → 공부했）"),
            word("운동했습니다", "un-dong-haet-seum-ni-da", "運動了（운동하다 → 운동했）")
          ]
        },
        { heading: "時間相關詞彙", words: [b111[0], b111[1], b111[2], b111[3], b111[4], b111[5], b111[6], b111[7], b111[8], b111[9], b111[10], b111[11], b111[12], b111[13], b111[14], b111[15]] }
      ],
      practice: {
        heading: "固定例句",
        hint: "以下保留來源中已印出的例句；需要自行回答的題目仍顯示在對話分頁。",
        valueSuffix: "",
        items: [
          { value: "昨天買了褲子", answer: word("어제 바지를 샀습니다", "eo-je- -ba-ji-reul- -sat-seum-ni-da", "昨天買了褲子") },
          { value: "昨晚吃了泡麵", answer: word("저녁에 라면을 먹었습니다", "jeo-nyeo-ge- -ra-myeon-eul- -meok-eot-seum-ni-da", "昨晚吃了泡麵") },
          { value: "昨天見了朋友", answer: word("어제 친구를 만났습니다", "eo-je- -chin-gu-reul- -man-nat-seum-ni-da", "昨天見了朋友") },
          { value: "在圖書館念書了", answer: word("도서관에서 공부했습니다", "do-seo-gwan-e-seo- -gong-bu-haet-seum-ni-da", "在圖書館念書了") }
        ],
        prompts: [
          { page: "第 14 頁", ko: "작년 → ( ) → ( )", zh: "請依時間順序填入今年與明年。" },
          { page: "第 15 頁", ko: "언제 한국어를 배웠습니까?", zh: "何時學了韓語？來源保留回答空格。" },
          { page: "第 15 頁", ko: "어제 뭐 했습니까?", zh: "昨天做了什麼？來源保留回答空格。" },
          { page: "第 18 頁", ko: "어제 ____에서 ____________________.", zh: "請填入場所和昨天做過的事。" }
        ]
      },
      sourceNotes: [{
        heading: "來源重點",
        lines: [
          "韓語說明過去的事情時，使用 -았／었／였- 過去時態語尾；三種形式依詞幹最後母音選擇。",
          "與時態相關的副詞包括 작년、올해、내년、지난주、이번주、다음주、어제、오늘、내일、아침、점심、오후、저녁、밤、새벽、언제。",
          "本課對話位於第 17 頁，中文翻譯位於第 21 頁。"
        ]
      }],
      references: [{
        heading: "附錄：對話翻譯（第 21 頁）",
        entries: [
          { label: "冠宇", text: "昨天做了什麼呢？" },
          { label: "敏俊", text: "昨天見了朋友。" },
          { label: "冠宇", text: "在哪裡見了朋友？" },
          { label: "敏俊", text: "在咖啡店見面。咖啡店喝完咖啡後，在韓國餐廳吃了晚餐。" }
        ]
      }]
    }
  },
  {
    id: "b1-12",
    label: "初級1-12",
    titleKo: "김밥하고 라면을 먹었습니다.",
    titleZh: "我吃了紫菜飯捲和泡麵。",
    theme: "名詞並列助詞 하고、와／과 與食物詞彙",
    sourcePdf: "docs/lessons/new/0819.pdf",
    media: { hero: courseAsset("b1-12-dialogue-person") },
    dialogues: [
      {
        title: "本課對話",
        image: courseAsset("b1-12-dialogue-person"),
        objectImage: courseAsset("b1-12-dialogue-object"),
        lines: [
          line("관우", "점심을 같이 먹습니까?", "冠宇：中餐一起吃嗎？", [b112[22], b112[23], b112[24]]),
          line("민준", "아…아까 먹었습니다.", "敏俊：啊……我剛剛吃過了。", [b112[25], b112[26]]),
          line("관우", "뭐 먹었습니까?", "冠宇：吃了什麼？", [b112[27], word("먹었습니까", "meo-geot-seum-ni-kka", "吃了嗎？")]),
          line("민준", "아까 한국 식당에서 김밥하고 라면을 먹었습니다.", "敏俊：剛剛在韓國餐廳吃了紫菜飯捲跟泡麵。", [b112[25], b112[28], b112[29], b112[30], b112[31], b112[26]])
        ]
      },
      {
        title: "換你說說看（保留空格）",
        image: courseAsset("b1-12-practice-person"),
        objectImage: courseAsset("b1-12-practice-visual"),
        lines: [
          line("A", "아침에 뭐 먹었습니까?", "早餐吃了什麼？", [word("아침에", "a-chi-me", "在早上"), b112[27], word("먹었습니까", "meo-geot-seum-ni-kka", "吃了嗎？")]),
          line("B", "________ 하고 ________", "請使用 하고 連接兩種食物。", [word("하고", "ha-go", "和／跟（口語）"), b112[0]]),
          line("A", "백화점에서 뭐 샀습니까?", "在百貨公司買了什麼？", [word("백화점에서", "baek-hwa-jeo-me-seo", "在百貨公司"), b112[27], word("샀습니까", "sat-seum-ni-kka", "買了嗎？")]),
          line("B", "________ 하고 ________", "請使用 하고 連接兩種物品。", [word("하고", "ha-go", "和／跟（口語）"), word("샀습니다", "sat-seum-ni-da", "買了")])
        ]
      }
    ],
    vocabulary: withSharedVocabImage("b1-12-vocab-page", [
      b112[0], b112[1], b112[2], b112[3], b112[4], b112[5], b112[6], b112[7], b112[8], b112[9],
      b112[10], b112[11], b112[12], b112[13], b112[14], b112[15], b112[16], b112[17], b112[18], b112[19]
    ]),
    guide: {
      label: "助詞與翻譯",
      title: "連接名詞：하고、와／과",
      hint: "하고 多用於口語，前方名詞不分有無尾音；와／과 多用於書面語，無尾音用 와、有尾音用 과。來源中的開放式回答保留空格。",
      sections: [
        {
          heading: "口語：名詞 + 하고 + 名詞",
          words: [
            word("하고", "ha-go", "和／跟；口語常用，不分有無尾音"),
            word("김치하고 김밥", "gim-chi-ha-go- -gim-bap", "泡菜和紫菜飯捲"),
            word("책하고 가방", "chaek-ha-go- -ga-bang", "書和包包"),
            word("학생하고 선생님", "hak-saeng-ha-go- -seon-saeng-nim", "學生和老師")
          ]
        },
        {
          heading: "書面語：無尾音用 와；有尾音用 과",
          words: [
            word("와", "wa", "和；接在無尾音名詞後"),
            word("과", "gwa", "和；接在有尾音名詞後"),
            word("김치와 김밥", "gim-chi-wa- -gim-bap", "泡菜和紫菜飯捲"),
            word("학생과 선생님", "hak-saeng-gwa- -seon-saeng-nim", "學生和老師")
          ]
        },
        { heading: "食物與飲料", words: [b112[0], b112[1], b112[2], b112[3], b112[4], b112[5], b112[6], b112[7], b112[8], b112[9], b112[10], b112[11], b112[12], b112[13], b112[14], b112[15], b112[16], b112[17], b112[18], b112[19]] }
      ],
      practice: {
        heading: "固定例句",
        hint: "以下保留來源中已印出的搭配；第 6、9、12、14、16 頁的回答題不替教材填入答案。",
        valueSuffix: "",
        items: [
          { value: "泡菜和紫菜飯捲（口語）", answer: word("김치하고 김밥", "gim-chi-ha-go- -gim-bap", "泡菜和紫菜飯捲") },
          { value: "學生和老師（口語）", answer: word("학생하고 선생님", "hak-saeng-ha-go- -seon-saeng-nim", "學生和老師") },
          { value: "泡菜和紫菜飯捲（書面）", answer: word("김치와 김밥", "gim-chi-wa- -gim-bap", "泡菜和紫菜飯捲") },
          { value: "學生和老師（書面）", answer: word("학생과 선생님", "hak-saeng-gwa- -seon-saeng-nim", "學生和老師") }
        ],
        prompts: [
          { page: "第 6 頁", ko: "김밥/라면 → ______", zh: "請使用 하고 回答吃了什麼。" },
          { page: "第 9 頁", ko: "과일/우유 → ______", zh: "請使用 와／과 回答午餐吃了什麼。" },
          { page: "第 12 頁", ko: "오늘 중국 식당에서 뭐 먹었습니까?", zh: "請從食物詞表自行回答。" },
          { page: "第 14 頁", ko: "무슨 술을 좋아합니까?", zh: "喜歡哪種酒？請自行回答。" },
          { page: "第 16 頁", ko: "아침에 뭐 먹었습니까?", zh: "請用 하고 連接兩種食物。" }
        ]
      },
      sourceNotes: [{
        heading: "來源重點",
        lines: [
          "하고 與 와／과 都可把多個名詞並列；하고 多用於口語，와／과 多用於書面語。",
          "하고 不受前方名詞尾音影響；와 接在無尾音名詞後，과 接在有尾音名詞後。",
          "食物詞彙位於第 10-11 頁，飲料詞彙位於第 13 頁，本課對話位於第 15 頁。"
        ]
      }],
      references: [{
        heading: "附錄：對話翻譯（第 19 頁）",
        entries: [
          { label: "冠宇", text: "中餐一起吃嗎？" },
          { label: "敏俊", text: "啊，我剛剛吃過了。" },
          { label: "冠宇", text: "吃了什麼呢？" },
          { label: "敏俊", text: "剛剛在韓國餐廳吃了紫菜飯捲跟拉麵。" }
        ]
      }]
    }
  }
];
