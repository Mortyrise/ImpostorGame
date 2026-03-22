import { ChevronRight, Sun, Moon } from 'lucide-react'
import { useLang } from '../LangContext'

const OPTIONS = [
  { code: 'ca', name: 'Català',  sub: "El joc de l'engany" },
  { code: 'es', name: 'Español', sub: 'El juego del engaño' },
  { code: 'en', name: 'English', sub: 'The deception game'  },
]

export default function LangSelectScreen({ onSelect }) {
  const { lang, setLang, theme, toggleTheme } = useLang()

  function pick(code) {
    setLang(code)
    localStorage.setItem('farsant-visited', '1')
    onSelect()
  }

  return (
    <div className="screen">
      <div className="lang-select-container">

        <button className="icon-btn lang-select-theme" onClick={toggleTheme} title="Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="lang-select-logo">
          <h1 className="logo">Fars<em>ant</em></h1>
        </div>

        <div className="lang-select-options">
          {OPTIONS.map(({ code, name, sub }) => (
            <button
              key={code}
              className={`lang-option${lang === code ? ' selected' : ''}`}
              onClick={() => pick(code)}
            >
              <span className="lang-option-code">{code.toUpperCase()}</span>
              <span className="lang-option-text">
                <span className="lang-option-name">{name}</span>
                <span className="lang-option-sub">{sub}</span>
              </span>
              <ChevronRight size={20} className="lang-option-arrow" />
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
