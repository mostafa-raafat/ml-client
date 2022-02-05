import cookie from 'cookie';
import { API_URL } from 'Config/index';

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const access = cookies.access ?? false;

  if (access === false) {
    return res.status(401).json({
      error: 'User unauthorized to make this request',
    });
  }

  try {
    const apiRes = await fetch(`${API_URL}/users/auth/profile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${access}`,
      },
    });

    const data = await apiRes.json();

    if (apiRes.status === 200) {
      return res.status(200).json(data);
    } else {
      return res.status(apiRes.status).json(data);
    }
  } catch (err) {
    return res.status(500).json({
      error: 'General Server Error',
    });
  }
};
