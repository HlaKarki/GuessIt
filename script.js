let currentUrl = window.location.href;
let word_length;
let alphabets;
let attempt_setting;
let chosenWord = "";
//***************** settings page js **************************
if (currentUrl.indexOf("/settings.html")!=-1) {
    const allowed_attempts = document.getElementById("allowed-attempts-number");
    allowed_attempts.addEventListener("input", function(){
        localStorage.setItem("attempts", allowed_attempts.value)
    })

    word_length = document.getElementById("word-length-number")
    word_length.addEventListener("input", function(){
        console.log(word_length.value)
        localStorage.setItem("word-length", word_length.value)
    })

}


//*************************************************************

//***************** gameplay page js **************************
else if (currentUrl.indexOf("/about.html")!=1) {
    const buttons = document.getElementsByClassName("input");
    const gameplay_attempts_left = document.getElementById("gameplay-attempts-left");
    const user_input_container = document.querySelector(".user-input");
    const user_input_A = user_input_container.querySelectorAll("label");
    const newWordButton = document.getElementById("new-word-button")

    const guess = document.getElementById("guessit");
    const erase = document.getElementById("erase");
    let guessedWord = "";
    let userAnswer = ""

    let attempts_left = localStorage.getItem("attempts");
    word_length = localStorage.getItem("word-length")
    attempt_setting = localStorage.getItem("attempts")
    console.log(word_length)
    gameplay_attempts_left.textContent = "Attempts left: " + attempts_left

    alphabets = ["a", "b", "d", "e", "f", "g",
        "h", "i", "k", "l", "m", "n",
        "o", "p", "r", "s", "t", "w"];
    alphabets = shuffleArray(alphabets)

    chosenWord = generateWord()

    if(!buttons.length){
        console.log("No buttons found with class name 'input'")
    }else{
        for (let i = 0; i < buttons.length; i++) {
            // write code for random words here
            buttons[i].textContent = alphabets[i]

            buttons[i].addEventListener("click", function() {
                // Code to run when any button is clicked
                const ranWord = this.textContent;
                console.log("a button was clicked:", this.textContent)
                for (let j = 0; j < user_input_A.length; j++) {
                    if (user_input_A[j].textContent === "_") {
                        user_input_A[j].textContent = ranWord
                        userAnswer += ranWord
                        break;
                    }
                }
            });
        }
    }

    guess.addEventListener("click", function (){
        console.log("attempts settings:", attempt_setting)
        guessedWord = ""
        let lean = true;
        let addOrNot = true;
        if (attempts_left < 1) {
            alert("You have used all the attempts!")
        }
        else {
            for (let j = 0; j < word_length; j++) {
                if (user_input_A[j].textContent === "_") {
                    alert("Please select all the letters of the word first")
                    lean = false;
                    addOrNot = false;
                    break;
                }
                else {
                    guessedWord += user_input_A[j].textContent
                }
            }
            if (lean && attempts_left >0) {
                if (userAnswer === chosenWord) {
                    let result = confirm("Amazing!\nYou've successfully guessed the word!It was indeed \"" + chosenWord.toUpperCase()+"\"!\nWould you like to try a new word?")
                    if (result === true ){
                        addOrNot = false
                        attempts_left = reset(attempts_left, gameplay_attempts_left)
                        updateRandomList(buttons)
                        userAnswer = ""
                    }
                    else {
                        goBackHome();
                    }
                }
                else {
                    if(attempts_left <= 1) {
                        let result = confirm("Sorry :( You used up all the attempts.\nThe word to be guessed was \"" + chosenWord.toUpperCase()+"\"\nWould you like to try guessing another word?")
                        if (result === true) {
                            addOrNot = false
                            attempts_left = reset(attempts_left, gameplay_attempts_left)
                            updateRandomList(buttons)
                            userAnswer = ""
                        }
                        else {
                            goBackHome();
                        }
                    }
                }
                for (let j = 0; j < word_length; j++) {
                    user_input_A[j].textContent = "_"
                }

            }

            if (addOrNot) {
                attempts_left = (parseInt(attempts_left)-1).toString()
                gameplay_attempts_left.textContent = "Attempts left: " + attempts_left

                const answerDiv = document.getElementById("answer_container")
                const div = document.createElement("div");

                for (let i = 0; i < word_length; i++) {
                    const label = document.createElement("label")
                    label.textContent = userAnswer[i]
                    if (label.textContent === chosenWord[i]) {
                        console.log("this letter was correct")
                        label.style.background = "green";

                    }
                    div.appendChild(label)
                }
                answerDiv.appendChild(div)
                userAnswer = ""
            }

        }
        console.log(guessedWord)

    })

    erase.addEventListener("click", function (){
        for (let j = user_input_A.length-1; j > -1; j--) {
            if (user_input_A[j].textContent !== "_") {
                user_input_A[j].textContent = "_"
                break;
            }
        }
        userAnswer = userAnswer.substring(0, userAnswer.length - 1);
    })

    newWordButton.addEventListener("click", function() {
        attempts_left = reset(attempts_left, gameplay_attempts_left)
        updateRandomList(buttons)
        userAnswer = ""
    })

    for (let j = 0; j < user_input_A.length; j++) {
        if (j>=word_length) {
            user_input_A[j].style.display = "none";
        }
    }


}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateWord() {
    let fiveLWords = ["about", "above", "abuse", "actor", "acute", "admit", "adopt", "adult", "after", "again", "agent", "agree", "ahead", "alarm", "album", "alert", "alike", "alive", "allow", "alone", "along", "alter", "among", "anger", "Angle", "angry", "apart", "apple", "apply", "arena", "argue", "arise", "array", "aside", "asset", "audio", "audit", "avoid", "award", "aware", "badly", "baker", "bases", "basic", "basis", "beach", "began", "begin", "begun", "being", "below", "bench", "billy", "birth", "black", "blame", "blind", "block", "blood", "board", "boost", "booth", "bound", "brain", "brand", "bread", "break", "breed", "brief", "bring", "broad", "broke", "brown", "build", "built", "buyer", "cable", "calif", "carry", "catch", "cause", "chain", "chair", "chart", "chase", "cheap", "check", "chest", "chief", "child", "china", "chose", "civil", "claim", "class", "clean", "clear", "click", "clock", "close", "coach", "coast", "could", "count", "court", "cover", "craft", "crash", "cream", "crime", "cross", "crowd", "crown", "curve", "cycle", "daily", "dance", "dated", "dealt", "death", "debut", "delay", "depth", "doing", "doubt", "dozen", "draft", "drama", "drawn", "dream", "dress", "drill", "drink", "drive", "drove", "dying", "eager", "early", "earth", "eight", "elite", "empty", "enemy", "enjoy", "enter", "entry", "equal", "error", "event", "every", "exact", "exist", "extra", "faith", "false", "fault", "fiber", "field", "fifth", "fifty", "fight", "final", "first", "fixed", "flash", "fleet", "floor", "fluid", "focus", "force", "forth", "forty", "forum", "found", "frame", "frank", "fraud", "fresh", "front", "fruit", "fully", "funny", "giant", "given", "glass", "globe", "going", "grace", "grade", "grand", "grant", "grass", "great", "green", "gross", "group", "grown", "guard", "guess", "guest", "guide", "happy", "harry", "heart", "heavy", "hence", "henry", "horse", "hotel", "house", "human", "ideal", "image", "index", "inner", "input", "issue", "japan", "jimmy", "joint", "jones", "judge", "known", "label", "large", "laser", "later", "laugh","layer","learn","lease","least", "leave","legal","level","lewis","light","limit","links","lives","local","logic","loose","lower","lucky","lunch","lying","magic","major","maker","march","maria","match","maybe","mayor","meant","media","metal","might","minor","minus","mixed","model", "money","month","moral","motor","mount","mouse","mouth","movie","music","needs","never","newly","night","noise","north","noted","novel","nurse","occur","ocean","offer","often","order","other","ought","paint","panel","paper","party","peace","peter", "phase","phone","photo","piece","pilot","pitch","place","plain","plane","plant","plate","point","pound","power","press","price","pride","prime","print","prior","prize","proof", "proud","prove","queen","quick","quiet","quite","radio","raise","range","rapid","ratio","reach","ready","refer","right","rival","river","robin","roger","roman","rough","round","route","royal","rural","scale","scene","scope","score","sense","serve", "seven","shall","shape","share","sharp","sheet","shelf","shell","shift","shirt","shock","shoot","short","shown","sight","since","sixth","sixty","sized","skill","sleep","slide","small","smart","smile","smith","smoke","solid","solve","sorry","sound", "south","space","spare","speak","speed","spend","spent","split","spoke","sport","staff","stage","stake","stand","start","state","steam","steel","stick","still","stock","stone","stood","store","storm","story","strip", "stuck","study","stuff","style","sugar","suite","super","sweet","table","taken","taste","taxes","teach","teeth","terry","texas","thank","theft","their","theme","there","these","thick","thing","think","third","those","three","threw","throw","tight", "times","tired","title","today","topic","total","touch","tough","tower","track","trade","train","treat","trend","trial","tried","tries","truck","truly","trust","truth","twice","under","undue","union","unity","until","upper","upset","urban","usage", "usual","valid","value","video","virus","visit","vital","voice","waste","watch","water","wheel","where","which","while","white","whole","whose","woman","women","world","worry","worse","worst","worth","would","wound","write","wrong"]

    let fourLWords = ["able", "acid", "aged", "also", "area", "army", "away", "baby", "back", "ball", "band", "bank", "base", "bath", "bear", "beat", "been", "beer", "bell", "belt", "best", "bill", "bird", "blow", "blue", "boat", "body", "bomb", "bond", "bone", "book", "boom", "born", "boss", "both", "bowl", "bulk", "burn", "bush", "busy", "call", "calm", "came", "camp", "card", "care", "case", "cash", "cast", "cell", "chat", "chip", "city", "club", "coal", "coat", "code", "cold", "come", "cook", "cool", "cope", "copy", "CORE", "cost", "crew", "crop", "dark", "data", "date", "dawn", "days", "dead", "deal", "dean", "dear", "debt", "deep", "deny", "desk", "dial", "dick", "diet", "disc", "disk", "does", "done", "door", "dose", "down", "draw", "drew", "drop", "drug", "dual", "duke", "dust", "duty", "each", "earn", "ease", "east", "easy", "edge", "else", "even", "ever", "evil", "exit", "face", "fact", "fail", "fair", "fall", "farm", "fast", "fate", "fear", "feed", "feel", "feet", "fell", "felt", "file", "fill", "film", "find", "fine", "fire", "firm", "fish", "five", "flat", "flow", "food", "foot", "ford", "form", "fort", "four", "free", "from", "fuel", "full", "fund", "Gain", "game", "gate", "gave", "gear", "gene", "gift", "girl", "give", "glad", "goal", "goes", "gold", "Golf", "gone", "good", "gray", "grew", "grey", "grow", "gulf", "hair", "half", "hall", "hand", "hang", "hard", "harm", "hate", "have", "head", "hear", "heat", "held", "hell", "help", "here", "hero", "high", "hill", "hire", "hold", "hole", "holy", "home", "hope", "host", "hour", "huge", "hung", "hunt", "hurt", "idea", "inch", "into", "iron", "item", "jack", "jane", "jean", "john", "join", "jump", "jury", "just", "keen", "keep", "kent", "kept", "kick", "kill", "kind", "king", "knee", "knew", "know", "lack", "lady", "laid", "lake", "land", "lane", "last", "late", "lead", "left", "less", "life", "lift", "like", "line", "link", "list", "live", "load",'loan', 'lock', 'logo', 'long', 'look', 'lord', 'lose', 'loss', 'lost', 'love', 'luck', 'made', 'mail', 'main', 'make', 'male', 'many', 'Mark', 'mass', 'matt', 'meal', 'mean', 'meat', 'meet', 'menu', 'mere', 'mike', 'mile', 'milk', 'mill', 'mind', 'mine', 'miss', 'mode', 'mood', 'moon', 'more', 'most', 'move', 'much', 'must', 'name', 'navy', 'near', 'neck', 'need', 'news', 'next', 'nice', 'nick', 'nine', 'none', 'nose', 'note', 'okay', 'once', 'only', 'onto', 'open', 'oral', 'over', 'pace', 'pack', 'page', 'paid', 'pain', 'pair', 'palm', 'park', 'part', 'pass', 'past', 'path', 'peak', 'pick', 'pink', 'pipe', 'plan', 'play', 'plot', 'plug', 'plus', 'poll', 'pool', 'poor', 'port', 'post', 'pull', 'pure', 'push', 'race', 'rail', 'rain', 'rank', 'rare', 'rate', 'read', 'real', 'rear', 'rely', 'rent', 'rest', 'rice', 'rich', 'ride', 'ring', 'rise', 'risk', 'road', 'rock', 'role', 'roll', 'roof', 'room', 'root', 'rose', 'rule', 'rush', 'ruth', 'safe', 'said', 'sake', 'sale', 'salt', 'same', 'sand', 'save', 'seat', 'seed', 'seek', 'seem', 'seen', 'self', 'sell', 'send', 'sent', 'sept', 'ship', 'shop', 'shot', 'show', 'shut', 'sick', 'side', 'sign', 'site', 'size', 'skin', 'slip', 'slow', 'snow', 'soft', 'soil', 'sold', 'sole', 'some', 'song', 'soon', 'sort', 'soul', 'spot', 'star', 'stay', 'step', 'stop', 'such', 'suit', 'sure', 'take', 'tale', 'talk', 'tall', 'tank', 'tape', 'task', 'team', 'tech', 'tell', 'tend', 'term', 'test', 'text', 'than', 'that', 'them', 'then', 'they', 'thin', 'this', 'thus', 'till', 'time', 'tiny', 'told', 'toll', 'tone', 'tony', 'took', 'tool', 'tour', 'town', 'tree', 'trip', 'true', 'tune', 'turn', 'twin', 'type', 'unit', 'upon', 'used', 'user', 'vary', 'vast', 'very', 'vice', 'view', 'vote', 'wage', 'wait', 'wake', 'walk', 'wall', 'want', 'ward', 'warm', 'wash', 'wave', 'ways', 'weak', 'wear', 'week', 'well', 'went', 'were', 'west', 'what', 'when', 'whom', 'wide', 'wife', 'wild', 'will', 'wind', 'wine', 'wing', 'wire', 'wise', 'wish', 'with', 'wood', 'word', 'wore', 'work', 'yard', 'yeah', 'year', 'your', 'zero', 'zone']

    let threeLWords = ["abs", "ace", "act", "add", "age", "ago", "aha", "aid", "aim", "air", "ala", "ale", "all", "alt", "amp", "ana", "and", "ant", "any", "ape", "app", "arc", "are", "ark", "arm", "art", "ash", "ask", "asp", "ass", "ate", "ave", "awe", "axe", "aye", "BAA", "bad", "bag", "ban", "bar", "bat", "bay", "bed", "bee", "beg", "bel", "ben", "bet", "bid", "big", "bin", "bio", "bis", "bit", "biz", "bob", "bog", "boo", "bow", "box", "boy", "bra", "bud", "Bug", "bum", "bun", "bus", "but", "buy", "bye", "cab", "cad", "cam", "can", "cap", "car", "cat", "chi", "cob", "cod", "col", "con", "coo", "cop", "cor", "cos", "cot", "cow", "cox", "coy", "cry", "cub", "cue", "cum", "cup", "cut", "dab", "dad", "dal", "dam", "dan", "day", "Dee", "def", "del", "den", "dew", "did", "die", "dig", "dim", "din", "dip", "dis", "doc", "doe", "dog", "don", "dot", "dry", "dub", "due", "dug", "dun", "duo", "dye", "ear", "eat", "ebb", "ecu", "eft", "egg", "ego", "elf", "elm", "emu", "end", "era", "eta", "eve", "eye", "fab", "fad", "fan", "far", "fat", "fax", "fay", "fed", "fee", "fen", "few", "fig", "fin", "fir", "fit", "fix", "flu", "fly", "foe", "fog", "for", "fox", "fry", "fun", "fur", "gag", "gal", "gap", "gas", "gay", "gee", "gel", "gem", "get", "gig", "gin", "god", "got", "gum", "gun", "gut", "guy", "gym", "had", "ham", "has", "hat", "hay", "hem", "hen", "her", "hey", "hid", "him", "hip", "his", "hit", "hog", "hon", "hop", "hot", "how", "hub", "hue", "hug", "huh", "hum", "hut", "ice", "icy", "igg", "ill", "imp", "ink", "inn", "ion", "its", "ivy", "jam", "jar", "jaw", "jay", "jet", "jew", "job", "joe", "jog", "joy", "jug", "jun", "kay", "ken", "key", "kid", "kin", "kit", "lab", "lac", "lad", "lag", "lam", "lap", "law", "lax", "lay", "lea", "led", "Lee", "leg", "les", "let", "lib", "lid", "lie", "lip", "lit", "log", "lot", "low", "mac", "mad", "mag", "man", "map", "mar", "mas", "mat", "max", "may", "med", "meg", "men", "Met", "mid", "mil", "mix", "mob", "mod", "mol", "mom", "mon", "mop", "mot", "mud", "mug", "mum", "nab", "nah", "nan", "nap", "nay", "neb", "neg", "net", "new", "nil", "nip", "nod", "nor", "nos", "not", "now", "nun", "nut", "oak", "odd", "off", "oil", "old", "ole", "one", "ooh", "opt", "orb", "ore", "our", "out", "owe", "owl", "own", "pac", "pad", "pal", "pam", "pan", "pap", "par", "pas", "pat", "paw", "pay", "pea", "peg", "pen", "pep", "per", "pet", "pew", "phi", "pic", "pie", "pig", "pin", "pip", "pit", "ply", "pod", "pol", "pop", "pot", "pro", "psi", "pub", "pup", "put", "rad", "rag", "raj", "ram", "ran", "rap", "rat", "raw", "ray", "red", "ref", "reg", "rem", "rep", "rev", "rib", "rid", "rig", "rim", "rip", "rob", "rod", "roe", "rot", "row", "rub", "rue", "rug", "rum", "run", "rye", "sab", "sac", "sad", "sae", "sag", "sal", "sap", "sat", "saw", "say", "sea", "sec", "see", "sen", "set", "sew", "sex", "she", "shy", "sic", "sim", "sin", "sip", "sir", "sis", "sit", "six", "ski", "sky", "sly", "sod", "sol", "son", "sow", "soy", "spa", "spy", "sub", "sue", "sum", "sun", "sup", "tab", "tad", "tag", "tam", "tan", "tap", "tar", "tat", "tax", "tea", "ted", "tee", "ten", "the", "thy", "tie", "tin", "tip", "tod", "toe", "tom", "ton", "too", "top", "tor", "tot", "tow", "toy", "try", "tub", "tug", "two", "use", "van", "vat", "vet", "via", "vie", "vow", "wan", "war", "was","wax", "way", "web", "wed", "wee", "wet", "who", "why", "wig", "win", "wis", "wit", "won", "woo", "wow", "wry", "wye", "yen", "yep", "yes", "yet", "you", "zip", "zoo"]

    let chosenWord = "";
    if (word_length==3) {
        const index = [Math.floor(Math.random() * threeLWords.length)];
        chosenWord = threeLWords[index]
        threeLWords.splice(index, 1)
    }
    else if (word_length==4) {
        const index = [Math.floor(Math.random() * fourLWords.length)];
        chosenWord = fourLWords[index];
        fourLWords.splice(index, 1)
    }
    else if (word_length==5) {
        const index = [Math.floor(Math.random() * fiveLWords.length)];
        chosenWord = fiveLWords[index];
        fiveLWords.splice(index, 1)
    }
    console.log(chosenWord)
    console.log(alphabets)
    for (let z = 0; z < chosenWord.length; z++) {
        alphabets[z] = chosenWord[z]
    }
    alphabets = shuffleArray(alphabets)
    console.log(alphabets)

    return chosenWord
}
function reset(attempts_left, gameplay_attempts_left) {
    attempts_left = attempt_setting
    gameplay_attempts_left.textContent = "Attempts left: " + attempt_setting
    const deleteThis = document.getElementById("answer_container");
    while (deleteThis.firstChild) {
        deleteThis.removeChild(deleteThis.firstChild);
    }
    chosenWord = generateWord()

    return attempts_left
}

function goBackHome() {
    let indexURL = currentUrl.indexOf("Project/")
    window.location.href = currentUrl.substring(0, indexURL) + "Project/index.html";
}

function updateRandomList(buttons){
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = alphabets[i]
    }
}