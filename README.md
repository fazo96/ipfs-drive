# IPFS Drive

A static, serverless web app to manage files and folders in IPFS.

Works on any existing IPFS folder.

### Features in the latest release

- visit any existing IPFS folder
- navigate inside folders and up the parent directory
- add stuff to any folder, including things already on IPFS or plaintext
- copy URL for any file or folder
- create folders
- delete, move, rename, copy files and folders
- view and download files on click
- clear button to quickly start from empty
- picks up where you left off
- undo/redo using back/forward browser buttons. Changes the URL every time you make a modification

## Try it

This is the latest development build with known issues.

[Check it out](https://ipfs.io/ipfs/QmSLoHumxHbaFLSk5tZCvJhhEwt5iNy7P5aPdmWWCjDdKx)

See the CHANGELOG.md file for information about features and known issues in the latest build.

#### Known Issues

This is what's currently known as broken in master.

- some javascript errors outputted by ipfs in the browser console
- sluggish interface in huge folders
- wonky file/folder detection

#### Next Release

This is stuff I'd like to implement next.

- improve performance in huge folders somehow
- report progress in the most detailed way possibile during IPFS operations
- handle errors as much as possible
- remove sourcemaps from prod release

### Additional feature wishlist

This is what I'd like to work on next, in no particular order:

- write tests
- "upload" local files
- configurable download strategy (streaming via js or http via gateway)
- configurable connectivity to go-ipfs for persistence and an overall improved experience
- IPNS support, of course the underlying ipfs implementation must support it
- splitting the JS to avoid 6MB brick and maybe to better share code between versions. It should incrementally load the app
- offline support with service workers
- some way to check for updates reliably, probably an OrbitDB Feed
- show bitswap stats and maybe some kind of controls over IPFS
- load google static assets stuff (fonts) locally or from ipfs links
- show file information like an icon based on extension, file size etc
- show network stats on files, like availability
- if a folder has an index.html, then it's a website/app and the index should open on click
- basic or configurable integration with other IPFS static apps to open files: for example open md file in a markdown renderer
- multiple file/folder delete, move, copy
- pinning. It should start a "background job" that notifies the user when done, of course the underlying ipfs implementation must support it
- download folder as archive
- some way to guarantee and check availability
- simple search

#### Long term

These are longer term ideas that imply a change in scope for the project.

- Feeds: feeds will be a way to share stuff. Other users will be able to subscribe to your feed with a link and they'll see what you publish. This would turn Drive into a bit of a social media platform, or it could just be a way to publish dynamic content.
  - create, delete, post to your feeds
  - advertise feeds and also check for feeds being advertised right now
  - seed/pin feeds
- real time file managing with other people
- integrated content viewing and editing, for example playing videos
- manage orbit-db databases
- turn this into a complete IPFS Web UI
