import { Theater } from 'lucide-react'

export default function GameScreen({ game, onReset }) {
  const impostorNames = game.revealOrder.filter((_, i) => game.impostorIndices.has(i))

  return (
    <div className="screen">
      <div className="container">
        <h2 className="game-on-title">¡El juego<br/>empieza! <Theater size={22} style={{ display: 'inline', verticalAlign: 'middle' }} /></h2>

        <div className="info-card">
          <p className="info-label">Empieza con la primera pista</p>
          <p className="info-value">{game.startingPlayer}</p>
        </div>

        <p className="game-on-desc">
          Discutid, haced preguntas y votad a quién creéis que es{' '}
          {impostorNames.length > 1 ? 'uno de los impostores' : 'el impostor'}.
          El impostor gana si consigue pasar desapercibido.
        </p>

        <button className="btn btn-primary" onClick={onReset}>Nueva partida</button>
      </div>
    </div>
  )
}
