export class CmHostHandler {
  static getHost(clientHost: string = ""): string {
    const isServer = typeof window === "undefined";
    const baseUrl = isServer ? "http://127.0.0.1:3000" : clientHost;
    return baseUrl;
  }
}
