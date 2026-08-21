

"post c       /sessions/" // trainer only
"get r       /sessions/" // support search: /?title=yoga
"put u      /sessions/:sessionId" // trainer only
"delete d  /sessions/:sessionId" // trainer only
"get      /sessions/:sessionId/bookings" // trainer only 
import { Router } from 'express';
import {   CreateSession,  UpdateSession,  DeleteSession,  GetAllSessions} from '../controllers/session.controller'; // اضبط مسار الكونترولر

 export const sessionRouter = Router();

sessionRouter.get('/', GetAllSessions)
sessionRouter.post('/', CreateSession);
sessionRouter.put('/:id', UpdateSession);
sessionRouter.delete('/:id', DeleteSession);

export default sessionRouter;