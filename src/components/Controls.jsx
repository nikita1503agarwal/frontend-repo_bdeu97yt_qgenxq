import React from 'react';

function Controls({ mode, setMode, wpm, setWpm, isRunning, onStartStop, onReset }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          className={`px-3 py-2 rounded-lg border transition ${mode === 'word' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-900/40 text-blue-200/90 border-blue-500/30 hover:border-blue-400/60'}`}
          onClick={() => setMode('word')}
        >Wörter</button>
        <button
          className={`px-3 py-2 rounded-lg border transition ${mode === 'syllable' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-900/40 text-blue-200/90 border-blue-500/30 hover:border-blue-400/60'}`}
          onClick={() => setMode('syllable')}
        >Silben</button>
        <button
          className={`px-3 py-2 rounded-lg border transition ${mode === 'letter' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-900/40 text-blue-200/90 border-blue-500/30 hover:border-blue-400/60'}`}
          onClick={() => setMode('letter')}
        >Buchstaben</button>
      </div>

      <div>
        <label className="block text-sm text-blue-200/80 mb-1">Einheiten pro Minute: <span className="font-semibold text-white">{wpm}</span></label>
        <input type="range" min="1" max="1000" value={wpm} onChange={(e)=>setWpm(Number(e.target.value))} className="w-full" />
        <div className="flex justify-between text-xs text-blue-300/70">
          <span>1</span>
          <span>1000</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={onStartStop} className={`flex-1 px-4 py-2 rounded-lg font-medium transition border ${isRunning ? 'bg-rose-600/90 hover:bg-rose-600 text-white border-rose-400/60' : 'bg-green-600/90 hover:bg-green-600 text-white border-emerald-400/60'}`}>
          {isRunning ? 'Stopp' : 'Start'}
        </button>
        <button onClick={onReset} className="px-4 py-2 rounded-lg border bg-slate-900/40 text-blue-200/90 border-blue-500/30 hover:border-blue-400/60">
          Zurücksetzen
        </button>
      </div>
    </div>
  );
}

export default Controls;
