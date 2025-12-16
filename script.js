const data = {
  "Motion": {
    "Speed and Velocity": {
      text: "This lesson explains speed and velocity in simple terms.",
      formulas: ["Speed = Distance / Time"],
      examples: "A car travels 100 km in 2 hours.",
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
  }
};

const chapterList = document.getElementById("chapterList");
const lessonTitle = document.getElementById("lessonTitle");
const lessonText = document.getElementById("lessonText");
const lessonContent = document.getElementById("lessonContent");
const backBtn = document.getElementById("backBtn");

let currentChapter = null;
let currentLesson = null;

function showChapters() {
  chapterList.innerHTML = "";
  backBtn.classList.add("hidden");
  lessonContent.classList.add("hidden");

  for (let chapter in data) {
    const li = document.createElement("li");
    li.textContent = chapter;
    li.onclick = () => showLessons(chapter);
    chapterList.appendChild(li);
  }
}

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
}

function loadLesson(chapter, lesson) {
  lessonTitle.textContent = lesson;
  lessonText.textContent = data[chapter][lesson].text;
  lessonContent.classList.remove("hidden");
  currentLesson = lesson;
}

backBtn.onclick = () => {
  if (currentLesson) {
    currentLesson = null;
    showLessons(currentChapter);
  } else {
    showChapters();
  }
};

showChapters();
