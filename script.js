const cards = document.querySelectorAll(".pix-card");
const valor = document.getElementById("valor");
const pix = document.getElementById("pix");
const status = document.getElementById("status");
const qr = document.getElementById("qrcode");

cards.forEach(card => {
  card.onclick = () => {
    cards.forEach(c => c.classList.remove("ativo"));
    card.classList.add("ativo");
    valor.value = card.dataset.valor;
  };
});

async function gerarPix() {
  status.textContent = "⏳ Gerando PIX...";
  pix.value = "";
  qr.style.display = "none";

  const res = await fetch("/.netlify/functions/gerarPix", {
    method: "POST",
    body: JSON.stringify({ valor: valor.value })
  });

  const data = await res.json();
  pix.value = data.copiaECola;
  qr.src = data.qrCode;
  qr.style.display = "block";
  status.textContent = "✅ PIX gerado com sucesso";
}

function copiarPix() {
  pix.select();
  document.execCommand("copy");
  status.textContent = "💚 PIX copiado! Obrigado pela doação";
}
