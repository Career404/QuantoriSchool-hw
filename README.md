
----------------
###  This repo is a collection of homework assignments for Quantori Javascript School

1. HTML, CSS, Git - basic layouts with HTML and CSS, Git repo, branching, pull request. Everything else is done voluntarily
2. HTML & CSS - DVD Logo Screensaver made with different appproaches, including one with no JS. Implemented as a React component on the deployed page.
3. BEM, Graphics, Design - responsive page made with BEM methodology following a Figma mockup. Bonus task: completed SVG animation
4. Introduction to JS - a set of JS tasks is completed
5. Git, DOM, OOP - beginning of the to-do app. Prerequisites: basic code and Figma mockup. Result: OOP and Functional code implemented, saving tasks in localStorage
6. Promises, Event loop - added API calls for weather widget and used JSON-server as a fake REST API (for task database), combined with localStorage for when there is no connection
7. TypeScript - added and configured Webpack and plugins, transferred the app to TS, added custom typings, isolated the components. Bonus task: learn TS Generics by flattening an array of `any` without `Array.flat` or `any`
8. Introdution to React - transferred the project to React, integrating it in the `main` branch.

# To-do list
Latest tasks have me working on a classic to-do task tracker. I made it a PWA by making it available offline
### Features:

* See current weather provided by WeatherAPI and plan your day accordingly *display more data*
* Smooth online/offline experience with localStorage and REST API
* Separate tab for private data that only exists on your device *add password lock?*

### Possible features:
* Layout improvements (limit max width for widescreen, remove task width limit, move trash icon to the start of the task)
* Personalization (dark theme, user background, colors and fonts, layout options)
* More task field options (textarea with md support, custom notifications for tasks)
* Caching with a service worker, background sync and push notifications for a native-like feel
* switch to IndexedDB - larger capacite and ?better performance?, use complex queries
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

Interfaces that are only encountered in one file are declared in the same file. Interfaces that occur in multiple files, are declared globally in types.d.ts

### Done:
* Added npm project (tasks) inside another npm project (Quantori-HW)
* Added webpack, html-plugin and all necessary style modules, and webpack-dev-server
* Added custom scripts for JSON-Server running in parallel with webpack-dev-server
* Split the project into components (isolated component styles)
* Project moved to typescript, minimal use of any

### TODO:
* Refactor error handling, review promises in the code (excessive?)
* ?*Possibly* optimize local vs. server interaction (compare and combine local to server, allow user to choose a winner?)

## HW8 - React
-----------------------
Not to brag, but useLocalStorage hook works flawlessly, all PWA features transferred to React.
### Done:
* Integrated the app into the main project
* Refactored the app into React
* Cleanup: removed 5Tasks folder
### TODO:
* ?work on auth feature

## HW9 - React Router, Redux
-------------------------
### Done:
* Installed react-router, configured it to only work in the Todo Task page, used HashRouter for GitHub-pages
* Transferred the App component to routes (private and server)
* Implemented search with URL queries
### TODO:
* REFACTOR TO THE PLANNED ARCHITECTURE:
  1. remove loaders
  2. extract Todo loadData()
  3. write a Collector
* Set up Redux store
* Refactor API calls to use redux-thunk
* Implement filtering by tags
* Add edit task functionality with separate route
* Look into synching data

Main task
Improve To-Do application by adding Redux store and react-router:

1. Use Redux to store tasks
Tasks are handled by Redux store - 1 point
Use redux-thunk to download from server - 1 point (optional)
1. Use react-router and add app paths
Implement tags - `health`, `work`, `home`, `other`. (see the design in Figma). The list of tags is predefined and not editable. Implement filtering tasks by a tag (The UI for filtering is missing in Figma and up to you). When users select a tag they should see only tasks with that tag and the URI should show the selected tag (e.g. localhost:3000/tasks/home). When a user opens a page localhost:3000/tasks/home they should see only tasks with `home` tag. - 1 point
When the user searches for tasks by a substring the URI should change accordingly. Use query string - localhost:3000/tasks?q=search-term. When user opens url with a query string the search input field should be filled with query and the task list should be filtered - 1 point
Note that searching by substring should preserve the state when the user refreshes the page and it should work correctly even with strings containing symbols “ : / ? & = # ” - 1 point
For the sake of simplicity you can make mutually exclusive searching for tasks by a substring and filtering tasks by a tag - when tasks are filtered by a tag switch off searching and vice versa. If you implement simultaneous filtering and searching you will get 1 point. (optional)
1. Add a missing functionality - edit tasks
A user should be able to edit an existing task. You can use the “New task” modal window for editing. This part of the homework doesn’t include working with the router, it is just some additional functionality. - 1 point


4. Extra task - Add a synchronization mechanism between browser tabs - 2 points
When the user opens the application in two browser tabs, the tasks are always in sync in both tabs so, for example, when the user removes, adds or edits a task in one tab, the same change happens to the second tab without refreshing it manually.
There can be various approaches to achieve this result but in all cases it should be a purely frontend solution - don’t try to use any additional web server besides json-server and try to avoid additional server calls for data that is already on the client.


### General idea of the ToDo app architecture:

```
+-----------------+  +-----------------+
|   LocalStorage  |  |     Server      |
+-----------------+  +-----------------+
          |              .
          |              .
          v       await  v
+--------------------------------------+
|   Collector function/Service Worker  | - compares LS to recieved server data
+--------------------------------------+
          |      .
          |      .  - send server data when ready, if needed
          v      v
    +-----------------+
    |    App State    | - Redux lives here
    +-----------------+
             |   .
             |   .
             v   v
    +-----------------+
    |       View      |
    +-----------------+
 ```