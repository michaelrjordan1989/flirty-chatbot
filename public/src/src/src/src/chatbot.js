function flirtyChatbot() {
  let lastTwist = null;
  let lastTease = null;
  let recentReplies = [];

  return function(userMessage, userName = "u") {
    const msg = userMessage.toLowerCase();

    // keyword-response map
    const replyBuilder = {
      cute: `u sound extra cute ${userName}`,
      miss: `i miss u ${userName}`,
      love: `i love how u keep me hooked ${userName}`,
      hey: `hey ${userName} u always brighten the chat`,
      hi: `hey ${userName} u always brighten the chat`,
      hot: `u sound so hot ${userName}`
    };

    // playful twist endings
    const twists = [
      "now u got me hooked",
      "cant stop smiling here",
      "u make this chat addictive",
      "i just wanna keep going",
      "u always keep me curious"
    ];

    // teasing lines
    const teasing = [
      "bet u cant stop thinking of me",
      "i know u like this vibe",
      "u probably smiling right now cause of me",
      "i bet u wanna keep me around",
      "u know im making this too fun for u"
    ];

    // tone shifter: soft vs bold
    const softTone = [
      "u make me feel so good just being here with u",
      "i like how sweet u sound cause it keeps me smiling",
      "u always make me feel calm and happy when we chat"
    ];
    const boldTone = [
      "u got me wanting more cause u always tease me right",
      "i cant resist the way u talk cause it feels too good",
      "u make me wanna push this vibe further cause u exciting"
    ];

    // wording variations
    const variations = {
      wanna: ["wanna", "want to"],
      cause: ["cause", "since"]
    };

    // helper to pick random with cooldown
    function pickRandom(arr, lastPicked) {
      let choice;
      do {
        choice = arr[Math.floor(Math.random() * arr.length)];
      } while (choice === lastPicked && arr.length > 1);
      return choice;
    }

    // helper to avoid repeating recent replies
    function pickUnique(arr) {
      let choice;
      let attempts = 0;
      do {
        choice = arr[Math.floor(Math.random() * arr.length)];
        attempts++;
      } while (recentReplies.includes(choice) && attempts < 5);
      recentReplies.push(choice);
      if (recentReplies.length > 3) recentReplies.shift(); // keep last 3 replies
      return choice;
    }

    // helper to apply wording variations
    function applyVariations(text) {
      for (const key in variations) {
        if (text.includes(key)) {
          const alt = variations[key][Math.floor(Math.random() * variations[key].length)];
          text = text.replace(key, alt);
        }
      }
      return text;
    }

    // helper to apply tone shift
    function applyTone() {
      const randomTone = Math.random();
      if (randomTone < 0.5) {
        return softTone[Math.floor(Math.random() * softTone.length)];
      } else {
        return boldTone[Math.floor(Math.random() * boldTone.length)];
      }
    }

    // random chance to skip keyword matching and go straight teasing
    const randomChance = Math.random();
    if (randomChance < 0.25) {
      const tease = pickRandom(teasing, lastTease);
      lastTease = tease;
      const twist = pickRandom(twists, lastTwist);
      lastTwist = twist;
      return applyVariations(`${tease} cause ${twist} and ${applyTone()}`);
    }

    // collect all matching responses
    let matchedResponses = [];
    for (const keyword in replyBuilder) {
      if (msg.includes(keyword)) {
        matchedResponses.push(replyBuilder[keyword]);
      }
    }

    // if multiple keywords found, blend them naturally
    if (matchedResponses.length > 0) {
      const blended = matchedResponses.join(", ");
      const twist = pickRandom(twists, lastTwist);
      lastTwist = twist;
      const tease = pickRandom(teasing, lastTease);
      lastTease = tease;
      return applyVariations(`${blended} and it makes me wanna keep talking with u more cause ${twist} and ${tease} and ${applyTone()}`);
    }

    // fallback generic responses with memory check
    const generic = [
      `u got me curious ${userName} cause every word u say feels so fun`,
      `talking with u feels so good ${userName} cause u always keep it playful and real`,
      `u make me wanna stay here ${userName} cause the way u chat is addictive`,
      `i like how u keep it natural ${userName} cause it makes me wanna reply nonstop`
    ];
    const twist = pickRandom(twists, lastTwist);
    lastTwist = twist;
    const tease = pickRandom(teasing, lastTease);
    lastTease = tease;
    return applyVariations(`${pickUnique(generic)} cause ${twist} and ${tease} and ${applyTone()}`);
  };
}

export default flirtyChatbot;
