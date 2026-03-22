import { createContext, useContext, useState, useEffect } from 'react'
import { LANG } from './i18n.jsx'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('farsant-lang') || 'ca')

  useEffect(() => {
    localStorage.setItem('farsant-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: LANG[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
