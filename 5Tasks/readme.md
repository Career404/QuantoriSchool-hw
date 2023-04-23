# To-do list PWA

The purpose of this task tracker is to be available at all times. It will not be deployed as is - but refactored and integrated into branch `main` project later
### Features:

* See current weather provided by WeatherAPI and plan your day accordingly *display more data*
* Integration of localStorage and REST API allows for a smooth online/offline experience
* Separate tab for private data that only exists on your device *add password lock?*
## HW6 - Async, promises, API calls
-------------------------------

The app will work with or without the json-server running. What was 'functional', became 'local' - strictly offline. OOP is the developed option, and everything said below is related to it.

* The app saves the last known location of the user in localStorage, defaults to Tbilisi if the user never shared geo data (delete local storage -> disable geolocation -> reload the page (Tbilisi) -> enable geolocation -> click on the widget to reload weather data (Yerevan) -> disable geo, reload the page (still Yerevan))
* The weather is updated when the app is loaded, and on re-renders once every 10 minutes(weather API FAQ: How often is data updated? Realtime weather is updated every 10-15 minutes - This is tracked within the API response... unfortunately  weather is updated by this provider much rarer than that, and there's a high chance to fall into an endless loop of API calls while relying on that data)
* Tasks are stored both on the server and in localStorage.
* Connectivity state is displayed with an icon. In case the servers are off - When the server comes online, localStorage data overrides server data
* Daily modal is shown the first time user opens the app, and every 24 hours from then

### TODO:
* FIX: When the server comes online, user has to reload the page immediately, before making any further changes to the tasks - otherwise all local changes between __*server-off*__ and __*first-action-with-server-on*__ will be lost.
* FEATURE: user configurable notification time for daily modal
* FEATURE: option to display pop-up instead of modal for daily

## HW7 - Webpack, TypeScript
-------------------------------

### Done:
* Added npm project (tasks) inside another npm project (Quantori-HW)
* Added webpack, html-plugin and all necessary style modules, and webpack-dev-server
* Added custom scripts for JSON-Server running in parallel with webpack-dev-server
* Split the project into components (isolated component styles)

### TODO:
* Migrate to TS - avoid any type, create separate file for interfaces
* Refactor error handling, review promises in the code (excessive?)
* ?*Possibly* optimize local vs. server interaction (compare and combine local to server, allow user to choose a winner?)
