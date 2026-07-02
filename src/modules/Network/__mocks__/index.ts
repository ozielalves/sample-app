import { HttpService } from "modules/Network";

jest.mock("modules/Network", () => ({
  HttpService: {
    get: jest.fn(),
    post: jest.fn(),
    request: jest.fn(),
  },
  ApiError: class ApiError extends Error {
    constructor(
      public status: number,
      message: string,
    ) {
      super(message);
    }
  },
}));

export const mockHttpGet = HttpService.get as jest.Mock;
export const mockHttpPost = HttpService.post as jest.Mock;
