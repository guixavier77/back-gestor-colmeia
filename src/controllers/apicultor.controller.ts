import { Request, Response } from "express";
import ApicultorService from "../services/apicultores.service";
const apicultorService = new ApicultorService();


export default class ApicultorController {

    async create(req: Request, res: Response): Promise<void> {
        try {
            const apicultor = await apicultorService.create(req.body);
            res.status(200).send({ msg: 'Apicultor criado com sucesso!', apicultor });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro ao criar apicultor!' });
        }
    }

}