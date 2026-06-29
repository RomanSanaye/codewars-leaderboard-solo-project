export function getLanguages(users) {
  const languages = ["overall"];

  users.forEach((user) => {
    const langs = user.ranks.languages;
    for (let lang in langs) {
      if (!languages.includes(lang)) {
        languages.push(lang);
      }
    }
  });

  return languages;
}

export function sortUsersByScore(users, language) {
  return users
    .map((user) => {
      const rank =
        language === "overall"
          ? user.ranks.overall
          : user.ranks.languages?.[language];

      return {
        username: user.username,
        clan: user.clan || "No clan",
        score: rank ? rank.score : 0
      };
    })
    .filter((user) => user.score > 0)
    .sort((a, b) => b.score - a.score);
}
