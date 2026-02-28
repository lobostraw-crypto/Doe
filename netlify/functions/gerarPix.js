const axios = require("axios");

exports.handler = async (event) => {
  try {
    const { valor } = JSON.parse(event.body);

    if (!valor || Number(valor) <= 0) {
      return { statusCode: 400, body: "Valor inválido" };
    }

    const response = await axios.post(
      "https://api.elitepaybr.com/api/v1/deposit",
      {
        amount: Number(valor),
        description: "Doação SOS Minas Gerais",
        payerName: "Doador Anônimo",
        payerDocument: "00000000000"
      },
      {
        headers: {
          "x-client-id": process.env.ELITEPAY_CLIENT_ID,
          "x-client-secret": process.env.ELITEPAY_CLIENT_SECRET,
          "Content-Type": "application/json"
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        copiaECola: response.data.copyPaste,
        qrCode: response.data.qrcodeUrl
      })
    };
  } catch (error) {
    return { statusCode: 500, body: "Erro ao gerar PIX" };
  }
};
