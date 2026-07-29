document.addEventListener("DOMContentLoaded", function () {
  // FAQ acordeón
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      document.querySelectorAll(".faq-item").forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Cupo de participantes (placeholder editable a mano)
  var cupoTotal = 1000;
  var cupoActual = 0; // Actualizar este número a medida que se venden chances
  var cupoFill = document.getElementById("cupoFill");
  var cupoLabel = document.getElementById("cupoLabel");

  if (cupoFill && cupoLabel) {
    var pct = Math.min(100, Math.round((cupoActual / cupoTotal) * 100));
    cupoFill.style.width = pct + "%";
    cupoLabel.textContent = cupoActual + " / " + cupoTotal;
  }
});
