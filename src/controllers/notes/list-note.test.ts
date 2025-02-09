import { describe, it } from "node:test";
import { expressResponseMock, generateNoteMock } from "../../utils/mocks.ts";
import type { ListNoteUsecaseData } from "../../app/use-cases/notes/list-notes.ts";
import { ListNoteController } from "./list-note.ts";
import assert from "node:assert";

describe('List Notes', async () => {

  it('Should return success (statusCode 200) if the owner is valid', async () => {
    const res = expressResponseMock()
    const req = {
      query: {
        owner: 'usertest'
      }
    }

    const usecaseMock = {
      execute: async (data: ListNoteUsecaseData) => {
        return []
      }
    }

    const controller = new ListNoteController(usecaseMock);
    await controller.handle(req as any, res)
    assert.strictEqual(200, res.statusCode)
  })



  it('Should fail if the owner is not provided', async () => {
    const res = expressResponseMock()
    const req = {
      query: {}
    }

    const usecaseMock = {
      execute: async (data: ListNoteUsecaseData) => {
        return []
      }
    }

    const controller = new ListNoteController(usecaseMock);
    const callControllerWithoutOwner = async () => await controller.handle(req as any, res)

    assert.rejects(callControllerWithoutOwner, {
      name: 'Bad Request',
      httpCode: 400
    })
  })




  it('Should return successfully in the expected format', async () => {
    const OWNER = 'usertest'
    const res = expressResponseMock()
    const req = {
      query: {
        owner: OWNER
      }
    }

    const notes = [
      generateNoteMock({ owner: OWNER }),
      generateNoteMock({ owner: OWNER }),
      generateNoteMock({ owner: OWNER })
    ]

    const usecaseMock = {
      execute: async (data: ListNoteUsecaseData) => {
        return notes
      }
    }

    const expected = {
      notes: notes
    }

    const controller = new ListNoteController(usecaseMock);
    await controller.handle(req as any, res)
    assert.deepEqual(expected, res['data'])
  })
})