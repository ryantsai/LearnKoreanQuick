import { ArrowLeft, BookOpen, Sparkles, Volume2, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { letterPages } from "./data/letterPages.js";
import { lessonData } from "./data/lessonData.js";
import { speakKorean } from "./utils/speech.js";

export default function App() {
  const [activeLetterSymbol, setActiveLetterSymbol] = useState(null);
  const activeLetterPage = activeLetterSymbol
    ? letterPages.find((page) => page.symbol === activeLetterSymbol)
    : null;

  function openLetterPage(symbol) {
    setActiveLetterSymbol(symbol);
    playSound(symbol);
  }

  function playSound(text) {
    speakKorean(text);
  }

  return (
    <main className="app-shell">
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
          key={activeLetterPage.symbol}
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
            aria-label={`${item.symbol} ${item.roman} ${item.zh}`}
          >
            <span className="letter-symbol">{item.symbol}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function LetterLearningPopup({ page, onBack, onSpeak }) {
  const [selectedStoryWord, setSelectedStoryWord] = useState(page.words[0]);

  function selectStoryWord(word) {
    setSelectedStoryWord(word);
    onSpeak(word.hangul);
  }

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

        <StoryPanel page={page} selectedWord={selectedStoryWord} onSelectWord={selectStoryWord} />

        <div className="letter-word-grid">
          {page.words.map((word) => (
            <article className="letter-word-card" key={`${page.symbol}-${word.hangul}`}>
              <img className="letter-word-image" src={word.image} alt={`${word.zh} 記憶圖`} />
              <div>
                <span className="letter-word-hangul">{word.hangul}</span>
                <span className="letter-word-meta">{word.zh} · {word.roman}</span>
                <p>{word.note}</p>
                <SyllableBreakdown syllables={word.syllables} />
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

function StoryPanel({ page, selectedWord, onSelectWord }) {
  return (
    <section className="story-panel" aria-label={`${page.symbol} 趣味小故事`}>
      <div className="story-copy">
        <h3>{page.story.title}</h3>
        <p>{page.story.setup}</p>
        <p className="story-line">
          {page.story.tokens.map((token, index) => {
            if (token.type === "text") {
              return <React.Fragment key={`${token.value}-${index}`}>{token.value}</React.Fragment>;
            }

            const word = page.words.find((item) => item.hangul === token.value);

            return (
              <button
                className={`story-word ${selectedWord.hangul === token.value ? "is-active" : ""}`}
                key={`${token.value}-${index}`}
                onClick={() => onSelectWord(word)}
              >
                {token.value}
              </button>
            );
          })}
        </p>
        <p>{page.story.ending}</p>
      </div>

      <WordInspector word={selectedWord} />
    </section>
  );
}

function WordInspector({ word }) {
  return (
    <aside className="word-inspector" aria-live="polite">
      <span className="inspector-label">Tap result</span>
      <strong className="inspector-word">{word.hangul}</strong>
      <span className="inspector-meta">{word.zh} · {word.roman}</span>
      <SyllableBreakdown syllables={word.syllables} />
    </aside>
  );
}

function SyllableBreakdown({ syllables }) {
  return (
    <div className="syllable-breakdown" aria-label="音節拆解">
      {syllables.map((syllable, index) => (
        <span className="syllable-chip" key={`${syllable.block}-${syllable.roman}-${index}`}>
          <strong>{syllable.block}</strong>
          <span>{syllable.parts.map((part) => part.jamo).join(" + ")}</span>
          <em>{syllable.roman}</em>
        </span>
      ))}
    </div>
  );
}
