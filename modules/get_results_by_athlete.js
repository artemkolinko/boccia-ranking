// transform tournaments results to results by athlete
function getResultsByAthlete(tournaments) {
  const athletesRanking = [];

  tournaments.forEach((tournament) => {
    tournament.competitions.forEach((competition) => {
      const devision = competition.devision;

      // try to find devision ('bc4') in ranking
      const devisionIndex = athletesRanking.findIndex(
        (x) => x.devision === devision
      );

      // didn't find division ranking, so add it
      if (devisionIndex < 0) {
        athletesRanking.push({
          devision,
          ranking: [],
        });
      }

      competition.result.forEach((athleteResult) => {
        const tournamentResult = {
          tournamentId: tournament.tournamentId,
          shortName: tournament.shortName,
          date: tournament.date,
          points: athleteResult.points,
        };

        // find devision ('bc4') in ranking
        const devisionIndex = athletesRanking.findIndex(
          (x) => x.devision === devision
        );

        // try to find athlete in ranking
        const athleteRankingIndex = athletesRanking[
          devisionIndex
        ].ranking.findIndex((x) => x.athleteId === athleteResult.athleteId);

        // check if athlete already exist
        if (athleteRankingIndex >= 0) {
          athletesRanking[devisionIndex].ranking[
            athleteRankingIndex
          ].allTournaments.push(tournamentResult);
        } else {
          athletesRanking[devisionIndex].ranking.push({
            athleteId: athleteResult.athleteId,
            allTournaments: [tournamentResult],
          });
        }
      });
    });
  });

  return athletesRanking;
}

export default getResultsByAthlete;
