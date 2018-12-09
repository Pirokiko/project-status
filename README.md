# Project Status

## Overzicht

Dit project is gemaakt om op een specifieke manier projecten in de gaten te houden, qua status en benodigde acties.
De focus ligt vooral op de globale overzicht en niet op de detail.

## Structure

Het hoogste niveau is een klant.
Een klant heeft een of meerdere projecten lopen.
Elk projecten heeft weer een of meerdere sprints, waarin werk wordt gedaan voor dat project.
  
Een sprint heeft een van de volgende fases:  
* FUTURE: Toekomistige sprint, waar nog niet vast ligt wat er in moet gebeuren.
* PLANNED: Tijd is gereserveerd voor de Sprint in de planning. Hij moet nog met de klant doorgenomen worden en afstemmen wat er in komt.
* ACTIVE: Sprint is bezig. Hierin wordt het meeste ontwikkelwerk gedaan.
* IN_REVIEW: Sprint is ter test aangeleverd aan de klant.
* FINALIZING: Sprint wordt afgerond aan de hand van de door klant aangeleverde feedback.
* FINISHED: Sprint is afgerond. Tijd voor een nieuwe sprint.

## Roadmap

Toevoegen van een sprint document aan een sprint.

Toevoegen van een checklist voor de acties op een sprint:
* FUTURE
    * Afspreken met klant om door te spreken wat er moet gebeueren in de sprint.
    * Inplannen van de sprint
    * Communiceren planning aan de klant 
* PLANNED
    * Sprint document opstellen
    * Sprint document laten goedkeuren door de klant
    * Toevoegen van goedgekeurd sprint document aan de sprint.
* ACTIVE
    * Verwerken van alle afgesproken features in de spring
    * Eventueel een tussentijdse oplevering voor extra feedback
    * Eventueel continous feedback met CD
    * Afspraak maken met de klant om demo te geven van gedaan werk
* IN_REVIEW
    * Nabellen of testen lukt en controleof ze op tijd hiermee klaar zijn
    * Indexeren van de feedback
    * Opdelen van de feedback in onderdeel van deze sprint of op backlog zetten
* FINALIZING
    * Verwerken van de feedback welke onderdeel is van deze sprint
* FINISHED
    * nothing to do, you're done

Toevoegen van een verwachte datum waarop een sprint naar de volgende fase zal gaan.

Toevoegen van indicaties dat er actie op een sprint/project ondernomen dient te worden (op basis van vastleggen datums voor volgende fase en aantal acties?)

Restricties opleggen aan het wisselen van fases:  
Je moet de checklist hebben afgewerkt om naar de volgende fase te kunnen gaan.

Restricties opleggen aan afvinken van de acties op de checklist, sommige acties vereisen dat een andere actie eerst voldaan is