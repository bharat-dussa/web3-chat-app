// @ts-nocheck
import { NextApiRequest } from 'next';

export const parseCookies = (req: NextApiRequest) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return {};

  const cookies = cookieHeader.split('; ');
  const parsedCookies = cookies.reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = decodeURIComponent(value);
    return acc;
  }, {});

  return parsedCookies;
};
