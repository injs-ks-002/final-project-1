const httpMocks = require('node-mocks-http')
const controller = require('../controllers/user.controller')
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

describe('UserController.signup', () => {
    it('should return 201', async () => {
        const body = req.body;
        client.query.mockResolvedValue({
            email: body.email
        })
        await controller.signup(req, res)
        expect(client.connect).toBeCalledTimes(0);
        expect(client.end).toBeCalledTimes(0);
        expect(res.statusCode).toBe(200)
    })

    it('should return 503', async () => {
        const rejected = { message: "internal server error" }
        try {
            client.query.mockResolvedValue(rejected)
            await controller.signup(req, res)
        } catch {
            expect(res.statusCode).toBe(503)
        }
    })
})

describe('UserController.signin', () => {
    it('should return 200', async () => {
        const body = req.body;
        client.query.mockResolvedValue({
            email: body.email,
            password: body.password
        })
        await controller.signIn(req, res)
        expect(client.connect).toBeCalledTimes(0);
        expect(client.end).toBeCalledTimes(0);
        expect(res.statusCode).toBe(200)
    })

    it('should return 503', async () => {
        const rejected = { message: "internal server error" }
        try {
            client.query.mockResolvedValue(rejected)
            await controller.signIn(req, res)
        } catch {
            expect(res.statusCode).toBe(503)
        }
    })
})