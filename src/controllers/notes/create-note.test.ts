import { describe, it } from "node:test";
import { CreateNoteController } from "./create-note.ts";
import assert from "node:assert";
import type { Response } from "express";
import type { CreateNoteUsecaseData } from "../../app/use-cases/notes/create-note.ts";

function mockResponse() {
  return {
    status: function (code) {
      this.statusCode = code;
      return this;
    },
    json: function (data) {
      this.data = data;
      return this;
    },
    send: function (data) {
      this.data = data;
      return this;
    }
  };
}

describe('Create Note Controller - Handling Note Creation Requests', () => {

  it('Should successfully create a new note and return status 201', async () => {

    const res = mockResponse() as Response
    const req = {
      body: {
        owner: 'lucas',
        note: {
          id: new Date().toISOString(),
          content: ['initial note']
        }
      }
    }

    const usecaseMock = {
      execute: async (data: CreateNoteUsecaseData) => {
        return {
          id: data.note.id,
          owner: data.owner,
          content: data.note.content as unknown as string[]
        }
      }
    }

    const controller = new CreateNoteController(usecaseMock);
    await controller.handle(req as any, res)
    assert.strictEqual(res.statusCode, 201)
  })

  it('Should return a 400 error if any required schema property is missing', async () => {
    const res = mockResponse() as Response
    const req = {
      body: {
        note: {
          id: new Date().toISOString(),
          content: ['initial note']
        }
      }
    }

    const reqWithoutNote = {
      body: {
        owner: 'lucas'
      }
    }

    const usecaseMock = {
      execute: async (data: CreateNoteUsecaseData) => {
        return {
          id: data.note.id,
          owner: data.owner,
          content: data.note.content as unknown as string[]
        }
      }
    }

    const controller = new CreateNoteController(usecaseMock);
    const callControllerWithoutOwner = async () => await controller.handle(req as any, res)
    const callControllerWithoutNote = async () => await controller.handle(reqWithoutNote as any, res)


    assert.rejects(callControllerWithoutOwner, {
      name: 'Bad Request',
      httpCode: 400
    })

    assert.rejects(callControllerWithoutNote, {
      name: 'Bad Request',
      httpCode: 400
    })
  })

  it('Should successfully return the details of the newly created note', async () => {
    const res = mockResponse() as Response
    const req = {
      body: {
        owner: 'lucas',
        note: {
          id: new Date().toISOString(),
          content: ['initial note']
        }
      }
    }

    const usecaseMock = {
      execute: async (data: CreateNoteUsecaseData) => {
        return {
          id: data.note.id,
          owner: data.owner,
          content: data.note.content as unknown as string[]
        }
      }
    }

    const expectedReponse = {
      note: {
        id: req.body.note.id,
        owner: req.body.owner,
        content: req.body.note.content
      }
    }

    const controller = new CreateNoteController(usecaseMock);
    await controller.handle(req as any, res)
    assert.deepEqual(expectedReponse, res['data'])
  })
})