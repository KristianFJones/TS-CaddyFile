// src/__tests__/Samples/Sample2.ts
// KristianFJones <me@kristianjones.dev>
// CaddyFile Sample 2 (Single Entry without curly braces)

export const CaddyFileSample2 = `
kristianjones.dev {

  proxy /fucker http://test-api  {
    websocket
  }

}`;
