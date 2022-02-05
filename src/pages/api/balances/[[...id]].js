import cookie from 'cookie';
import { API_URL } from 'Config/index';

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const access = cookies.access ?? false;
  const url = req.url.replace(/^.+api/, API_URL);

  if (access === false) {
    return res.status(403).json({
      error: 'User forbidden from making the request',
    });
  }

  const body = req.body && {
    body: JSON.stringify(req.body),
  };

  const requestOptions = {
    method: req.method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `JWT ${access}`,
    },
    ...body,
  };

  try {
    const apiRes = await fetch(url, requestOptions);
    if (apiRes.status === 204) {
      return res.status(apiRes.status);
    }
    if (apiRes.status === 200) {
      const data = await apiRes.json();
      return res.status(apiRes.status).json(data);
    }
    const data = await apiRes.text();
    return res.status(apiRes.status).json({
      error: data,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
