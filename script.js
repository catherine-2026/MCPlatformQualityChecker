// 1. Your Unique Script URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbyA0bZJnhGO2aBKPqWBJiiY9svL3szd8qMbctV-csWZxHWOTTEHGmrDVr4kNAlsO79iCw/exec';

/**
 * --- GLOBAL ATTACHMENTS ---
 * This makes sure your HTML buttons can "see" the functions
 */
window.calculateScore = calculateScore;
window.postFeedback = postFeedback;

/**
 * --- 1. DATA LOADING (VISITORS & POSTS) ---
 */
function loadData() {
  const container = document.getElementById('forumPosts');
  const vDisplay = document.getElementById('vCount');

  fetch(`${scriptURL}?t=${Date.now()}`)
    .then(res => res.json())
    .then(data => {
      // Update Visitor Count
      if (vDisplay) {
        vDisplay.innerText = data.count || "1";
      }

      // Update Feedback Pool
      if (container && data.feedback) {
        container.innerHTML = "";
        [...data.feedback].reverse().forEach(row => {
          if(row[0]) renderPost(row[0], row[1], row[2]);
        });
      }
    })
    .catch(err => console.error("Database Sync Error:", err));
}

function renderPost(name, message, date) {
  const container = document.getElementById('forumPosts');
  if(!container) return;
  const postDiv = document.createElement('div');
  postDiv.style = "background:white; padding:10px; margin-bottom:10px; border-radius:5px; border-left:4px solid #007bff;";
  postDiv.innerHTML = `<strong>${name}</strong>: ${message} <br><small style="color:gray;">${new Date(date).toLocaleDateString()}</small>`;
  container.appendChild(postDiv);
}

/**
 * --- 2. POSTING FEEDBACK ---
 */
function postFeedback() {
  const nameField = document.getElementById('userName'); 
  const feedbackField = document.getElementById('userFeedback'); 
  
  if (!nameField.value || !feedbackField.value) {
    alert("Please fill in both name and feedback!");
    return;
  }

  const data = {
    name: nameField.value,
    feedback: feedbackField.value
  };

  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    body: JSON.stringify(data)
  })
  .then(() => {
    nameField.value = "";
    feedbackField.value = "";
    loadData(); // Refresh count and list
  });
}

/**
 * --- 3. QUALITY CHECKER CALCULATOR ---
 */
function calculateScore() {
  let score = 0;
  let feedbackText = "";

  // Helper to get values safely
  const getVal = (id) => parseInt(document.getElementById(id).value) || 0;

  // 1. Ice-breaking (10%)
  if (getVal('iceCount') >= 1) {
    score += 10;
    feedbackText += `<div style="color:green;">✅ Ice-breaking: Passed (10/10)</div>`;
  } else {
    feedbackText += `<div style="color:red;">❌ Ice-breaking: Min 1 required.</div>`;
  }

  // 2. Videos (20%)
  const vCount = getVal('vidCount');
  const vDur = getVal('vidDuration');
  if (vCount >= 3 && vDur >= 21) {
    score += 20;
    feedbackText += `<div style="color:green;">✅ Videos: Passed (20/20)</div>`;
  } else {
    feedbackText += `<div style="color:red;">❌ Videos: Need 3 videos & 21 mins.</div>`;
  }

  // 3. Interactions (15%)
  if (getVal('interCount') >= 2) {
    score += 15;
    feedbackText += `<div style="color:green;">✅ Interactions: Passed (15/15)</div>`;
  } else {
    feedbackText += `<div style="color:red;">❌ Interactions: Min 2 required.</div>`;
  }

  // 4. Self-Practice (15%)
  if (getVal('practiceCount') >= 2) {
    score += 15;
    feedbackText += `<div style="color:green;">✅ Practice: Passed (15/15)</div>`;
  } else {
    feedbackText += `<div style="color:red;">❌ Practice: Min 2 drills required.</div>`;
  }

  // 5. eNote (20%)
  if (getVal('notePages') >= 20) {
    score += 20;
    feedbackText += `<div style="color:green;">✅ eNote: Passed (20/20)</div>`;
  } else {
    feedbackText += `<div style="color:red;">❌ eNote: Min 20 pages required.</div>`;
  }

  // 6. Assessment (20%)
  if (getVal('assessCount') >= 2 && getVal('mcqCount') >= 15) {
    score += 20;
    feedbackText += `<div style="color:green;">✅ Assessment: Passed (20/20)</div>`;
  } else {
    feedbackText += `<div style="color:red;">❌ Assessment: Need 2 sets & 15 MCQs.</div>`;
  }

  // Update UI
  const scoreDisplay = document.getElementById('overallScore');
  const feedbackList = document.getElementById('feedbackList');
  
  if(scoreDisplay) scoreDisplay.innerText = score + "/100";
  if(feedbackList) feedbackList.innerHTML = feedbackText;
  
  // Color code
  if (score === 100) scoreDisplay.style.color = "#27ae60";
  else if (score >= 70) scoreDisplay.style.color = "#3498db";
  else scoreDisplay.style.color = "#e74c3c";
}

// Start everything when page loads
document.addEventListener("DOMContentLoaded", loadData);