const imageByTheme = {
  vowels: "/assets/letter-pages/memory-vowels.png",
  consonants: "/assets/letter-pages/memory-consonants.png",
  school: "/assets/letter-pages/memory-school.png",
  nature: "/assets/letter-pages/memory-nature.png",
  home: "/assets/letter-pages/memory-home-food.png",
  actions: "/assets/letter-pages/memory-actions.png"
};

let pageSequence = 0;

function makePage(symbol, roman, theme, words) {
  const image = imageByTheme[theme];
  const pageIndex = pageSequence;
  pageSequence += 1;
  const firstWordIndex = pageIndex * 5;

  return {
    id: `page-${symbol}`,
    symbol,
    roman,
    title: `${symbol} · ${roman}`,
    memoryImage: image,
    memoryTip: `把 ${symbol} 想成一個會在單字裡發光的小積木。先找出它，再把旁邊的子音接上去，聲音就會自己拼起來。`,
    playfulNote: `今天的任務：看到 ${symbol} 就在心裡按一下小鈴鐺，提醒自己這個音正在幫韓文字變有生命。`,
    words: words.map((word, wordIndex) => ({
      ...word,
      image: `/assets/letter-pages/words/word-${String(firstWordIndex + wordIndex + 1).padStart(3, "0")}.png`
    }))
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
