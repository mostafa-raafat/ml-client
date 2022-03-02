import cookie from 'cookie';
import { API_URL } from 'Config/index';

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const access = cookies.access ?? false;

  if (access === false) {
    return res.status(403).json({
      error: 'User forbidden from making the request',
    });
  }

  try {
    const apiRes = await fetch(`${API_URL}/users/auth/verify`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    });

    if (apiRes.status === 200) {
      console.log('200');
      return res.status(200).json({ success: 'Authenticated successfully' });
    } else {
      console.log('error');

      return res.status(apiRes.status).json(apiRes.data);
    }
  } catch (err) {
    return res.status(500).json({
      error: 'General Server Error',
    });
  }
};
