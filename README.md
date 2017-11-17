# IPFS Drive

A static web app to manage files and folders in IPFS. Works on any IPFS folder, and changes the hash when a modification is made.

## Try it

Not ready for initial release yet :(

## Features for initial release

IPFS Drive will be a static web app to manage files and folders in IPFS. It will allow to open any folder and edit the contents. After each edit of course the hash will change.

- [x] navigate inside a folder and up the parent directory
- [x] quick sharing via URL
- [x] create new files from hash or text
- [x] create folders
- [x] download files on click
- [x] UI: Favicon, toolbar
- [x] link to github
- [ ] delete, move, rename, copy files and folders
- [ ] an help/about page
- [ ] play nice when served from gateways
- [ ] polish

### Additional feature wishlist

Ordered from high priority to maybe and far fetched

- use redux saga and write tests
- offline support with service workers
- some way to check for updates reliably
- configurable download strategy: currently uses client side download with js-ipfs. It should also allow HTTP downloads via gateway. On firefox disable client side downloads
- IPNS support (blocked due to IPNS not being implemented in js-ipfs)
- report progress in the most detailed way possibile during IPFS operations
- load google static assets stuff (fonts) locally or from ipfs
- "upload" local files
- show file information like an icon based on extension, file size etc
- show network stats on files, like availability
- time machine to "undo" edits
- if a folder has an index.html, then it's a website/app and the index should open on click
- basic or configurable integration with other IPFS static apps to open files: for example open md file in a markdown renderer
- multiple file/folder delete, move, copy
- pinning / bookmarks
- chat with other users on the same page
- ability to 'follow' edits so that when someone else edits the drive you switch to the new hash too
- download folder as archive
- some way to guarantee availability using pins maybe
- search
