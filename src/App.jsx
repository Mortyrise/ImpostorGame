import { useState } from 'react'
import { WORDS } from './data/words'
import SetupScreen from './screens/SetupScreen'
import SettingsScreen from './screens/SettingsScreen'
import RevealScreen from './screens/RevealScreen'
import GameScreen from './screens/GameScreen'

/**
 * Weighted random impostor selection.
 *
 * weights[name] = games since this player was last impostor (higher = more likely to be picked).
 * Players not yet in the map are treated as having the highest weight (never been impostor).
 *
 * This prevents "7 times in a row" without creating a detectable rotation pattern:
 * the selection is still random — recent impostors just have lower probability, not zero.
 */
function pickWeightedImpostors(players, count, weights) {
  const maxKnown = Math.max(0, ...Object.values(weights))
  const neverBeenW = maxKnown + 2 // players who've never been impostor get a big boost

  // Build pool with adjusted weights (+1 so nobody has 0 probability)
  const pool = players.map((name, i) => ({
    i,
    w: (weights[name] ?? neverBeenW) + 1,
  }))

  const selected = new Set()
  const avail = [...pool]

  while (selected.size < count && avail.length > 0) {
    const total = avail.reduce((s, p) => s + p.w, 0)
    let r = Math.random() * total
    let picked = avail[avail.length - 1] // fallback in case of float rounding
    for (let j = 0; j < avail.length; j++) {
      r -= avail[j].w
      if (r <= 0) { picked = avail[j]; break }
    }
    selected.add(picked.i)
    avail.splice(avail.indexOf(picked), 1)
  }

  return selected
}

export default function App() {
  const [screen, setScreen] = useState('setup')
  const [players, setPlayers] = useState([])
  const [settings, setSettings] = useState({ numImpostors: 1, hintMode: false })
  const [game, setGame] = useState(null)
  // weights[name] = games since last was impostor. Persists across games.
  const [playerWeights, setPlayerWeights] = useState({})

  function handleStartGame() {
    const shuffled = [...players].sort(() => Math.random() - 0.5)
    const entry = WORDS[Math.floor(Math.random() * WORDS.length)]

    // Restrict weights to current players only (handles player list changes between games)
    const currentWeights = Object.fromEntries(
      players.map(name => [name, playerWeights[name] ?? 0])
    )
    const impostorIndices = pickWeightedImpostors(shuffled, settings.numImpostors, currentWeights)

    // Update weights: +1 for everyone, reset to 0 for whoever was just picked
    const newImpostors = new Set([...impostorIndices].map(i => shuffled[i]))
    const updatedWeights = Object.fromEntries(
      players.map(name => [name, newImpostors.has(name) ? 0 : (currentWeights[name] + 1)])
    )
    setPlayerWeights(updatedWeights)

    const nonImpostors = shuffled.filter((_, i) => !impostorIndices.has(i))
    const startingPlayer =
      nonImpostors[Math.floor(Math.random() * nonImpostors.length)] ?? shuffled[0]

    setGame({
      word: entry.word,
      hint: entry.hint,
      hintMode: settings.hintMode,
      impostorIndices,
      revealOrder: shuffled,
      currentReveal: 0,
      startingPlayer,
    })
    setScreen('reveal')
  }

  function handleNextReveal() {
    const next = game.currentReveal + 1
    if (next >= game.revealOrder.length) {
      setScreen('game')
    } else {
      setGame(prev => ({ ...prev, currentReveal: next }))
    }
  }

  function handleReset() {
    setGame(null)
    setScreen('setup')
    // playerWeights intentionally kept — fairness persists across games
  }

  return (
    <>
      {screen === 'setup' && (
        <SetupScreen
          players={players}
          setPlayers={setPlayers}
          settings={settings}
          onOpenSettings={() => setScreen('settings')}
          onStart={handleStartGame}
        />
      )}
      {screen === 'settings' && (
        <SettingsScreen
          settings={settings}
          setSettings={setSettings}
          playerCount={players.length}
          onBack={() => setScreen('setup')}
        />
      )}
      {screen === 'reveal' && game && (
        <RevealScreen game={game} onNext={handleNextReveal} />
      )}
      {screen === 'game' && game && (
        <GameScreen game={game} onReset={handleReset} />
      )}
    </>
  )
}
