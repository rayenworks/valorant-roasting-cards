/**
 * Generates realistic player stats for testing without API keys or rate limits.
 * Includes dedicated Radiant profiles for VCT pros (TenZ, Derke, Jinggg, Tarik, Aspas).
 */

const PRO_PRESETS = {
  tenz: {
    rank: { currentTier: "Radiant", division: "radiant", rankingPoints: 685, peakRank: "Radiant #1" },
    maps: [
      { name: "Ascent", gamesPlayed: 24, wins: 18, losses: 6, winRate: 75.0 },
      { name: "Bind", gamesPlayed: 20, wins: 15, losses: 5, winRate: 75.0 },
      { name: "Haven", gamesPlayed: 18, wins: 13, losses: 5, winRate: 72.2 },
      { name: "Lotus", gamesPlayed: 22, wins: 16, losses: 6, winRate: 72.7 },
      { name: "Sunset", gamesPlayed: 16, wins: 10, losses: 6, winRate: 62.5 },
      { name: "Split", gamesPlayed: 14, wins: 8, losses: 6, winRate: 57.1 },
      { name: "Abyss", gamesPlayed: 12, wins: 6, losses: 6, winRate: 50.0 } // TenZ's lowest win rate
    ],
    agents: [
      { name: "Omen", gamesPlayed: 32, wins: 24, losses: 8, winRate: 75.0, role: "Controller" },
      { name: "Jett", gamesPlayed: 28, wins: 20, losses: 8, winRate: 71.4, role: "Duelist" },
      { name: "KAY/O", gamesPlayed: 15, wins: 10, losses: 5, winRate: 66.7, role: "Initiator" },
      { name: "Yoru", gamesPlayed: 14, wins: 8, losses: 6, winRate: 57.1, role: "Duelist" } // TenZ's lowest win rate agent
    ],
    overall: { totalGames: 126, wins: 86, losses: 40, winRate: 68.3 }
  },
  derke: {
    rank: { currentTier: "Radiant", division: "radiant", rankingPoints: 745, peakRank: "Radiant #1" },
    maps: [
      { name: "Lotus", gamesPlayed: 26, wins: 20, losses: 6, winRate: 76.9 },
      { name: "Haven", gamesPlayed: 22, wins: 17, losses: 5, winRate: 77.2 },
      { name: "Ascent", gamesPlayed: 25, wins: 18, losses: 7, winRate: 72.0 },
      { name: "Bind", gamesPlayed: 18, wins: 12, losses: 6, winRate: 66.7 },
      { name: "Sunset", gamesPlayed: 15, wins: 9, losses: 6, winRate: 60.0 },
      { name: "Icebox", gamesPlayed: 14, wins: 8, losses: 6, winRate: 57.1 } // Derke's lowest win rate
    ],
    agents: [
      { name: "Raze", gamesPlayed: 35, wins: 27, losses: 8, winRate: 77.1, role: "Duelist" },
      { name: "Jett", gamesPlayed: 30, wins: 22, losses: 8, winRate: 73.3, role: "Duelist" },
      { name: "Yoru", gamesPlayed: 18, wins: 11, losses: 7, winRate: 61.1, role: "Duelist" } // lowest win rate
    ],
    overall: { totalGames: 120, wins: 84, losses: 36, winRate: 70.0 }
  },
  jinggg: {
    rank: { currentTier: "Radiant", division: "radiant", rankingPoints: 810, peakRank: "Radiant #1" },
    maps: [
      { name: "Bind", gamesPlayed: 30, wins: 25, losses: 5, winRate: 83.3 },
      { name: "Sunset", gamesPlayed: 24, wins: 19, losses: 5, winRate: 79.1 },
      { name: "Lotus", gamesPlayed: 22, wins: 16, losses: 6, winRate: 72.7 },
      { name: "Split", gamesPlayed: 20, wins: 14, losses: 6, winRate: 70.0 },
      { name: "Haven", gamesPlayed: 16, wins: 10, losses: 6, winRate: 62.5 } // Jinggg's lowest win rate
    ],
    agents: [
      { name: "Raze", gamesPlayed: 45, wins: 36, losses: 9, winRate: 80.0, role: "Duelist" },
      { name: "Phoenix", gamesPlayed: 22, wins: 16, losses: 6, winRate: 72.7, role: "Duelist" },
      { name: "Sage", gamesPlayed: 15, wins: 10, losses: 5, winRate: 66.7, role: "Sentinel" } // lowest win rate
    ],
    overall: { totalGames: 112, wins: 84, losses: 28, winRate: 75.0 }
  },
  tarik: {
    rank: { currentTier: "Radiant", division: "radiant", rankingPoints: 620, peakRank: "Radiant #1" },
    maps: [
      { name: "Ascent", gamesPlayed: 35, wins: 22, losses: 13, winRate: 62.8 },
      { name: "Bind", gamesPlayed: 28, wins: 18, losses: 10, winRate: 64.2 },
      { name: "Sunset", gamesPlayed: 22, wins: 12, losses: 10, winRate: 54.5 },
      { name: "Abyss", gamesPlayed: 18, wins: 9, losses: 9, winRate: 50.0 }
    ],
    agents: [
      { name: "Reyna", gamesPlayed: 40, wins: 26, losses: 14, winRate: 65.0, role: "Duelist" },
      { name: "Jett", gamesPlayed: 32, wins: 20, losses: 12, winRate: 62.5, role: "Duelist" },
      { name: "Raze", gamesPlayed: 20, wins: 10, losses: 10, winRate: 50.0, role: "Duelist" }
    ],
    overall: { totalGames: 103, wins: 61, losses: 42, winRate: 59.2 }
  },
  aspas: {
    rank: { currentTier: "Radiant", division: "radiant", rankingPoints: 860, peakRank: "Radiant #1" },
    maps: [
      { name: "Ascent", gamesPlayed: 28, wins: 23, losses: 5, winRate: 82.1 },
      { name: "Sunset", gamesPlayed: 25, wins: 20, losses: 5, winRate: 80.0 },
      { name: "Haven", gamesPlayed: 22, wins: 17, losses: 5, winRate: 77.2 },
      { name: "Lotus", gamesPlayed: 20, wins: 14, losses: 6, winRate: 70.0 }
    ],
    agents: [
      { name: "Jett", gamesPlayed: 48, wins: 39, losses: 9, winRate: 81.2, role: "Duelist" },
      { name: "Raze", gamesPlayed: 22, wins: 17, losses: 5, winRate: 77.2, role: "Duelist" },
      { name: "Iso", gamesPlayed: 14, wins: 9, losses: 5, winRate: 64.2, role: "Duelist" }
    ],
    overall: { totalGames: 95, wins: 74, losses: 21, winRate: 77.8 }
  }
};

function generateMockPlayerData(name, tag, region = "na") {
  const normalizedKey = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Check if user queried a known pro player
  if (PRO_PRESETS[normalizedKey]) {
    const preset = PRO_PRESETS[normalizedKey];
    return {
      player: {
        name,
        tag,
        region: region.toUpperCase(),
        riotId: `${name}#${tag}`
      },
      rank: { ...preset.rank },
      maps: [...preset.maps],
      agents: [...preset.agents],
      overall: { ...preset.overall }
    };
  }

  // General player rank pool including high-elo ranks
  const seed = (name + tag + region).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const ranks = [
    { tier: "Silver 2", division: "silver", rr: 34, peak: "Gold 1" },
    { tier: "Gold 3", division: "gold", rr: 68, peak: "Platinum 1" },
    { tier: "Platinum 2", division: "platinum", rr: 65, peak: "Diamond 1" },
    { tier: "Diamond 3", division: "diamond", rr: 89, peak: "Ascendant 1" },
    { tier: "Ascendant 2", division: "ascendant", rr: 54, peak: "Ascendant 3" },
    { tier: "Immortal 2", division: "immortal", rr: 142, peak: "Immortal 3" },
    { tier: "Radiant", division: "radiant", rr: 520, peak: "Radiant Top 200" }
  ];

  const selectedRank = ranks[seed % ranks.length];

  const maps = [
    { name: "Ascent", gamesPlayed: 14, wins: 4, losses: 10, winRate: 28.5 },
    { name: "Bind", gamesPlayed: 12, wins: 6, losses: 6, winRate: 50.0 },
    { name: "Haven", gamesPlayed: 9, wins: 5, losses: 4, winRate: 55.5 },
    { name: "Split", gamesPlayed: 8, wins: 2, losses: 6, winRate: 25.0 },
    { name: "Lotus", gamesPlayed: 11, wins: 7, losses: 4, winRate: 63.6 },
    { name: "Sunset", gamesPlayed: 7, wins: 3, losses: 4, winRate: 42.8 },
    { name: "Abyss", gamesPlayed: 6, wins: 1, losses: 5, winRate: 16.7 },
    { name: "Icebox", gamesPlayed: 3, wins: 0, losses: 3, winRate: 0.0 }
  ];

  const agents = [
    { name: "Reyna", gamesPlayed: 15, wins: 4, losses: 11, winRate: 26.6, role: "Duelist" },
    { name: "Jett", gamesPlayed: 12, wins: 5, losses: 7, winRate: 41.6, role: "Duelist" },
    { name: "Omen", gamesPlayed: 14, wins: 8, losses: 6, winRate: 57.1, role: "Controller" },
    { name: "Sova", gamesPlayed: 8, wins: 3, losses: 5, winRate: 37.5, role: "Initiator" },
    { name: "Killjoy", gamesPlayed: 10, wins: 6, losses: 4, winRate: 60.0, role: "Sentinel" },
    { name: "Clove", gamesPlayed: 2, wins: 0, losses: 2, winRate: 0.0, role: "Controller" }
  ];

  const mapOffset = seed % maps.length;
  const rotatedMaps = maps.slice(mapOffset).concat(maps.slice(0, mapOffset));

  const agentOffset = (seed * 3) % agents.length;
  const rotatedAgents = agents.slice(agentOffset).concat(agents.slice(0, agentOffset));

  const totalGames = 45 + (seed % 30);
  const totalWins = Math.floor(totalGames * (0.38 + ((seed % 25) / 100)));
  const totalLosses = totalGames - totalWins;
  const overallWinRate = Number(((totalWins / totalGames) * 100).toFixed(1));

  return {
    player: {
      name,
      tag,
      region: region.toUpperCase(),
      riotId: `${name}#${tag}`
    },
    rank: {
      currentTier: selectedRank.tier,
      division: selectedRank.division,
      rankingPoints: selectedRank.rr,
      peakRank: selectedRank.peak
    },
    maps: rotatedMaps,
    agents: rotatedAgents,
    overall: {
      totalGames,
      wins: totalWins,
      losses: totalLosses,
      winRate: overallWinRate
    }
  };
}

module.exports = {
  generateMockPlayerData
};
