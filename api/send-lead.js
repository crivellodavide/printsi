import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  const { nome, citta, email } = req.body;

  if (!nome || !citta || !email) {
    res.status(400).json({ error: 'Dati mancanti' });
    return;
  }

  // CHIAVE API DIRETTA
  const resend = new Resend('re_L2v8q85T_7A2HpUUH7D2wHXh7xyNnpnNz');

  try {
    await resend.emails.send({
      from: 'form@printsi.it',
      to: 'crivello.da@gmail.com',
      subject: 'Nuova lead PrintSì',
      text: `Nuova lead:\nNome: ${nome}\nCittà: ${citta}\nEmail: ${email}\nData: ${new Date().toISOString()}`
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Errore invio mail' });
  }
}
