#!/bin/bash
# A simple script to start FileServer

echo "starting server with path" $1
java -Dfile.encoding=UTF-8 -classpath "./target/classes:./bin/commons-io-2.6.jar:./bin/http-20070405.jar:./bin/gson-2.8.5.jar" FileServer $1
