# open-window-prototype

This is an investigation spike for persisting state/communication between parent window and child window. Solution from https://stackoverflow.com/a/6491675

## Solves

- Keeping state/communication between parent window and child window on parent window refresh

## Limitations

- Can only have one child window open at a time
- If the user closes/reopens parent window tab or goes back/forward in browser history, the parent window will still lose reference to the already opened child window
  - The user will need to manually click "Open window"
