import React from 'react';

function TextInput({ value, onChange }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
      <label className="block text-sm text-blue-200/80 mb-2">Text eingeben oder einfügen</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Füge hier deinen Text ein..."
        rows={8}
        className="w-full bg-slate-900/40 text-white placeholder-blue-300/60 border border-blue-500/30 focus:border-blue-400/80 outline-none rounded-lg p-3"
      />
    </div>
  );
}

export default TextInput;
