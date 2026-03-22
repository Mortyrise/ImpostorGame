import { useState } from 'react'
import { Settings, X } from 'lucide-react'
import { useLang } from '../LangContext'
import { B } from '../i18n.jsx'

function capitalizeName(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

const LANGS = [
  { code: 'ca', label: 'CA' },
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
]

export default function SetupScreen({ players, setPlayers, settings, onOpenSettings, onStart }) {
  const [input, setInput] = useState('')
  const { t, lang, setLang } = useLang()

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
            <p className="logo-sub">{t.logoSub}</p>
          </div>
          <div className="header-actions">
            <div className="lang-switcher">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  className={`lang-btn${lang === code ? ' active' : ''}`}
                  onClick={() => setLang(code)}
                >
                  {label}
                </button>
              ))}
            </div>
            <button className="icon-btn" onClick={onOpenSettings} title="Ajustes"><Settings size={16} /></button>
          </div>
        </div>

        <div className="how-to-play">
          <ol className="how-steps">
            <li><B text={t.step1} /></li>
            <li><B text={t.step2} /></li>
            <li><B text={t.step3} /></li>
            <li><B text={t.step4} /></li>
          </ol>
        </div>

        <p className="subtitle" style={{ marginTop: '0.75rem' }}>{t.addHint}</p>

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
              <button className="remove-btn" onClick={() => removePlayer(i)}><X size={13} /></button>
            </li>
          ))}
        </ul>

        {canStart && (
          <p className="settings-summary">
            {t.impostorSummary(settings.numImpostors)} · {t.hintSummary(settings.hintMode)}
          </p>
        )}

        <button className="btn btn-primary" style={{ marginTop: '0.75rem' }} disabled={!canStart} onClick={onStart}>
          {t.startBtn}
        </button>
      </div>
    </div>
  )
}
