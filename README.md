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
- UI Polish: Favicon, toolbar
- IPNS support
- delete, move, rename, copy files and folders
- an help/about page with a link to github
- check for updates

### Additional feature wishlist

Ordered from most likely to be implemented to far fetched

- report progress in the most detailed way possibile during IPFS operations
- load google static assets stuff (fonts) locally or from ipfs
- show file information like an icon based on extension, file size etc
- time machine to go back
- if a folder has an index.html, then it's a website/app and the index should open on click
- configurable integration with other IPFS static apps to open files
- "upload" local files
- multiple file/folder delete, move, copy
- chat with other users on the same page
- ability to 'follow' edits so that when someone else edits the drive you switch to the new hash too
- download folder as archive
- some way to guarantee availability using pins maybe
- search
