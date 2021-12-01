let questions = [
    {
        type: "choose-one",
        q: "how are you feeling?<br><span class='type-indicator'>(choose one)</span>",
        options: ["😁", "🤔", "🙁", "😡"],
        sub: [
            "what's put you in a good mood?",
            "what are you thinking about?",
            "what's got you down?",
            "what are you annoyed about?"
        ],
    },
    {
        type: "choose-one",
        q: "how do you feel about speaking with me?<br><span class='type-indicator'>(choose one)</span>",
        options: ["😁", "🤔", "🙁", "😡"],
        sub: [
            "what makes you feel comfortable with me?",
            "what makes you unsure of me?",
            "how can I help you feel more comfortable?",
            "are you rejecting me?"
        ],
    },
    {
        type: "free",
        q: "how would you like to be called? this doesn't have to be your real name.",
        options: null,
        sub: null,
    },
    {
        type: "free",
        q: "would you mind me asking how you describe your gender identity?",
        options: null,
        sub: null,
    },
    {
        type: "choose-one",
        q: "what do you mostly use digital spaces for?<br><span class='type-indicator'>(choose one)</span>",
        options: [
            "creativity and self expression",
            "curation and performance",
            "inspiration and education ",
            "connecting, networking, collaborating",
            "stalking people and comparing",
            "other"
        ],
        sub: ["what do you come to digital spaces for?"],
    },
    {
        type: "choose-multiple",
        q: "what digital danger(s) do you most consider when participating in online spaces?<br><span class='type-indicator'>(choose multiple)</span>",
        options: [
            "data privacy",
            "identity theft",
            "online bullying",
            "censorship",
            "revenge porn",
            "echo chambers and isolation",
            "never considered it",
            "other"
        ],
        sub: ["what digital danger(s) do you feel aware of?"],
    },
    {
        type: "choose-multiple",
        q: "which of these digital spaces do you refuse to use?<br><span class='type-indicator'>(choose multiple)</span>",
        options: [
            "instagram",
            "facebook",
            "twitter",
            "whatsapp",
            "discord",
            "telegram",
            "zoom",
            "dating apps",
            "none",
            "other"
        ],
        sub: ["what other digital space(s) do you refuse?"],
    },
    {
        type: "choose-one",
        q: "how would you describe your relationship with presenting your identity online?<br><span class='type-indicator'>(choose one)</span>",
        options: [
            "always evolving",
            "i love to perform and curate",
            "a love hate relationship",
            "toxic and detached",
            "100% authentic",
            "professional and personal projects only",
            "i’m not sure",
        ],
        sub: null,
    },
    {
        type: "free",
        q: "can you name a new digital encounter you had recently, how did it make you feel?",
        options: null,
        sub: [
            "have you ever had to reject a difgital encounter?",
            "what was the last digital encounter you rejected?"
        ],
    },
    {
        type: "choose-one",
        q: "how do you feel about expressing your gender/sexual identity online?<br><span class='type-indicator'>(choose one)</span>",
        options: ["😁", "🤔", "🙁", "😡"],
        sub: [
            "what makes you feel good about it?",
            "what makes you feel unsure?",
            "what makes you feel unhappy about it?",
            "what makes you feel angry about it?"
        ],
    },
    {
        type: "choose-one",
        q: "do you feel more comfortable expressing your gender/sexual identity online or IRL?<br><span class='type-indicator'>(choose one)</span>",
        options: [
            "online",
            "IRL (in real life)"
        ],
        sub: [
            "what makes you feel safer expressing your identity online?",
            "what makes you feel safer expressing your identity in person?"
        ],
    },
    {
        type: "choose-multiple",
        q: "what act(s) of refusal are you making online?<br><span class='type-indicator'>(choose multiple)</span>",
        options: [
            "deleting a social media account",
            "deleting an app",
            "signing a petition",
            "changing my data settings",
            "changing search browser",
            "boycotting a platform/company",
            "none"
        ],
        sub: ["what other act(s) of refusal have you made online?"],
    },
    {
        type: "choose-one",
        q: "what is most important to you in feeling at home online?<br><span class='type-indicator'>(choose one)</span>",
        options: [
            "privacy",
            "anonymity",
            "autonomy",
            "community",
            "transparency",
            "other"
        ],
        sub: ["what makes you feel at home online?"]
    },
    {
        type: "free",
        q: "could you please share an example of something online that makes you feel inspired and comfortable to express your identity? (e.g. a link to a website)",
        options: null,
        sub: null,
    },
    {
        type: "free",
        q: "what would you want to teach your younger self as they venture into digital worlds in terms of identity and self-expression?",
        options: null,
        sub: null,
    },
    {
        type: "free",
        q: "what tools can we provide people with to empower them to reject and reimagine digital spaces?",
        options: null,
        sub: null,
    },
    {
        type: "free",
        q: "if you could redesign the URL (digital spaces), what would you do to make it a safer and more autonomous home for people?",
        options: null,
        sub: null,
    },
    {
        type: "free",
        q: "i've been talking a lot, do you have any questions for me?",
        options: null,
        sub: null,
    },
];