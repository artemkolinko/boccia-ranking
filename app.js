import getResultsByAthlete from './modules/get_results_by_athlete.js';

// Number of results to count
const numOfBestResults = 2;

console.time('script run time');

// data files
const files = ['2019-champ', '2019-cup', '2021-champ', '2021-cup'];

// Get competition results from json
const requests = files.map((file) => fetch(`./data/${file}.json`));

Promise.all(requests)
  .then((responses) => Promise.all(responses.map((res) => res.json())))
  .then((tournaments) => {
    // data by tournament
    console.log(tournaments);

    const resultsByDevision = getResultsByAthlete(tournaments);

    transformResults(resultsByDevision, numOfBestResults);

    // data by devision
    console.log(resultsByDevision);

    const container = document.getElementById('container');

    resultsByDevision.forEach((devision) => {
      const div = document.createElement('div');

      let html = '';
      let tournamentsHeader = '';

      tournaments.forEach((tournament) => {
        tournamentsHeader += `<th title="${tournament.tournamentId}">${tournament.shortNameUkr}</th>`;
      });

      html += `<h2>${devision.devision.toUpperCase()}</h2>`;

      html += '<table>';
      html += `
      <tr>
        <th>Рейтинг</th>
        <th>Ім'я</th>
        <th>Прізвище</th>
        ${tournamentsHeader}
        <th title="Сума очків ${numOfBestResults}-х кращих результатів">${numOfBestResults} кращих</th>
      </tr>`;

      devision.ranking.forEach((rank, index, array) => {
        const [fname, lname] = rank.athleteId.split(' ');

        // Create position, make same position for athlete with equil points
        const position =
          index > 0 && rank.totalPoints === array[index - 1].totalPoints
            ? ''
            : index + 1;

        // genarate row of tournamets
        let tournamentsRow = '';
        tournaments.forEach((tournament) => {
          tournamentsRow += `<td>${rank[tournament.shortName] || '-'}</td>`;
        });

        // Add row
        html += `
                <tr>
                  <td>${position}</td>
                  <td>${fname}</td>
                  <td>${lname}</td>
                  ${tournamentsRow}
                  <td>${rank.totalPoints}</td>
                </tr>`;
      });

      // Close table
      html += '</table>';

      div.innerHTML = html;
      container.append(div);
    });

    console.timeEnd('script run time');
  })
  .catch((err) => console.log(err));

// ================
// Functions
// ================
function transformResults(resultsByDevision, numsOfResults) {
  // sort tournaments by points
  resultsByDevision.forEach((devision) => {
    const resultsByAthlete = devision.ranking;

    resultsByAthlete.forEach((athlete) => {
      athlete.allTournaments.forEach((tournament) => {
        athlete[tournament.shortName] = tournament.points;
      });

      athlete.allTournaments.sort((a, b) => b.points - a.points);
    });
  });

  // split all tournaments to countable and uncountable tournaments and calculate total points
  resultsByDevision.forEach((devision) => {
    const resultsByAthlete = devision.ranking;

    resultsByAthlete.forEach((athlete) => {
      athlete.countTournaments = athlete.allTournaments.splice(
        0,
        numsOfResults
      );
      // athlete.countTournaments = athlete.allTournaments.slice(
      //   0,
      //   numsOfResults
      // );
      athlete.uncountTournaments = athlete.allTournaments;
      athlete.totalPoints = athlete.countTournaments.reduce(
        (total, currentValue) => total + currentValue.points,
        0
      );
      delete athlete.allTournaments;
    });
  });

  // Sort by ranking
  // при одикановом рейтинге - выше тот, у кого последный результат выше, как сделать?
  resultsByDevision.forEach((devision) => {
    devision.ranking.sort((a, b) => b.totalPoints - a.totalPoints);
  });

  // Sort by devision
  resultsByDevision.sort((a, b) => {
    if (a.devision < b.devision) {
      return -1;
    }
    if (a.devision > b.devision) {
      return 1;
    }
    return 0;
  });
}
