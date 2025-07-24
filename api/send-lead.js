import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  let body = req.body;
  // Fix: se body è stringa, parsifica
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      res.status(400).json({ error: 'Body JSON malformato' });
      return;
    }
  }

  const { nome, citta, email } = body;

  if (!nome || !citta || !email) {
    res.status(400).json({ error: 'Dati mancanti' });
    return;
  }

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
