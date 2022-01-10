## Side (Squad)

- id
- type (ind || pair&team)
- competition ([BC1, BC2, BC3, BC4], [BC1/BC2, BC3, BC4])
- name (Athlete name, region, country)
- athletes []

## Athletes

- id
- firstName
- lastName
- region
- city
- dob
- bocciaClass

## Tournament

- id
- title
- city
- dateStart
- dateEnd

## HTML форма

1. создаем атлета

- имя
- фамилия
- область

2. создаем турнир

- дата начала
- дата конца
- тип (чемпионат, кубок)
- город
- имя (создается - Чемпионат Украины 2019)

3. создаем соревнование

- девизион (radio) (BC1)
- чек боксы pool and playOff
- - минимум игр в группе (groupNormalisation = wins / matchesPlayed)
- - если только групповой этеп (без плейофф), то poolsOnlyBonus получает 1 или 1,2 или 1,2,3 места в зависимости от Size of pool
- - с какой стадии начинается playoff?
- список участников малти select (или список с чекбоксами)

4. создаем результат

- выбираем атлета
-
