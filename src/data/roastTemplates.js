/**
 * Humorous, playful roast templates categorized by stat type.
 * Only targets in-game gameplay, decisions, and rank quirks.
 */

const rankRoasts = {
  iron: [
    "Your crosshair placement is currently inspecting floor textures for dirt.",
    "Iron: where reloading after firing one bullet is considered tactical brilliance.",
    "Buying a Vandal just to donate it to the enemy team on round 2."
  ],
  bronze: [
    "Bronze 2 lobby: 10 players, 0 communication, 100% confidence.",
    "Your aim isn't broken, your mousepad is just spiritually misaligned.",
    "You have the reaction time of a Wi-Fi router on 2% battery."
  ],
  silver: [
    "Silver lobby: where everyone thinks they're a radiant smurf trapped in elo hell.",
    "Crouching and spraying every single vandal duel is not a personality trait.",
    "You rotate slower than dial-up internet loading a 4K wallpaper."
  ],
  gold: [
    "You've mastered the art of blaming your team while bottom-fragging.",
    "Gold rank: high enough to feel proud, low enough to get out-aimed by a Classic right-click.",
    "You know every lineup on YouTube, yet somehow miss the bomb site entirely."
  ],
  platinum: [
    "Plat is just Silver with an ego and a $50 knife skin.",
    "You dry-peek Operator angles like you get paid by the death.",
    "Great utility usage, if the objective was to flash your own teammates."
  ],
  diamond: [
    "One win away from Ascendant for the last three acts.",
    "Diamond players don't play the game, they play 'who can complain first in all-chat'.",
    "All aim, zero game sense, and a broken keyboard from slamming desk."
  ],
  ascendant: [
    "Hardstuck in green rank purgatory where everyone claims they're former Immortals.",
    "Too good for your casual friends, but getting humbled in every scrim.",
    "You inspect your knife more times per round than you check corners."
  ],
  immortal: [
    "You stream to 2 viewers and treat every ranked game like VCT Champions finals.",
    "Your sleep schedule is more ruined than your team's eco.",
    "Radiant dreams, but 80 RR away and tilting off the face of the earth."
  ],
  radiant: [
    "Changing your mouse sensitivity 4 times a match like it's a religious ritual.",
    "VCT trophy on the desk, but still getting one-tapped by a running Classic in ranked.",
    "Radiant top 500: where everyone blames 5ms ping difference for losing a duel.",
    "You have Radiant aim, but your sleep schedule is stuck in Iron 1.",
    "Wins VCT Masters, then loses 13-4 to a 5-stack of French duelists at 3 AM."
  ],
  unranked: [
    "Unranked? Hiding your rank doesn't hide the 0-13 on your career tab.",
    "Too terrified to queue competitive, living safely in Swiftplay mode."
  ]
};

const mapRoasts = {
  Ascent: [
    "You push mid market like you have a death wish and a free ticket to spectating.",
    "Doors closed on Ascent faster than your chances of winning the round.",
    "B site defense on Ascent: where you drop a smoke, panic, and die anyway."
  ],
  Bind: [
    "Taking the teleporter just to announce your incoming funeral to the entire lobby.",
    "Hookah on Bind is your personal Bermuda Triangle: you go in, you never come out.",
    "Showers control? You don't even have control of your crosshair."
  ],
  Haven: [
    "Three bomb sites and somehow you managed to be on the wrong one every single round.",
    "Garage on Haven has seen you get one-tapped so often it named a brick after you.",
    "Rotating from A to C takes you longer than a cross-country flight."
  ],
  Split: [
    "You peek Split mid ropes like the enemy sniper isn't pre-aiming your forehead.",
    "B heaven control on Split slipped away faster than your RR.",
    "Pushing A ramps with zero flashes: the ultimate expression of blind faith."
  ],
  Icebox: [
    "You get lost in Icebox tubes while the spike is being defused behind you.",
    "Yellow on Icebox is where your dreams of ranking up freeze to death.",
    "Zipline trick shots: 0% accuracy, 100% clip-farming delusion."
  ],
  Breeze: [
    "On Breeze your crosshair is aiming at the enemy, but your bullets are hitting another server.",
    "Long-range duels on Breeze make your vandal look like a water pistol.",
    "Breeze halls: the place where you lurk for 90 seconds while your team dies 4v5."
  ],
  Fracture: [
    "Getting pinched from both sides on Fracture because spatial awareness is an optional setting.",
    "Ziplining under the map straight into a waiting Bucky.",
    "Fracture: where you spend the entire round deciding which spawn to walk out of."
  ],
  Lotus: [
    "Rotating doors on Lotus: your favorite carousel of doom.",
    "You gave up C mound control before the barrier even dropped.",
    "Three sites on Lotus and you still managed to run into a 5-man stack alone."
  ],
  Sunset: [
    "Sunset B site: where you donate your gun to the Cypher camera trap every round.",
    "Contesting mid courtyard on Sunset with a prayer and no utility.",
    "Market on Sunset took your RR and gave you a free trip back to the lobby."
  ],
  Abyss: [
    "You've fallen off the map on Abyss more times than you've hit a headshot.",
    "Gravity is your toughest opponent on Abyss, and you're 0-12 against it.",
    "No barriers on Abyss was designed specifically to test your inability to walk in a straight line."
  ],
  generic: [
    "This map isn't cursed, you're just allergic to checking your corners.",
    "Your minimap must be disabled in settings, because enemies are invisible to you here.",
    "You have a higher chance of winning the lottery than winning a round on this map."
  ]
};

const agentRoasts = {
  Reyna: [
    "Instalocked Reyna in 0.2 seconds just to go 4-17 and refuse to buy teammates.",
    "Using Leer on your own team's entry angle like a true undercover agent.",
    "Dismissed straight into a crossfire with your knife out."
  ],
  Jett: [
    "Dashing into site with no smokes, dying instantly, then screaming 'REVIVE ME SAGE!'",
    "Bladestorm right-click into a wall: the quintessential Jett experience.",
    "Updrafted to get a cool TikTok clip, ended up spectating for the next 90 seconds."
  ],
  Raze: [
    "Satcheled straight into an enemy crosshair at Mach 3 speed.",
    "Your Showstopper rocket did 14 damage to a wall and 0 to the enemy team.",
    "Your Boom Bot has more game sense than your entire competitive career."
  ],
  Phoenix: [
    "Flashed your entire team, healed yourself in fire for 12 HP, and died immediately.",
    "Running back to your Run It Back marker with 3 enemies waiting with judges.",
    "Your curveball has blinded your own duelist more times than the enemy."
  ],
  Sova: [
    "Spent 45 minutes learning YouTube shock dart lineups just to shock your own toe.",
    "Your recon dart scanned a bird in the sky while enemies walked right past you.",
    "Hunter's Fury: 3 shots fired, 3 holes in concrete, zero enemies harmed."
  ],
  Fade: [
    "Your Haunt watcher eye got shot in 0.1 seconds before it even opened.",
    "Prowlers running around blindly because you aimed them at a wall.",
    "Seized the enemy duelist only to lose the duel anyway."
  ],
  Viper: [
    "Forgot to toggle toxic screen off, drained all fuel, and trapped your own team in choke.",
    "Viper's Pit placed in the worst possible spot so the enemy defuses without you noticing.",
    "Poison snakebite lineups that land cleanly in spawn 2 minutes late."
  ],
  Omen: [
    "Shrouded Step straight into a shotgun barrel with dramatic confidence.",
    "From the Shadows ultimate canceled in panic after hearing footsteps.",
    "Dropped dark cover smokes that gave the enemy team the safest entrance imaginable."
  ],
  Brimstone: [
    "Stim beacon dropped in spawn to get that +15% walking speed to the buy barrier.",
    "Orbital Strike on an empty site while the defuse happens on the opposite flank.",
    "Molotov lineup bounced off a crane and landed at your own boots."
  ],
  Killjoy: [
    "Your turret has a better K/D ratio than you do on this agent.",
    "Lockdown ultimate placed in a spot where one Sova shock dart destroyed it instantly.",
    "Alarmbot went off and you still managed to get backstabbed."
  ],
  Cypher: [
    "Watching your camera monitor while the enemy duelist walks up behind you with a knife.",
    "Your trapwires are positioned so high the enemy team casually walks underneath them.",
    "Neural Theft revealed that all five enemies were already aiming at you."
  ],
  Sage: [
    "Held onto Resurrection all half waiting for your e-dating partner to die.",
    "Slow orbed your own teammates while they were trying to escape an airstrike.",
    "Barrier wall placed backwards, trapping yourself in a corner."
  ],
  Clove: [
    "Used Not Dead Yet ultimate just to die again in the exact same spot 4 seconds later.",
    "Post-death smokes placed with the tactical finesse of a dropped plate of spaghetti.",
    "Meddle orb thrown at a wall while you peek with no teammates around."
  ],
  generic: [
    "This agent's win rate with you is a medical emergency.",
    "You play this agent like you're reading the ability descriptions for the first time.",
    "Your teammates see you lock this agent and instantly consider the surrender vote."
  ]
};

const winRateRoasts = {
  abysmal: [
    "A {winRate}% win rate means you're basically a double agent for the enemy team.",
    "Queueing competitive with this win rate is an act of pure psychological warfare on your teammates.",
    "With {wins} wins and {losses} losses, the surrender button is your most clicked UI element."
  ],
  bad: [
    "A {winRate}% win rate: you're not just losing games, you're donating free RR to charity.",
    "{losses} losses in recent memory. Have you considered taking up gardening or chess?",
    "Every time you queue ranked, the matchmaker pairs you with an apology letter."
  ],
  mediocre: [
    "{winRate}% win rate. Perfectly balanced, as all hardstuck accounts should be.",
    "You win one, you lose one, and your rank stays comfortably frozen in time.",
    "Not bad enough to uninstall, not good enough to escape your elo."
  ],
  positive: [
    "{winRate}% win rate! You're technically climbing, one painful single-digit RR win at a time.",
    "Barely above a coin flip. The Valorant gods smile on you every second match."
  ],
  good: [
    "{winRate}% win rate? Smurf detected, or your duo is putting in 40 hours of unpaid labor carrying you.",
    "Winning {winRate}% of your games yet still tilting in all-chat after one lost eco round."
  ]
};

module.exports = {
  rankRoasts,
  mapRoasts,
  agentRoasts,
  winRateRoasts
};
