import { Router, Request, Response } from 'express';
import { create, getAll } from '../services/patient.service';
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        let results = await getAll();
        res.send(results);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const patient = req.body;
        await create(patient);
        res.send(201);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

export const PatientCtrl: Router = router;