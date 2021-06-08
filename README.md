# FileViewer

A simple application that serves files and displays them in browser. Takes in a source directory and serves files in that directory to be viewed in a web browser. All files are expected to be txt files (no binary).

<img width="1214" alt="Screen Shot 2021-06-08 at 12 51 10 PM" src="https://user-images.githubusercontent.com/42654771/121227548-afae1c80-c859-11eb-9785-5617786d4c7d.png">

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

