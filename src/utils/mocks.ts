import type { Response } from "express";
import type { INote } from "../types/note.ts";

export function expressResponseMock() {
  return {
    status: function (code: number) {
      this.statusCode = code;
      return this;
    },
    json: function (data: Record<any, any>) {
      this.data = data;
      return this;
    },
    send: function (data?: string ) {
      this.data = data;
      return this;
    }
  } as Response;
}



export const generateNoteMock = ({content,id,owner}: Partial<INote>)=>{
  return {
    id: id ?? new Date().toISOString(),
    owner: owner ?? 'usertest',
    content: content ??['first note']
  }
}