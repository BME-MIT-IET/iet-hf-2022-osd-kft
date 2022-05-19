# Feladat: SonarCloud támogatás & Manuális Kód alanlízis

## SonarCloud támogatás

### Megoldás összefoglalása

#### A vizsgálat kód

* A tejes repository kódjára futtatam le a kiértékelést.

A gyakorlaton tanultak alapján a tárhelyünket hozzákötöttem a SonarCloud szolgáltatáshoz, mellyel mauálisan lefuttatva az analízist mekpatam egy reportot a hibákról. Ezeket átnézve kiválasztottunk pár érdekesebbnek ítélt hibát, mely javításra került.

### Tanulságok

A manuális analízishez képest nagymértékű teljesítényjavulást adott a SonarCloud integrálása a tárhelybe. Az eszköz segítségével jól látható dokumentáció készült az analízis eredményéről, melynek  kiértékelése jelentősen kevesebb időt vett igénybe. Alapvetően hasznos eszköz, melyet a manuális enalllízis során említett eszközökkel kiegésztve meximalizálható a Clean Code elvek betartása, illetve megkönnyíti a code review folyamatát is.

## Manuális kód alanlízis

### Megoldás összefoglalva

#### A vizsgálat tárgya

* iet-hf-2022-osd-kft/src/main/java/com/atomgraph/server mappában található kódok.

GitHub oldal segítségével megvizsgáltam a különböző osztályok kódját, és a problémásnak ítélt részek perma link-jét kimásoltam.
Majd a feladathoz tartozó issue-ba összefoglaltam a talált problémákat.
A csapat közös döntése alapján a talált hibák közül azok kerültek kijavításra, melyekre volt triviális megoldás refaktorálás nélkül.

### Tanulság

Fontos, hogy a fejlesztési folyamatok során mindig szem előtt tartsuk a CleanCode elvelekt, hiszen, ha utólag kell a hibás kódrészleteket keresni, az rengeteg többlet munkát igényel. Érdemes törekedni kódolás során ezen szabályok betartására, hogy később ne kelljen annyi javítást eszközölni, egy review során. Ennek egy jó eszközei lehetnek a különböző IDE-kbe integrálható kiegészítők pl.: SonarLint.

Talált hibák:

* Kikommentelt kódrészlet maradt a kódban:
  * <https://github.com/BME-MIT-IET/iet-hf-2022-osd-kft/blob/0d4729ff55d3af59de64acd6ac753efc3d14d46b/src/main/java/com/atomgraph/server/factory/TemplateCallFactory.java#L76>
  * <https://github.com/BME-MIT-IET/iet-hf-2022-osd-kft/blob/0d4729ff55d3af59de64acd6ac753efc3d14d46b/src/main/java/com/atomgraph/server/mapper/SHACLConstraintViolationExceptionMapper.java#L46>

* Túl hosszú függvény
  * <https://github.com/BME-MIT-IET/iet-hf-2022-osd-kft/blob/0d4729ff55d3af59de64acd6ac753efc3d14d46b/src/main/java/com/atomgraph/server/io/ValidatingDatasetProvider.java#L68>

* Nemhasznált tagváltozók:
  * <https://github.com/BME-MIT-IET/iet-hf-2022-osd-kft/blob/0d4729ff55d3af59de64acd6ac753efc3d14d46b/src/main/java/com/atomgraph/server/io/SkolemizingModelProvider.java#L39>
  * <https://github.com/BME-MIT-IET/iet-hf-2022-osd-kft/blob/0d4729ff55d3af59de64acd6ac753efc3d14d46b/src/main/java/com/atomgraph/server/io/SkolemizingDatasetProvider.java#L41>
  * <https://github.com/BME-MIT-IET/iet-hf-2022-osd-kft/blob/0d4729ff55d3af59de64acd6ac753efc3d14d46b/src/main/java/com/atomgraph/server/factory/TemplateCallFactory.java#L45>
  
* A konstruktorba kapott paraméter nem kerül felhasználásra.
  * <https://github.com/BME-MIT-IET/iet-hf-2022-osd-kft/blob/0d4729ff55d3af59de64acd6ac753efc3d14d46b/src/main/java/com/atomgraph/server/exception/SPINConstraintViolationException.java#L31>
