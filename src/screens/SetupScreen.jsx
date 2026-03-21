import { useState } from 'react'

export default function SetupScreen({ players, setPlayers, settings, onOpenSettings, onStart }) {
  const [input, setInput] = useState('')

  function addPlayer() {
    const name = input.trim()
    if (!name || players.includes(name)) return
    setPlayers(prev => [...prev, name])
    setInput('')
  }

  function removePlayer(index) {
    setPlayers(prev => prev.filter((_, i) => i !== index))
  }

  const canStart = players.length >= 3

  return (
    <div className="screen">
      <div className="container">
        <div className="row-between">
          <div className="logo-block">
            <h1 className="logo">Impos<em>tor</em></h1>
            <p className="logo-sub">El juego de la duda</p>
          </div>
          <button className="icon-btn" onClick={onOpenSettings} title="Ajustes">⚙</button>
        </div>

        <p className="subtitle">Añade al menos 3 jugadores para empezar</p>

        <div className="input-row">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addPlayer()}
            placeholder="Nombre del jugador…"
            maxLength={20}
            autoComplete="off"
          />
          <button className="btn btn-secondary" onClick={addPlayer}>+ añadir</button>
        </div>

        <ul className="player-list">
          {players.map((name, i) => (
            <li key={i}>
              <span className="player-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="player-name-text">{name}</span>
              <button className="remove-btn" onClick={() => removePlayer(i)}>✕</button>
            </li>
          ))}
        </ul>

        {canStart && (
          <p className="settings-summary">
            {settings.numImpostors} impostor{settings.numImpostors > 1 ? 'es' : ''} ·{' '}
            pistas: {settings.hintMode ? 'activadas' : 'desactivadas'}
          </p>
        )}

        <button className="btn btn-primary" disabled={!canStart} onClick={onStart}>
          Iniciar Operación
        </button>
      </div>
    </div>
  )
}
