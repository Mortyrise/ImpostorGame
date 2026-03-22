import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { useLang } from '../LangContext'

const LANG_OPTIONS = [
  { code: 'ca', label: 'CA' },
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
]

function maxImpostors(playerCount) {
  return Math.max(1, Math.floor(playerCount / 3))
}

export default function SettingsScreen({ settings, setSettings, playerCount, onBack }) {
  const { t, lang, setLang, theme, setTheme } = useLang()
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
          <button className="icon-btn" onClick={onBack}><ArrowLeft size={20} /></button>
          <h2 className="settings-title">{t.settingsTitle}</h2>
          <div style={{ width: 46 }} />
        </div>

        {/* ── Idioma ── */}
        <div className="settings-section">
          <div className="setting-row">
            <div className="setting-text">
              <p className="setting-label">{t.langSection}</p>
            </div>
            <div className="seg-control">
              {LANG_OPTIONS.map(({ code, label }) => (
                <button
                  key={code}
                  className={`seg-btn${lang === code ? ' active' : ''}`}
                  onClick={() => setLang(code)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Apariencia ── */}
        <div className="settings-section">
          <div className="setting-row">
            <div className="setting-text">
              <p className="setting-label">{t.themeLabel}</p>
            </div>
            <div className="seg-control">
              <button
                className={`seg-btn${theme === 'dark' ? ' active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <Moon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                {t.themeDark}
              </button>
              <button
                className={`seg-btn${theme === 'light' ? ' active' : ''}`}
                onClick={() => setTheme('light')}
              >
                <Sun size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                {t.themeLight}
              </button>
            </div>
          </div>
        </div>

        {/* ── Juego ── */}
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
