/**
 * www.ufo-declassified.com currently serves this same static site with 200s.
 * Send those requests to the apex with a 301, keeping path and query.
 * Apex (and preview hosts) fall through to the static asset pipeline, which
 * still applies `_redirects` and trailing-slash handling.
 */
const WWW_HOST = 'www.ufo-declassified.com';
const APEX_ORIGIN = 'https://ufo-declassified.com';

interface Env {
  ASSETS: {
    fetch(input: Request | string): Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.hostname.toLowerCase() === WWW_HOST) {
      const target = new URL(`${url.pathname}${url.search}`, APEX_ORIGIN);
      return Response.redirect(target.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
