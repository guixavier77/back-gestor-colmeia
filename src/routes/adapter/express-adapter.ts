import { Controller } from "../../controllers/protocols/controller.protocols";


export const adapt = (controller: Controller) => async (req: any , res: any) => {
	console.log(controller.handle);
	const { statusCode, headers, body} = await controller.handle(req)
	res.status(statusCode).json(body);
}
