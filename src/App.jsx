import { ArrowLeft, BookOpenCheck, BookText, GraduationCap, Volume2, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { courseLessons } from "./data/courseLessons.js";
import { letterPages } from "./data/letterPages.js";
import { lessonData } from "./data/lessonData.js";
import { novelData } from "./data/novelData.js";
import { speakKorean } from "./utils/speech.js";
import { decomposeHangulWord } from "./utils/hangul.js";

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
  const [selectedWord, setSelectedWord] = useState(null);
  const [inspectorPos, setInspectorPos] = useState({ x: 0, y: 0 });

  const dialogue = lesson.dialogues[dialogueIndex];

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
                className={`chapter-nav-item ${index === dialogueIndex ? "is-active" : ""}`}
                onClick={() => { setDialogueIndex(index); setSelectedWord(null); }}
              >
                <strong>{lesson.label}</strong>
                <span>{item.title}</span>
              </button>
            ))}
          </nav>

          <div className="course-study-area">
            <section className="course-dialogue-card">
              <div className="novel-chapter-header">
                <p className="lab-label">{dialogue.title}</p>
                <h2 className="novel-chapter-title">{lesson.titleKo}</h2>
                <p className="novel-chapter-title-zh">{lesson.titleZh}</p>
              </div>

              <div className="course-dialogue-lines">
                {dialogue.lines.map((lineItem, lineIndex) => (
                  <article className="course-dialogue-line" key={`${dialogue.title}-${lineIndex}`}>
                    <span className="course-speaker">{lineItem.speaker}</span>
                    <p className="course-line-ko">
                      <ClickableKoreanLine
                        line={lineItem}
                        selectedWord={selectedWord}
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
              <div className="panel-heading">
                <BookText size={18} />
                <h2>單字</h2>
              </div>
              <div className="course-vocab-grid">
                {lesson.vocabulary.map((vocab) => (
                  <button
                    key={vocab.text}
                    className={`course-vocab-item ${selectedWord === vocab ? "is-selected" : ""}`}
                    onClick={(event) => handleWordClick(vocab, event)}
                  >
                    <strong>{vocab.text}</strong>
                    <span>{vocab.zh}</span>
                    <em>{vocab.roman}</em>
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

function ClickableKoreanLine({ line, selectedWord, onWordClick }) {
  const tokenByText = new Map(line.tokens.map((token) => [token.text, token]));
  const segments = line.ko.match(/[A-Za-z0-9가-힣]+|[^A-Za-z0-9가-힣]+/g) ?? [line.ko];

  return segments.map((segment, index) => {
    const token = tokenByText.get(segment);

    if (!token) {
      return <React.Fragment key={`${segment}-${index}`}>{segment}</React.Fragment>;
    }

    return (
      <button
        key={`${segment}-${index}`}
        className={`novel-word ${selectedWord === token ? "is-selected" : ""}`}
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
