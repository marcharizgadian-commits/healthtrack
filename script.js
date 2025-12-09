function loadEntries() {
  return JSON.parse(localStorage.getItem("health_entries")) || [];
}

function saveEntries(entries) {
  localStorage.setItem("health_entries", JSON.stringify(entries));
}

const form = document.getElementById("entryForm");
const tableBody = document.querySelector("#entriesTable tbody");
const feedback = document.getElementById("feedback");
const snapshot = document.getElementById("snapshot");

function calcScore(sleep, exercise, water) {
  let score = 0;
  if (sleep >= 7 && sleep <= 9) score += 35;
  if (exercise >= 30) score += 35;
  if (water >= 8) score += 30;
  return score;
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const sleep = Number(document.getElementById("sleep").value);
    const exercise = Number(document.getElementById("exercise").value);
    const water = Number(document.getElementById("water").value);
    const mood = document.getElementById("mood").value;

    const score = calcScore(sleep, exercise, water);

    const entries = loadEntries();
    entries.push({ date, sleep, exercise, water, mood, score });
    saveEntries(entries);

    if (feedback) {
      feedback.textContent = `Saved! Score: ${score}`;
      feedback.style.display = "block";
    }

    form.reset();
  });
}

if (tableBody) {
  const entries = loadEntries();
  entries.forEach(e => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${e.date}</td>
      <td>${e.sleep}</td>
      <td>${e.exercise}</td>
      <td>${e.water}</td>
      <td>${e.mood}</td>
      <td>${e.score}</td>
    `;
    tableBody.appendChild(row);
  });
}

if (snapshot) {
  const entries = loadEntries();
  if (entries.length > 0) {
    snapshot.textContent = "Entries saved: " + entries.length;
  }
}
