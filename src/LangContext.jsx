import { createContext, useContext, useState, useEffect } from 'react'
import { LANG } from './i18n.jsx'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('farsant-lang') || 'ca')
  const [theme, setTheme] = useState(() => localStorage.getItem('farsant-theme') || 'dark')

  useEffect(() => {
    localStorage.setItem('farsant-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    localStorage.setItem('farsant-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: LANG[lang], theme, setTheme, toggleTheme }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
