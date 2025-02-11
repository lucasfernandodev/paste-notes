import { describe, it } from "node:test";
import { expressResponseMock } from "../../utils/mocks.ts";
import type { DeleteNoteUsecaseData } from "../../app/use-cases/notes/delete-note.ts";
import { DeleteNoteController } from "./delete-note.ts";
import assert from "node:assert";

describe('Delete Note Controller', () => {

  it('Should return error 400 if the ID or owner are not provided', async () => {
    const res = expressResponseMock()
    const reqWithoutOwner = {
      query: {
        id: new Date().toISOString()
      }
    }

    const reqWithoutId = {
      query: {
        owner: 'usertest'
      }
    }

    const usecaseMock = {
      execute: async (data: DeleteNoteUsecaseData) => { }
    }

    const ExpectedBadRequestError = {
      name: 'Bad Request',
      httpCode: 400
    }

    const controller = new DeleteNoteController(usecaseMock);
    assert.rejects(
      async () => await controller.handle(reqWithoutOwner as any, res),
      ExpectedBadRequestError
    )

    assert.rejects(
      async () => await controller.handle(reqWithoutId as any, res),
      ExpectedBadRequestError
    )
  });




  it('Should return status 204 when the note is successfully deleted', async () => {
    const res = expressResponseMock()
    const req = {
      query: {
        owner: 'usertest',
        id: new Date().toISOString()
      }
    }


    const usecaseMock = {
      execute: async (data: DeleteNoteUsecaseData) => { }
    }

    const controller = new DeleteNoteController(usecaseMock);
    await controller.handle(req as any, res)
    assert.strictEqual(204, res.statusCode)
  })
})