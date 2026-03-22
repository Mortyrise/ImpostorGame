import { useState } from 'react'
import { Settings, X } from 'lucide-react'

function capitalizeName(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

export default function SetupScreen({ players, setPlayers, settings, onOpenSettings, onStart }) {
  const [input, setInput] = useState('')

  function addPlayer() {
    const name = capitalizeName(input.trim())
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
            <h1 className="logo">Fars<em>ant</em></h1>
            <p className="logo-sub">El joc de l'engany</p>
          </div>
          <button className="icon-btn" onClick={onOpenSettings} title="Ajustes"><Settings size={16} /></button>
        </div>

        <div className="how-to-play">
          <ol className="how-steps">
            <li>Cada jugador recibe la <strong>misma palabra secreta</strong> en su turno</li>
            <li>El <strong>farsant</strong> no la conoce — debe disimularlo</li>
            <li>Por turnos, dad pistas <strong>sin decir la palabra</strong></li>
            <li>Al final, <strong>votad</strong> quién creéis que es el farsant</li>
          </ol>
        </div>

        <p className="subtitle" style={{ marginTop: '0.75rem' }}>Añade al menos 3 jugadores para empezar</p>

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
              <button className="remove-btn" onClick={() => removePlayer(i)}><X size={13} /></button>
            </li>
          ))}
        </ul>

        {canStart && (
          <p className="settings-summary">
            {settings.numImpostors} impostor{settings.numImpostors > 1 ? 'es' : ''} ·{' '}
            pistas: {settings.hintMode ? 'activadas' : 'desactivadas'}
          </p>
        )}

        <button className="btn btn-primary" style={{ marginTop: '0.75rem' }} disabled={!canStart} onClick={onStart}>
          Iniciar Operación
        </button>
      </div>
    </div>
  )
}
