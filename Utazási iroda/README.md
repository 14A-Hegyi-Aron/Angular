# Utazási Iroda

## Nyilvántartandó adatok
- Szálloda
    - Név
    - Csillagok száma
    - Cím
    - Link
    - Rövid leírás

- Utazások
    - Uticél
    - Utazás módja (repülő, autó, hajó, vonat) (FK -> külön tábla)
    - Indulás
    - Érkezés
    - Szálloda (FK)
    - Utazás költsége
    - Rövid leírás
    - Létszám
    - Képek (pl. a szállodáról, a helyről, a környezetről)

- Jelentkezések
    - Név
    - Létszám
    - Email
    - Telefon
    - Utazás (FK)

## Funkciók
- Admin funkciók
    - Szállodák adatainak nyilvántartása
    - Utazások adatainak nyilvántartása
    - Jelentkezések lekérdezése

- Ügyfelek funkciói (nem kell bejelentkezni)
    - Utazások listázása
        - Szűrés uticélra
        - Szűrés utazás módjára
        - Szűrés időpontra
    - Regisztráció az utazásra
