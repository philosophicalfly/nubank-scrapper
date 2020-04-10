# :purple_heart: Nubank Scrapper

## :question: About

Interfaced, single-user session, web-scrapper for [Nubank](https://nubank.com.br/) web [platform](https://app.nubank.com.br/#/login). Developed using:
- [NodeJS](https://nodejs.org/en/) for the back-end.
- [React](https://reactjs.org/) for the front-end.

#### Objectives:

- [x] Build a web-scrapper of any online banking platform, extracting as much data as possible. 
- [x] Use [express](https://expressjs.com/) to access to the scrapper, given the bank credentials.
- [x] Build a simple [SPA](https://en.wikipedia.org/wiki/Single-page_application) to send the info and visualize the output. 

#### Extras:

- [x] Save data to [MongoDB](https://www.mongodb.com/) using [Mongoose](http://mongoosejs.com/).
- [x] Deal with security issues.

---

## :arrow_upper_right: Deploying Locally

There are two main parts of the project, the front-end and back-end. The tutorial below is tested in Linux environments, and might also work in OS X environments.

#### Download

First, download the project and enter the root directory:

```bash
git clone https://github.com/azbardini/nubank-scrapper
cd nubank-scrapper
```
#### Database

Create a Mongo cluster/database, set user, password and permissions to it. Once created, copy the Cluster connection string to the constant `ConnectionString` in *backend/src/index.js*.

> Personal recomentation: Use a free tier of [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

#### Back-end

Once the database is configured, for the back-end, from the root directory, run:

```bash
cd backend/
npm i
npm run dev
```
> `npm i` might take a little time because Puppeteer needs downloading a chromium version to work.

If everything went OK, an API should be listening in port 3030

#### Front-end

For the front-end, from the root directory, run:

```bash
cd frontend/
npm i
npm run start
```

If everything went OK, your browser now can access Nubank Scrapper, in `http://localhost:3000/`.

---

## :customs: Usage

1) Get the NuBank mobile App in hands.
2) Go to `http://localhost:3000/`, there's a CPF and Password form, fill it and submit.
3) Wait for the reply and Scan the QR Code which will appear below the form.

If everything went OK, you'll be redirected to the dashboard, with the user's data. In the dashboard, there are 4 main buttons:

- Show Profile
- Show Summaries
- Show Transactions
- Show Charges

Each of the buttons will make a call to the API and load the logged user respective data. 

When a button's clicked and its contents are shown, there will be 2 icon buttons in the top right of the content:

- :floppy_disk: Saves the data to a new instance in MongoDB.
- :arrows_counterclockwise: Reloads the content.

In the extreme right of the topbar the :arrow_right: icon button exit the single session.

## :warning: Additional Info

#### :lock: Security

- **Cors** can be enabled to filter which URL can make calls to the backend. To do so, edit the `Origin` string in *backend/src/index.js*.
- **Crypto** is being used to cipher the CPF and Password of the user, so that only an encoded data is thrown to the internet.

#### :shipit: Useful Research

- [Pupeteer](https://pptr.dev/)
- [Puppeteer Great Tutorial](https://learnscraping.com/nodejs-web-scraping-with-puppeteer/)
- [Drag-Drop Best Snippet](https://stackoverflow.com/questions/49772472/how-to-simulate-a-drag-and-drop-action-in-puppeteer/59406881#59406881)

#### :free: Free/OpenSource I Loved Using:

- [Black Illustrations](https://www.blackillustrations.com/): Beautiful, free illustrations of black people.
- [GitMoji](https://gitmoji.carloscuesta.me/): An emoji guide for your commit messages.
- [Insomnia](https://insomnia.rest/): Open-source cross-platform GraphQL and REST client. 
- [Ubuntu](https://ubuntu.com/): Operating System

## :framed_picture: Screenshots

![](https://raw.githubusercontent.com/azbardini/nubank-scrapper/master/screenshots/screenshot01.png)

![](https://raw.githubusercontent.com/azbardini/nubank-scrapper/master/screenshots/screenshot02.png)

![](https://raw.githubusercontent.com/azbardini/nubank-scrapper/master/screenshots/screenshot03.png)
