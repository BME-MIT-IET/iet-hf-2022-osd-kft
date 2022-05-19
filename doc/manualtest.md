# Manual test-ek és exploratory testing

Mivel a válaszott alkalmazásunk egy felhasználói felület nélküli szerveroldali alkalmazás, nehézkes volt a tesztkoncepció kidolgozása. Nagyban megnehezítette a munkát az is, hogy a program nagyon összetett, nehéz értelmezni a működését, és kidolgozni egy-két use-case-t.

## Manual test esetek

Ahhoz, hogy a manuál tesztelés ne igényeljen túlságosan sok időt egy esetleges regresszió esetén, az előre elkészített két példát ajánlom használni. Az _examples_ mappában található egy _fuseki_ és egy _wikidata_ nevű mappa, gyakorlatilag ezek tekinthetők egy-egy "kliensnek", amivel konfigurálták az AtomGraph Processor-t.

Az egyes mappákban állva parancssorból _docker-compose up_ kiadásával létrejönnek az alkalmazás konténerei

### Fuseki

Ez a példa a lokális SPARQL szolgáltatást használ, valamint egy proxy-t nginx segíségével.
Ezt a példát elindítva igazából sok mindent nem látunk, a két endpoint amit tesztelhetünk:

* http://localhost:8080/
* http://localhost/

Ez lényegében tényleg csak az alap funkcionalitást mutatja meg, ha manuál tesztestről beszélünk, akkor az elvárt eredmény, hogy az endpoint-ok megnyitására a letölthető RDF file a dataset-ben definiált leírást tartalmazza

Az nginx-et tesztelhetjük, ha az example.org oldalra navigálunk, ekkor egy alapvető példa oldalnak kell betöltődnie.

### WikiData

A WikiData példa már sokkal érdekesebb. Ebben az esetben nem egy lokális, hanem egy távoli SPARQL kiszolgálót használ a program. A tesztelés kényelmesebb, ha az rdf-ek letöltése helyett inkább **Postman**-t vagy egy ehhez hasonló http kérések küldésére alkalmas szoftvert használunk.

#### 1. teszteset

A http://localhost:8080/ címre navigálva/get kérést küldve az elvárt response egy RDF fájl a gyökér adatokkal. Ebben az RDF-ben a linkeken navigálva ellenőrizzük, hogy valós wikidata entitásokat referál-e a leírás.

#### 2. teszteset

A http://localhost:8080/birthdays címet lekérve az eredmény RDF-ben a (véletlenszerűen kiválasztott) WikiData linkeken navigálva vizsgáljuk meg, hogy a kapott emberek tényleg a mai napon születtek-e, és (megfelelő mennyiségű adat esetén, ez sporadikus) a listában férfi és nő is szerepel.

#### 3. teszteset

A http://localhost:8080/birthdays?sex=http%3A%2F%2Fwww.wikidata.org%2Fentity%2FQ6581072 címre get kérést küldve ismét egy személyeket tartalmazó RDF-et kell kapjunk, a WikiData linkeken navigálva ellenőrizzük, hogy a személyek ténylegesen az aktuális napon születtek-e, és hogy a találatok között tényleg csak nők szerepelnek.

## Exploratory testing

Az exploratory testing során szerettem volna egy előre nem meghatározott példán keresztülmenni, ezért úgy döntöttem hogy kiegészítem a WikiData .tt fájlját (ebben vannak leírva a lekérdezések struktúrái, paraméterei stb.). Létrehoztam egy új paramétert, amely segítségével meghatározhatók azok a személyek, akik az aktuális napon születtek, és a vezetéknevük az új paraméter értéke.

Ehhez az alábbi kódmódosítást végeztem:

    :BirthdaysTemplate a ldt:Template ;
        rdfs:label "People born today" ;
        ldt:match "/birthdays" ;
        ldt:param :SexParam ;
    *   ldt:param :LastNameParam ;
        ldt:query [ a :BirthdaysQueryTemplate ] ;
        rdfs:isDefinedBy : .

    :SexParam a ldt:Parameter ;
        rdfs:label "Sex parameter" ;
        spl:predicate :sex ;
        spl:valueType rdfs:Resource ;
        spl:optional true ;
        rdfs:isDefinedBy : .

    *:LastNameParam a ldt:Parameter ;
    *   rdfs:label "LastName parameter" ;
    *   spl:predicate :lastname ;
    *   spl:valueType rdfs:Resource ;
    *   spl:optional true ;
    *   rdfs:isDefinedBy : .

    :BirthdaysQueryTemplate a spin:Template ;
        rdfs:label "Birthdays query template" ;
        spin:constraint :SexParam ;
    *   spin:constraint :LastNameParam ;
        spin:body :BirthdaysQuery ;
        rdfs:isDefinedBy : .

    :BirthdaysQuery a ldt:Query, sp:Construct ;
        rdfs:label "Birthdays query" ;
        sp:text """PREFIX  bd:   <http://www.bigdata.com/rdf#>
    PREFIX  wdt:  <http://www.wikidata.org/prop/direct/>
    PREFIX  wikibase: <http://wikiba.se/ontology#>

    CONSTRUCT 
      { 
        ?entity <https://github.com/AtomGraph/Processor/blob/develop/examples/wikidata#birthYear> ?year ;
            wdt:P21 ?sex.
    *   ?entity wdt:P734 ?lastname
      }
    WHERE
      { SELECT  ?entity ?year
        WHERE
          { BIND(month(now()) AS ?nowMonth)
            BIND(day(now()) AS ?nowDay)
            ?entity wdt:P569 ?date ;
                wdt:P21 ?sex .
     *      ?entity wdt:P734 ?lastname .
            FILTER ( ( month(?date) = ?nowMonth ) && ( day(?date) = ?nowDay ) )
            BIND(year(?date) AS ?year)
          }
        LIMIT 100
      }""" ;
        rdfs:isDefinedBy : .
        
Ezután keresve egy gyakori családnevet a WikiData-n:
* Smith: https://www.wikidata.org/wiki/Q1158446
* Johnson: https://www.wikidata.org/wiki/Q1158485

Majd ennek azonosítóját beillesztve az alábbi link végére (a <LASTNAME_ID> helyére):

    http://localhost:8080/birthdays?lastname=http%3A%2F%2Fwww.wikidata.org%2Fentity%2F<LASTNAME_ID>
    
Az eredmény RDF-nek olyan személyeket kell tartalmaznia, akik az aktuális napon születtek, és a vezetéknevük a megadott vezetéknév.

Ezen a ponton úgy éreztem, hogy az alkalmazás ismeretének mértékétől fogva ennél bonyolultabb manuális tesztet nem érdemes elvégezni.
