# Feladat: Nem-funkcionális jellemzők vizsgálata

## Stressz-teszt

### Megoldás összefoglalása

#### Docker & K6

* A Docker konténer futtatása után K6 segítségével futattam le a megírt stressz-teszteket

A K6 szolgáltatásnak utánajárva és megértve a stressz-teszteket megírtam, majd ezeket futtattam és további teszteket készítettem az előző teszt eredményétől függően.

#### Első teszt eredménye

![]('first_stress_test.png')

### Tanulságok

A localhost-on futó szerver válaszideje meglepően lassú volt annak ellenére, hogy egy kéréssel teszteltük. A későbbi tesztekben a küszöbértéket magasabbra állítva természetesen átment a teszteken.
