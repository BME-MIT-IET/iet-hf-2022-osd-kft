# Feladat: Unit tesztek elvégzése

## Megoldás összefoglalása

### JUnit tesztelés

* A Java kód Unit teszteléséhez a JUnit egységteszt keretrendszert használtam.

### Tanulságok

* Az eredeti kódbázis már tartalmazott egységteszteket. Ezek viszont adatfüggőségek miatt http-testeket használtak.
(Ezek bele vannak konfigurálva a pipeline-ba illetve le is futtatam őket lokálisan a run.sh Script segítségével)

* A  tesztvezérelt fejlesztés (TDD) szabályai szerint a kód írásával párhuzamosan kellene fejlesztenünk a kódot t*esztelő osztályokat is, viszont jelen esetben mi már kész kódot kaptunk.
Így kicsit nehézkes volt utólag az egységtesztek elkészítése.
A dokumentáció és a programkód alapos ellenőrzésével le lehet kűzdeni ezt a nehézséget.
