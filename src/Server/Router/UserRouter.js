import express from 'express'
import UserService from '../Service/UserService.js';
import ResponseFactory from '../Base/ResponseFactory.js';

function getUserRouter() {

    const router = express.Router()

   

    // router.post('/', async (req, res) => {
    //     const estuParaAgregar = req.body

    //     try {
    //         const estuAgregado = await estudiantesApi.agregar(estuParaAgregar)
    //         res.status(201).json(estuAgregado)
    //     } catch (err) {
    //         res.status(err.estado).json(err)
    //     }
    // })

    router.get('/', async (req, res) => {
        let result;
        let resultJSON;
        try {
            // const queryParams = new Map(Object.entries(req.query))
            // new ProductService().responsefromErp("hola mundo");
            // let response = ResponseFactory.CreateResponse(req);
            result = new UserService().responsefromErp(req);
            result.mensaje = null;
            resultJSON = JSON.stringify(result);
            res.send(result);
        } catch (err) {
            result =  new Response(true,ResponseCodesEnum.RES_500,ResponseCodesEnum.RES_500_STR,null);
            result.mensaje = null;
            resultJSON = JSON.stringify(result);
            res.send(resultJSON);
        }
    })

    // router.delete('/:id', async (req, res) => {
    //     try {
    //         await estudiantesApi.borrar(req.params.id)
    //         res.status(204).send()
    //     } catch (err) {
    //         res.status(err.estado).json(err)
    //     }
    // })

    // router.delete('/', async (req, res) => {
    //     try {
    //         await estudiantesApi.borrarTodo()
    //         res.status(204).send()
    //     } catch (err) {
    //         res.status(err.estado).json(err)
    //     }
    // })

    // router.put('/:id', async (req, res) => {
    //     const estuParaReemplazar = req.body

    //     try {
    //         const estuReemplazado = await estudiantesApi.reemplazar(req.params.id, estuParaReemplazar)
    //         res.json(estuReemplazado)
    //     } catch (err) {
    //         res.status(err.estado).json(err)
    //     }
    // })

    return router
}
export default getUserRouter;
