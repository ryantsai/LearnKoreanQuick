import { BookOpen, CheckCircle2, Headphones, RotateCcw, Sparkles, Volume2 } from "lucide-react";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { letterPages } from "./data/letterPages.js";
import { lessonData } from "./data/lessonData.js";
import {
  createSessionSnapshot,
  describeSelection,
  getInitialSelection,
  getSelectedPart,
  getSelectedSyllable,
  getSelectedWord,
  restoreSessionSnapshot
} from "./utils/hangul.js";
import { speakKorean } from "./utils/speech.js";

const STORAGE_KEY = "learn-korean-quick-session";

export default function App() {
  const fallbackSelection = useMemo(() => getInitialSelection(lessonData.words), []);
  const [selected, setSelected] = useState(fallbackSelection);
  const [viewedLetters, setViewedLetters] = useState(() => new Set());
  const [practicedWords, setPracticedWords] = useState(() => new Set());
  const [practiceCount, setPracticeCount] = useState(0);
  const [speechNotice, setSpeechNotice] = useState("點任一韓文字母或單字，開始拆音。");
  const [activeLetterSymbol, setActiveLetterSymbol] = useState(letterPages[0].symbol);

  useEffect(() => {
    const restored = restoreSessionSnapshot(sessionStorage.getItem(STORAGE_KEY), fallbackSelection);
    setSelected(restored.selected);
    setViewedLetters(restored.viewedLetters);
    setPracticedWords(restored.practicedWords);
    setPracticeCount(restored.practiceCount);
    setActiveLetterSymbol(restored.activeLetterSymbol ?? letterPages[0].symbol);
  }, [fallbackSelection]);

  useEffect(() => {
    const snapshot = createSessionSnapshot({ selected, viewedLetters, practicedWords, practiceCount, activeLetterSymbol });
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }, [selected, viewedLetters, practicedWords, practiceCount, activeLetterSymbol]);

  const selectedWord = getSelectedWord(lessonData.words, selected);
  const selectedSyllable = getSelectedSyllable(selectedWord, selected);
  const selectedPart = getSelectedPart(selectedSyllable, selected);
  const selectionInfo = describeSelection(selectedWord, selectedSyllable, selectedPart);
  const activeLetterPage = letterPages.find((page) => page.symbol === activeLetterSymbol) ?? letterPages[0];

  function markLetter(symbol) {
    setViewedLetters((current) => new Set(current).add(symbol));
    setActiveLetterSymbol(symbol);
    setSpeechNotice(`${symbol}：先看形狀，再試著跟讀。`);
    playSound(symbol);
  }

  function selectWord(wordId) {
    setSelected({ wordId, syllableIndex: 0, partIndex: null });
    setPracticedWords((current) => new Set(current).add(wordId));
    setPracticeCount((count) => count + 1);
  }

  function previewWordSyllable(wordId, syllableIndex) {
    setSelected({ wordId, syllableIndex, partIndex: null });
    setPracticedWords((current) => new Set(current).add(wordId));
  }

  function previewWordPart(wordId, syllableIndex, partIndex) {
    setSelected({ wordId, syllableIndex, partIndex });
    setPracticedWords((current) => new Set(current).add(wordId));
  }

  function selectSyllable(syllableIndex) {
    setSelected((current) => ({ ...current, syllableIndex, partIndex: null }));
    setPracticeCount((count) => count + 1);
  }

  function selectPart(syllableIndex, partIndex) {
    setSelected((current) => ({ ...current, syllableIndex, partIndex }));
    setPracticeCount((count) => count + 1);
  }

  function playSound(text) {
    const ok = speakKorean(text);
    setSpeechNotice(ok ? `正在播放：${text}` : `這個瀏覽器沒有可用語音，請看讀音提示：${text}`);
  }

  function resetSession() {
    sessionStorage.removeItem(STORAGE_KEY);
    setSelected(fallbackSelection);
    setViewedLetters(new Set());
    setPracticedWords(new Set());
    setPracticeCount(0);
    setActiveLetterSymbol(letterPages[0].symbol);
    setSpeechNotice("已重置這次分頁的學習進度。");
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <div className="brand-row">
            <span className="brand-mark">한</span>
            <span>Learn Korean Quick</span>
          </div>
          <h1>韓文字母，拆開就好玩。</h1>
          <p>
            先從基本母音和常用子音開始，再用圖片單字練習。點任何韓文字、音節或部件，都能看到拆音並嘗試播放韓文發音。
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => playSound(selectedWord.hangul)}>
              <Volume2 size={18} />
              播放目前單字
            </button>
            <button className="ghost-button" onClick={resetSession}>
              <RotateCcw size={18} />
              重置進度
            </button>
          </div>
        </div>
        <ProgressDock
          letterCount={viewedLetters.size}
          wordCount={practicedWords.size}
          practiceCount={practiceCount}
          notice={speechNotice}
        />
      </section>

      <section className="learning-grid">
        <AlphabetRail
          title="完整母音"
          icon={<Sparkles size={18} />}
          items={lessonData.vowels}
          viewedLetters={viewedLetters}
          onPick={markLetter}
        />
        <AlphabetRail
          title="完整子音"
          icon={<BookOpen size={18} />}
          items={lessonData.consonants}
          viewedLetters={viewedLetters}
          onPick={markLetter}
        />
      </section>

      <section className="practice-zone">
        <WordGallery
          words={lessonData.words}
          selected={selected}
          selectedWord={selectedWord}
          onSelect={selectWord}
          onPreviewSyllable={previewWordSyllable}
          onPreviewPart={previewWordPart}
        />
        <PronunciationLab
          word={selectedWord}
          selected={selected}
          selectedSyllable={selectedSyllable}
          selectedPart={selectedPart}
          selectionInfo={selectionInfo}
          onSelectSyllable={selectSyllable}
          onSelectPart={selectPart}
          onSpeak={playSound}
        />
      </section>

      <LetterLearningPage
        page={activeLetterPage}
        onSpeak={playSound}
        onPractice={(word) => {
          setPracticeCount((count) => count + 1);
          setSpeechNotice(`${word.hangul}：${word.note}`);
        }}
      />
    </main>
  );
}

function ProgressDock({ letterCount, wordCount, practiceCount, notice }) {
  return (
    <aside className="progress-dock" aria-label="本次進度">
      <div className="dock-title">
        <CheckCircle2 size={20} />
        本次分頁進度
      </div>
      <div className="progress-stats">
        <span><strong>{letterCount}</strong> 字母</span>
        <span><strong>{wordCount}</strong> 單字</span>
        <span><strong>{practiceCount}</strong> 練習</span>
      </div>
      <p>{notice}</p>
    </aside>
  );
}

function LetterLearningPage({ page, onSpeak, onPractice }) {
  return (
    <section className="letter-page" aria-label={`${page.symbol} 獨立學習頁`}>
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
            <img src={word.image} alt={`${word.zh} 記憶圖`} />
            <div>
              <span className="letter-word-hangul">{word.hangul}</span>
              <span className="letter-word-meta">{word.zh} · {word.roman}</span>
              <p>{word.note}</p>
              <div className="letter-word-actions">
                <button onClick={() => onSpeak(word.hangul)}>
                  <Volume2 size={15} />
                  發音
                </button>
                <button onClick={() => onPractice(word)}>
                  <Sparkles size={15} />
                  記一下
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AlphabetRail({ title, icon, items, viewedLetters, onPick }) {
  return (
    <section className="alphabet-panel">
      <div className="panel-heading">
        {icon}
        <h2>{title}</h2>
      </div>
      <div className="letter-grid">
        {items.map((item) => (
          <button
            className={`letter-card ${viewedLetters.has(item.symbol) ? "is-viewed" : ""}`}
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

function WordGallery({ words, selected, selectedWord, onSelect, onPreviewSyllable, onPreviewPart }) {
  return (
    <section className="word-gallery">
      <div className="section-title">
        <Headphones size={20} />
        <h2>圖片單字牆</h2>
      </div>
      <div className="word-list">
        {words.map((word) => (
          <article
            className={`word-card ${selectedWord.id === word.id ? "is-active" : ""}`}
            key={word.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(word.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(word.id);
              }
            }}
          >
            <img src={word.asset} alt={`${word.meaning} 插圖`} />
            <span className="word-hangul">
              {word.syllables.map((syllable, syllableIndex) => (
                <span
                  className={`word-syllable-hotspot ${
                    selected.wordId === word.id && selected.syllableIndex === syllableIndex ? "is-hot" : ""
                  }`}
                  key={`${word.id}-${syllable.block}-${syllableIndex}`}
                  onMouseEnter={(event) => {
                    event.stopPropagation();
                    onPreviewSyllable(word.id, syllableIndex);
                  }}
                  onFocus={(event) => {
                    event.stopPropagation();
                    onPreviewSyllable(word.id, syllableIndex);
                  }}
                  tabIndex={0}
                >
                  {syllable.block}
                  <span className="word-jamo-popover" aria-label={`${syllable.block} parts`}>
                    {syllable.parts.map((part, partIndex) => (
                      <span
                        className={`word-jamo-chip ${
                          selected.wordId === word.id &&
                          selected.syllableIndex === syllableIndex &&
                          selected.partIndex === partIndex
                            ? "is-hot"
                            : ""
                        }`}
                        key={`${word.id}-${syllableIndex}-${part.jamo}-${partIndex}`}
                        onMouseEnter={(event) => {
                          event.stopPropagation();
                          onPreviewPart(word.id, syllableIndex, partIndex);
                        }}
                        onFocus={(event) => {
                          event.stopPropagation();
                          onPreviewPart(word.id, syllableIndex, partIndex);
                        }}
                        tabIndex={0}
                      >
                        {part.jamo}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </span>
            <span className="word-meta">{word.meaning} · {word.roman}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function PronunciationLab({
  word,
  selected,
  selectedSyllable,
  selectedPart,
  selectionInfo,
  onSelectSyllable,
  onSelectPart,
  onSpeak
}) {
  const speakTarget = selectedPart?.jamo ?? selectedSyllable.block;

  return (
    <section className="pronunciation-lab">
      <div className="lab-top">
        <div>
          <p className="lab-label">Pronunciation Lab</p>
          <h2>{word.hangul}</h2>
          <p>{word.meaning} · {word.hint}</p>
        </div>
        <button className="round-speak" onClick={() => onSpeak(word.hangul)} aria-label="播放整個單字">
          <Volume2 size={22} />
        </button>
      </div>

      <div className="syllable-row" aria-label="單字音節">
        {word.syllables.map((syllable, index) => (
          <button
            key={`${syllable.block}-${index}`}
            className={`syllable-block ${selected.syllableIndex === index && selected.partIndex === null ? "is-selected" : ""}`}
            onClick={() => onSelectSyllable(index)}
          >
            <span>{syllable.block}</span>
            <small>{syllable.roman}</small>
          </button>
        ))}
      </div>

      <div className="parts-board">
        {word.syllables.map((syllable, syllableIndex) => (
          <div className="part-cluster" key={`${syllable.block}-${syllableIndex}-parts`}>
            <strong>{syllable.block}</strong>
            <div>
              {syllable.parts.map((part, partIndex) => (
                <button
                  key={`${part.jamo}-${partIndex}`}
                  className={`part-chip ${
                    selected.syllableIndex === syllableIndex && selected.partIndex === partIndex ? "is-selected" : ""
                  }`}
                  onClick={() => onSelectPart(syllableIndex, partIndex)}
                >
                  {part.jamo}
                  <span>{part.sound}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="explain-card">
        <span className="focus-symbol">{selectionInfo.title}</span>
        <div>
          <h3>{selectionInfo.pronunciation}</h3>
          <p>{selectionInfo.description}</p>
        </div>
        <button className="mini-speak" onClick={() => onSpeak(speakTarget)}>
          <Volume2 size={17} />
          播放這部分
        </button>
      </div>
    </section>
  );
}
