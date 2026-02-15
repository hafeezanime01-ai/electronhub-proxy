module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.status(200).end();
    return;
  }

  const url = 'https://api.electronhub.ai' + req.url;
  const newReq = {
    method: req.method,
    headers: { ...req.headers },
    body: JSON.stringify(req.body)
  };

  delete newReq.headers['referer'];
  delete newReq.headers['origin'];
  delete newReq.headers['x-forwarded-for'];

  const response = await fetch(url, newReq);
  const newRes = await response.text();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(response.status).send(newRes);
};
