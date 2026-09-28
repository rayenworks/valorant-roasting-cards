const riotService = require('../services/riotService');
const roastService = require('../services/roastService');

/**
 * Controller for Roast endpoints.
 * Handles validation of player name, tag, and server region.
 */
class RoastController {
  async getPlayerRoast(req, res) {
    try {
      let { name, tag } = req.params;
      const region = (req.query.region || 'na').toLowerCase().trim();

      if (!name || !tag) {
        return res.status(400).json({
          success: false,
          msg: "Both player name and tag are required (e.g. /api/roast/TenZ/0001?region=na).",
          data: null
        });
      }

      name = name.trim();
      tag = tag.trim().replace(/^#/, '');

      if (name.length < 2 || name.length > 20) {
        return res.status(400).json({
          success: false,
          msg: "Player name must be between 2 and 20 characters.",
          data: null
        });
      }

      if (tag.length < 2 || tag.length > 8) {
        return res.status(400).json({
          success: false,
          msg: "Player tag must be between 2 and 8 characters (e.g. NA1 or 0001).",
          data: null
        });
      }

      // 1. Fetch raw stats from Riot/Mock service with server region
      const playerStats = await riotService.getPlayerStats(name, tag, region);

      // 2. Generate the 4 roast cards
      const cards = roastService.generateRoastCards(playerStats);

      return res.status(200).json({
        success: true,
        msg: `Roast cards generated for ${name}#${tag} on server ${region.toUpperCase()}`,
        data: {
          player: playerStats.player,
          rank: playerStats.rank,
          cards
        }
      });

    } catch (err) {
      console.error(`[RoastController Error]:`, err.message);

      const statusCode = err.statusCode || 500;
const userMessage = err.statusCode
  ? err.message
  : "Something went wrong while roasting the player.";

      return res.status(statusCode).json({
        success: false,
        msg: userMessage,
        data: null
      });
    }
  }
}

module.exports = new RoastController();
