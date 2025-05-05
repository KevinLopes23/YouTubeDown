declare module "node-fetch" {
  import type { RequestInfo, RequestInit, Response } from "node-fetch";

  declare function fetch(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<Response>;
  export default fetch;
}
