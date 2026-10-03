# Local lesson audio

The app plays pre-generated MP3 files in `public/audio`. It does not use browser speech synthesis or a hosted TTS API. Complete dialogue sentences preserve phrasing; individual vocabulary buttons still play one word. The speed slider adjusts playback while preserving pitch.

## Model choice

The Korean migration selects **Google Chirp 3 HD** at the default synthesis rate 1.0. Narration and vocabulary use **Kore**. Dialogue uses the fixed Kore/Charon casting in `src/utils/dialogueVoice.js`; every existing two-person conversation has distinct voices. Only dialogue sentences requiring Charon add recordings. Chinese retains **Qwen3-TTS-12Hz-1.7B-CustomVoice / Serena** and its existing files. The active manifest remains Qwen until a complete verified Google batch is imported.

Google references: [Chirp 3 HD voices](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd), [pricing](https://cloud.google.com/text-to-speech/pricing), [request limits](https://docs.cloud.google.com/text-to-speech/quotas).

The previous Korean voice was **Qwen3-TTS / Sohee**. Its pinned model revision is `0c0e3051f131929182e2c023b9537f8b1c68adfe`; license: Apache 2.0. The existing local generator remains available for Chinese additions.

- Official model and speaker documentation: https://github.com/QwenLM/Qwen3-TTS
- Model card: https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice
- CUDA graph runtime and Windows/RTX 50-series notes: https://github.com/andimarafioti/faster-qwen3-tts
- Alternative evaluated: https://github.com/resemble-ai/chatterbox (multilingual Korean support; Qwen's native Korean preset and Chinese preset fit this bilingual learning app).

Measured on this RTX 5080: about 4.4 GB peak allocated GPU memory for the initial bilingual sample and approximately 4.5–5 GB with the accelerated sequential runtime. Other applications and driver allocations add to that. Generation uses the GPU; playback on the deployed site needs no GPU or Python installation.

## Voice consistency

The `speaker` field selects a fixed Korean dialogue voice. Vocabulary, alphabet and narration always use Kore; Chinese always keeps Serena. Review new role names before synthesis. Stable base text keys stay unchanged; Charon sentence keys append `|voice=ko-KR-Chirp3-HD-Charon`. Legacy manifests retain the original Korean fallback during preparation. A completed role-aware manifest requires each voice variant and cannot silently fall back to another voice.

## Offline Google preparation and import

`npm run audio:google:plan` writes an ignored `tmp/google-audio-plan.json` without credentials or network calls. `--extra-lessons /absolute/local/lesson.mjs` includes reviewed local drafts without publishing them. The plan preserves current playback requirements even when a draft adds new dictionary contexts. It separates existing Chinese clips from missing new Chinese clips; neither is sent to Google.

The one-time bulk budget is **US$2**, using gross list price **US$30/million characters** without assuming a free allowance. Every retry and uncertain outcome must be charged. `scripts/lib/chirp-manifest.mjs` adapts the plan to the separately owned, manifest-bound batch runner. That runner must durably reserve cost before each request, use one resumable ledger, verify receipts, and export only approved MP3s plus its result report. The repository has no paid synthesis command or credentials setup.

Import a safely extracted, verified result directory with:

```sh
npm run audio:google:import -- --plan /local/plan.json --batch /local/batch.json --results-dir /local/extracted-results
```

This verifies batch identity, exact text/voice/config, hashes, complete output coverage and retry accounting, then fully decodes every MP3 with FFmpeg. It changes no repository files. Add `--apply` to copy only currently published Korean assets and atomically switch the manifest after all checks pass. Draft-only outputs stay outside the repository. Existing Chinese records and file hashes are checked and preserved. Current source data must cover every playback key before cutover; missing new Chinese recordings must be prepared separately before publishing bilingual course additions.

Korean assets use `public/audio/chirp3-hd/`; base lesson IDs, progress storage and original physical assets remain unchanged. Regenerate the catalog, run `audio:verify`, tests and build after integration. Listen to representative alphabet, word, sentence, alternating-role and slow-playback samples: hashes and decoding establish file integrity, not linguistic quality.

## Previous local provider: setup on Windows

Run from the repository root with `uv` installed:

```powershell
uv venv --python 3.12 .venv-tts
uv pip install --python .venv-tts/Scripts/python.exe -r scripts/requirements-tts.txt --extra-index-url https://download.pytorch.org/whl/cu128 --index-strategy unsafe-best-match
.venv-tts/Scripts/python.exe -c "from huggingface_hub import snapshot_download; snapshot_download('Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice',revision='0c0e3051f131929182e2c023b9537f8b1c68adfe',local_dir='.models/qwen3-tts-1.7b')"
npm run audio:catalog
npm run audio:generate
npm run audio:verify
npm test
npm run build
```

Use CUDA 12.8 wheels for RTX 5080 support. The package may print a missing-SoX notice; preset voice generation here does not use SoX. `qwen-tts-hf` and upstream `qwen-tts` provide the same Python import; do not install both in this environment. Weights and the virtual environment are ignored by Git. Commit the generated MP3s, catalog, and manifest with the app when publishing; the static build copies them to `dist/audio`.

## Generation and quality checks

`scripts/build-audio-catalog.mjs` enumerates every playback surface: course titles, dialogue sentences and translations, vocabulary/guide words, dictionary pronunciation exercises and example sentences, alphabet pages, and novel words. Text is deduplicated by language and normalized Unicode text. Filenames are stable SHA-256 prefixes.

The generator resumes completed valid files. It writes each MP3 and manifest atomically. Short Korean texts use no style instruction, get sentence-ending punctuation, and have a text-length-based duration limit to reject unwanted extra speech. Rejected outputs are retried, with the standard model path as a final fallback. Silence, invalid samples, corrupt encodings, and missing clips are checked. A failed clip remains absent from the manifest and is reported in `failures.json`; rerun to retry. Logs are in `tmp/audio-generation.log` and `tmp/audio-generation.err.log`.

Chinese synthesis normalizes Traditional characters to Simplified input and requests clear standard Mandarin; the displayed lesson text stays in Traditional Chinese. Chinese and Korean generation use separately tuned repetition settings.

Consonant buttons pronounce the Korean letter name; vowel buttons pronounce the corresponding vowel syllable. Blank exercise lines are not spoken. Partial blanks become a pause. The printed lesson text remains unchanged.

Generation is stochastic. Structural/duration checks cannot prove every pronunciation is correct; sampled speech recognition supplements these checks. The initial Korean sentence sample was independently transcribed exactly. A learner/listener can still judge voice preference differently.

`audio:verify` checks complete file coverage. For a full decode, run `.venv-tts/Scripts/python.exe -X utf8 scripts/verify-audio.py`; it writes `public/audio/verification.json`. Run it before publishing, after adding lessons, or after rebuilding the catalog. A changed voice configuration requires a fresh manifest and regeneration to avoid mixing versions. No model runs at build or playback time.
