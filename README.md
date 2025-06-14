🧳 Smart Trip Planner
Ez a projekt egy mobilalkalmazás, amely segít az utazások egyszerű és intelligens megtervezésében. Az alkalmazás React Native (Expo) keretrendszeren fut, a backend Node.js és Express alapú, a MongoDB szolgál adatbázisként, és a Google Places API + Gemini AI biztosítja az intelligens útvonaltervezést.

🚀 Projekt indítása
Backend beállítása (Node.js + Express)
📦 Függőségek telepítése
Telepítse a szükséges függőségeket az alábbi parancs futtatásával:
npm install

▶️ App indítása
Mielőtt elindítaná az alkalmazást, győződjön meg róla, hogy az Android emulátor fut. Ehhez nyissa meg az Android Studio-t és indítsa el az emulátort, ha még nem tette meg.

Ha még nincs emulátora, kövesse az alábbi lépésekben leírt instrukciókat az emulátor létrehozásához.

Az alkalmazás elindításához használja az alábbi parancsot:
npm start
Ez elindítja az Expo fejlesztői szervert, és megnyitja a böngészőt.

Emulátorban futtatás:
A böngészőben megjelenik egy QR-kód. Ha az emulátoron dolgozik, akkor nem szükséges a QR-kódot beolvasni.

Nyomja meg az A billentyűt a terminálban (ha az Android emulátor fut), hogy elindítsa az alkalmazást az emulátoron.

Fontos: A parancs végrehajtása után az alkalmazás automatikusan telepítésre kerül az emulátorra.

📁 Navigáljon a server/ mappába:
cd ./server/

▶️ Backend indítása
A backend indításához futtassa az alábbi parancsot:
node server.js

🧠 Fő technológiák
Frontend: React Native (Expo), React Navigation

Backend: Node.js, Express.js

Adatbázis: MongoDB (Mongoose)

API-k: Google Places API, Gemini AI

📱 Tesztelés Android emulátoron keresztül

1. Android Studio telepítése
   Töltse le az Android Studio legfrissebb verzióját a hivatalos weboldalról, a saját operációs rendszeréhez (Windows / macOS / Linux).

Telepítés:
Indítsa el a telepítőt és kövesse a varázslót.

Válassza ki az alábbi komponenseket (alapértelmezetten kiválasztva):

✅ Android SDK

✅ Android Virtual Device (AVD)

✅ Android SDK Platform-tools

Indítsa el az Android Studio-t, és válassza a Standard setup lehetőséget. Az első indítás után automatikusan megnyílik a Welcome to Android Studio képernyő.

📲 Android emulátor létrehozása

1. Nyissa meg az AVD Manager-t:
   Az Android Studio főképernyőjén válassza ki a felső menüben:

Tools → Device Manager

2. Új emulátor létrehozása:
   Kattintson a Create Device gombra.

Válassza ki a kívánt készüléket (pl. Pixel 6), majd kattintson Next.

3. Rendszerkép (system image) kiválasztása:
   Válassza ki az egyik elérhető Android verziót (ajánlott: API 33 (Android 13) vagy újabb).

Ha nincs letöltve, kattintson a Download gombra.

A letöltés után kattintson Next.

4. Emulátor beállítások:
   Adja meg az emulátor nevét (pl. Pixel6-API33).

Ellenőrizze a beállításokat, majd kattintson Finish.

5. Emulátor indítása:
   Az eszközlistában kattintson a Play ▶️ ikonra az emulátor indításához.
