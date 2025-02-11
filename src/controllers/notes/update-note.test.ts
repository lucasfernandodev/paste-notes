import { describe, it } from "node:test";
import { expressResponseMock } from "../../utils/mocks.ts";
import { UpdateNoteController } from "./update-note.ts";
import assert from "node:assert";
import type { UpdateNoteUsecaseData } from "../../app/use-cases/notes/update-note.ts";

describe('Update Note Controller', () => {
  const OWNER = 'usertest';

  it('Should return status 200 when all required arguments are provided correctly', async () => {
    const res = expressResponseMock()
    const req = {
      body: {
        owner: OWNER,
        note: {
          id: new Date().toISOString(),
          content: ['Nota de teste']
        }
      }
    }

    const usecaseMock = {
      execute: async (data: UpdateNoteUsecaseData) => {
        return {
          id:  new Date().toISOString(),
          owner: OWNER,
          content: ['Nota de teste']
        }
      }
    }

    const controller = new UpdateNoteController(usecaseMock);
    await controller.handle(req as any, res)
    assert.strictEqual(200, res.statusCode)
  });




  it('Should return error 400 when one or more required arguments are missing', async () => {
    const res = expressResponseMock()
    const reqWithoutOwner = {
      body: {
        note: {
          id: new Date().toISOString(),
          content: ['Nota de teste']
        }
      }
    }

    const reqWithoutNote = {
      body: {
        owner: OWNER,
      }
    }

    const usecaseMock = {
      execute: async (data: UpdateNoteUsecaseData) => {
        return {
          id:  new Date().toISOString(),
          owner: OWNER,
          content: ['Nota de teste']
        }
      }
    }

    const controller = new UpdateNoteController(usecaseMock);
    const callControllerWithoutOwner = async () => await controller.handle(reqWithoutOwner as any, res)
    const callControllerWithoutNote = async () => await controller.handle(reqWithoutNote as any, res)

    assert.rejects(callControllerWithoutOwner, {
      name: 'Bad Request',
      httpCode: 400
    })

    assert.rejects(callControllerWithoutNote, {
      name: 'Bad Request',
      httpCode: 400
    })
  });




  it('Should return status 200 and the updated note ID in case of success', async () => {
    const res = expressResponseMock()
    const req = {
      body: {
        owner: OWNER,
        note: {
          id: new Date().toISOString(),
          content: ['Nota de teste']
        }
      }
    }

    const usecaseMock = {
      execute: async (data: UpdateNoteUsecaseData) => {
        return {
          id:  new Date().toISOString(),
          owner: OWNER,
          content: ['Nota de teste']
        }
      }
    }

    const controller = new UpdateNoteController(usecaseMock);
    await controller.handle(req as any, res)
    assert.strictEqual(200, res.statusCode)
    assert.ok(typeof res['data']?.id === 'string')
  })
})