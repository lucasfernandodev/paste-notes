import type { Response } from "express";

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