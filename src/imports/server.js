import './api/publications'

import { VueSSR } from 'meteor/akryum:vue-ssr'
import CreateApp from './app'

const isDev = process.env.NODE_ENV !== 'production'

// Simple createApp

VueSSR.createApp = function (context) {
  const { app, router, store } = CreateApp()

  // set router's location
  router.push(context.url)

  return app
}

/*

// This will be called each time the app is rendered
VueSSR.createApp = function (context) {
  const s = isDev && Date.now()

  return new Promise((resolve, reject) => {
    const { app, router, store } = CreateApp()

    // set router's location
    router.push(context.url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      // no matched routes
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }

      // Call preFetch hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      Promise.all(matchedComponents.map(component => {
        return component.preFetch && component.preFetch(store)
      })).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)

        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.injectData = {
          vuex: store.state,
        }

        console.log(store.state)

        resolve(app)
      }).catch(reject)
    })
  })
}

*/
