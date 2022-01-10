// individual
const athlete = {
  id: 324234094234923,
  fname: 'Артем',
  lname: 'Колінько',
  oblast: 'Дніпропетровська',
  division: 'Individual BC1',
  results: [
    {
      id: 4424942392495230,
      // reference to tournament
      tournament: {
        type: 'Чемпионат Украины',
        city: 'Одесса',
        begin: '2019-05-21',
        end: '2019-05-26',
      },
      groupStage: {
        games: 3,
        wins: 3,
        bonus: true,
        playOff: true,
      },
      playOffStage: {
        round16: true,
        round8: true,
        round4: true,
        round3: false,
        round2: true,
        round1: true,
      },
      score: 16, // calculate
    },
  ],
};

console.log(athlete);
