import type { $Fetch } from "ofetch";

export default class BaseService {
  protected fetch: $Fetch;
  protected nuxtApp = useNuxtApp();

  constructor(fetch: $Fetch) {
    this.fetch = fetch;
  }

  protected async request<T>(
    url: string,
    method: string,
    body?: object,
    options?: object
  ): Promise<T | undefined> {
    try {
      return await this.fetch<T>(url, {
        method,
        ...(body && { body }),
        ...options,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let message = "Falha na conexão do servidor."
      if (error.message) message = error.message;
      if (error.data) message = error.data.message;
      this.nuxtApp.callHook("app:error", { message, originalError: error });
      throw error;
    }
  }
}
