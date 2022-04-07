# open-window-prototype

This is an investigation spike for persisting state/communication between parent window and child window

## Solves

- Keeping state/communication between parent window and child window on parent window refresh

## Limitations

- If the user closes/reopens parent window tab or goes back/forward in browser history while having child windows open, the parent window will lose the references to the child windows
  - The user will need to manually click "Open window" to start a new instance
  - When the page loads, there may be cached data in local storage since they didn't technically close the child windows. If the user has disallowed pop ups on page load, the browser/tab will attempt to open an undefined reference and a pop up blocked notification will appear. To fix this, we'll delete the cached data after the first pop up blocked notification to prevent it from appearing in the future
  - If the user allows pop ups, depending on how many child windows were open previously, that amount of windows will open everytime they refresh the page until they manually close all the child windows (deleting them from local storage)
