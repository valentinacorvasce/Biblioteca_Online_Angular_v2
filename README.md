# litHeritage versione 2


Mi sono qui occupata della modifica e del miglioramento di tutto l'impianto lato server. Ho costruito infatti un End-Point con Laravel il quale fornisce API con funzioni di CRUD e di Registrazione/Login e che rimpiazza il vecchio End-Point in semplice PHP da me scritto in precedenza. Ho quindi potuto aggiungere su Angular un form di registrazione per i nuovi amministratori - di tipo Reactive Form e munito delle sue classiche tecniche di validazione di mail e password con aggiunta di RegEx. La lista dei nuovi utenti viene poi mostrata in una apposita sezione "users" ed ho sostituito il vecchio codice PHP per il login con il nuovo codice in Laravel che mi consente di effettuare un controllo sulla mail e la password per poter entrare nell'area admin. Anche tutte le operazioni CRUD in semplice PHP relative al form di gestione dei libri nella pagina di amministrazione sono state sostituite da funzioni in Laravel.

Per accedere al codice del nuovo End-Point qui: https://github.com/valentinacorvasce/End_Point_Laravel_CRUD.git
