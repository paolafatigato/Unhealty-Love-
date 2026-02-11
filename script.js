// Global Variables
let currentSection = 'intro';
let completedSections = new Set();

// Quiz Data - Simple English with scaffolding
const quizData = [
    {
        question: "Myth: He is violent to his girlfriend because he was abused as a child.",
        correct: false,
        explanation: "MYTH! While childhood abuse may correlate with some behaviors, most people who were abused do NOT become abusers. It's a choice, not a destiny."
    },
    {
        question: "Fact: He can be an abuser, even if he is a college graduate.",
        correct: true,
        explanation: "FACT! Abuse happens in all social classes, education levels, and religions. Success or status doesn't prevent abusive behavior."
    },
    {
        question: "Myth: Alcohol or drugs make him abusive.",
        correct: false,
        explanation: "MYTH! Substances don't create abuse - they're often used as an excuse. Many abusers are violent when sober, and many substance users are not violent."
    },
    {
        question: "Myth: He loses control when he's angry.",
        correct: false,
        explanation: "MYTH! If he really 'lost control', he'd be violent to everyone. Instead, he chooses who to abuse and when. He's actually very much IN control."
    },
    {
        question: "Fact: Abusers often believe they have special rights in relationships.",
        correct: true,
        explanation: "FACT! Bancroft found that abusers typically believe they're entitled to special treatment and that their needs should come first."
    },
    {
        question: "Myth: If she just stopped wearing mini skirts, he wouldn't be abusive.",
        correct: false,
        explanation: "MYTH! The victim's behavior doesn't cause abuse. Abusers find excuses no matter what their partner does. It's about control, not reaction."
    },
    {
        question: "Fact: Abusive behavior is learned, not genetic.",
        correct: true,
        explanation: "FACT! Abuse is a learned pattern of behavior and attitudes, which means it CAN be unlearned - if the person takes responsibility."
    },
    {
        question: "Myth: Couples counseling can fix an abusive relationship.",
        correct: false,
        explanation: "MYTH! Couples therapy can be dangerous in abusive relationships. The abuser needs individual therapy focused on taking responsibility, not 'relationship problems'."
    }
];

// Semaforo Data - Clear scenarios with key vocabulary
const semaforoScenarios = [
    {
        scenario: "Marco asks Giulia if she wants to go out on Saturday. She says 'no, I already have plans' and he responds 'Okay, maybe another time!'",
        correct: "green",
        explanation: "GREEN ✅ Marco respects Giulia's answer without pressure or complaints. This is respect!",
        vocabulary: "respect = treating someone well, listening to their decisions"
    },
        {
        scenario: "Tom says: 'You look better without makeup.'",
        correct: "yellow",
        explanation: "YELLOW ⚠️ Could be a compliment OR the start of controlling how you look. Pay attention if it becomes a rule.",
        vocabulary: "compliment = saying something nice about someone"
    },
    {
        scenario: "Luca gets angry every time Sara goes out with her friends. He sends her many messages asking where she is.",
        correct: "red",
        explanation: "RED 🚫 This is control disguised as worry. Sara has the right to her social life without constant explanations.",
        vocabulary: "control = when someone wants to decide everything for you"
    },
        {
        scenario: "After saying something mean, Jake buys flowers and says 'I'll never do it again.'",
        correct: "yellow",
        explanation: "YELLOW ⚠️ Actions matter more than gifts. If it happens again, the promise was empty.",
        vocabulary: "promise = saying you will do something"
    },
    {
        scenario: "Elena tells Tom 'I'm sorry, but today I prefer to be alone' and he responds 'I understand, call me if you need anything'.",
        correct: "green",
        explanation: "GREEN ✅ Tom respects Elena's boundaries and shows he's available without being invasive.",
        vocabulary: "boundaries = your personal limits, what's okay and not okay for you"
    },
        {
        scenario: "During a fight, Alex punches the wall.",
        correct: "red",
        explanation: "RED 🚫 This is intimidation. Violence near you is a threat, even if not directed at you.",
        vocabulary: "intimidation = scaring someone to control them"
    },
    {
        scenario: "Leila is sad today, she tells Chris 'If you really care about me, you'll cancel your plans and stay with me'.",
        correct: "red",
        explanation: "RED 🚫 This is emotional manipulation. Using love as blackmail to control someone's decisions is abusive.",
        vocabulary: "manipulation = making someone feel bad to get what you want"
    },
        {
        scenario: "Mike jokes about Emma in front of friends. She feels embarrassed but he says 'It's just a joke!'",
        correct: "yellow",
        explanation: "YELLOW ⚠️ If she's hurt, it's not funny. Good partners care about your feelings, not just their intentions.",
        vocabulary: "embarrassed = feeling ashamed or uncomfortable"
    },
    {
        scenario: "Tom says: 'You look better without makeup.'",
        correct: "yellow",
        explanation: "YELLOW ⚠️ Could be a compliment OR the start of controlling how you look. Pay attention if it becomes a rule.",
        vocabulary: "compliment = saying something nice about someone"
    },
    {
        scenario: "During an argument, Paolo tells Anna 'You're right, I didn't think about that. Sorry'.",
        correct: "green",
        explanation: "GREEN ✅ Admitting mistakes and apologizing sincerely is a sign of maturity and respect.",
        vocabulary: "apologize = to say sorry, to admit you were wrong"
    },
    {
        scenario: "After a fight, Lisa tells Marco 'That never happened, you're making it up. You're crazy!'",
        correct: "red",
        explanation: "RED 🚫 This is gaslighting - making someone doubt their own memory and perception. It's a serious form of manipulation.",
        vocabulary: "gaslighting = making someone think they're wrong about what really happened"
    },
    {
        scenario: "Davide asks Sofia for her phone password saying 'If you have nothing to hide, it's not a problem'.",
        correct: "red",
        explanation: "RED 🚫 Privacy doesn't mean hiding something. Everyone has the right to private spaces. This is manipulation.",
        vocabulary: "privacy = your right to keep some things private"
    },
        {
        scenario: "Anna says 'I need time to think' and Luca waits without calling her.",
        correct: "green",
        explanation: "GREEN ✅ Giving space when asked shows respect and emotional maturity.",
        vocabulary: "space = time alone to think or relax"
    },
        {
        scenario: "Paul says 'Nobody else would love you like I do.'",
        correct: "red",
        explanation: "RED 🚫 This isolates you and lowers your self-worth. Love doesn't make you feel trapped.",
        vocabulary: "self-worth = how much you value yourself"
    }
];

// Decoder Data - Clear excuses with simple explanations
const decoderExcuses = [
    {
        excuse: "I'm made this way, I can't help it!",
        reality: "Nobody is 'made' to hurt others. Behaviors are choices, not destiny.",
        type: "Denying responsibility",
        vocabulary: "responsibility = being accountable for your actions"
    },
    {
        excuse: "I was stressed/angry, it wasn't my fault!",
        reality: "Emotions don't justify abuse. Everyone feels stress and anger, but not everyone reacts with violence.",
        type: "Blaming external circumstances",
        vocabulary: "justify = to give a reason why something is okay (but it's not!)"
    },
    {
        excuse: "I do it because I love you too much!",
        reality: "Love doesn't hurt. Control, jealousy and possessiveness are not love, they are abuse.",
        type: "Romanticizing abuse",
        vocabulary: "possessiveness = wanting to own or control someone"
    },
    {
        excuse: "You make me angry by behaving like that!",
        reality: "You are not responsible for others' actions. Everyone chooses how to react.",
        type: "Blaming the victim",
        vocabulary: "victim = person who is hurt by someone else's actions"
    },
    {
        excuse: "I was just joking! Can't you take a joke?",
        reality: "If it hurts you, it's not a joke. Your feelings are valid.",
        type: "Minimizing",
        vocabulary: "minimizing = making something seem less important than it is"
    },
    {
        excuse: "I promise it will never happen again!",
        reality: "Promises without concrete actions are empty. Change requires time, therapy and real commitment.",
        type: "Empty promises",
        vocabulary: "concrete = real, specific; commitment = serious promise to do something"
    }
];

// Matching Game Data - Types from Bancroft with clear descriptions
// Matching Game Data - Types with multiple example phrases
const manipulatorTypes = [
    {
        name: "Mr. Right",
        description: "Thinks he's always right and doesn't listen to others' opinions. Constantly corrects people and makes them feel inferior.",
        vocabulary: "inferior = less important, not as good"
    },
    {
        name: "The Victim",
        description: "Always presents himself as a victim to avoid responsibility. Uses pity to manipulate.",
        vocabulary: "pity = feeling sorry for someone"
    },
    {
        name: "The Drill Sergeant",
        description: "Controls every aspect of his partner's life with rigid rules. Wants total obedience.",
        vocabulary: "obedience = doing what you're told without question"
    },
    {
        name: "The Water Torturer",
        description: "Subtle and sneaky. Constantly criticizes in ways that are not obvious, making the other person feel 'crazy' if they protest.",
        vocabulary: "subtle = not obvious; sarcastic = saying the opposite of what you mean to be mean"
    },
    {
        name: "The Player",
        description: "Wants attention and multiple conquests. Uses people for his own selfish gratification.",
        vocabulary: "flirt = to show romantic interest; gratification = satisfaction, pleasure"
    },
    {
        name: "Mr. Sensitive",
        description: "Presents himself as emotional and vulnerable at first, but uses this image to manipulate and control.",
        vocabulary: "vulnerable = easily hurt; guilty = feeling bad because you think you did something wrong"
    }
];

// Phrases for matching - multiple per type
const manipulatorPhrases = [
    // Mr. Right
    { phrase: "You're wrong. Let me explain how things really are.", type: 0 },
    { phrase: "I know better than you about this.", type: 0 },
    { phrase: "Why don't you ever listen to me? I'm always right.", type: 0 },
    
    // The Victim
    { phrase: "After everything I've done for you, you treat me like this?", type: 1 },
    { phrase: "Nobody understands me, only you can help me.", type: 1 },
    { phrase: "You're so lucky to have me. No one else would put up with you.", type: 1 },
    
    // The Drill Sergeant
    { phrase: "You need my permission before you go anywhere.", type: 2 },
    { phrase: "I decide what's best for us.", type: 2 },
    { phrase: "You can't wear that. Change your clothes.", type: 2 },
    
    // The Water Torturer
    { phrase: "*sighs and rolls eyes* Whatever you say...", type: 3 },
    { phrase: "I never said that. You're remembering it wrong.", type: 3 },
    { phrase: "You're too sensitive. I was just joking.", type: 3 },
    
    // The Player
    { phrase: "She's just a friend. Why are you so jealous?", type: 4 },
    { phrase: "I need my freedom. Don't be so controlling.", type: 4 },
    { phrase: "You're not the only person in my life, you know.", type: 4 },
    
    // Mr. Sensitive
    { phrase: "I'm so sensitive, you hurt my feelings.", type: 5 },
    { phrase: "You don't understand how hard this is for me.", type: 5 },
    { phrase: "I'm trying my best. Why are you being so mean?", type: 5 }
];

// Case Studies Data - Realistic scenarios with clear choices
const caseStudies = [
    {
        story: "Sofia and Luca have been together for 3 months. Lately Luca gets angry if Sofia goes out with her friends. He says 'If you really loved me, you'd prefer to be with me.' Sofia feels guilty but she misses going out with her friends.",
        question: "What should Sofia do?",
        vocabulary: "guilty = feeling bad, like you did something wrong",
        choices: [
            {
                text: "Stop going out with her friends to make Luca happy",
                good: false,
                feedback: "No. Isolating your partner from friends is a serious warning sign. Healthy love doesn't require giving up important relationships.",
                vocabulary: "isolating = separating someone from other people"
            },
            {
                text: "Talk to Luca explaining that friendships are important and she has the right to a social life",
                good: true,
                feedback: "Yes! Communicating your needs is essential. If Luca respects Sofia, he'll understand. If he continues to manipulate her, it's a warning sign.",
                vocabulary: "essential = very important, necessary"
            },
            {
                text: "Go out secretly to avoid arguments",
                good: false,
                feedback: "No. You shouldn't have to hide normal parts of your life. This would indicate a relationship based on fear, not respect.",
                vocabulary: "secretly = without telling anyone; avoid = to stay away from"
            }
        ]
    },
    {
        story: "Marco and Elena had a fight. Marco shouted and threw Elena's phone against the wall. Now he's crying saying 'I'm so sorry, I was just angry. It will never happen again, I promise!'",
        question: "Should Elena believe Marco?",
        vocabulary: "threw = past tense of 'throw' (to send something through the air with force)",
        choices: [
            {
                text: "Yes, if he apologizes he's sincere and deserves another chance",
                good: false,
                feedback: "No. Apologies without concrete actions are empty. Violence (physical or towards objects) tends to escalate. Professional help is needed.",
                vocabulary: "escalate = to become worse, more serious"
            },
            {
                text: "It depends, if it's the first time it might be an isolated mistake",
                good: false,
                feedback: "Be careful! Even a 'first time' is serious. Destroying objects in anger is violence and intimidation. The cycle of abuse often starts this way.",
                vocabulary: "isolated = alone, not connected to other events; intimidation = making someone scared"
            },
            {
                text: "No, she should talk to a trusted adult and seriously consider if she should continue the relationship",
                good: true,
                feedback: "Exactly. Physical violence (even towards objects) is a serious warning sign. Marco needs professional help, not just to apologize.",
                vocabulary: "consider = to think carefully about something"
            }
        ]
    },
    {
        story: "Anna notices that her boyfriend Tom always checks her phone and social media. When she complains, he says 'It's normal between boyfriends and girlfriends! If you have nothing to hide, what's the problem?'",
        question: "How should Anna respond?",
        vocabulary: "complains = says she doesn't like something",
        choices: [
            {
                text: "He's right, if I have no secrets it doesn't matter",
                good: false,
                feedback: "No! Privacy ≠ Secrets. Everyone has the right to private spaces. Checking someone's phone is a violation of privacy and a sign of control.",
                vocabulary: "violation = breaking a rule or right"
            },
            {
                text: "Explain that privacy is a right, not a secret, and that trust doesn't require surveillance",
                good: true,
                feedback: "Perfect! Healthy relationships are based on trust, not control. Anna has the right to her boundaries.",
                vocabulary: "surveillance = watching someone closely; trust = believing someone is honest"
            },
            {
                text: "Accept it but ask to be able to check Tom's phone too",
                good: false,
                feedback: "No. Mutual control is not 'fairness', it's double control. Healthy relationships don't need surveillance.",
                vocabulary: "mutual = affecting both people; fairness = treating people equally"
            }
        ]
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    initializeQuiz();
    initializeSemaforo();
    initializeDecoder();
    initializeMatching();
    initializeCases();
    updateProgress();
});

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mark section as completed
    if (currentSection !== sectionId) {
        completedSections.add(currentSection);
        saveProgress();
    }
    
    currentSection = sectionId;
    updateProgress();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Emergency Exit
function emergencyExit() {
    window.location.href = 'https://www.google.com/search?q=weather';
}

// Progress Management
function updateProgress() {
    const totalSections = 9;
    const progress = (completedSections.size / totalSections) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function saveProgress() {
    localStorage.setItem('healthyRelations_progress', JSON.stringify([...completedSections]));
}

function loadProgress() {
    const saved = localStorage.getItem('healthyRelations_progress');
    if (saved) {
        completedSections = new Set(JSON.parse(saved));
    }
}

// QUIZ FUNCTIONALITY
let currentQuizIndex = 0;
let quizScore = 0;

function initializeQuiz() {
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const container = document.getElementById('quizContainer');
    const resultBox = document.getElementById('quizResult');
    
    if (currentQuizIndex >= quizData.length) {
        showQuizResults();
        return;
    }
    
    const question = quizData[currentQuizIndex];
    
    container.innerHTML = `
        <div class="question-container">
            <p class="question-text">Question ${currentQuizIndex + 1} of ${quizData.length}</p>
            <p class="question-text">${question.question}</p>
            <div class="options">
                <button class="option-btn" onclick="checkQuizAnswer(true)">TRUE</button>
                <button class="option-btn" onclick="checkQuizAnswer(false)">FALSE</button>
            </div>
            <div id="quiz-explanation"></div>
        </div>
    `;
    
    resultBox.classList.remove('show');
}

function checkQuizAnswer(answer) {
    const question = quizData[currentQuizIndex];
    const buttons = document.querySelectorAll('.option-btn');
    const explanationDiv = document.getElementById('quiz-explanation');
    
    // Disable buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Mark correct/incorrect
    buttons.forEach(btn => {
        const btnValue = btn.textContent === 'TRUE';
        if (btnValue === question.correct) {
            btn.classList.add('correct');
        }
        if (btnValue === answer && answer !== question.correct) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show explanation
    const isCorrect = answer === question.correct;
    if (isCorrect) quizScore++;
    
    explanationDiv.innerHTML = `
        <div class="explanation ${isCorrect ? '' : 'incorrect-exp'}">
            ${question.explanation}
        </div>
    `;
    
    // Next button
    setTimeout(() => {
        explanationDiv.innerHTML += `
            <button class="btn-primary" onclick="nextQuizQuestion()">
                ${currentQuizIndex < quizData.length - 1 ? 'Next Question →' : 'See Results'}
            </button>
        `;
    }, 1000);
}

function nextQuizQuestion() {
    currentQuizIndex++;
    renderQuizQuestion();
}

function showQuizResults() {
    const container = document.getElementById('quizContainer');
    const resultBox = document.getElementById('quizResult');
    const percentage = Math.round((quizScore / quizData.length) * 100);
    
    let message = '';
    if (percentage >= 80) {
        message = "🌟 Excellent! You have a good understanding of healthy relationships!";
    } else if (percentage >= 60) {
        message = "👍 Good work! Keep learning to better recognize the signs.";
    } else {
        message = "💪 Keep going! This journey will help you understand these important concepts better.";
    }
    
    container.innerHTML = '';
    resultBox.innerHTML = `
        <div class="result-score">${quizScore} / ${quizData.length} Correct (${percentage}%)</div>
        <p>${message}</p>
        <button class="btn-primary" onclick="resetQuiz()">Repeat Quiz</button>
        <button class="btn-primary" onclick="showSection('semaforo')">Continue to Traffic Light →</button>
    `;
    resultBox.classList.add('show');
}

function resetQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    initializeQuiz();
}

// SEMAFORO FUNCTIONALITY
let currentSemaforoIndex = 0;
let semaforoScore = 0;

function initializeSemaforo() {
    renderSemaforoScenario();
}

function renderSemaforoScenario() {
    const container = document.getElementById('semaforoContainer');
    const resultBox = document.getElementById('semaforoResult');
    
    if (currentSemaforoIndex >= semaforoScenarios.length) {
        showSemaforoResults();
        return;
    }
    
    const scenario = semaforoScenarios[currentSemaforoIndex];
    
    container.innerHTML = `
        <div class="semaforo-scenario">
            <p style="font-weight: bold; margin-bottom: 1rem;">Scenario ${currentSemaforoIndex + 1} of ${semaforoScenarios.length}</p>
            ${scenario.vocabulary ? `<div class="vocab-reminder"><strong>Key word:</strong> ${scenario.vocabulary}</div>` : ''}
            <div class="scenario-text">${scenario.scenario}</div>
            <div class="semaforo-buttons">
                <button class="semaforo-btn green" onclick="checkSemaforo('green')">
                    🟢 GREEN<br><small>Healthy</small>
                </button>
                <button class="semaforo-btn yellow" onclick="checkSemaforo('yellow')">
                    🟡 YELLOW<br><small>Be Careful</small>
                </button>
                <button class="semaforo-btn red" onclick="checkSemaforo('red')">
                    🔴 RED<br><small>Dangerous</small>
                </button>
            </div>
            <div id="semaforo-explanation"></div>
        </div>
    `;
    
    resultBox.classList.remove('show');
}

function checkSemaforo(choice) {
    const scenario = semaforoScenarios[currentSemaforoIndex];
    const buttons = document.querySelectorAll('.semaforo-btn');
    const explanationDiv = document.getElementById('semaforo-explanation');
    
    // Disable buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Mark selected
    buttons.forEach(btn => {
        if (btn.classList.contains(choice)) {
            btn.classList.add('selected');
        }
    });
    
    const isCorrect = choice === scenario.correct;
    if (isCorrect) semaforoScore++;
    
    explanationDiv.innerHTML = `
        <div class="explanation ${isCorrect ? '' : 'incorrect-exp'}">
            ${scenario.explanation}
        </div>
    `;
    
    setTimeout(() => {
        explanationDiv.innerHTML += `
            <button class="btn-primary" onclick="nextSemaforo()">
                ${currentSemaforoIndex < semaforoScenarios.length - 1 ? 'Next Scenario →' : 'See Results'}
            </button>
        `;
    }, 1000);
}

function nextSemaforo() {
    currentSemaforoIndex++;
    renderSemaforoScenario();
}

function showSemaforoResults() {
    const container = document.getElementById('semaforoContainer');
    const resultBox = document.getElementById('semaforoResult');
    const percentage = Math.round((semaforoScore / semaforoScenarios.length) * 100);
    
    let message = '';
    if (percentage >= 80) {
        message = "🎯 Fantastic! You can recognize healthy behaviors from dangerous ones!";
    } else if (percentage >= 60) {
        message = "👏 Well done! Keep paying attention to the signs in relationships.";
    } else {
        message = "📚 Remember the concepts you learned - with practice you'll get better at recognizing the signs!";
    }
    
    container.innerHTML = '';
    resultBox.innerHTML = `
        <div class="result-score">${semaforoScore} / ${semaforoScenarios.length} Correct (${percentage}%)</div>
        <p>${message}</p>
        <button class="btn-primary" onclick="resetSemaforo()">Repeat Traffic Light</button>
        <button class="btn-primary" onclick="showSection('decoder')">Continue to Decoder →</button>
    `;
    resultBox.classList.add('show');
}

function resetSemaforo() {
    currentSemaforoIndex = 0;
    semaforoScore = 0;
    initializeSemaforo();
}

// DECODER FUNCTIONALITY
let currentDecoderIndex = 0;
let decoderScore = 0;

function initializeDecoder() {
    currentDecoderIndex = 0;
    decoderScore = 0;
    renderDecoder();
}

function renderDecoder() {
    const container = document.getElementById('decoderContainer');
    const resultBox = document.getElementById('decoderResult');
    
    if (currentDecoderIndex >= decoderExcuses.length) {
        showDecoderResults();
        return;
    }
    
    const excuse = decoderExcuses[currentDecoderIndex];
    
    // Get 2 random wrong types
    const allTypes = [
        "Denying responsibility",
        "Blaming external circumstances", 
        "Romanticizing abuse",
        "Blaming the victim",
        "Minimizing",
        "Empty promises"
    ];
    
    // Remove the correct type from options
    const wrongTypes = allTypes.filter(t => t !== excuse.type);
    
    // Shuffle and take 2 wrong answers
    const shuffledWrong = wrongTypes.sort(() => Math.random() - 0.5).slice(0, 2);
    
    // Create array with correct answer + 2 wrong answers, then shuffle
    const options = [excuse.type, ...shuffledWrong].sort(() => Math.random() - 0.5);
    
    const optionsHTML = options.map((option, index) => `
        <button class="decoder-option" onclick="checkDecoder('${option}', '${excuse.type}')">
            ${option}
        </button>
    `).join('');
    
    container.innerHTML = `
        <div class="question-container">
            <p class="question-text">Excuse ${currentDecoderIndex + 1} of ${decoderExcuses.length}</p>
            ${excuse.vocabulary ? `<div class="vocab-reminder"><strong>Key words:</strong> ${excuse.vocabulary}</div>` : ''}
            <div class="scenario-text" style="background-color: #FFEBEE; border-left: 4px solid var(--danger-color);">
                "${excuse.excuse}"
            </div>
            <p style="margin: 1rem 0; font-weight: bold;">What type of manipulation is this?</p>
            <div class="decoder-options">
                ${optionsHTML}
            </div>
            <div id="decoder-reveal"></div>
        </div>
    `;
    
    resultBox.classList.remove('show');
}

function checkDecoder(selectedType, correctType) {
    const revealDiv = document.getElementById('decoder-reveal');
    const buttons = document.querySelectorAll('.decoder-option');
    const excuse = decoderExcuses[currentDecoderIndex];
    
    // Disable all buttons
    buttons.forEach(btn => {
        btn.disabled = true;
        
        // Highlight correct and incorrect
        if (btn.textContent.trim() === correctType) {
            btn.classList.add('correct');
        }
        if (btn.textContent.trim() === selectedType && selectedType !== correctType) {
            btn.classList.add('incorrect');
        }
    });
    
    const isCorrect = selectedType === correctType;
    if (isCorrect) decoderScore++;
    
    revealDiv.innerHTML = `
        <div class="explanation ${isCorrect ? '' : 'incorrect-exp'}" style="margin-top: 1rem;">
            ${isCorrect ? '<strong>✅ Correct!</strong><br><br>' : '<strong>❌ Not quite...</strong><br><br>'}
            <strong>The Reality:</strong> ${excuse.reality}
        </div>
        <button class="btn-primary" onclick="nextDecoder()">
            ${currentDecoderIndex < decoderExcuses.length - 1 ? 'Next Excuse →' : 'See Results'}
        </button>
    `;
}

function nextDecoder() {
    currentDecoderIndex++;
    renderDecoder();
}

function showDecoderResults() {
    const container = document.getElementById('decoderContainer');
    const resultBox = document.getElementById('decoderResult');
    const percentage = Math.round((decoderScore / decoderExcuses.length) * 100);
    
    let message = '';
    if (percentage >= 80) {
        message = "🌟 Excellent! You can identify manipulation types!";
    } else if (percentage >= 60) {
        message = "👍 Good work! You're learning to recognize manipulation tactics.";
    } else {
        message = "💪 Keep practicing! Understanding these patterns takes time.";
    }
    
    container.innerHTML = '';
    resultBox.innerHTML = `
        <div class="result-score">${decoderScore} / ${decoderExcuses.length} Correct (${percentage}%)</div>
        <p>${message}</p>
        <p>Now you know how to recognize the justifications that manipulative people use. Remember: actions matter more than words!</p>
        <button class="btn-primary" onclick="resetDecoder()">Repeat Decoder</button>
        <button class="btn-primary" onclick="showSection('matching')">Continue to Matching Game →</button>
    `;
    resultBox.classList.add('show');
}

function resetDecoder() {
    currentDecoderIndex = 0;
    decoderScore = 0;
    initializeDecoder();
}

// MATCHING GAME FUNCTIONALITY
let selectedType = null;
let selectedPhraseIndex = null;
let matchedPairs = 0;
let shuffledPhrases = [];

function initializeMatching() {
    matchedPairs = 0;
    selectedType = null;
    selectedPhraseIndex = null;
    shuffledPhrases = [...manipulatorPhrases].sort(() => Math.random() - 0.5);
    renderMatching();
}

function renderMatching() {
    const container = document.getElementById('matchingContainer');
    
    const typesHTML = manipulatorTypes.map((type, index) => `
        <div class="matching-item type-item" data-type="${index}" onclick="selectType(${index})">
            <strong>${type.name}</strong>
            <button class="info-btn" onclick="showTypeInfo(${index}, event)">ℹ️</button>
            <div class="type-info" id="info-${index}" style="display: none;">
                <p>${type.description}</p>
                ${type.vocabulary ? `<p style="margin-top: 0.5rem; font-size: 0.85em;"><strong>Key words:</strong> ${type.vocabulary}</p>` : ''}
            </div>
            <div class="matched-phrases" id="matched-${index}"></div>
        </div>
    `).join('');
    
    const phrasesHTML = shuffledPhrases.map((item, index) => `
        <div class="matching-item phrase-item" data-phrase-index="${index}" data-correct-type="${item.type}" onclick="selectPhrase(${index})">
            "${item.phrase}"
        </div>
    `).join('');
    
    container.innerHTML = `
        <div class="matching-game">
            <div class="matching-column">
                <h3>Types of Manipulators</h3>
                <p style="font-size: 0.9em; margin-bottom: 1rem;">Click ℹ️ to see description. Click to select.</p>
                ${typesHTML}
            </div>
            <div class="matching-column">
                <h3>What They Say</h3>
                <p style="font-size: 0.9em; margin-bottom: 1rem;">Click to select a phrase</p>
                ${phrasesHTML}
            </div>
        </div>
    `;
}

function showTypeInfo(index, event) {
    event.stopPropagation();
    const infoDiv = document.getElementById(`info-${index}`);
    const isVisible = infoDiv.style.display !== 'none';
    
    // Hide all other info boxes
    document.querySelectorAll('.type-info').forEach(info => {
        info.style.display = 'none';
    });
    
    // Toggle this one
    infoDiv.style.display = isVisible ? 'none' : 'block';
}

function selectType(index) {
    const item = document.querySelector(`[data-type="${index}"].type-item`);
    if (!item) return;
    
    // Deselect all types first
    document.querySelectorAll('.type-item').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Select this type
    item.classList.add('selected');
    selectedType = index;
    
    // Try to match if we have both selections
    checkMatch();
}

function selectPhrase(phraseIndex) {
    const phraseItem = document.querySelector(`[data-phrase-index="${phraseIndex}"]`);
    if (!phraseItem || phraseItem.classList.contains('matched')) return;
    
    // Deselect all phrases first
    document.querySelectorAll('.phrase-item').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Select this phrase
    phraseItem.classList.add('selected');
    selectedPhraseIndex = phraseIndex;
    
    // Try to match if we have both selections
    checkMatch();
}

function checkMatch() {
    // Need both a type and a phrase selected
    if (selectedType === null || selectedPhraseIndex === null) return;
    
    const typeItem = document.querySelector(`[data-type="${selectedType}"].type-item`);
    const phraseItem = document.querySelector(`[data-phrase-index="${selectedPhraseIndex}"]`);
    const phraseData = shuffledPhrases[selectedPhraseIndex];
    
    if (selectedType === phraseData.type) {
        // CORRECT MATCH!
        phraseItem.classList.add('matched');
        phraseItem.classList.remove('selected');
        
        // Add phrase to character's matched area
        const matchedArea = document.getElementById(`matched-${selectedType}`);
        const matchedPhraseDiv = document.createElement('div');
        matchedPhraseDiv.className = 'matched-phrase-item';
        matchedPhraseDiv.setAttribute('data-type', selectedType);
        matchedPhraseDiv.textContent = `"${phraseData.phrase}"`;
        matchedArea.appendChild(matchedPhraseDiv);
        
        matchedPairs++;
        
        // Check if this type is complete
        const totalForType = manipulatorPhrases.filter(p => p.type === selectedType).length;
        const matchedForType = document.querySelectorAll(`.matched-phrase-item[data-type="${selectedType}"]`).length;
        
        if (matchedForType === totalForType) {
            typeItem.classList.add('matched');
        }
        
        // Clear selections
        typeItem.classList.remove('selected');
        selectedType = null;
        selectedPhraseIndex = null;
        
        if (matchedPairs === manipulatorPhrases.length) {
            setTimeout(showMatchingResults, 500);
        }
    } else {
        // INCORRECT MATCH
        typeItem.classList.add('incorrect');
        phraseItem.classList.add('incorrect');
        
        setTimeout(() => {
            typeItem.classList.remove('incorrect', 'selected');
            phraseItem.classList.remove('incorrect', 'selected');
            selectedType = null;
            selectedPhraseIndex = null;
        }, 1000);
    }
}

function showMatchingResults() {
    const resultBox = document.getElementById('matchingResult');
    
    resultBox.innerHTML = `
        <div class="result-score">🎉 Congratulations!</div>
        <p>You correctly matched all the phrases to the manipulator types! Remember: these are behaviors people <strong>choose</strong>, not personalities they can't change.</p>
        <button class="btn-primary" onclick="resetMatching()">Repeat Matching</button>
        <button class="btn-primary" onclick="showSection('cases')">Continue to Case Studies →</button>
    `;
    resultBox.classList.add('show');
}

function resetMatching() {
    selectedType = null;
    selectedPhraseIndex = null;
    matchedPairs = 0;
    shuffledPhrases = [];
    document.getElementById('matchingResult').classList.remove('show');
    initializeMatching();
}


// CASE STUDIES FUNCTIONALITY
let currentCaseIndex = 0;

function initializeCases() {
    renderCase();
}

function renderCase() {
    const container = document.getElementById('casesContainer');
    const resultBox = document.getElementById('caseResult');
    
    if (currentCaseIndex >= caseStudies.length) {
        showCasesResults();
        return;
    }
    
    const caseStudy = caseStudies[currentCaseIndex];
    
    const choicesHTML = caseStudy.choices.map((choice, index) => `
        <div class="case-choice" onclick="selectCaseChoice(${index})">
            ${choice.text}
        </div>
    `).join('');
    
    container.innerHTML = `
        <div class="case-story">
            <p style="font-weight: bold; margin-bottom: 1rem;">Case Study ${currentCaseIndex + 1} of ${caseStudies.length}</p>
            ${caseStudy.vocabulary ? `<div class="vocab-reminder"><strong>Key words:</strong> ${caseStudy.vocabulary}</div>` : ''}
            <p>${caseStudy.story}</p>
            <p class="case-question">${caseStudy.question}</p>
            <div class="case-choices">
                ${choicesHTML}
            </div>
            <div id="case-feedback" class="case-feedback"></div>
        </div>
    `;
    
    resultBox.classList.remove('show');
}

function selectCaseChoice(choiceIndex) {
    const caseStudy = caseStudies[currentCaseIndex];
    const choice = caseStudy.choices[choiceIndex];
    const choices = document.querySelectorAll('.case-choice');
    const feedbackDiv = document.getElementById('case-feedback');
    
    // Disable all choices
    choices.forEach((el, idx) => {
        el.style.pointerEvents = 'none';
        if (idx === choiceIndex) {
            el.classList.add('selected');
        }
    });
    
    // Show feedback with vocabulary
    const vocabText = choice.vocabulary ? `<div style="margin-top: 1rem; font-size: 0.9em;"><strong>Key words:</strong> ${choice.vocabulary}</div>` : '';
    
    feedbackDiv.innerHTML = `
        <p><strong>${choice.good ? '✅ Good choice!' : '❌ Be careful!'}</strong></p>
        <p>${choice.feedback}</p>
        ${vocabText}
        <button class="btn-primary" onclick="nextCase()">
            ${currentCaseIndex < caseStudies.length - 1 ? 'Next Case →' : 'Complete Case Studies'}
        </button>
    `;
    feedbackDiv.classList.add('show', choice.good ? 'good' : 'bad');
}

function nextCase() {
    currentCaseIndex++;
    renderCase();
}

function showCasesResults() {
    const container = document.getElementById('casesContainer');
    const resultBox = document.getElementById('caseResult');
    
    container.innerHTML = '';
    resultBox.innerHTML = `
        <div class="result-score">✅ Case Studies Completed!</div>
        <p>You reflected on realistic situations and learned to recognize appropriate responses. Remember: talking to trusted adults is always a good choice!</p>
        <button class="btn-primary" onclick="resetCases()">Repeat Case Studies</button>
        <button class="btn-primary" onclick="showSection('warning-signs')">Continue to Warning Signs →</button>
    `;
    resultBox.classList.add('show');
}

function resetCases() {
    currentCaseIndex = 0;
    initializeCases();
}
