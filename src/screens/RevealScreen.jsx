import { useState, useEffect } from 'react'
import { Hand } from 'lucide-react'
import { useLang } from '../LangContext'

export default function RevealScreen({ game, onNext }) {
  const [revealed, setRevealed] = useState(false)
  const [passing, setPassing] = useState(false)
  const { t } = useLang()

  const { revealOrder, currentReveal, impostorIndices, word, hint, hintMode } = game

  const currentPlayer = revealOrder[currentReveal]
  const nextPlayer    = revealOrder[currentReveal + 1]
  const isImpostor    = impostorIndices.has(currentReveal)
  const isLast        = currentReveal === revealOrder.length - 1

  const coImpostors = isImpostor
    ? revealOrder.filter((_, i) => i !== currentReveal && impostorIndices.has(i))
    : []

  useEffect(() => {
    setRevealed(false)
    setPassing(false)
  }, [currentReveal])

  function handleDone() {
    if (isLast) {
      onNext()
    } else {
      setPassing(true)
    }
  }

  if (passing) {
    return (
      <div className="screen">
        <div className="container">
          <div className="passing-screen">
            <p className="pass-to-label">{t.passTo}</p>
            <h2 className="pass-to-name">{nextPlayer}</h2>
            <button className="btn btn-primary" onClick={onNext}>
              {t.imReady(nextPlayer)}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="container">

        <div className="progress-bar">
          {revealOrder.map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${i < currentReveal ? 'done' : i === currentReveal ? 'current' : ''}`}
            />
          ))}
        </div>

        <p className="turn-label">{t.yourTurn}</p>
        <h2 className="player-name">{currentPlayer}</h2>

        <div
          className={`card ${revealed ? 'card-revealed' : 'card-hidden'}`}
          onClick={() => !revealed && setRevealed(true)}
        >
          <div className="card-front">
            <span className="tap-icon"><Hand size={36} /></span>
            <span className="tap-hint">{t.tapToReveal}</span>
          </div>
          <div className="card-back">
            {isImpostor ? (
              <>
                <p className="role-label">{t.youAreThe}</p>
                <p className="role-word is-impostor">{t.farsant}</p>
                {hintMode && hint && (
                  <p className="role-hint">{t.clueLabel} {hint}</p>
                )}
                {coImpostors.length > 0 && (
                  <p className="role-hint accomplice">
                    {t.accomplice(coImpostors.length)} {coImpostors.join(', ')}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="role-label">{t.wordIs}</p>
                <p className="role-word">{word}</p>
              </>
            )}
          </div>
        </div>

        {revealed && (
          <button className="btn btn-primary" onClick={handleDone}>
            {isLast ? t.allReady : t.coverScreen}
          </button>
        )}

      </div>
    </div>
  )
}
