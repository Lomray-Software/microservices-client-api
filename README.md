# Microservices API client for [microservices](https://github.com/Lomray-Software/microservices)

![npm](https://img.shields.io/npm/v/@lomray/microservices-client-api)
![GitHub](https://img.shields.io/github/license/Lomray-Software/microservices-client-api)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=microservices-client-api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=microservices-client-api)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=microservices-client-api&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=microservices-client-api)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=microservices-client-api&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=microservices-client-api)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=microservices-client-api&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=microservices-client-api)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=microservices-client-api&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=microservices-client-api)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=microservices-client-api&metric=coverage)](https://sonarcloud.io/summary/new_code?id=microservices-client-api)

## This package contains:
 - API Client (Web - axios, NodeJS - microservice application)
 - Endpoints (microservices)
 - API interfaces

## Getting started

The package is distributed using [npm](https://www.npmjs.com/), the node package manager.

```
npm i --save @lomray/microservices-client-api
```

## Scope and entry points

This client targets the RPC endpoints of [Lomray Microservices](https://github.com/Lomray-Software/microservices).
It is not a generic REST client or a server implementation. The example below uses release `2.104.0`.
That release ships CommonJS modules and adjacent declarations at subpaths; use those subpaths,
not the package root (the manifest's `index.js` and `index.d.ts` are not in the released archive).

- `@lomray/microservices-client-api/api-client`: Axios client with application auth/user stores and storage.
- `@lomray/microservices-client-api/api-client-backend`: adapter for a microservice application's `sendRequest`.
- `@lomray/microservices-client-api/endpoints`: typed endpoint helpers.

## Backend adapter example

```bash
npm install @lomray/microservices-client-api@2.104.0
```

Save as `example.cjs` and run `node example.cjs`. This is an isolated adapter example,
not a running microservice: the application below returns a local response object.
In a deployed service, pass your initialized microservice application instead.

```javascript
const ApiClientBackend = require('@lomray/microservices-client-api/api-client-backend');

const app = {
  async sendRequest(method, params, options) {
    return { toJSON: () => ({ result: { method, params, isThrowError: options.isThrowError } }) };
  },
};
const client = new ApiClientBackend(app);

client.sendRequest({ method: 'demo.echo', params: { message: 'hello' } })
  .then((response) => console.log(response.result))
  .catch((error) => { console.error(error); process.exitCode = 1; });
```

The backend adapter calls `app.sendRequest` and expects its result to have `toJSON()`.
It passes `isThrowError: false`; inspect the returned RPC response for errors.
It rejects batch arrays and does not provide a language value.

The Axios client is a different integration: its constructor needs `apiDomain`, `userStore`,
`authStore` and `storage`; connect the store manager with `setStoreManager` before auth flows.
See [the constructor and methods](src/api-client.ts) and [storage contract](src/storages/i-storage.ts).
For SSR, keep the client, headers, token storage and store manager request-local; do not share one user's state across requests.

## Documentation checks

Run `node scripts/check-docs.cjs` from this repository. Build first with `npm run build`, or set `DOCS_PACKAGE_DIR` to an unpacked release. The check runs the README adapter example with a local application double; it does not contact a live service.

Run `node scripts/test-docs-check.cjs` with the same setup to test the checker itself,
including an example that never settles. This is a local check, not a configured CI job.
