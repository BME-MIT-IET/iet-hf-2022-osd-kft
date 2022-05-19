# Feladat: GitHub pipeline beüzemelése

## GitHub Actions támogatás

### Megoldás összefoglalása

#### Kerek egész pipeline összerakása a cél

![image](https://user-images.githubusercontent.com/78793275/169402203-dbcd1d15-cf82-4768-99a5-48d0eb3fbfdb.png)

Pipeline futása:

1. JDK 17 set up
2. cache packeges
3. build and analyze
4. login docker hub
5. create docker image
6. publish docker container
7. run docker containers
8. http-tests
9. stop containers
10. remove containers
11. clear

Ezek elkészítése külön-külön történt, majd megfelelő tesztelés után egyesítettem a különböző workflow-kat.
Még lehetne kiegészíteni, de egy szerver oldali alkalmazásnak ezt már kerek pipeline-nak véltem.

### Tanulságok

Mindig figyelni kell verzióinkra, és a hibaüzenetek értelmezni kell, mert sokkal hamarabb megoldásra jutunk általuk.



