import React, { useEffect, useMemo, useRef, useState } from 'react';

// Very simple German syllable splitter heuristic
function splitIntoSyllables(word) {
  const vowels = 'aeiouyäöüAEIOUYÄÖÜ';
  const parts = [];
  let current = '';
  for (let i = 0; i < word.length; i++) {
    current += word[i];
    const c = word[i];
    const next = word[i+1];
    const isVowel = vowels.includes(c);
    const nextIsVowel = vowels.includes(next || '');
    // split at vowel-consonant boundary roughly
    if (isVowel && !nextIsVowel) {
      // lookahead to keep typical clusters together
      if (i+2 < word.length) {
        const twoAhead = word[i+2];
        const nextIsVowel2 = vowels.includes(twoAhead || '');
        if (!nextIsVowel && !nextIsVowel2) {
          parts.push(current);
          current = '';
          continue;
        }
      }
    }
    // split when we moved through a consonant cluster and next is vowel
    if (!isVowel && nextIsVowel) {
      parts.push(current);
      current = '';
    }
  }
  if (current) parts.push(current);
  return parts.filter(Boolean);
}

function tokenize(text, mode) {
  const clean = text.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  if (mode === 'word') {
    return clean.split(' ');
  }
  if (mode === 'letter') {
    return [...clean];
  }
  // syllable mode
  const words = clean.split(' ');
  const tokens = [];
  for (const w of words) {
    const s = splitIntoSyllables(w);
    if (s.length) tokens.push(...s);
  }
  return tokens;
}

function Reader({ text, mode, wpm, isRunning }) {
  const tokens = useMemo(() => tokenize(text, mode), [text, mode]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  // derive interval in ms per unit
  const intervalMs = useMemo(() => {
    const perMin = Math.max(1, wpm);
    return 60000 / perMin;
  }, [wpm]);

  useEffect(() => {
    setIndex(0);
  }, [text, mode]);

  useEffect(() => {
    if (!isRunning || tokens.length === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => {
        if (prev + 1 >= tokens.length) {
          // stop at end
          clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning, intervalMs, tokens.length]);

  const current = tokens[index] || '';

  return (
    <div className="h-48 sm:h-56 md:h-64 flex items-center justify-center bg-slate-900/40 border border-blue-500/20 rounded-xl">
      <div className="text-center">
        <div className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-wide text-white">
          {current}
        </div>
        <div className="mt-3 text-xs text-blue-300/70">{tokens.length ? index + 1 : 0} / {tokens.length}</div>
      </div>
    </div>
  );
}

export default Reader;
