/* eslint-disable no-unused-vars */
const athleteResult = {
  groupWinsMatches: 2,
  groupPlayMatches: 3,
  groupMaxMatches: 4,
  playOff: true,
  playOff_1_8: false,
  playOff_1_4: true,
  playOff_1_2: true,
  playOffBronze: true,
  playOffGold: false,
};

// Point allocation
const points = {
  entry: 1,
  poolMathc: 1,
  qualifyFromPool: 1,
  r16: 2,
  qFinal: 4,
  sFinal: 4,
  bronze: 2,
  final: 3,
};

// Можно результаты хранить в JSON файлах, а не в базе и обращаться к ним через fetch

/* 
внесение инфы о соревновании
- соревнование
- девижин (подразделение) individual BC1, pair BC4 etc
- максимальное кол-во увастников в группе (не задано = значит только playoff)
- начальная стадия плейофф - 1/8 или 1/4 или 1/2 или финал

внесение инфы о результате спортсмена:
- количество побед в группе (максимальное кол-во сыгранных матчей берется выше)
- до какой стадии дошел

*/

// eliminationStart:
// 16 - вышел в 1/8 - 1 очко
// 8 - вышел в 1/4 - 1 очко или 1 очко + 2 очка
// 4 - вышел в 1/2
// 2 - вышел в финал
// 3 - выиграл бронзу
// 1 - выиграл в финале

// eliminationEnd

// [1,2,4,4,3]
// [1,2,4,2]

// const eliminationStart = 8;
// function test(){
//   console.log(eliminationStart);
// }

// test();

function GetPoint(groupMatchWin, playOffStage) {
  const coef = 3;
  let groupPoints = groupMatchWin * 1;
  let playOffPoints;

  // switch (playOffStage) {
  //   case 16:
  //     playOffPoints = 1
  //     break;

  //   default:
  //     break;
  // }

  // очки за 1/8 финала
  if (playOffStage == 8) {
    playOffPoints = 1 + 2;
  }
  // очки за 1/4 финала
  else if (playOffStage == 4) {
    playOffPoints = 1 + 2 + 4;
  }
  // очки за 1/2 финала
  else if (playOffStage == 2) {
    playOffPoints = 1 + 2 + 4 + 4;
  }
  // очки за бронзовый финал
  else if (playOffStage == 3) {
    playOffPoints = 1 + 2 + 4 + 2;
  }
  // очки за финала
  else if (playOffStage == 1) {
    playOffPoints = 1 + 2 + 4 + 4 + 3;
  } else {
    console.log('значение не верно');
  }
  let totalPoints = (groupPoints + playOffPoints) * coef + 1;

  return totalPoints;
}

let elimPoints = 0;
// выход в плейофф, в 1/8
elimPoints += 1;
console.log(elimPoints);
// выход в 1/4, выиграл в 1/8
elimPoints += 2;
console.log(elimPoints);
// выход в 1/2, выиграл в 1/4
elimPoints += 4;
console.log(elimPoints);
// выход в финал, выиграл в 1/2
elimPoints += 4;
console.log(elimPoints);
// выиграл в финале
elimPoints += 3;
console.log(elimPoints);

console.log(elimPoints);

let result = GetPoint(2, 3);
console.log(result);

// const valMin = Math.min(2, 3, 5, 3, 5, 1, 5);
// const valMax = Math.max(2, 3, 5, 3, 5, 1, 5, 8);
