// Dummy data
const data = {
  "Motion": {
    "Speed and Velocity": {
      text: "This lesson explains speed and velocity in simple terms.",
      formulas: ["Speed = Distance / Time", "Velocity = Displacement / Time"],
      examples: "A car travels 100 km in 2 hours. Speed = 50 km/h.",
      questions: [
        {
          q: "What is the formula for speed?",
          options: [
            "Speed = Time / Distance",
            "Speed = Distance / Time",
            "Speed = Mass × Acceleration"
          ],
          answer: 1
        }
      ]
    }
  },
  "Forces": {
    "Newton's First Law": {
      text: "Objects remain at rest or in motion unless acted on by a force.",
      formulas: ["ΣF = 0 → constant velocity"],
      examples: "A book stays still on a table because forces are balanced.",
      questions: [
        {
          q: "When does an object change its motion?",
          options: [
            "When no force acts",
            "When forces are balanced",
            "When a net force acts"
          ],
          answer: 2
        }
      ]
    }
  }
};

// Elements
const chapterList = document.getElementById("chapterList");
const lessonTitle = document.getElementById("lessonTitle");
const lessonText = document.getElementById("lessonText");
const lessonContent = document.getElementById("lessonContent");
const formulasList = document.getElementById("formulas");
const examplesText = document.getElementById("examples");
const questionsDiv = document.getElementById("questions");
const backBtn = document.getElementById("backBtn");

// State tracking
let currentChapter = null;
let currentLesson = null;

// Show chapters (main page)
function showChapters() {
  chapterList.innerHTML = "";
  backBtn.classList.add("hidden");

  lessonTitle.textContent = "Select a lesson";
  lessonText.textContent = "Choose a chapter and lesson to start learning.";
  lessonContent.classList.add("hidden");

  for (let chapter in data) {
    const li = document.createElement("li");
    li.textContent = chapter;
    li.onclick = () => showLessons(chapter);
    chapterList.appendChild(li);
  }

  currentChapter = null;
  currentLesson = null;
}

// Show lessons inside a chapter
function showLessons(chapter) {
  chapterList.innerHTML = "";
  backBtn.classList.remove("hidden");

  for (let lesson in data[chapter]) {
    const li = document.createElement("li");
    li.textContent = lesson;
    li.onclick = () => loadLesson(chapter, lesson);
    chapterList.appendChild(li);
  }

  currentChapter = chapter;
  currentLesson = null;
}

// Load lesson page
function loadLesson(chapter, lesson) {
  const lessonData = data[chapter][lesson];

  lessonTitle.textContent = lesson;
  lessonText.textContent = lessonData.text;
  lessonContent.classList.remove("hidden");

  // Formulas
  formulasList.innerHTML = "";
  lessonData.formulas.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    formulasList.appendChild(li);
  });

  // Examples
  examplesText.textContent = lessonData.examples;

  // Questions
  questionsDiv.innerHTML = "";
  lessonData.questions.forEach((qData, index) => {
    const div = document.createElement("div");
    div.className = "question";

    div.innerHTML = `<p>${qData.q}</p>`;

    qData.options.forEach((opt, i) => {
      div.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${i}">
          ${opt}
        </label><br>
      `;
    });

    const btn = document.createElement("button");
    btn.textContent = "Check Answer";
    btn.onclick = () => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (!selected) alert("Choose an answer first!");
      else if (parseInt(selected.value) === qData.answer) alert("Correct!");
      else alert("Wrong answer.");
    };

    const help = document.createElement("div");
    help.className = "help-box";
    help.textContent = "Need help? (AI help coming soon)";

    div.appendChild(btn);
    div.appendChild(help);
    questionsDiv.appendChild(div);
  });

  currentLesson = lesson;
}

// Back button logic
backBtn.onclick = () => {
  if (currentLesson) {
    showLessons(currentChapter);
  } else {
    showChapters();
  }
};

// Initialize site
showChapters();
