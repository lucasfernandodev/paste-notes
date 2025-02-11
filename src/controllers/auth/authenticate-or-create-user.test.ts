import { AuthenticateOrCreateUserController } from './authenticate-or-create-user.ts';
import { describe, it } from "node:test";
import { expressResponseMock } from "../../utils/mocks.ts";
import type { AuthenticateOrCreateUserUsecaseData } from "../../app/use-cases/auth/authenticate-or-create-user.ts";
import assert from 'assert';

describe('Authenticate Or Create User Controller', () => {

  it('Should return a 400 (Bad Request) error when the request does not contain an ID in the request body', async () => {
    const response = expressResponseMock();
    const req = {
      body: {}
    }

    const usecaseMock = {
      execute: async (data: AuthenticateOrCreateUserUsecaseData) => {
        return {
          id: ''
        }
      }
    }

    const controller = new AuthenticateOrCreateUserController(usecaseMock);
    const callControllerWithoutId = async () => {
      return await controller.handle(req as any, response)
    }

    const ExpectedBadRequestError = {
      name: 'Bad Request',
      httpCode: 400
    }

    assert.rejects(callControllerWithoutId,
      ExpectedBadRequestError
    )
  });




  it('Should return 200 and the user ID if the user already exists or has been successfully created', async () => {
    const response = expressResponseMock();
    const req = {
      body: {
        id: 'usertest'
      }
    }

    const usecaseMock = {
      execute: async (data: AuthenticateOrCreateUserUsecaseData) => {
        return {
          id: 'usertest'
        }
      }
    }

    const expected = { id: 'usertest' }

    const controller = new AuthenticateOrCreateUserController(usecaseMock);
    await controller.handle(req as any, response);
    assert.strictEqual(200, response.statusCode)
    assert.deepEqual(expected, response['data'])
  });
})