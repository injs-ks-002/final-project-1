const httpMocks = require('node-mocks-http')
const controller = require('../controllers/reflection.controller')
const {Pool} = require('pg')

jest.mock('pg', () => {
    const mPool = {
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
    }
    return { Pool: jest.fn(() => mPool) }
})
jest.mock('../middleware/authentication')

let req, res, next, client

beforeEach(() => {
    req = httpMocks.createRequest()
    req.headers["x-access-token"]
    res = httpMocks.createResponse()
    client = new Pool()
})

describe('ReflectionController.postReflection', () => {
    it('should return 201', async () => {
        client.query.mockResolvedValue({ rows: [201]})
        await controller.postReflectionUser(req, res)
        expect(client.connect).toBeCalledTimes(0);
        expect(client.end).toBeCalledTimes(0);
        expect(res.statusCode).toBe(201)
    })

    it('should return 503', async () => {
        const rejected = Promise.reject({ message: "internal server error" });
        client.query.mockResolvedValue(rejected)
        await controller.postReflectionUser(req, res)
        expect(res.statusCode).toBe(503)
    })
})

describe('ReflectionController.getReflection', () => {
    it('should return 200', async () => {
        client.query.mockResolvedValue({ rows: [0] })
        await controller.getReflectionUser(req, res)
        expect(client.connect).toBeCalledTimes(0);
        expect(client.end).toBeCalledTimes(0);
        expect(res.statusCode).toBe(200)
    })

    it('should return 404', async () => {
        client.query.mockResolvedValue({ rows: [] })
        await controller.getReflectionUser(req, res)
        expect(client.connect).toBeCalledTimes(0);
        expect(client.end).toBeCalledTimes(0);
        expect(res.statusCode).toBe(404)
    })

    it('should return 503', async () => {
        const rejected = Promise.reject({ message: "internal server error" });
        client.query.mockResolvedValue(rejected)
        await controller.getReflectionUser(req, res)
        expect(res.statusCode).toBe(503)
    })
})

describe('ReflectionController.putReflection', () => {
    it('should return 200', async () => {
        client.query.mockResolvedValue({ rows: [200] })
        await controller.putReflectionUser(req, res)
        expect(client.connect).toBeCalledTimes(0);
        expect(client.end).toBeCalledTimes(0);
        expect(res.statusCode).toBe(200)
    })

    it('should return 404', async () => {
        client.query.mockResolvedValue({ rows: [] })
        await controller.putReflectionUser(req, res)
        expect(client.connect).toBeCalledTimes(0);
        expect(client.end).toBeCalledTimes(0);
        expect(res.statusCode).toBe(404)
    })

    it('should return 503', async () => {
        const rejected = Promise.reject({ message: "internal server error" });
        client.query.mockResolvedValue(rejected)
        await controller.putReflectionUser(req, res)
        expect(res.statusCode).toBe(503)
    })
})

describe('ReflectionController.deleteReflection', () => {
    it('should return 200', async () => {
        client.query.mockResolvedValue({ rows: [200] })
        await controller.deleteReflectionUser(req, res)
        expect(client.connect).toBeCalledTimes(0);
        expect(client.end).toBeCalledTimes(0);
        expect(res.statusCode).toBe(200)
    })

    it('should return 404', async () => {
        client.query.mockResolvedValue({ rows: [] })
        await controller.deleteReflectionUser(req, res)
        expect(client.connect).toBeCalledTimes(0);
        expect(client.end).toBeCalledTimes(0);
        expect(res.statusCode).toBe(404)
    })

    it('should return 503', async () => {
        const rejected = Promise.reject({ message: "internal server error" });
        client.query.mockResolvedValue(rejected)
        await controller.deleteReflectionUser(req, res)
        expect(res.statusCode).toBe(503)
    })
})