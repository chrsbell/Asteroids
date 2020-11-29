// import dependencies
import React, { lazy, Suspense } from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/', (req, res, ctx) => {
    // default success
    return res(ctx.status(200));
  })
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

test('handlers server error', async () => {
  server.use(
    // override the initial "GET /greeting" request handler
    // to return a 500 Server Error
    rest.get('/', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
});

test('renders the App', async () => {
  // need to create DOM element before importing
  let app = document.createElement('div');
  app.setAttribute('id', 'app');
  document.body.appendChild(app);
  const App = lazy(() => import('../src/components/App.jsx'));
  render(
    <>
      <Suspense fallback={null}>
        <App />;
      </Suspense>
    </>
  );
});
