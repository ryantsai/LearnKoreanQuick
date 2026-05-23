import { ArrowLeft, BookOpen, Sparkles, Volume2, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { letterPages } from "./data/letterPages.js";
import { lessonData } from "./data/lessonData.js";
import { speakKorean } from "./utils/speech.js";

export default function App() {
  const [activeLetterSymbol, setActiveLetterSymbol] = useState(null);
  const [speechNotice, setSpeechNotice] = useState("點一個母音或子音，切換到它的個別學習頁。");
  const activeLetterPage = activeLetterSymbol
    ? letterPages.find((page) => page.symbol === activeLetterSymbol)
    : null;

  function openLetterPage(symbol) {
    setActiveLetterSymbol(symbol);
    playSound(symbol);
  }

  function playSound(text) {
    const ok = speakKorean(text);
    setSpeechNotice(ok ? `正在播放：${text}` : `這個瀏覽器沒有可用語音，請看讀音提示：${text}`);
  }

  return (
    <main className="app-shell">
      <section className="hero hero-single">
        <div className="hero-copy">
          <div className="brand-row">
            <span className="brand-mark">한</span>
            <span>Learn Korean Quick</span>
          </div>
          <h1>選一個音，進入它的小宇宙。</h1>
          <p>
            首頁只保留完整母音和完整子音。點任一張字卡，就會切換到該音的個別學習頁，搭配常用單字、記憶圖片和生動提示。
          </p>
          <p className="sound-notice">{speechNotice}</p>
        </div>
      </section>

      <section className="learning-grid">
        <AlphabetRail
          title="完整母音"
          icon={<Sparkles size={18} />}
          items={lessonData.vowels}
          activeSymbol={activeLetterSymbol}
          onPick={openLetterPage}
        />
        <AlphabetRail
          title="完整子音"
          icon={<BookOpen size={18} />}
          items={lessonData.consonants}
          activeSymbol={activeLetterSymbol}
          onPick={openLetterPage}
        />
      </section>

      {activeLetterPage ? (
        <LetterLearningPopup
          page={activeLetterPage}
          onBack={() => setActiveLetterSymbol(null)}
          onSpeak={playSound}
        />
      ) : null}
    </main>
  );
}

function AlphabetRail({ title, icon, items, activeSymbol, onPick }) {
  return (
    <section className="alphabet-panel">
      <div className="panel-heading">
        {icon}
        <h2>{title}</h2>
      </div>
      <div className="letter-grid">
        {items.map((item) => (
          <button
            className={`letter-card ${activeSymbol === item.symbol ? "is-viewed" : ""}`}
            key={item.id}
            onClick={() => onPick(item.symbol)}
          >
            <span className="letter-symbol">{item.symbol}</span>
            <span className="letter-roman">{item.roman}</span>
            <span className="letter-hint">{item.zh}</span>
            <span className="letter-example">{item.example}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function LetterLearningPopup({ page, onBack, onSpeak }) {
  return (
    <div className="letter-modal-backdrop" role="dialog" aria-modal="true" aria-label={`${page.symbol} 獨立學習頁`}>
      <section className="letter-page">
        <div className="letter-page-toolbar">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={18} />
            返回
          </button>
          <button className="icon-button" onClick={onBack} aria-label="關閉學習頁">
            <X size={20} />
          </button>
        </div>

        <div className="letter-page-hero">
          <div>
            <p className="lab-label">Letter Page</p>
            <h2>{page.title}</h2>
            <p>{page.memoryTip}</p>
            <p className="playful-note">{page.playfulNote}</p>
            <button className="primary-button" onClick={() => onSpeak(page.symbol)}>
              <Volume2 size={18} />
              聽 {page.symbol}
            </button>
          </div>
          <img src={page.memoryImage} alt={`${page.symbol} 記憶圖`} />
        </div>

        <div className="letter-word-grid">
          {page.words.map((word) => (
            <article className="letter-word-card" key={`${page.symbol}-${word.hangul}`}>
              <img className="letter-word-image" src={word.image} alt={`${word.zh} 記憶圖`} />
              <div>
                <span className="letter-word-hangul">{word.hangul}</span>
                <span className="letter-word-meta">{word.zh} · {word.roman}</span>
                <p>{word.note}</p>
                <button className="letter-sound-button" onClick={() => onSpeak(word.hangul)}>
                  <Volume2 size={15} />
                  發音
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
