import cookie from 'cookie';
// config
import { API_URL } from 'Config/index.js';

export default async (req, res) => {
  try {
    const apiRes = await fetch(`${API_URL}/users/auth/login`, {
      method: req.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
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
      return res.status(200).json(data.user);
    } else {
      return res.status(apiRes.status).json(data);
    }
  } catch (err) {
    return res.status(500).json({
      error: 'General Server Error',
    });
  }
};
