import React, { useState } from 'react'
import Header from './components/Header'
import TextInput from './components/TextInput'
import Controls from './components/Controls'
import Reader from './components/Reader'

function App() {
  const [text, setText] = useState('Das ist ein Beispieltext. Füge deinen eigenen Text ein und starte das schnelle Lesen!')
  const [mode, setMode] = useState('word') // 'word' | 'syllable' | 'letter'
  const [wpm, setWpm] = useState(300)
  const [isRunning, setIsRunning] = useState(false)

  const handleStartStop = () => setIsRunning((v) => !v)
  const handleReset = () => {
    setIsRunning(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)] pointer-events-none" />
      <div className="relative max-w-5xl mx-auto p-6 sm:p-10">
        <Header />

        <div className="grid md:grid-cols-2 gap-6">
          <TextInput value={text} onChange={setText} />
          <div className="flex flex-col gap-4">
            <Controls
              mode={mode}
              setMode={setMode}
              wpm={wpm}
              setWpm={setWpm}
              isRunning={isRunning}
              onStartStop={handleStartStop}
              onReset={handleReset}
            />
            <Reader text={text} mode={mode} wpm={wpm} isRunning={isRunning} />
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-blue-300/60">
          Tipp: Nutze den Regler, um zwischen 1 und 1000 Einheiten pro Minute zu wählen.
        </div>
      </div>
    </div>
  )
}

export default App
