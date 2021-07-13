3. zadanie Tomas Both

- Dockerfiles a sposob ako nacitac react mam z prednasky c.10.

- Implementoval som košík s možnosťou viac produktov a viac kusov v 1 objednavke. (na stranke produktov "Add 1 piece to basket" znamená že pridám 1ks daného 
 produktu do košíka, teda ak napríkad stlačím "Add 1 piece to basket" 5krát, tak mám 5ks z daného produktu v košíku)

 -Na stránke s formulárom tlačidlo submit pošle objednávku do databázy, tlačidlo next len naviguje na stránku s bannerom

- Na stránke admina funguje vybavenie objednávky, teda ak stlačím tlačidlo Complete order, react pošle request do databazy, tam sa aj zmeni stav objednavky,
  ale komponent sa nezmeni len ak načítam stránku znova, alebo napríklad takto:
  1. na stránke admina v objednávke s červeným pozadím stlačím tlačidlo Complete order
  2. pomocou "Back to products" vratim sa na stranku s produktmi
  3. prejdem znova na stránku admina a už objednávka je vybavená - má zelené pozadie