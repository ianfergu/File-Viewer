#!/bin/bash
# A simple script to get java dependencies
# Requires mvn and java (11)

sudo apt update -y
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt -y install maven nodejs build-essential
npm install -g npm@latest

mvn dependency:copy-dependencies -DoutputDirectory=bin
mvn compile

cd frontend
npm install