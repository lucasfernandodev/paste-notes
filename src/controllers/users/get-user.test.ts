
import { it, describe } from "node:test";
import { expressResponseMock } from "../../utils/mocks.ts";
import type { GetUserUsecaseData } from "../../app/use-cases/users/get-user.ts";
import { GetUserController } from "./get-user.ts";
import assert from "node:assert";

describe('Get User Controller Test', () => {
  it('Should return a 400 (Bad Request) error when the owner parameter is not provided in the request query', async () => {
    const response = expressResponseMock();
    const req = {
      query: {}
    }

    const usecaseMock = {
      execute: async (data: GetUserUsecaseData) => null
    }

    const ExpectedBadRequestError = {
      name: 'Bad Request',
      httpCode: 400
    }


    const controller = new GetUserController(usecaseMock);
    const callWithoutOwner = async () => {
      return await controller.handle(req as any, response)
    }

    assert.rejects(callWithoutOwner, ExpectedBadRequestError)
  });



  it('Should return status 200 and an object containing the user ID if the user exists', async () => {
    const response = expressResponseMock();
    const req = {
      query: {
        owner: 'usertest'
      }
    }

    const usecaseMock = {
      execute: async (data: GetUserUsecaseData) => {
        return { id: 'usertest' }
      }
    }

    const expected = {
      user: { id: 'usertest' }
    }

    const controller = new GetUserController(usecaseMock);
    await controller.handle(req as any, response)
    assert.strictEqual(200, response.statusCode);
    assert.deepEqual(expected, response['data'])
  })




  it('Should return status 200 and an object with the property user set to null when the user is not found', async () => {
    const response = expressResponseMock();
    const req = {
      query: {
        owner: 'usertest'
      }
    }

    const usecaseMock = {
      execute: async (data: GetUserUsecaseData) => null
    }

    const expected = {
      user: null
    }

    const controller = new GetUserController(usecaseMock);
    await controller.handle(req as any, response)
    assert.strictEqual(200, response.statusCode);
    assert.deepEqual(expected, response['data'])
  })
})