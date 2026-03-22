import { Theater } from 'lucide-react'
import { useLang } from '../LangContext'

export default function GameScreen({ game, onReset }) {
  const { t } = useLang()
  const impostorNames = game.revealOrder.filter((_, i) => game.impostorIndices.has(i))

  return (
    <div className="screen">
      <div className="container">
        <h2 className="game-on-title">
          {t.gameTitle1}<br/>{t.gameTitle2} <Theater size={22} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </h2>

        <div className="info-card">
          <p className="info-label">{t.firstClue}</p>
          <p className="info-value">{game.startingPlayer}</p>
        </div>

        <p className="game-on-desc">
          {t.gameDesc(impostorNames.length > 1)}
        </p>

        <button className="btn btn-primary" onClick={onReset}>{t.newGame}</button>
      </div>
    </div>
  )
}
