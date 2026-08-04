document.addEventListener("DOMContentLoaded", function () {
  var packs = Array.prototype.slice.call(document.querySelectorAll(".pack-option"));
  var summaryQty = document.getElementById("summaryQty");
  var summaryTotal = document.getElementById("summaryTotal");
  var whatsappBtn = document.getElementById("whatsappBtn");
  var copyButtons = document.querySelectorAll(".copy-btn");

  var whatsappNumber = "541165117490";
  var currentQty = null;
  var currentPrice = null;

  function formatMoney(value) {
    return "$" + Number(value).toLocaleString("es-AR");
  }

  function selectPack(qty, price) {
    currentQty = qty;
    currentPrice = price;

    packs.forEach(function (btn) {
      var isSelected = Number(btn.dataset.qty) === Number(qty);
      btn.classList.toggle("is-selected", isSelected);
      var label = btn.querySelector(".chance-select");
      if (label) label.textContent = isSelected ? "Elegido ✓" : "Elegir";
    });

    summaryQty.textContent = qty + " chances";
    summaryTotal.textContent = formatMoney(price);

    var message =
      "Hola! Quiero confirmar mi compra de " + qty +
      " chances para el sorteo del Suzuki LTR 450. Adjunto el comprobante.";
    whatsappBtn.href = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
  }

  packs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectPack(btn.dataset.qty, btn.dataset.price);
    });
  });

  // Preseleccionar pack según parámetro ?pack= en la URL, o el primero por defecto
  var params = new URLSearchParams(window.location.search);
  var preselect = params.get("pack");
  var match = packs.find(function (btn) {
    return btn.dataset.qty === preselect;
  });

  selectPack(
    match ? match.dataset.qty : packs[0].dataset.qty,
    match ? match.dataset.price : packs[0].dataset.price
  );

  // Meta Pixel: registrar conversión al enviar el comprobante por WhatsApp
  if (whatsappBtn && typeof fbq === "function") {
    whatsappBtn.addEventListener("click", function () {
      fbq("track", "Contact");
    });
  }

  // Copiar datos de transferencia
  copyButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.dataset.copy;
      navigator.clipboard.writeText(text).then(function () {
        var original = btn.textContent;
        btn.textContent = "¡Copiado!";
        btn.classList.add("is-copied");
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("is-copied");
        }, 1600);
      });
    });
  });
});
