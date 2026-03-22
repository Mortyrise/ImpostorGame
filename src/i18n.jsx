export const LANG = {
  es: {
    logoSub: 'El juego del engaño',
    step1: 'Cada jugador recibe la **misma palabra secreta** en su turno',
    step2: 'El **farsant** no la conoce — debe disimularlo',
    step3: 'Por turnos, dad pistas **sin decir la palabra**',
    step4: 'Al final, **votad** quién creéis que es el farsant',
    addHint: 'Añade al menos 3 jugadores para empezar',
    addBtn: '+ añadir',
    playerPlaceholder: 'Nombre del jugador…',
    startBtn: 'Iniciar partida',
    impostorSummary: (n) => `${n} farsant${n > 1 ? 's' : ''}`,
    hintSummary: (on) => `pistas: ${on ? 'activadas' : 'desactivadas'}`,

    passTo: 'Pasa el dispositivo a',
    imReady: (name) => `Soy ${name}, estoy listo`,
    yourTurn: 'tu turno',
    tapToReveal: 'Toca para ver tu rol',
    youAreThe: 'eres el',
    farsant: 'FARSANT',
    clueLabel: 'pista:',
    accomplice: (n) => `cómplice${n > 1 ? 's' : ''}:`,
    wordIs: 'la palabra es',
    allReady: 'Todos listos →',
    coverScreen: 'Listo, tapar pantalla',

    gameTitle1: '¡El juego',
    gameTitle2: 'empieza!',
    firstClue: 'Empieza con la primera pista',
    gameDesc: (plural) =>
      `Discutid, haced preguntas y votad a quién creéis que es ${plural ? 'uno de los farsants' : 'el farsant'}. El farsant gana si consigue pasar desapercibido.`,
    newGame: 'Nueva partida',

    settingsTitle: 'AJUSTES',
    impostors: 'Farsants',
    maxFor: (max, count) => `máx. ${max} para ${count} jugadores`,
    addPlayersFirst: 'añade jugadores para ajustar',
    hintToFarsant: 'Pista al farsant',
    hintDesc: 'el farsant recibe una pista vaga sobre la categoría de la palabra',
    save: 'Guardar',
  },

  ca: {
    logoSub: "El joc de l'engany",
    step1: 'Cada jugador rep la **mateixa paraula secreta** al seu torn',
    step2: 'El **farsant** no la coneix — ha de dissimular-ho',
    step3: 'Per torns, doneu pistes **sense dir la paraula**',
    step4: 'Al final, **voteu** qui creieu que és el farsant',
    addHint: 'Afegeix almenys 3 jugadors per començar',
    addBtn: '+ afegir',
    playerPlaceholder: 'Nom del jugador…',
    startBtn: 'Iniciar partida',
    impostorSummary: (n) => `${n} farsant${n > 1 ? 's' : ''}`,
    hintSummary: (on) => `pistes: ${on ? 'activades' : 'desactivades'}`,

    passTo: 'Passa el dispositiu a',
    imReady: (name) => `Soc ${name}, estic llest`,
    yourTurn: 'el teu torn',
    tapToReveal: 'Toca per veure el teu rol',
    youAreThe: 'ets el',
    farsant: 'FARSANT',
    clueLabel: 'pista:',
    accomplice: (n) => `còmplice${n > 1 ? 's' : ''}:`,
    wordIs: 'la paraula és',
    allReady: 'Tots a punt →',
    coverScreen: 'Llest, tapeu la pantalla',

    gameTitle1: 'El joc',
    gameTitle2: 'comença!',
    firstClue: 'Comença amb la primera pista',
    gameDesc: (plural) =>
      `Discutiu, feu preguntes i voteu a qui creieu que és ${plural ? 'un dels farsants' : 'el farsant'}. El farsant guanya si aconsegueix passar desapercebut.`,
    newGame: 'Nova partida',

    settingsTitle: 'AJUSTOS',
    impostors: 'Farsants',
    maxFor: (max, count) => `màx. ${max} per a ${count} jugadors`,
    addPlayersFirst: 'afegeix jugadors per ajustar',
    hintToFarsant: 'Pista al farsant',
    hintDesc: 'el farsant rep una pista vaga sobre la categoria de la paraula',
    save: 'Desar',
  },

  en: {
    logoSub: 'The deception game',
    step1: 'Each player receives the **same secret word** on their turn',
    step2: 'The **farsant** doesn\'t know it — they must blend in',
    step3: 'Take turns giving clues **without saying the word**',
    step4: 'At the end, **vote** on who you think is the farsant',
    addHint: 'Add at least 3 players to start',
    addBtn: '+ add',
    playerPlaceholder: 'Player name…',
    startBtn: 'Start game',
    impostorSummary: (n) => `${n} farsant${n > 1 ? 's' : ''}`,
    hintSummary: (on) => `hints: ${on ? 'on' : 'off'}`,

    passTo: 'Pass the device to',
    imReady: (name) => `I'm ${name}, ready`,
    yourTurn: 'your turn',
    tapToReveal: 'Tap to reveal your role',
    youAreThe: 'you are the',
    farsant: 'FARSANT',
    clueLabel: 'clue:',
    accomplice: (n) => `accomplice${n > 1 ? 's' : ''}:`,
    wordIs: 'the word is',
    allReady: 'Everyone ready →',
    coverScreen: 'Ready, cover screen',

    gameTitle1: 'The game',
    gameTitle2: 'begins!',
    firstClue: 'Start with the first clue',
    gameDesc: (plural) =>
      `Discuss, ask questions and vote on who you think is ${plural ? 'one of the farsants' : 'the farsant'}. The farsant wins if they avoid detection.`,
    newGame: 'New game',

    settingsTitle: 'SETTINGS',
    impostors: 'Farsants',
    maxFor: (max, count) => `max. ${max} for ${count} players`,
    addPlayersFirst: 'add players to adjust',
    hintToFarsant: 'Hint to farsant',
    hintDesc: 'the farsant receives a vague hint about the word\'s category',
    save: 'Save',
  },
}

/** Renders a translation string with **bold** markers as <strong> */
export function B({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}
