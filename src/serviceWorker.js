//check if the app is running on localhost or local network (useful for service worker handling)
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  // 127.0.0.0/8 are considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

//function to handle the service worker registration
export function signup(config) {
  //only proceed if in production environment and service worker is supported in the browser
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

    //if the public URL's origin doesn't match the current origin, skip the service worker registration
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    //wait for the window to load before registering the service worker
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`; //set the path for the service worker

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .signup(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

//function to check if the service worker is valid
function checkValidServiceWorker(swUrl, config) {
  //check if the service worker can be found. if it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      //ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        //no service worker found. probably a different app. reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.register().then(() => {
            window.location.reload(); //reload page after service worker registration
          });
        });
      } else {
        //service worker found. proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      //if no internet connection, inform the user that the app is offline
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

//function to register the service worker if no other conditions are met
export function register() {
  if ('serviceWorker' in navigator) {
    //wait for the service worker to be ready and register it
    navigator.serviceWorker.ready
      .then(registration => {
        registration.register();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}