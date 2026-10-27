# Farsant — Google Play listing

Everything needed to fill in Play Console. Images live next to this file:
`graphics/icon-512.png`, `graphics/feature-<lang>.png` (1024×500) and
`screenshots/<lang>/*.png` (1080×1920, upload in filename order).

Default language: **es-ES**. Translations: **ca**. English (`en-US`) is ready
below but hold it back until the secret words are translated: today the words
in `src/data/words.js` are Spanish-only, so an English player would get
Spanish words.

Privacy policy URL: `https://farsant.vercel.app/privacy.html` (from `public/privacy.html`).

---

## es-ES

**Nombre (≤30):** Farsant: el juego del impostor

**Descripción breve (≤80):**
Descubre quién es el impostor. Juego de grupo con un solo móvil, sin internet.

**Descripción completa:**
Farsant es el juego del impostor para jugar en grupo con un solo móvil.

Todos los jugadores reciben la misma palabra secreta… menos el farsant, que no la conoce y tiene que disimular. Por turnos, cada uno da una pista sin decir la palabra. Al final, votad quién creéis que es el farsant. ¿Conseguirá pasar desapercibido?

CÓMO SE JUEGA
• Añade a los jugadores (mínimo 3).
• Pasa el móvil: cada uno ve su rol en secreto.
• Dad pistas por turnos sin decir la palabra.
• Debatid y votad al farsant.

CARACTERÍSTICAS
• Un solo dispositivo para todo el grupo.
• Uno o varios farsants por partida.
• Modo pista: el farsant recibe una pista vaga para que lo tenga más fácil.
• Las palabras no se repiten hasta haberlas jugado todas.
• Reparto de roles equilibrado: no siempre le toca al mismo.
• En castellano, catalán e inglés. Tema claro y oscuro.
• Sin anuncios, sin registro y sin conexión a internet.

Ideal para fiestas, cenas, viajes y quedadas con amigos o en familia.

---

## ca

**Nom (≤30):** Farsant: el joc de l'impostor

**Descripció breu (≤80):**
Descobreix qui és l'impostor. Joc de grup amb un sol mòbil, sense internet.

**Descripció completa:**
Farsant és el joc de l'impostor per jugar en grup amb un sol mòbil.

Tots els jugadors reben la mateixa paraula secreta… menys el farsant, que no la coneix i ha de dissimular. Per torns, cadascú dona una pista sense dir la paraula. Al final, voteu qui creieu que és el farsant. Aconseguirà passar desapercebut?

COM ES JUGA
• Afegeix els jugadors (mínim 3).
• Passa el mòbil: cadascú veu el seu rol en secret.
• Doneu pistes per torns sense dir la paraula.
• Debateu i voteu el farsant.

CARACTERÍSTIQUES
• Un sol dispositiu per a tot el grup.
• Un o diversos farsants per partida.
• Mode pista: el farsant rep una pista vaga perquè ho tingui més fàcil.
• Les paraules no es repeteixen fins haver-les jugat totes.
• Repartiment de rols equilibrat: no sempre li toca al mateix.
• En català, castellà i anglès. Tema clar i fosc.
• Sense anuncis, sense registre i sense connexió a internet.

Ideal per a festes, sopars, viatges i trobades amb amics o en família.

---

## en-US (hold until words are translated)

**Title (≤30):** Farsant: the impostor game

**Short description (≤80):**
Find out who the impostor is. Party game on one phone, works offline.

**Full description:**
Farsant is the impostor party game you play as a group on a single phone.

Everyone gets the same secret word… except the farsant, who doesn't know it and has to blend in. Take turns giving a clue without saying the word. At the end, vote on who you think the farsant is. Will they get away with it?

HOW TO PLAY
• Add the players (3 or more).
• Pass the phone: everyone sees their role in secret.
• Take turns giving clues without saying the word.
• Discuss and vote for the farsant.

FEATURES
• One device for the whole group.
• One or several farsants per game.
• Hint mode: the farsant gets a vague clue to make it fairer.
• Words don't repeat until you've played them all.
• Balanced roles: it won't always be the same person.
• Catalan, Spanish and English. Light and dark theme.
• No ads, no sign-up, no internet needed.

Great for parties, dinners, trips and game nights with friends or family.

---

## Play Console forms

**App category:** Game → Party (alt: Word). Free. No ads → "No, my app does not contain ads".

**App access:** All functionality is available without special access.

**Data safety:**
- Does your app collect or share any of the required user data types? → **No**
  (player names, settings and progress stay in on-device storage and are never
  transmitted; on-device-only data does not count as "collected").
- Encrypted in transit / deletion request → not applicable.

**Content rating (IARC questionnaire):** category "Game". Answer **No** to
violence, sexuality, language, controlled substances, gambling, user
interaction/chat, sharing location, digital purchases. Expected result:
PEGI 3 / Everyone.

**Target audience and content:** ages **13–15, 16–17, 18+**. Do not tick
under-13 groups: that enrols the app in the Families policy, which adds
extra review requirements for no benefit here.

**News app:** No. **Government app:** No. **Financial features:** None.
**Health:** None. **COVID-19 tracing:** No.

## Releasing an update

1. Bump `versionCode` (+1) and `versionName` in `android/app/build.gradle`.
2. `npm run android:aab` (on Windows; needs `JAVA_HOME` = Android Studio's `jbr`).
3. Upload `android/app/build/outputs/bundle/release/app-release.aab`.

Signing: upload key at `C:\Users\joanm\keystores\farsant-upload.jks`, passwords
in `C:\Users\joanm\keystores\farsant-keystore.properties` (outside the repo).
Google Play App Signing holds the real app key; if the upload key is lost it
can be reset from Play Console → Setup → App signing.
