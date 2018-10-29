# Repository Heatmap

## Github Analytics Project - TWEB 2018

### Description

The main goal of the project is to show how many contributers work on a Github project and where they come from. This is represented on a user-friendly heatmap, with a comprehensive color palette.

### Environment

- Backend deployed on an [Heroku](https://www.heroku.com/) console.
- Frontend hosted on [Github Pages](https://pages.github.com/).
  - https://gallouche.github.io/
- Express server running on Node.js app.
- Heatmap created with [Jvectormap](http://jvectormap.com/).

### Run locally

#### Backend

```bash
git clone https://github.com/Gallouche/TWEB_Projet01.git
cd TWEB_Projet01/
npm install
npm run dev
```

#### Frontend

```bash
git clone https://github.com/Gallouche/Gallouche.github.io.git
cd Gallouche.github.io
```

And then open the `index.html` in your favorite browser.

### Test

```bash
npm run test
```

### Deploy to heroku

```bash
heroku login
git push heroku master
```

### Critera/bonus

| Criteria                                                     |                      Mandatory for 4.0                       |
| ------------------------------------------------------------ | :----------------------------------------------------------: |
| The app is online and publicly available (e.g. on GitHub Pages and Heroku) |             yes, link in environment paragraph.              |
| It is possible to test the app locally (with live-server, or node, or any other tech) |                             yes                              |
| Someone arriving on the app, without prior knowledge of the project, understands | yes, little description and instructions in the search field |
| The app uses a nice visual template.                         |             yes, beautiful and modern design ;)              |
| There is a repo with a README.md file that explains what the project is about, how to run it locally and how to build it. |                             yes                              |
| The build process invokes a linter. The linter is happy with the quality of your code (no error). |                yes, using eslintrc, no error                 |
| The app fetches data from GitHub and presents it in the UI.  |                        yes of course                         |
| The app works (no crash, no obvious problem in the interactivity, etc.). |                       yes... I guess ?                       |

### Bonus

| Criteria                                                     |   Weight   |                            Why ?                             |
| ------------------------------------------------------------ | :--------: | :----------------------------------------------------------: |
| Extra effort has been put in the UI/UX.                      |    +0.5    |       The ui look nice, smooth and have a nice loader.       |
| Extra effort has been put in the depth of the analysis (“you are not just sorting developers per commit count”). |    +0.5    | We are getting all the contributors from a specific repo, fetching all result pages nicely (very big deal), and then getting all location from each returned users.<br />Then we use MapQuest API to get the country code of the different locations (not standardized, can be cities, coutnries... and bullshit). |
| You use a database.                                          |    +0.5    |       Yes, kind of ! By storing data un a json file !        |
| You coded a backend that is useful.                          | up to +1.0 | The backend is useful beacause we have diffrents API keys on it, and the main part of getting all datas is done by the bakcend, the frontend only get a Json with country codes and a counter for each. |
| Extra effort has been put to make the app “sticky” and/or “viral”. There is something about it that makes it particularly original, fun. Or there is something that will make people comeback to it. | up to +1.0 | We think that representing datas on a interactive and friendly map is something interessting and fun :) |
| There is something else that you have done and that you think deserves a bonus. |    +0.5    |              Because Gallouche is beautifull...              |