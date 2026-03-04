function calculateScore() {
  let score = 0;
  let feedback = "";

  // 1. Ice-breaking (10%)
  const ice = parseInt(document.getElementById('iceCount').value);
  if (ice >= 1) {
    score += 10;
    feedback += `<div class="item pass">✅ Ice-breaking: Criteria met (10/10)</div>`;
  } else {
    feedback += `<div class="item fail">❌ Ice-breaking: At least 1 activity required.</div>`;
  }

  // 2. Videos (20%)
  const vCount = parseInt(document.getElementById('vidCount').value);
  const vDur = parseInt(document.getElementById('vidDuration').value);
  let vidScore = 0;
  if (vCount >= 3) vidScore += 10;
  if (vDur >= 21) vidScore += 10;
  score += vidScore;
  if (vidScore === 20) {
    feedback += `<div class="item pass">✅ Videos: Quantity & Duration met (20/20)</div>`;
  } else {
    feedback += `<div class="item fail">❌ Videos: Need min 3 videos AND total 21 mins. (Current: ${vidScore}/20)</div>`;
  }

  // 3. Interactions (15%)
  const inter = parseInt(document.getElementById('interCount').value);
  if (inter >= 2) {
    score += 15;
    feedback += `<div class="item pass">✅ Interactions: Criteria met (15/15)</div>`;
  } else {
    feedback += `<div class="item fail">❌ Interactions: Need at least 2 activities.</div>`;
  }

  // 4. Self-Practice (15%)
  const practice = parseInt(document.getElementById('practiceCount').value);
  if (practice >= 2) {
    score += 15;
    feedback += `<div class="item pass">✅ Self-Practice: Criteria met (15/15)</div>`;
  } else {
    feedback += `<div class="item fail">❌ Self-Practice: Need at least 2 online drills.</div>`;
  }

  // 5. eNote (20%)
  const pages = parseInt(document.getElementById('notePages').value);
  if (pages >= 20) {
    score += 20;
    feedback += `<div class="item pass">✅ eNote: Criteria met (20/20)</div>`;
  } else {
    feedback += `<div class="item fail">❌ eNote: Min 20 pages/slides required.</div>`;
  }

  // 6. Assessment (20%)
  const assess = parseInt(document.getElementById('assessCount').value);
  const mcq = parseInt(document.getElementById('mcqCount').value);
  if (assess >= 2 && mcq >= 15) {
    score += 20;
    feedback += `<div class="item pass">✅ Assessment: Criteria met (20/20)</div>`;
  } else {
    feedback += `<div class="item fail">❌ Assessment: Need 2 assessments and min 15 MCQ questions.</div>`;
  }

  // Update UI
  document.getElementById('overallScore').innerText = score + "/100";
  document.getElementById('feedbackList').innerHTML = feedback;
  
  // Color code the score
  const scoreDisplay = document.getElementById('overallScore');
  if (score === 100) scoreDisplay.style.color = "#27ae60";
  else if (score >= 70) scoreDisplay.style.color = "#3498db";
  else scoreDisplay.style.color = "#e74c3c";
}