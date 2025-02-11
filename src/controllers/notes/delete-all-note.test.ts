import { describe, it } from "node:test";
import assert from "assert";
import { expressResponseMock } from "../../utils/mocks.ts";
import type { DeleteAllNoteUsecaseData } from "../../app/use-cases/notes/delete-all-notes.ts";
import { DeleteAllNoteController } from "./delete-all-note.ts";

describe('Delete All Note Controller', () => {

  it('Should return error 400 when the owner is not provided', async () => {
    const res = expressResponseMock()
    const reqWithoutOwner = {
      query: {}
    }

    const usecaseMock = {
      execute: async (data: DeleteAllNoteUsecaseData) => { }
    }

    const ExpectedBadRequestError = {
      name: 'Bad Request',
      httpCode: 400
    }

    const controller = new DeleteAllNoteController(usecaseMock);
    assert.rejects(
      async () => await controller.handle(reqWithoutOwner as any, res),
      ExpectedBadRequestError
    )
  })




  it('Should return status 204 when the operation is successful', async () => {
    const res = expressResponseMock()
    const req = {
      query: {
        owner: 'usertest'
      }
    }

    const usecaseMock = {
      execute: async (data: DeleteAllNoteUsecaseData) => { }
    }

   
    const controller = new DeleteAllNoteController(usecaseMock);
    await controller.handle(req as any, res)
    assert.strictEqual(204, res.statusCode)
  })
})