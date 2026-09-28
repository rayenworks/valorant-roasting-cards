const axios = require('axios');
const { generateMockPlayerData } = require('../data/mockStats');

const VALID_REGIONS = ['na', 'eu', 'ap', 'kr', 'latam', 'br'];

/**
 * Service to fetch player rank and match statistics with region/server support.
 */
class RiotService {
  constructor() {
    this.isMockMode = process.env.MOCK_MODE === 'true';
    this.apiKey = process.env.HENRIK_API_KEY || '';
    this.client = axios.create({
      baseURL: 'https://api.henrikdev.xyz/valorant',
      timeout: 8000,
      headers: this.apiKey ? { Authorization: this.apiKey } : {}
    });
  }

  /**
   * Fetches aggregated player stats with server region
   * @param {string} name - Player Riot ID name
   * @param {string} tag - Player Riot ID tagline
   * @param {string} region - Server region (na, eu, ap, kr, latam, br)
   * @returns {Promise<Object>} Unified player stats payload
   */
  async getPlayerStats(name, tag, region = 'na') {
    const cleanRegion = (region || 'na').toLowerCase().trim();
    const serverRegion = VALID_REGIONS.includes(cleanRegion) ? cleanRegion : 'na';

    if (this.isMockMode || !this.apiKey) {
      return generateMockPlayerData(name, tag, serverRegion);
    }

    try {
      // 1. Fetch MMR / Rank for this specific server region
      const mmrRes = await this.client.get(`/v2/mmr/${serverRegion}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`);

      if (!mmrRes.data || mmrRes.data.status === 404) {
        const error = new Error(`Player ${name}#${tag} not found on server ${serverRegion.toUpperCase()}.`);
        error.statusCode = 404;
        throw error;
      }

      const mmrData = mmrRes.data.data;
      const currentTier = mmrData.current_data?.currenttierpatched || "Unranked";
      const division = currentTier.split(" ")[0].toLowerCase();
      const rr = mmrData.current_data?.ranking_in_tier ?? 0;
      const peakRank = mmrData.highest_rank?.patched_tier || currentTier;

      // 2. Fetch recent matches (last 20 games) on this server
      const matchesRes = await this.client.get(`/v3/matches/${serverRegion}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`);
      const matches = matchesRes.data?.data || [];

      if (matches.length === 0) {
        const error = new Error(`No recent competitive matches found for ${name}#${tag} on ${serverRegion.toUpperCase()}. Play at least 5 games first!`);
        error.statusCode = 422;
        throw error;
      }

      // Aggregate map & agent performance
      const mapStats = {};
      const agentStats = {};
      let totalWins = 0;

      matches.forEach(match => {
        const mapName = match.metadata?.map || "Unknown";
        const playerObj = match.players?.all_players?.find(
          p => p.name?.toLowerCase() === name.toLowerCase() && p.tag?.toLowerCase() === tag.toLowerCase()
        );
        if (!playerObj) return;

        const agentName = playerObj.character || "Unknown";
        const playerTeam = playerObj.team?.toLowerCase();
        const won = match.teams?.[playerTeam]?.has_won === true;

        if (won) totalWins++;

        // Map tally
        if (!mapStats[mapName]) {
          mapStats[mapName] = { name: mapName, gamesPlayed: 0, wins: 0, losses: 0 };
        }
        mapStats[mapName].gamesPlayed++;
        if (won) mapStats[mapName].wins++;
        else mapStats[mapName].losses++;

        // Agent tally
        if (!agentStats[agentName]) {
          agentStats[agentName] = { name: agentName, gamesPlayed: 0, wins: 0, losses: 0 };
        }
        agentStats[agentName].gamesPlayed++;
        if (won) agentStats[agentName].wins++;
        else agentStats[agentName].losses++;
      });

      const formattedMaps = Object.values(mapStats).map(m => ({
        ...m,
        winRate: Number(((m.wins / m.gamesPlayed) * 100).toFixed(1))
      }));

      const formattedAgents = Object.values(agentStats).map(a => ({
        ...a,
        winRate: Number(((a.wins / a.gamesPlayed) * 100).toFixed(1))
      }));

      const totalGames = matches.length;
      const totalLosses = totalGames - totalWins;
      const overallWinRate = Number(((totalWins / totalGames) * 100).toFixed(1));

      return {
        player: { 
          name, 
          tag, 
          region: serverRegion.toUpperCase(),
          riotId: `${name}#${tag}` 
        },
        rank: {
          currentTier,
          division,
          rankingPoints: rr,
          peakRank
        },
        maps: formattedMaps,
        agents: formattedAgents,
        overall: {
          totalGames,
          wins: totalWins,
          losses: totalLosses,
          winRate: overallWinRate
        }
      };

    } catch (err) {
      if (err.statusCode) throw err;

      if (err.response) {
        if (err.response.status === 404) {
          const notFoundErr = new Error(`Player ${name}#${tag} not found on server ${serverRegion.toUpperCase()}. Check the spelling and server region.`);
          notFoundErr.statusCode = 404;
          throw notFoundErr;
        }
        if (err.response.status === 429) {
          const rateErr = new Error("Valorant API rate limit reached. Please wait a minute and try again.");
          rateErr.statusCode = 429;
          throw rateErr;
        }
        if (err.response.status >= 500) {
          const upstreamErr = new Error("Valorant API server is temporarily unavailable.");
          upstreamErr.statusCode = 503;
          throw upstreamErr;
        }
      }

      if (process.env.NODE_ENV === 'development') {
        console.warn(`[RiotService] Falling back to mock data: ${err.message}`);
        return generateMockPlayerData(name, tag, serverRegion);
      }

      const fallbackErr = new Error("Failed to communicate with Valorant stats service.");
      fallbackErr.statusCode = 503;
      throw fallbackErr;
    }
  }
}

module.exports = new RiotService();
