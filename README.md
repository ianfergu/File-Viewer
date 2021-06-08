# FileViewer

A simple application that serves files and displays them in browser.

## Walkthrough
### Backend
I wanted my backend to be very lightweight and simple, so I created a Java HTTP Server (Server Socket) using com.sun.net's HttpServer. It works by creating a single HTTP server with two HttpHandlers: one for a list of available files, and another for retrieving a single file. 

The file list endpoint works by using Apache Commons IO's FileUtils to read in all available files for a specific directory. This list of files is then returned as a JSON array.

The actual file endpoint works by trying to read in a file at the path provided in the  HTTP Get request. If available, it reads in the file as a string and returns it.
### Frontend
The front end uses React to display files. There are two main components to the frontend, a FileList and FileViewer.

The FileList does an HTTP Get to the file list endpoint and creates a new list item for each entry. These list items can be filtered using the search bar.

The FileViewer does an HTTP Get to whichever specific file has been selected from the FileList.  Any time the selected file changes, another request is made. The viewer can be cleared with the 'X' in the nav bar.
### Running
Build Java code and npm install:

	./build.sh

Start Java Server at /sample/file/path:

	./start.sh /sample/file/path

Start Frontend:

	cd frontend
	npm start

The frontend should be available at http://localhost:3000
## Discussion: If the number of files is very large (10,000+)

If the number of files is very large, the amount of files returned from the list endpoint could be limited to 1000 and paginated. The frontend could also allow collapsable directories like a more typical file browser.
## Discussion: If the contents of all the files do not fit in memory
This HTTP server is very simple and all of the files do not need to be put into memory, as they are being read individually. If memory becomes an issue, files could again be separated into chunks and only loaded when required. 

## External resources
https://reactjs.org/docs/faq-functions.html
https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/update/postrender_with_componentdidupdate.html
https://zetcode.com/java/listdirectory/
https://docs.oracle.com/javase/8/docs/jre/api/net/httpserver/spec/com/sun/net/httpserver/package-summary.html

## Libs & Third Party Tools

Backend
 - Google Gson
 - Apache Commons IO
 - com.sun.net HttpServer
 - Maven

Frontend
 - React.js
 - Bootstrap
 - Boostrap Icons

## Time Spent

I spend 6-7 hours working on this assignment.
