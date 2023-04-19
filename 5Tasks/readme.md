# HW6 - Async, promises, API calls

The app will work with or without the json-server running. What was 'functional', became 'local' - strictly offline. OOP is the developed option, and everything said below is related to it.

### Features:
* The app saves the last known location of the user in localStorage, defaults to Tbilisi if the user never shared geo data
* The weather is updated when the app is loaded, and on re-renders when 10 minutes have passed since weather API updated last (weather API FAQ: How often is data updated? Realtime weather is updated every 10-15 minutes - This is tracked within the API response)
* Tasks are stored both on the server and in localStorage, in case the servers are off. When the server comes online, localStorage data overrides server data
* Daily modal is shown the first time user opens the app, and every 24 hours from then

TODO:
* Really should make render synchronous - app feels slow with full-page re-renders waiting for fetches
* user configurable notification time for daily modal
* option to display pop-up instead of modal for daily