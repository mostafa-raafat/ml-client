import cookie from 'cookie';
import { API_URL } from '../../../config/index';

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const refresh = cookies.refresh ?? false;

  if (refresh === false) {
    return res.status(403).json({
      error: 'User forbidden from making the request',
    });
  }

  try {
    const apiRes = await fetch(`${API_URL}/users/auth/refresh?onlyAccessToken=false`, {
      method: req.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'refresh-token': refresh,
      },
    });

    const data = await apiRes.json();

    if (apiRes.status === 200) {
      res.setHeader('Set-Cookie', [
        cookie.serialize('access', data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 30,
          sameSite: 'strict',
          path: '/',
        }),
        cookie.serialize('refresh', data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24,
          sameSite: 'strict',
          path: '/',
        }),
      ]);

      return res.status(200).json({
        success: 'Refresh request successful',
      });
    } else {
      return res.status(apiRes.status).json(data);
    }
  } catch (err) {
    return res.status(500).json({
      error: 'General Server Error',
    });
  }
};
