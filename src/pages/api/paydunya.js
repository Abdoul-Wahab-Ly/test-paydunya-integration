import paydunya from "paydunya";
var setup = new paydunya.Setup({
  masterKey: "ufTLoqHv-6Qkl-sgFO-6pqG-B5olJ67urueu",
  privateKey: "test_private_C7QrvxFZr4Z10p0c3IYT4kALquw",
  publicKey: "test_public_F1grVbxY5fLrh9RYr39xcOSoukS",
  token: "pCrwQe3MFVUK084vjRlT",
  mode: "test", // Optionnel. Utilisez cette option pour les paiements tests.
});
var store = new paydunya.Store({
  name: "LyShopp", // only name is required
  tagline: "C'est le Bon Coin!",
  phoneNumber: "778622949",
  postalAddress: "Keur Massar - MTOA",
  logoURL: "http://www.chez-sandra.sn/logo.png",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    var invoice = new paydunya.CheckoutInvoice(setup, store);

    const { item, quantity, unit_price, description } = req.body;
    console.log(req.body);

    // console.log(item);
    invoice.addItem(item, quantity, unit_price, unit_price * quantity);
    invoice.description = description;
    invoice.totalAmount = quantity * unit_price;

    invoice.create().then(function () {
      invoice.status;
      invoice.token; // invoice token
      invoice.responseText;
      invoice.url; // PAYDUNYA redirect checkout url
      res.status(200).json({ url: invoice.url });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Transaction failed: ${error.message}` });
  }
}
