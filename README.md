# :purple_heart: Nubank Scrapper

## :question: About

Interfaced web-scrapper for [Nubank](https://nubank.com.br/) web [platform](https://app.nubank.com.br/#/login). Developed using:
- [NodeJS](https://nodejs.org/en/) for the back-end.
- [React](https://reactjs.org/) for the front-end.

#### Objectives:

- [x] Build a web-scrapper of any online banking platform, extracting as much data as possible. 
- [x] Use [express](https://expressjs.com/) to access to the scrapper, given the bank credentials.
- [x] Build a simple [SPA](https://en.wikipedia.org/wiki/Single-page_application) to send the info and visualize the output. 

#### Extras:

- [ ] Save data to [MongoDB](https://www.mongodb.com/) using [Mongoose](http://mongoosejs.com/).
- [x] Deal with security issues.

---

## :arrow_upper_right: Deploying locally

There are two main parts of the project, the front-end and back-end. The tutorial below is tested in Linux environments, and might also work in OS X environments.

First, download the project and enter the root directory:

```bash
git clone https://github.com/azbardini/nubank-scrapper
cd nubank-scrapper
```

For the back-end, from the root directory, run:

```bash
cd backend/
npm i
npm run dev
```
> `npm i` might take a little time because Puppeteer needs downloading a chromium version to work.

If everything went OK, an API should be listening in port 3030

For the front-end, from the root directory, run:

```bash
cd frontend/
npm i
npm run start
```

If everything went OK, your default browser should open up a tab with Nubank Scrapper, in `http://localhost:3000/`.

---

## :warning: Additional Info

#### Useful Research

- [Pupeteer](https://pptr.dev/)
- [Puppeteer Great Tutorial](https://learnscraping.com/nodejs-web-scraping-with-puppeteer/)
- [Drag-Drop Best Snippet](https://stackoverflow.com/questions/49772472/how-to-simulate-a-drag-and-drop-action-in-puppeteer/59406881#59406881)

#### Free/OpenSource I Loved Using:

- [Black Illustrations](https://www.blackillustrations.com/): Beautiful, free illustrations of black people.
- [GitMoji](https://gitmoji.carloscuesta.me/): An emoji guide for your commit messages.
- [Insomnia](https://insomnia.rest/): Open-source cross-platform GraphQL and REST client. 
- [Ubuntu](https://ubuntu.com/): Operating System
