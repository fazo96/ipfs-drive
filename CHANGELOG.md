# v0.1.0

[Try it](https://ipfs.io/ipfs/QmULwT1X6BTZdKprR7Q32BrtznGtaHwEzUxJfaVfQaAySe)

First release! __This is a preview release not ready to be used seriously__.

## Features

- visit any existing IPFS folder
- create new files from hash or text
- create folders
- download files on click
- navigate inside a folder and up the parent directory
- delete, move, rename, copy files and folders
- clear button to quickly start over
- quick sharing via URL
- remember the user's last visited folder

## Known Issues

- __(critical)__ staying open a couple of minutes (even idling) leads to memory hog, high cpu usage and quickly browser tab crash
- many javascript errors outputted by ipfs in the browser console
- when a directory is loaded, the app starts analyzing its items to figure out their size, if they are a folder and other information. At the moment this process locks the browser when the folder is too big.
- downloads don't work on firefox (missing Streams API)
- no tests
- not yet optimized or polished visually
