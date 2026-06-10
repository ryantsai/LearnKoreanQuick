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
  }
];
