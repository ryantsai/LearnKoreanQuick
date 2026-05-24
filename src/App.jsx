import { ArrowLeft, BookOpen, BookText, Sparkles, Volume2, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { letterPages } from "./data/letterPages.js";
import { lessonData } from "./data/lessonData.js";
import { novelData } from "./data/novelData.js";
import { speakKorean } from "./utils/speech.js";
import { decomposeHangulWord } from "./utils/hangul.js";

export default function App() {
  const [activeLetterSymbol, setActiveLetterSymbol] = useState(null);
  const [activeNovelId, setActiveNovelId] = useState(null);

  const activeLetterPage = activeLetterSymbol
    ? letterPages.find((page) => page.symbol === activeLetterSymbol)
    : null;

  const activeNovel = activeNovelId
    ? novelData.find((n) => n.id === activeNovelId)
    : null;

  function openLetterPage(symbol) {
    setActiveLetterSymbol(symbol);
    speakKorean(symbol);
  }

  function playSound(text) {
    speakKorean(text);
  }

  if (activeNovel) {
    return (
      <>
        <NovelReader
          novel={activeNovel}
          onClose={() => setActiveNovelId(null)}
          onOpenLetter={openLetterPage}
        />
        {activeLetterPage ? (
          <LetterLearningPopup
            key={activeLetterPage.symbol}
            page={activeLetterPage}
            onBack={() => setActiveLetterSymbol(null)}
            onSpeak={playSound}
          />
        ) : null}
      </>
    );
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
        <NovelListPanel novels={novelData} onOpen={setActiveNovelId} />
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
            <span className="letter-roman">{item.roman}</span>
            <span className="letter-hint">{item.zh}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function NovelListPanel({ novels, onOpen }) {
  return (
    <section className="alphabet-panel novel-list-panel">
      <div className="panel-heading">
        <BookText size={18} />
        <h2>輕小說閱讀</h2>
      </div>
      <p className="novel-panel-desc">點擊每個韓文單字，即可查看發音、拆解與中文翻譯。</p>
      <div className="novel-list">
        {novels.map((novel) => (
          <article key={novel.id} className="novel-card">
            <div className="novel-card-emoji">{novel.emoji}</div>
            <div className="novel-card-body">
              <span className="novel-genre-tag">{novel.genre}</span>
              <h3 className="novel-card-title">{novel.title}</h3>
              <p className="novel-card-title-zh">{novel.titleZh}</p>
              <p className="novel-card-desc">{novel.description}</p>
              <button className="novel-read-button" onClick={() => onOpen(novel.id)}>
                開始閱讀 →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NovelReader({ novel, onClose, onOpenLetter }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [inspectorPos, setInspectorPos] = useState({ x: 0, y: 0 });

  const chapter = novel.chapters[chapterIndex];

  function handleWordClick(word, event) {
    const rect = event.currentTarget.getBoundingClientRect();
    setInspectorPos({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 8,
    });
    setSelectedWord(selectedWord === word ? null : word);
    speakKorean(word.text);
  }

  return (
    <main className="novel-page">
      <section className="novel-reader">
        <div className="letter-page-toolbar">
          <button className="back-button" onClick={onClose}>
            <ArrowLeft size={18} />
            返回
          </button>
          <div className="novel-reader-title">
            <span>{novel.emoji}</span>
            <span>{novel.titleZh}</span>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="關閉">
            <X size={20} />
          </button>
        </div>

        <div className="novel-reader-layout">
          <nav className="novel-chapter-nav">
            <p className="nav-label">章節</p>
            {novel.chapters.map((ch, i) => (
              <button
                key={ch.id}
                className={`chapter-nav-item ${i === chapterIndex ? "is-active" : ""}`}
                onClick={() => { setChapterIndex(i); setSelectedWord(null); }}
              >
                <strong>第 {ch.id} 章</strong>
                <span>{ch.titleZh}</span>
              </button>
            ))}
          </nav>

          <div className="novel-reading-area">
            <div className="novel-chapter-header">
              <p className="lab-label">第 {chapter.id} 章</p>
              <h2 className="novel-chapter-title">{chapter.title}</h2>
              <p className="novel-chapter-title-zh">{chapter.titleZh}</p>
            </div>

            <div className="novel-text">
              {chapter.paragraphs.map((para, pi) => (
                <p key={pi} className="novel-paragraph">
                  {para.map((token, ti) => {
                    if (token.type === "punct") {
                      return <span key={ti} className="novel-punct">{token.text}</span>;
                    }
                    const isSelected = selectedWord && selectedWord === token;
                    return (
                      <button
                        key={ti}
                        className={`novel-word ${isSelected ? "is-selected" : ""}`}
                        onClick={(e) => handleWordClick(token, e)}
                      >
                        {token.text}
                      </button>
                    );
                  })}
                </p>
              ))}
            </div>

            <p className="novel-tap-hint">點擊任意韓文單字查看詳細說明</p>
          </div>
        </div>

        {selectedWord ? (
          <WordInspectorPopup
            word={selectedWord}
            pos={inspectorPos}
            onClose={() => setSelectedWord(null)}
            onOpenLetter={onOpenLetter}
          />
        ) : null}
      </section>
    </main>
  );
}

const letterPageSymbols = new Set(letterPages.map((p) => p.symbol));

function WordInspectorPopup({ word, pos, onClose, onOpenLetter }) {
  const syllables = decomposeHangulWord(word.text, word.roman);

  return (
    <div
      className="novel-inspector"
      style={{
        left: Math.min(pos.x, window.innerWidth - 320) + "px",
        top: pos.y + "px",
        position: "fixed",
      }}
    >
      <div className="novel-inspector-header">
        <span className="inspector-label">單字解析</span>
        <button className="novel-inspector-close" onClick={onClose} aria-label="關閉">
          <X size={14} />
        </button>
      </div>
      <strong className="inspector-word">{word.text}</strong>
      <span className="inspector-roman">{word.roman}</span>
      <span className="inspector-zh">{word.zh}</span>
      <div className="syllable-breakdown">
        {syllables.map((syllable, index) => (
          <span className="syllable-chip" key={`${syllable.block}-${index}`}>
            <strong>{syllable.block}</strong>
            <span className="jamo-parts">
              {syllable.parts.map((part, pi) => (
                <React.Fragment key={pi}>
                  {pi > 0 && <span className="jamo-plus"> + </span>}
                  {letterPageSymbols.has(part.jamo) ? (
                    <button
                      className="jamo-link"
                      onClick={() => { onClose(); onOpenLetter(part.jamo); }}
                      title={`查看 ${part.jamo} 介紹頁`}
                    >
                      {part.jamo}
                    </button>
                  ) : (
                    <span>{part.jamo}</span>
                  )}
                </React.Fragment>
              ))}
            </span>
            <em>{syllable.roman}</em>
          </span>
        ))}
      </div>
      <button className="letter-sound-button" style={{ marginTop: 4 }} onClick={() => speakKorean(word.text)}>
        <Volume2 size={14} />
        發音
      </button>
    </div>
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
        <p className="story-bonus-line">{page.story.bonusLine}</p>
        <div className="story-new-words" aria-label="故事新單字">
          <span>新單字</span>
          {page.story.newWords.map((word) => (
            <button key={`${page.symbol}-${word.hangul}`} onClick={() => onSelectWord(word)}>
              <strong>{word.hangul}</strong>
              <em>{word.zh} · {word.roman}</em>
            </button>
          ))}
        </div>
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
