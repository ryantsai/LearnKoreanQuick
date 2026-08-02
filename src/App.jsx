import { ArrowLeft, BookOpenCheck, BookText, GraduationCap, Volume2, X } from "lucide-react";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { courseLessons } from "./data/courseLessons.js";
import { letterPages } from "./data/letterPages.js";
import { lessonData } from "./data/lessonData.js";
import { novelData } from "./data/novelData.js";
import { buildDialoguePlaybackItems, buildVocabularyPlaybackItems } from "./utils/playback.js";
import { speakKorean } from "./utils/speech.js";
import { decomposeHangulWord } from "./utils/hangul.js";
import {
  getTtsSpeed,
  setTtsSpeed,
  MIN_TTS_SPEED,
  MAX_TTS_SPEED,
} from "./utils/ttsSpeed.js";

export default function App() {
  const [activeLetterSymbol, setActiveLetterSymbol] = useState(null);
  const [activeCourseLessonId, setActiveCourseLessonId] = useState(null);
  const [activeNovelId, setActiveNovelId] = useState(null);

  const activeLetterPage = activeLetterSymbol
    ? letterPages.find((page) => page.symbol === activeLetterSymbol)
    : null;

  const activeNovel = activeNovelId
    ? novelData.find((n) => n.id === activeNovelId)
    : null;

  const activeCourseLesson = activeCourseLessonId
    ? courseLessons.find((lesson) => lesson.id === activeCourseLessonId)
    : null;

  useEffect(() => {
    if (activeCourseLessonId || activeNovelId) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [activeCourseLessonId, activeNovelId]);

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

  if (activeCourseLesson) {
    return (
      <>
        <CourseLessonReader
          lesson={activeCourseLesson}
          onClose={() => setActiveCourseLessonId(null)}
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
      <TtsSpeedControl />
      <section className="learning-grid">
        <JamoIndex
          vowels={lessonData.vowels}
          consonants={lessonData.consonants}
          activeSymbol={activeLetterSymbol}
          onPick={openLetterPage}
        />
        <CourseLessonListPanel lessons={courseLessons} onOpen={setActiveCourseLessonId} />
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

function TtsSpeedControl() {
  const [speed, setSpeed] = useState(() => getTtsSpeed());

  function handleChange(event) {
    const next = setTtsSpeed(Number.parseFloat(event.target.value));
    setSpeed(next);
  }

  return (
    <div className="tts-speed-control">
      <Volume2 size={18} />
      <label htmlFor="tts-speed-slider">語音速度</label>
      <input
        id="tts-speed-slider"
        type="range"
        min={MIN_TTS_SPEED}
        max={MAX_TTS_SPEED}
        step={0.1}
        value={speed}
        onChange={handleChange}
      />
      <span className="tts-speed-value">{speed.toFixed(1)}x</span>
    </div>
  );
}

function CourseLessonListPanel({ lessons, onOpen }) {
  return (
    <section className="alphabet-panel course-list-panel">
      <div className="panel-heading">
        <GraduationCap size={19} />
        <h2>課程練習</h2>
      </div>
      <p className="novel-panel-desc">從 PDF 課堂內容整理短對話與單字；點擊韓文即可聽發音、看拆解。</p>
      <div className="course-list">
        {lessons.map((lesson) => (
          <article key={lesson.id} className="course-card">
            <div className="course-card-label">{lesson.label}</div>
            <div className="course-card-body">
              <span className="novel-genre-tag">{lesson.theme}</span>
              <h3 className="course-card-title">{lesson.titleKo}</h3>
              <p className="novel-card-title-zh">{lesson.titleZh}</p>
              <p className="novel-card-desc">
                {lesson.dialogues.length} 組對話 · {lesson.vocabulary.length} 個單字
              </p>
              <button className="novel-read-button" onClick={() => onOpen(lesson.id)}>
                開始練習 →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const consonantRows = [
  ["ㄱ", "ㄷ", "ㅂ", "ㅅ", "ㅈ"],
  ["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"],
  ["ㅋ", "ㅌ", "ㅍ", "ㅎ", "ㅊ"],
  ["ㄴ", "ㅁ", "ㄹ", "ㅇ"],
];

const vowelRows = [
  ["ㅏ", "ㅓ", "ㅗ", "ㅜ", "ㅡ", "ㅣ", "ㅐ", "ㅔ"],
  ["ㅑ", "ㅕ", "ㅛ", "ㅠ", "ㅢ", "ㅒ", "ㅖ"],
  ["ㅘ", "ㅝ", "ㅟ", "ㅚ", "ㅙ", "ㅞ"],
];

function JamoIndex({ vowels, consonants, activeSymbol, onPick }) {
  const jamosBySymbol = new Map(
    [...consonants, ...vowels].map((item) => [item.symbol, item])
  );

  return (
    <section className="jamo-index" aria-label="韓文字母索引">
      <JamoIndexGroup
        title="輔音"
        rows={consonantRows}
        jamosBySymbol={jamosBySymbol}
        activeSymbol={activeSymbol}
        onPick={onPick}
      />
      <JamoIndexGroup
        title="元音"
        rows={vowelRows}
        jamosBySymbol={jamosBySymbol}
        activeSymbol={activeSymbol}
        onPick={onPick}
      />
    </section>
  );
}

function JamoIndexGroup({ title, rows, jamosBySymbol, activeSymbol, onPick }) {
  return (
    <section className="jamo-index-group">
      <h2>{title}</h2>
      <div className="jamo-row-stack">
        {rows.map((row) => (
          <div
            className="jamo-row"
            style={{ "--jamo-count": row.length }}
            key={`${title}-${row.join("")}`}
          >
            {row.map((symbol) => {
              const item = jamosBySymbol.get(symbol);

              return (
                <button
                  className={`letter-card jamo-index-card ${activeSymbol === symbol ? "is-viewed" : ""}`}
                  key={symbol}
                  onClick={() => onPick(symbol)}
                  aria-label={item ? `${item.symbol} ${item.roman} ${item.zh}` : symbol}
                  title={item ? `${item.symbol} ${item.roman} - ${item.zh}` : symbol}
                >
                  <span className="letter-symbol">{symbol}</span>
                  {item ? (
                    <>
                      <span className="letter-roman">{item.roman}</span>
                      <span className="letter-hint">{item.zh}</span>
                    </>
                  ) : null}
                </button>
              );
            })}
          </div>
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

function CourseLessonReader({ lesson, onClose, onOpenLetter }) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [view, setView] = useState("dialogue");
  const [selectedWord, setSelectedWord] = useState(null);
  const [inspectorPos, setInspectorPos] = useState({ x: 0, y: 0 });
  const [playback, setPlayback] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const playbackRunRef = useRef(0);

  const dialogue = lesson.dialogues[dialogueIndex];

  useEffect(() => {
    return () => stopPlayback();
  }, []);

  useEffect(() => {
    stopPlayback();
    setSelectedWord(null);
  }, [dialogueIndex, view]);

  function sleep(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function speakQueued(text, lang) {
    if (!("speechSynthesis" in window)) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = (lang === "ko-KR" ? 0.78 : 0.92) * getTtsSpeed();
      utterance.pitch = 1.04;
      utterance.onend = resolve;
      utterance.onerror = resolve;
      window.speechSynthesis.speak(utterance);
    });
  }

  function stopPlayback() {
    playbackRunRef.current += 1;
    setPlayback(null);
    setHighlight(null);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  async function runPlayback(kind, includeChinese) {
    const runId = playbackRunRef.current + 1;
    playbackRunRef.current = runId;
    setSelectedWord(null);
    setPlayback({ kind, includeChinese });
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    const sentencePause = 2000;
    const vocabPause = 2000;

    while (playbackRunRef.current === runId) {
      const items = kind === "dialogue"
        ? buildDialoguePlaybackItems(dialogue, includeChinese)
        : kind === "guide"
          ? buildVocabularyPlaybackItems(lesson.guide.sections.flatMap((section) => section.words), includeChinese)
          : buildVocabularyPlaybackItems(lesson.vocabulary, includeChinese);

      for (const [itemIndex, item] of items.entries()) {
        if (playbackRunRef.current !== runId) {
          return;
        }

        if (item.type === "korean") {
          setHighlight(kind === "dialogue"
            ? { kind, lineIndex: item.lineIndex, tokenIndex: item.tokenIndex }
            : { kind, wordIndex: item.wordIndex });
          await speakQueued(item.text, "ko-KR");
        } else {
          setHighlight(null);
          await speakQueued(item.text, "zh-TW");
        }

        if ((kind === "vocabulary" || kind === "guide") && (!includeChinese || item.type === "chinese")) {
          setHighlight(null);
          await sleep(vocabPause);
        }

        if (kind === "dialogue") {
          const nextItem = items[itemIndex + 1];
          const isSentenceEnd = includeChinese
            ? item.type === "chinese"
            : !nextItem || nextItem.lineIndex !== item.lineIndex;

          if (isSentenceEnd) {
            setHighlight(null);
            await sleep(sentencePause);
          }
        }
      }

      setHighlight(null);
    }
  }

  function togglePlayback(kind, includeChinese) {
    if (playback?.kind === kind && playback.includeChinese === includeChinese) {
      stopPlayback();
      return;
    }

    runPlayback(kind, includeChinese);
  }

  function handleWordClick(word, event) {
    stopPlayback();
    const rect = event.currentTarget.getBoundingClientRect();
    setInspectorPos({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 8,
    });
    setSelectedWord(selectedWord === word ? null : word);
    speakKorean(word.text);
  }

  return (
    <main className="novel-page course-page">
      <section className="novel-reader course-reader">
        <div className="letter-page-toolbar">
          <button className="back-button" onClick={onClose}>
            <ArrowLeft size={18} />
            返回
          </button>
          <div className="novel-reader-title">
            <BookOpenCheck size={18} />
            <span>{lesson.label} · {lesson.titleZh}</span>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="關閉">
            <X size={20} />
          </button>
        </div>

        <div className="course-hero">
          <div>
            <p className="lab-label">{lesson.theme}</p>
            <h1>{lesson.titleKo}</h1>
            <p>{lesson.titleZh}</p>
          </div>
          <img className="course-hero-image" src={lesson.media.hero} alt={`${lesson.label} 課程人物`} />
          <button className="primary-button" onClick={() => speakKorean(lesson.titleKo)}>
            <Volume2 size={18} />
            聽標題
          </button>
        </div>

        <div className="novel-reader-layout course-reader-layout">
          <nav className="novel-chapter-nav">
            <p className="nav-label">對話</p>
            {lesson.dialogues.map((item, index) => (
              <button
                key={item.title}
                className={`chapter-nav-item ${view === "dialogue" && index === dialogueIndex ? "is-active" : ""}`}
                onClick={() => {
                  setView("dialogue");
                  setDialogueIndex(index);
                }}
              >
                <strong>{lesson.label}</strong>
                <span>{item.title}</span>
              </button>
            ))}
            {lesson.guide ? (
              <button
                className={`chapter-nav-item ${view === "guide" ? "is-active" : ""}`}
                onClick={() => setView("guide")}
              >
                <strong>{lesson.label}</strong>
                <span>{lesson.guide.label}</span>
              </button>
            ) : null}
          </nav>

          <div className="course-study-area">
            {view === "guide" ? (
              <LearningGuide
                guide={lesson.guide}
                selectedWord={selectedWord}
                onWordClick={handleWordClick}
                playback={playback}
                highlight={highlight}
                onTogglePlayback={togglePlayback}
                onStop={stopPlayback}
              />
            ) : (
            <>
            <section className="course-dialogue-card">
              <div className="course-dialogue-top">
                <div className="novel-chapter-header">
                  <p className="lab-label">{dialogue.title}</p>
                  <h2 className="novel-chapter-title">{lesson.titleKo}</h2>
                  <p className="novel-chapter-title-zh">{lesson.titleZh}</p>
                </div>
                <PlaybackButtons
                  isPlaying={playback?.kind === "dialogue"}
                  activeIncludeChinese={playback?.kind === "dialogue" ? playback.includeChinese : null}
                  onPlay={() => togglePlayback("dialogue", false)}
                  onPlayWithChinese={() => togglePlayback("dialogue", true)}
                  onStop={stopPlayback}
                />
              </div>

              <LessonMediaRail dialogue={dialogue} />

              <div className="course-karaoke-status" aria-live="polite">
                {playback?.kind === "dialogue"
                  ? playback.includeChinese
                    ? "播放對話與中文翻譯中"
                    : "播放對話中"
                  : "點擊播放可循環播放整段對話"}
              </div>

              <div className="course-dialogue-lines">
                {dialogue.lines.map((lineItem, lineIndex) => (
                  <article className="course-dialogue-line" key={`${dialogue.title}-${lineIndex}`}>
                    <span className="course-speaker">{lineItem.speaker}</span>
                    <p className="course-line-ko">
                      <ClickableKoreanLine
                        line={lineItem}
                        selectedWord={selectedWord}
                        highlight={highlight}
                        lineIndex={lineIndex}
                        onWordClick={handleWordClick}
                      />
                    </p>
                    <p className="course-line-zh">{lineItem.zh}</p>
                    <button className="letter-sound-button" onClick={() => speakKorean(lineItem.ko)}>
                      <Volume2 size={14} />
                      整句發音
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section className="course-vocab-card">
              <div className="course-dialogue-top">
                <div className="panel-heading">
                  <BookText size={18} />
                  <h2>單字</h2>
                </div>
                <PlaybackButtons
                  isPlaying={playback?.kind === "vocabulary"}
                  activeIncludeChinese={playback?.kind === "vocabulary" ? playback.includeChinese : null}
                  onPlay={() => togglePlayback("vocabulary", false)}
                  onPlayWithChinese={() => togglePlayback("vocabulary", true)}
                  onStop={stopPlayback}
                />
              </div>
              <div className="course-vocab-grid">
                {lesson.vocabulary.map((vocab, wordIndex) => (
                  <button
                    key={vocab.text}
                    className={`course-vocab-item ${selectedWord === vocab ? "is-selected" : ""} ${highlight?.kind === "vocabulary" && highlight.wordIndex === wordIndex ? "is-karaoke" : ""}`}
                    onClick={(event) => handleWordClick(vocab, event)}
                  >
                    <strong>{vocab.text}</strong>
                    <span>{vocab.zh}</span>
                    <em>{vocab.roman}</em>
                    <img className="course-vocab-image" src={vocab.image} alt={`${vocab.zh} 圖片`} />
                  </button>
                ))}
              </div>
            </section>

            {lesson.notes ? (
              <section className="course-vocab-card">
                <h2>價格練習</h2>
                <div className="course-note-list">
                  {lesson.notes.map((note) => (
                    <button key={note.text} className="story-word" onClick={(event) => handleWordClick(note, event)}>
                      {note.text}
                    </button>
                  ))}
                </div>
              </section>
            ) : null}
            </>
            )}
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

function PlaybackButtons({ isPlaying, activeIncludeChinese, onPlay, onPlayWithChinese, onStop }) {
  return (
    <div className="playback-controls">
      <button
        className={`ghost-button playback-button ${isPlaying && activeIncludeChinese === false ? "is-playing" : ""}`}
        onClick={onPlay}
      >
        <Volume2 size={16} />
        {isPlaying && activeIncludeChinese === false ? "停止" : "播放"}
      </button>
      <button
        className={`ghost-button playback-button ${isPlaying && activeIncludeChinese === true ? "is-playing" : ""}`}
        onClick={onPlayWithChinese}
      >
        <Volume2 size={16} />
        {isPlaying && activeIncludeChinese === true ? "停止" : "播放中文"}
      </button>
      {isPlaying ? (
        <button className="icon-button playback-stop-button" onClick={onStop} aria-label="停止播放">
          <X size={18} />
        </button>
      ) : null}
    </div>
  );
}

function LearningGuide({ guide, selectedWord, onWordClick, playback, highlight, onTogglePlayback, onStop }) {
  // The karaoke highlighter tracks the active cell with a single flat index,
  // so each section's words start at the running total of the prior sections.
  let wordOffset = 0;
  const sections = guide.sections.map((section) => {
    const startIndex = wordOffset;
    wordOffset += section.words.length;
    return { ...section, startIndex };
  });

  return (
    <>
      <section className="course-vocab-card">
        <div className="course-dialogue-top">
          <div className="panel-heading">
            <BookText size={18} />
            <h2>{guide.title}</h2>
          </div>
          <PlaybackButtons
            isPlaying={playback?.kind === "guide"}
            activeIncludeChinese={playback?.kind === "guide" ? playback.includeChinese : null}
            onPlay={() => onTogglePlayback("guide", false)}
            onPlayWithChinese={() => onTogglePlayback("guide", true)}
            onStop={onStop}
          />
        </div>
        <p className="course-numbers-hint">{guide.hint}</p>
        {sections.map((section, sectionIndex) => (
          <div className="course-guide-section" key={section.heading ?? sectionIndex}>
            {section.heading ? <h3 className="course-guide-subheading">{section.heading}</h3> : null}
            <div className="course-numbers-grid">
              {section.words.map((item, localIndex) => {
                const index = section.startIndex + localIndex;
                return (
                  <button
                    key={item.text}
                    className={`course-number-item ${selectedWord === item ? "is-selected" : ""} ${highlight?.kind === "guide" && highlight.wordIndex === index ? "is-karaoke" : ""}`}
                    onClick={(event) => onWordClick(item, event)}
                  >
                    <span className="course-number-value">{item.zh}</span>
                    <strong>{item.text}</strong>
                    <em>{item.roman}</em>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="course-vocab-card">
        <h2>{guide.practice.heading}</h2>
        <p className="course-numbers-hint">{guide.practice.hint}</p>
        <div className="course-practice-list">
          {guide.practice.items.map((item) => (
            <button
              key={item.value}
              className={`course-practice-item ${selectedWord === item.answer ? "is-selected" : ""}`}
              onClick={(event) => onWordClick(item.answer, event)}
            >
              <span className="course-practice-value">{item.value}{guide.practice.valueSuffix}</span>
              <span className="course-practice-arrow">→</span>
              <strong>{item.answer.text}</strong>
              <em>{item.answer.roman}</em>
            </button>
          ))}
        </div>
        {guide.practice.prompts?.length ? (
          <div className="course-guide-prompts">
            <h3 className="course-guide-subheading">開放式口說練習</h3>
            <p className="course-numbers-hint">教材以留白呈現的題目保留原樣；請自行組織回答。</p>
            {guide.practice.prompts.map((prompt, promptIndex) => (
              <article className="course-guide-prompt" key={`${prompt.page ?? "prompt"}-${promptIndex}`}>
                <span className="course-guide-prompt-page">{prompt.page}</span>
                <strong>{prompt.ko}</strong>
                <p>{prompt.zh}</p>
                {prompt.pattern ? <em>{prompt.pattern}</em> : null}
              </article>
            ))}
          </div>
        ) : null}
      </section>

      {guide.sourceNotes?.map((section, sectionIndex) => (
        <section className="course-vocab-card course-guide-source-notes" key={`${section.heading}-${sectionIndex}`}>
          <h2>{section.heading}</h2>
          {section.lines.map((sourceLine, lineIndex) => (
            <p key={`${sectionIndex}-${lineIndex}`}>{sourceLine}</p>
          ))}
        </section>
      ))}

      {guide.references?.map((section, sectionIndex) => (
        <section className="course-vocab-card course-guide-source-notes" key={`${section.heading}-${sectionIndex}`}>
          <h2>{section.heading}</h2>
          {section.entries.map((entry, entryIndex) => (
            <p key={`${sectionIndex}-${entryIndex}`}>
              {entry.label ? <strong>{entry.label}：</strong> : null}
              <span>{entry.text}</span>
            </p>
          ))}
        </section>
      ))}
    </>
  );
}

function LessonMediaRail({ dialogue }) {
  if (!dialogue.image && !dialogue.objectImage) {
    return null;
  }

  return (
    <div className="course-media-rail">
      {dialogue.image ? <img src={dialogue.image} alt={`${dialogue.title} 人物圖片`} /> : null}
      {dialogue.objectImage ? <img src={dialogue.objectImage} alt={`${dialogue.title} 情境圖片`} /> : null}
    </div>
  );
}

function ClickableKoreanLine({ line, selectedWord, highlight, lineIndex, onWordClick }) {
  const tokenByText = new Map(line.tokens.map((token) => [token.text, token]));
  const segments = line.ko.match(/[A-Za-z0-9가-힣]+|[^A-Za-z0-9가-힣]+/g) ?? [line.ko];
  let tokenIndex = -1;

  return segments.map((segment, index) => {
    const token = tokenByText.get(segment);

    if (!token) {
      return <React.Fragment key={`${segment}-${index}`}>{segment}</React.Fragment>;
    }

    tokenIndex += 1;
    const isHighlighted =
      highlight?.kind === "dialogue" &&
      highlight.lineIndex === lineIndex &&
      highlight.tokenIndex === tokenIndex;

    return (
      <button
        key={`${segment}-${index}`}
        className={`novel-word ${selectedWord === token ? "is-selected" : ""} ${isHighlighted ? "is-karaoke" : ""}`}
        onClick={(event) => onWordClick(token, event)}
      >
        {segment}
      </button>
    );
  });
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
                      onClick={() => onOpenLetter(part.jamo)}
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
