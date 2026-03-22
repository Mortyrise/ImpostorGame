import { useState } from 'react'
import { Settings, X } from 'lucide-react'
import { useLang } from '../LangContext'
import { B } from '../i18n.jsx'

function capitalizeName(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

export default function SetupScreen({ players, setPlayers, settings, onOpenSettings, onStart }) {
  const [input, setInput] = useState('')
  const { t } = useLang()

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

        <div className="setup-header">
          <div className="logo-block">
            <h1 className="logo">{t.logoName[0]}<em>{t.logoName[1]}</em></h1>
            <p className="logo-sub">{t.logoSub}</p>
          </div>
          <button className="icon-btn" onClick={onOpenSettings} title="Ajustes">
            <Settings size={20} />
          </button>
        </div>

        <p className="word-tagline"><B text={t.wordTagline} /></p>

        <div className="how-to-play">
          <ol className="how-steps">
            <li><span><B text={t.step1} /></span></li>
            <li><span><B text={t.step2} /></span></li>
            <li><span><B text={t.step3} /></span></li>
            <li><span><B text={t.step4} /></span></li>
          </ol>
        </div>

        <p className="subtitle">{t.addHint}</p>

        <div className="input-row">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addPlayer()}
            placeholder={t.playerPlaceholder}
            maxLength={20}
            autoComplete="off"
          />
          <button className="btn btn-secondary" onClick={addPlayer}>{t.addBtn}</button>
        </div>

        <ul className="player-list">
          {players.map((name, i) => (
            <li key={i}>
              <span className="player-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="player-name-text">{name}</span>
              <button className="remove-btn" onClick={() => removePlayer(i)}><X size={15} /></button>
            </li>
          ))}
        </ul>

        {canStart && (
          <p className="settings-summary">
            {t.impostorSummary(settings.numImpostors)} · {t.hintSummary(settings.hintMode)}
          </p>
        )}

        <button className="btn btn-primary" disabled={!canStart} onClick={onStart}>
          {t.startBtn}
        </button>

      </div>
    </div>
  )
}
