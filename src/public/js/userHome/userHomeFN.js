function giveResponse(mood) {
  const responseEl = document.getElementById("responseLineText");
  mood = mood.toLowerCase();
  const responses = {
    happy: "Glad to hear your system is running optimally today.",
    neutral: "A steady baseline is perfectly fine. Keep coasting.",
    creative: "Excellent. Channel that energy into something meaningful.",
    angry: "Frustration is data. Note what triggered this spike below.",
    upset: "Take it slow. It's okay to run in power-saving mode today.",
    stressed:
      "High CPU usage detected. Remember to breathe and step away if needed.",
    low: "Your energy is depleted. Rest is a productive part of the cycle.",
  };

  responseEl.style.opacity = 0;
  responseEl.style.transform = "translateY(4px)";

  setTimeout(() => {
    responseEl.innerText =
    responses[mood] || "We're here to listen. Log your thoughts below.";
    responseEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    responseEl.style.opacity = 1;
    responseEl.style.transform = "translateY(0)";
  }, 280);
}

  const token = document.querySelector("#oohlala").value;
document.querySelector("#addMood").addEventListener("click", async () => {
  console.log("adding ood");
  mood = document.querySelector('input[name="mood"]:checked');
  if (!mood) return showPSLToast("error", "Select your mood");
  const data = {
    mood: mood.value,
    note: document.querySelector("#moodNote").value,
  };
  const res = await fetch("/user/mood", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": token,
    },
    body: JSON.stringify(data),
  });
  console.dir(res);
  if (res.ok) {
    showPSLToast("success", "Done. Added to history");
    window.location.hash = `#history-section`;
    setTimeout(() => {
      window.location.reload();
    }, 1800); 
  } else if (!res.ok) {
    showPSLToast("error", obj.msg);
  }
});

(function blah() {
  const ctx = document.getElementById("moodPie");
  if (!ctx) return;
  const chartPlaceholder = document.querySelector("#chartPlaceholder");
  const historyPlaceholder = document.querySelector("#historyPlaceholder");
  const historyTable = document.querySelector("#historyTable");
  const moodData = document.querySelectorAll(".mood-data");

  let moods = Array.from(moodData).map((mood) => mood.textContent);
  
  if (moods.length === 0) {
    historyPlaceholder.classList.remove("d-none");
    historyTable.classList.add("d-none");
    chartPlaceholder.classList.remove("d-none");
    ctx.classList.add("d-none");
    return;
  } else {
    historyPlaceholder.classList.add("d-none");
    historyTable.classList.remove("d-none");
    chartPlaceholder.classList.add("d-none");
    ctx.classList.remove("d-none");
  }

  moods = moods.reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(moods);
  const data = Object.values(moods);

  console.log(labels, data);
  new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          label: "Mood Count",
          data,
          backgroundColor: [
            "#FFD700",
            "#C0C0C0",
            "#9370DB",
            "#FF4500",
            "#4682B4",
            "#556B2F",
            "#2F4F4F",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
})();


console.dir(document.querySelector("#historyTable"))

document.querySelector("#historyTable").addEventListener("click", async (e) => {
  console.dir(e.target)
  const action = async () => {
    const rawRes = await fetch("/user/mood/", {
    method: "DELETE",
    headers: {
      "CSRF-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      moodId: e.target.closest("tr").dataset.moodId,
    }),
  });
  let res = await rawRes.json();
  if (rawRes.ok) {
    console.dir(res)
    showPSLToast(res.msgType, res.msg);
    setTimeout(() => {
      window.location.reload();
    }, 1800);
  } else if (!rawRes.ok) {
    showPSLToast(res.msgType, res.msg);
  }
  }
  if (e.target.classList.contains("deletePopupBtn")) {
    showPSLAlert("Sure about that?", "Once Deleted can't be undone, atleast in this v1", action)
  console.log("deleteclck.. .. ..");
  
  } else if (e.target.classList.contains("editBtn")) {
    showPSLToast("info", "Sorry, that is saved for v2 :!(")
  }
})

// const deleteBtns = document.querySelectorAll(".deletePopup");
// for (const btn of deleteBtns) {
//   btn.addEventListener("dblclick", async (e) => {
//   console.log("doubleclck.. .. ..");
//   const rawRes = await fetch("/user/mood/", {
//     method: "DELETE",
//     headers: {
//       "CSRF-Token": token,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       moodId: e.target.closest(".mood-data").dataset.moodId,
//     }),
//   });
//   let res = await rawRes.json();
//   if (rawRes.ok) {
//     console.dir(res)
//     showPSLToast(res.msgType, res.msg);
//     setTimeout(() => {
//       window.location.reload();
//     }, 1800);
//   } else if (!rawRes.ok) {
//     showPSLToast(res.msgType, res.msg);
//   }
//   });
// }
// document.querySelector("#editMood").addEventListener("click", async (event) => {
//   const data = {moodId: event.target.dataset.moodId}
//   await fetch("/user/mood/", {
//     method: "PATCH",
//     headers: {
//       "CSRF-Token": token,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify()
//   })
// });

function switchLogView(view) {
  const historyView = document.getElementById("viewHistory");
  const chartView = document.getElementById("viewChart");

  if (view === "history") {
    historyView.classList.remove("d-none");
    chartView.classList.add("d-none");
  } else {
    historyView.classList.add("d-none");
    chartView.classList.remove("d-none");
  }
}