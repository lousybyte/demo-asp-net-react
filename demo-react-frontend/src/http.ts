import { webAPIUrl } from './AppSettings';

export interface HttpRequest<REQB> {
  path: string;
  method: string;
  body?: string;
  headers?: HeadersInit;
  accessToken?: string;
}

export interface HttpResponse<RESB> {
  ok: boolean;
  body?: RESB;
}

export const http = async <RESB,REQB = undefined>(req: HttpRequest<REQB>): Promise<HttpResponse<RESB>> => {
  const request = new Request(`${webAPIUrl}${req.path}`,
    {
      method: req.method || 'GET',
      body: req.body,
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json',
      }
    }
  );

  if (req.accessToken) {
    request.headers.set(
      'authorization',
      `bearer ${req.accessToken}`,
    );
  }

  const response = await fetch(request);

  if (response && response.ok) {
    const content = await response.text();
    if (content) {
      const body = JSON.parse(content);
      return { ok: response.ok, body };
    } else {
      return { ok: response.ok };
    }
  } else {
    logError(request, response);
    return { ok: response.ok };
  }
};

const logError = async (request: Request, response: Response) => {
  const contentType = response.headers.get('content-type');
  let body: any;

  if (contentType && contentType.indexOf('application/json') !== -1) {
    body = await response.json();
  } else {
    body = await response.text();
  }

  console.error(`Error requesting ${request.method} ${request.url}`, body);
};
