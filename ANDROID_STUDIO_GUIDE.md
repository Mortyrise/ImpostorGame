# Guía: De Android Studio a Google Play Store — Farsant

## 1. Instalación de Android Studio

1. Descarga Android Studio desde https://developer.android.com/studio
2. Ejecuta el instalador (siguiente, siguiente, siguiente — deja todo por defecto)
3. En la primera apertura te pedirá descargar el **Android SDK** — acepta y espera (puede tardar ~10 min)
4. Cuando termine, llegarás a la pantalla de bienvenida "Welcome to Android Studio"

> **Espacio en disco:** Android Studio + SDK ocupa ~8-10 GB. Asegúrate de tener espacio.

---

## 2. Abrir el proyecto Farsant

**Opción A — Desde terminal:**
```bash
cd C:\Users\joanm\Documents\ImpostorGame
npm run android
```
Esto hace build + sync + abre Android Studio automáticamente.

**Opción B — Desde Android Studio:**
1. En la pantalla de bienvenida, haz clic en **"Open"**
2. Navega hasta `C:\Users\joanm\Documents\ImpostorGame\android`
3. Selecciona la carpeta `android` (NO la raíz del proyecto) y haz clic en **OK**

---

## 3. Primera vez: Gradle sync

Al abrir el proyecto por primera vez:

1. Android Studio mostrará abajo una barra de progreso: **"Gradle sync"**
2. Puede tardar 2-5 minutos — está descargando dependencias
3. Si pide instalar algún SDK o build tools, acepta (aparece un link azul en la barra de errores)
4. Espera hasta que la barra diga **"Gradle sync finished"** o desaparezca

> **Si falla el sync:** normalmente es porque falta una versión del SDK. Android Studio te mostrará un enlace "Install missing SDK" — haz clic y acepta.

---

## 4. Probar la app (opcional pero recomendado)

### Opción A — Emulador (sin móvil físico)

1. Ve a **Tools → Device Manager** (panel derecho)
2. Haz clic en **"Create Virtual Device"**
3. Selecciona un modelo (p.ej. **Pixel 7**) → Next
4. Elige una imagen del sistema (p.ej. **API 34** / Android 14) → haz clic en el icono de descarga si no está instalada → Next → Finish
5. En la barra superior, selecciona el emulador en el desplegable de dispositivos
6. Haz clic en el botón **▶ Run** (triángulo verde) o pulsa `Shift + F10`
7. El emulador arranca (la primera vez tarda ~1-2 min) y la app se instala

### Opción B — Móvil físico

1. En tu Android, ve a **Ajustes → Acerca del teléfono** → toca 7 veces en **"Número de compilación"** (activa Opciones de desarrollador)
2. Ve a **Ajustes → Opciones de desarrollador** → activa **"Depuración USB"**
3. Conecta el móvil por USB al PC
4. Acepta el diálogo "¿Permitir depuración USB?" en el móvil
5. En Android Studio, tu dispositivo aparecerá en el desplegable superior
6. Haz clic en **▶ Run**

---

## 5. Generar el AAB para publicar

El AAB (Android App Bundle) es el formato que Google Play exige.

### Paso 5.1 — Crear una clave de firma

La clave de firma es tu identidad como desarrollador. **Si la pierdes, no podrás actualizar la app nunca más.** Guárdala bien.

1. En Android Studio: **Build → Generate Signed Bundle / APK...**
2. Selecciona **Android App Bundle** → Next
3. En "Key store path", haz clic en **"Create new..."**
4. Rellena el formulario:

| Campo | Qué poner |
|-------|-----------|
| **Key store path** | Elige una ubicación FUERA del proyecto, p.ej. `C:\Users\joanm\keystores\farsant.jks` |
| **Password** | Una contraseña segura (apúntala) |
| **Alias** | `farsant` |
| **Key password** | Puede ser la misma |
| **Validity (years)** | `25` (por defecto) |
| **First and Last Name** | Tu nombre |
| **Organization** | `Mortyrise` (o lo que quieras) |
| Los demás campos | Opcionales, puedes dejarlos vacíos |

5. Haz clic en **OK**

> **IMPORTANTE:** Haz backup de `farsant.jks` y las contraseñas en un lugar seguro (un gestor de contraseñas, un disco externo, etc.). Sin esta clave no se puede actualizar la app en la Play Store.

### Paso 5.2 — Generar el bundle

1. Tras crear la clave, vuelves al diálogo anterior con los campos rellenados
2. Haz clic en **Next**
3. Selecciona **release** como build variant
4. Haz clic en **Create**
5. Espera al build (~1-2 min)
6. Cuando termine, aparece una notificación abajo: **"Build completed successfully"** con un link **"locate"** — haz clic para ver el archivo

El AAB estará en:
```
ImpostorGame/android/app/release/app-release.aab
```

---

## 6. Crear cuenta de Google Play Developer

1. Ve a https://play.google.com/console
2. Inicia sesión con tu cuenta de Google
3. Paga la cuota única de **25 USD**
4. Completa los datos del perfil de desarrollador (nombre, email de contacto, etc.)
5. La verificación de identidad puede tardar **24-48 horas**

---

## 7. Publicar la app en Google Play

### Paso 7.1 — Crear la app

1. En Play Console, haz clic en **"Crear app"**
2. Rellena:
   - **Nombre:** Farsant
   - **Idioma predeterminado:** Español (o Catalán)
   - **App o juego:** Juego
   - **Gratis o de pago:** Gratis
3. Acepta las declaraciones y haz clic en **Crear app**

### Paso 7.2 — Ficha de la tienda

Ve a **Presencia en Google Play → Ficha de Play Store principal** y rellena:

| Campo | Qué poner |
|-------|-----------|
| **Nombre de la app** | Farsant |
| **Descripción breve** (80 chars) | El juego del impostor para grupos. Descubre al farsant! |
| **Descripción completa** (4000 chars) | Descripción detallada del juego, reglas, etc. |
| **Icono** | Sube el `farsant_icon_512.png` |
| **Gráfico de función** | Imagen de 1024x500 px (banner promocional) |
| **Screenshots** | Mínimo 2 capturas de pantalla del juego (haz screenshots desde el emulador) |

> **Hacer screenshots desde el emulador:** con la app corriendo en el emulador, haz clic en el icono de cámara 📷 en la barra lateral del emulador. Se guardan en tu escritorio.

### Paso 7.3 — Clasificación de contenido

1. Ve a **Política → Clasificación de contenido**
2. Rellena el cuestionario (es un juego social sin violencia ni compras — la clasificación será PEGI 3 / Everyone)
3. Guarda y aplica

### Paso 7.4 — Configuración de la app

En el menú lateral, ve completando las secciones marcadas con ⚠️:

- **Política de privacidad** — Necesitas una URL pública. Si no tienes, puedes generar una básica en https://www.privacypolicygenerator.info/ y hostearla en GitHub Pages o en tu Vercel
- **Anuncios** — Selecciona "No contiene anuncios"
- **Acceso a la app** — "Toda la funcionalidad está disponible sin restricciones"
- **Target audience** — Selecciona +13 (no es para menores sin supervisión)

### Paso 7.5 — Subir el AAB

1. Ve a **Versión → Producción**
2. Haz clic en **"Crear nueva versión"**
3. En "App Signing by Google Play" — acepta (Google gestiona la firma de distribución)
4. Haz clic en **"Subir"** y selecciona el archivo `app-release.aab`
5. Espera a que lo procese
6. Añade las **notas de la versión** (p.ej. "Primera versión de Farsant — el juego del impostor para grupos")
7. Haz clic en **"Revisar versión"** → **"Iniciar lanzamiento a producción"**

### Paso 7.6 — Esperar revisión

- Google revisa la app manualmente antes de publicarla
- Primera vez: puede tardar **3-7 días**
- Actualizaciones posteriores: normalmente **unas horas**
- Recibirás un email cuando esté aprobada (o si hay problemas)

---

## 8. Actualizar la app en el futuro

Cada vez que hagas cambios en el código web:

```bash
# 1. Build + sync
npm run build
npx cap sync android

# 2. Abrir en Android Studio
npx cap open android
```

3. En Android Studio: **Build → Generate Signed Bundle / APK...**
4. Usa la misma clave `.jks` que creaste antes
5. **IMPORTANTE:** Antes de generar, incrementa la versión en `android/app/build.gradle`:
   - `versionCode` → incrementa en 1 (p.ej. 1 → 2 → 3...)
   - `versionName` → el número visible (p.ej. "1.0" → "1.1")
6. Genera el AAB y súbelo a Play Console como nueva versión

---

## Resumen visual del flujo

```
Código React (src/)
       │
       ▼
  npm run build        ← genera dist/
       │
       ▼
  npx cap sync         ← copia dist/ al proyecto Android
       │
       ▼
  Android Studio       ← compila el proyecto nativo
       │
       ▼
  app-release.aab      ← el paquete firmado
       │
       ▼
  Google Play Console   ← subes el .aab y publicas
```

---

## Troubleshooting común

| Problema | Solución |
|----------|----------|
| Gradle sync falla | Haz clic en "Install missing SDK" o ve a **File → Settings → SDK Manager** e instala el API level que pide |
| "SDK location not found" | Ve a **File → Project Structure → SDK Location** y apunta al SDK de Android (normalmente `C:\Users\joanm\AppData\Local\Android\Sdk`) |
| La app se ve en blanco | Asegúrate de haber hecho `npm run build` y `npx cap sync` antes de correr en Android Studio |
| El emulador va muy lento | Activa la virtualización (VT-x/AMD-V) en la BIOS de tu PC. En WSL2 puede dar problemas — usa un móvil físico en ese caso |
| "INSTALL_FAILED_UPDATE_INCOMPATIBLE" | Desinstala la app del emulador/móvil y vuelve a instalar |
| Build falla con "minSdk" | Revisa `android/app/build.gradle` → `minSdkVersion` debe ser al menos 22 |
