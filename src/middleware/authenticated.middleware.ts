import HttpException from '../utils/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
async function authenticatedMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(new HttpException(401, 'Unauthorised'));
  }

  const accessToken = bearer.split('Bearer ')[1].trim();
  console.log(accessToken);
  try {
    const decodedToken = await getAuth().verifyIdToken(accessToken);
    const uid = decodedToken.uid;
    console.log(uid);
    console.log(decodedToken);
    return next();
  } catch (e) {
    console.log(e);
    return next(new HttpException(401, 'Unauthorised'));
  }
}

export default authenticatedMiddleware;
