# Athletic Training Manager

Applicazione web locale per gestire atlete, allenamenti e fisioterapia.

## Come aprire l'app

1. Scarica o clona il progetto
2. Apri il file `index.html` nel browser
3. L'app funziona localmente e salva i dati nel browser del tuo computer

## Funzioni principali

- Gerarchia uniforme dei filtri in tutte le aree principali della piattaforma: ordine standardizzato da sinistra a destra `[ SQUADRA ]` ➡️ `[ ATLETA ]` ➡️ `[ DATA DA ]` ➡️ `[ DATA A ]` applicato su Registro Presenze, Area Atletica (Dashboard e Allenamenti), Area Tecnica, Area Psicologica, Area Fisioterapica e Report generale. La selezione della squadra aggiorna dinamicamente l'elenco delle atlete mostrando solo i componenti del gruppo scelto (o tutti se impostato su "Tutte le squadre")
- Gestione atlete con selezione di squadra (U19/17, U15, U14, U13, Scuola di Pallavolo) e ruolo
- Ordinamento alfabetico per cognome (formato Cognome Nome) in tutte le viste dell'applicazione: menu a tendina, schede atlete, tabella presenze ed esportazioni
- Registro allenamenti filtrabile per atleta e intervallo date (Da–A); la data del singolo allenamento resta selezionata nel modulo di inserimento
- Nel modulo Aggiungi atleta la rosa registrata è selezionabile da elenco in ordine alfabetico per cognome; scegliere un'atleta esistente apre i suoi dati per la modifica senza creare duplicati, mentre l'opzione dedicata consente di aggiungere un nuovo nominativo (Cognome e Nome)
- Rosa iniziale con i 51 nominativi forniti per U19/17 (20 atlete), U15 (16) e U14 (15), tutti standardizzati nel formato Cognome Nome e ordinati alfabeticamente per cognome; U13 e Scuola di Pallavolo sono disponibili per nuove atlete
- Registrazione allenamenti con:
  - data
  - atleta e squadra
  - selezione esercizio da elenco
  - serie
  - ripetizioni
  - peso
  - inserimento alleggerito: recupero, TL e volume per serie non sono mostrati durante la compilazione ma vengono calcolati e salvati automaticamente, restando disponibili nei filtri dell'Area Atletica e nei report
  - riepilogo in tempo reale del volume totale
- Modifica di allenamenti e trattamenti fisioterapici già salvati
- Area Tecnica con filtri per atleta e periodo, KPI e grafici predisposti per i dati partita, raggruppati in SIDE OUT (ricezione, attacco e alzate positive) e BREAK POINT (muro e battuta); l'inserimento manuale è stato rimosso e il collegamento al database online è in attesa della relativa API
- Registro Presenze per allenamenti e gare:
  - filtro squadra in "Registra sessione" (Tutte le squadre, U19/17, U15, U14, U13, SCUOLA DI PALLAVOLO) per visualizzare e compilare solo le atlete del gruppo interessato
  - stato presenza e motivazione facoltativa dell'assenza
  - indicazione della squadra della sessione nello storico
  - riepilogo percentuale presenze/assenze e grafico ad anello con filtri per atleta e periodo date Dal/Al
- Sezione fisioterapia con filtri per atleta e intervallo date:
  - selezione strutturata di articolazioni e distretti muscolari
  - classificazione della causa tra traumatologica e overuse
  - selezione del trattamento e note cliniche
  - punteggi obbligatori del dolore a riposo, durante e dopo l'allenamento (1-10)
  - minuti di allenamento senza dolore
  - mappa corporea interattiva fronte/retro per distretto (il grafico temporale del dolore per trattamento è stato rimosso per alleggerire la vista)
  - esercizi consigliati
  - data controllo
- Dashboard performance con filtri per atleta, esercizio evidenziato e intervallo date
- Grafici simultanei di training load, 1RM stimato e carico reale per singola seduta per Squat, Stacco da terra, Push Press, TRX, Panca Piana e Affondi
- KPI di training load; l'1RM è stimato con la formula di Epley (carico × (1 + ripetizioni / 30); una singola ripetizione usa il carico registrato), non è un massimale misurato
- Analisi fisioterapica con filtri per squadra, atleta e intervallo date, conteggio completo per distretto (incluso lato DX/SX) e mappa corporea interattiva con scala del dolore
- Dashboard REPORT generale con filtro condiviso per atleta e periodo e riepiloghi per area generale, atletica, tecnica, psicologa e fisioterapica; l'Area Atletica riporta i grafici 1RM stimato e carico reale di Squat, Stacco da terra e Push Press
- Area Psicologia con filtri per atleta e data e grafico a barre iPPS-48 sulle 8 dimensioni; le rilevazioni importate sono rappresentate come `psychologicalAssessments[]` con `athleteId`, `date` e `scores` (`confidence`, `goalSetting`, `selfTalk`, `mentalPractice`, `emotionalArousalControl`, `competitionPreparation`, `worry`, `concentrationDisruption`)
- Esportazione della Dashboard REPORT generale in Excel (.xls) e stampa/salvataggio PDF in orizzontale, con impaginazione professionale a schede, logo dell'app e spazio per la foto dell'atleta (foto facoltativa, usata solo temporaneamente durante la sessione)
- Export Excel (.xls) e stampa/PDF della dashboard performance e della sezione fisioterapia; il report fisioterapico include il riepilogo per distretto, tutti i trattamenti e ogni singola valutazione del dolore
- Riepilogo Fisio con il numero dei trattamenti fino alla data selezionata, conteggio per parte anatomica e grafico mensile
- Logo ChorusLife Volley Bergamo Academy
- Grafici di progresso
- Export CSV con dati di allenamento, fisioterapia, Area Tecnica e Registro Presenze
- Esportazione Excel compatibile (.xls) dei dati e delle serie della dashboard
- Stampa di report o dashboard dal browser, con possibilità di salvarli in PDF

## Nota

Questa è una versione iniziale, pronta per essere usata e facilmente estendibile.

## Struttura dei dati

L'app usa `localStorage` (non un database server) e salva gli oggetti nel documento `athletic_training_manager_v3`:

- `athletes[]`: `id`, `name`, `squad`, data di nascita, ruolo e note.
- `workouts[]`: `id`, `athleteId`, `date`, note e `exercises[]`; ogni esercizio conserva `id`, `name`, `sets`, `reps`, `weight` (kg per serie) e `rest` (minuti). Il carico reale usa `weight`, il training load è calcolato come `sets × reps × weight` e l'1RM stimato usa Epley. L'analisi mantiene un dato per ogni riga esercizio di ogni seduta, anche con più record nella stessa data.
- `physio[]`: `id`, `athleteId`, `date`, `bodyPart`, `bodySide`, `causeCategory`, `cause`, `treatmentType`, `treatment`, esercizi consigliati, follow-up e note; contiene inoltre `painRest`, `painTraining`, `painAfter` (interi 1-10) e `painFreeMinutes`.
- `attendanceSessions[]`: `id`, data, tipo (`Allenamento` o `Gara`), descrizione facoltativa e stato (`Presente`/`Assente`) per atleta, con motivazione facoltativa. Le percentuali sono calcolate sul totale degli stati registrati; senza sessioni il riepilogo mostra 0%.
- `psychologicalAssessments[]`: `athleteId`, `date` e `scores` con i punteggi iPPS-48 per `confidence`, `goalSetting`, `selfTalk`, `mentalPractice`, `emotionalArousalControl`, `competitionPreparation`, `worry` e `concentrationDisruption`. Il grafico visualizza l'ultima rilevazione compatibile con l'atleta selezionata; con una data selezionata e piu atlete presenti, richiede la selezione di una singola atleta.

Al primo aggiornamento, i profili "Atleta Demo" e i relativi dati dimostrativi vengono sostituiti con la rosa iniziale; eventuali altre atlete e i relativi dati restano invariati.

I dati dell'Area Tecnica non vengono letti da `localStorage`: KPI e grafici resteranno vuoti finché non sarà configurato il collegamento al database online e definita la relativa API.

I trattamenti preesistenti restano disponibili, ma non avendo le nuove scale del dolore non vengono inclusi nello storico del dolore o nella mappa finché non sono aggiornati.

## Dati e privacy

I dati sono salvati in `localStorage` nel browser e non vengono sincronizzati tra dispositivi. Poiché i trattamenti fisioterapici possono contenere informazioni sanitarie, utilizzare l'app solo su dispositivi autorizzati e protetti; questa versione non sostituisce un sistema clinico con autenticazione e gestione centralizzata degli accessi.
