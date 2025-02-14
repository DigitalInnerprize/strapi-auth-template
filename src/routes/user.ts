import express, { Router, Request, Response } from 'express';
import axios from 'axios';

const router: Router = express.Router();
const API_URL = process.env.API_URL || 'http://localhost:1337';

router.get('/me', async (req: Request, res: Response) => {
  // @ts-ignore
  const { jwt } = req.session;
  const user = await axios.get(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  res.send(user.data);
});

router.put('/:userId', async (req: Request, res: Response) => {
  // @ts-ignore
  const { jwt } = req.session;
  const { data } = req.body;
  const { userId } = req.params;
  await axios.get(`${API_URL}/users/${userId}`, {
    data,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
});

router.get('/logout', async (req: Request, res: Response) => {
  // @ts-ignore
  req.session.jwt = null;
  res.send({ status: 200 });
});

export default router;
