const {
  rankRoasts,
  mapRoasts,
  agentRoasts,
  winRateRoasts
} = require('../data/roastTemplates');
const { getRankIcon, getAgentIcon } = require('../data/assets');

const MIN_GAMES_THRESHOLD = 5;

function pickRandom(arr) {
  if (!arr || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatTemplate(template, vars = {}) {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{${key}}`, value);
  }
  return result;
}

class RoastService {
  generateRoastCards(stats) {
    const { player, rank, maps, agents, overall } = stats;
    const cards = [];

    // Card 1: Player Rank (includes official rank tier icon)
    const rankDivision = (rank.division || "unranked").toLowerCase();
    const rankLines = rankRoasts[rankDivision] || rankRoasts.unranked;
    const rankRoast = pickRandom(rankLines);

    cards.push({
      id: "card-rank",
      type: "rank",
      title: "Current Rank",
      subtitle: `${player.riotId} (${player.region || 'NA'})`,
      headline: rank.currentTier,
      icon: getRankIcon(rank.currentTier),
      statHighlight: `${rank.rankingPoints} RR`,
      metricLabel: "Competitive Standing",
      metricValue: `Peak: ${rank.peakRank}`,
      roast: rankRoast,
      badgeColor: this.getRankColor(rankDivision)
    });

    // Card 2: Worst Map (min 5 games preferred)
    const eligibleMaps = maps.filter(m => m.gamesPlayed >= MIN_GAMES_THRESHOLD);
    const mapPool = eligibleMaps.length > 0 ? eligibleMaps : maps;

    const worstMap = [...mapPool].sort((a, b) => a.winRate - b.winRate || b.gamesPlayed - a.gamesPlayed)[0] || {
      name: "None",
      winRate: 0,
      gamesPlayed: 0,
      wins: 0,
      losses: 0
    };

    const mapLines = mapRoasts[worstMap.name] || mapRoasts.generic;
    const mapRoast = pickRandom(mapLines);

    cards.push({
      id: "card-map",
      type: "map",
      title: "Cursed Battleground",
      subtitle: "Worst Map by Win Rate",
      headline: worstMap.name,
      statHighlight: `${worstMap.winRate}% Win Rate`,
      metricLabel: "Record",
      metricValue: `${worstMap.wins}W - ${worstMap.losses}L (${worstMap.gamesPlayed} games)`,
      roast: mapRoast,
      badgeColor: "#ff4655"
    });

    // Card 3: Worst Agent (min 5 games preferred)
    const eligibleAgents = agents.filter(a => a.gamesPlayed >= MIN_GAMES_THRESHOLD);
    const agentPool = eligibleAgents.length > 0 ? eligibleAgents : agents;

    const worstAgent = [...agentPool].sort((a, b) => a.winRate - b.winRate || b.gamesPlayed - a.gamesPlayed)[0] || {
      name: "None",
      winRate: 0,
      gamesPlayed: 0,
      wins: 0,
      losses: 0
    };

    const agentLines = agentRoasts[worstAgent.name] || agentRoasts.generic;
    const agentRoast = pickRandom(agentLines);

    cards.push({
      id: "card-agent",
      type: "agent",
      title: "Agent Sabotage",
      subtitle: "Lowest Performing Agent",
      headline: worstAgent.name,
      icon: getAgentIcon(worstAgent.name),
      statHighlight: `${worstAgent.winRate}% Win Rate`,
      metricLabel: "Record",
      metricValue: `${worstAgent.wins}W - ${worstAgent.losses}L (${worstAgent.gamesPlayed} games)`,
      roast: agentRoast,
      badgeColor: "#ff4655"
    });

    // Card 4: Win Rate Reality Check
    let wrCategory = "mediocre";
    if (overall.winRate < 35) wrCategory = "abysmal";
    else if (overall.winRate < 45) wrCategory = "bad";
    else if (overall.winRate <= 52) wrCategory = "mediocre";
    else if (overall.winRate <= 58) wrCategory = "positive";
    else wrCategory = "good";

    const wrLines = winRateRoasts[wrCategory];
    const rawWrRoast = pickRandom(wrLines);
    const wrRoast = formatTemplate(rawWrRoast, {
      winRate: overall.winRate,
      wins: overall.wins,
      losses: overall.losses,
      totalGames: overall.totalGames
    });

    cards.push({
      id: "card-winrate",
      type: "winrate",
      title: "Career Reality Check",
      subtitle: "Overall Performance",
      headline: `${overall.winRate}%`,
      statHighlight: `${overall.wins} Wins / ${overall.losses} Losses`,
      metricLabel: "Sample Size",
      metricValue: `${overall.totalGames} Total Matches`,
      roast: wrRoast,
      badgeColor: overall.winRate >= 50 ? "#00f59b" : "#ff4655"
    });

    return cards;
  }

  getRankColor(division) {
    const colors = {
      iron: "#6f737d",
      bronze: "#a5673f",
      silver: "#bdc2cb",
      gold: "#e6b432",
      platinum: "#3ba4b7",
      diamond: "#b273db",
      ascendant: "#3ad188",
      immortal: "#c93d5a",
      radiant: "#ffffaa"
    };
    return colors[division] || "#bdc2cb";
  }
}

module.exports = new RoastService();
