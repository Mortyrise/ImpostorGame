import { ArrowLeft } from 'lucide-react'
import { useLang } from '../LangContext'

function maxImpostors(playerCount) {
  return Math.max(1, Math.floor(playerCount / 3))
}

export default function SettingsScreen({ settings, setSettings, playerCount, onBack }) {
  const { t } = useLang()
  const max = maxImpostors(playerCount)

  function setNum(n) {
    setSettings(prev => ({ ...prev, numImpostors: Math.max(1, Math.min(n, max)) }))
  }

  function toggleHint() {
    setSettings(prev => ({ ...prev, hintMode: !prev.hintMode }))
  }

  return (
    <div className="screen">
      <div className="container">
        <div className="row-between">
          <button className="icon-btn" onClick={onBack}><ArrowLeft size={16} /></button>
          <h2 className="settings-title">{t.settingsTitle}</h2>
          <div style={{ width: 36 }} />
        </div>

        <div className="settings-section">

          <div className="setting-row">
            <div className="setting-text">
              <p className="setting-label">{t.impostors}</p>
              <p className="setting-desc">
                {playerCount >= 3
                  ? t.maxFor(max, playerCount)
                  : t.addPlayersFirst}
              </p>
            </div>
            <div className="stepper">
              <button
                className="stepper-btn"
                onClick={() => setNum(settings.numImpostors - 1)}
                disabled={settings.numImpostors <= 1}
              >−</button>
              <span className="stepper-value">{settings.numImpostors}</span>
              <button
                className="stepper-btn"
                onClick={() => setNum(settings.numImpostors + 1)}
                disabled={settings.numImpostors >= max}
              >+</button>
            </div>
          </div>

          <div className="divider" />

          <div className="setting-row">
            <div className="setting-text">
              <p className="setting-label">{t.hintToFarsant}</p>
              <p className="setting-desc">{t.hintDesc}</p>
            </div>
            <button
              className={`toggle ${settings.hintMode ? 'toggle-on' : ''}`}
              onClick={toggleHint}
              aria-label="Activar pistas"
            >
              <span className="toggle-thumb" />
            </button>
          </div>

        </div>

        <button className="btn btn-primary" onClick={onBack}>{t.save}</button>
      </div>
    </div>
  )
}
