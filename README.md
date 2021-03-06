[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Netlify Status](https://api.netlify.com/api/v1/badges/f9f904a1-c868-4f1b-8393-0beb4ec0516a/deploy-status)](https://app.netlify.com/sites/tabib/deploys)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/ParrotStone/Tabib-Web-Application">
    <img src="src/images/tabib-logo.png" alt="Logo" width="130" height="130">
  </a>

  <h2 align="center">Tabib Web Application</h2>

  <p align="center">
    The front-end web application to the Tabib app where you can get your diagnosis :)
  </p>
</p>

<!-- Table of content -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<!-- About the project -->

## About The Project

![Tabib Web App](Screenshots/Tabib-webapp.gif)

Tabib web app was designed to help users find reliable diagnosis to their queries. It can also analyze images and predict the skin disease while also providing more info on the disease itself, its treatments, symptoms, etc. The web app user interface was designed to be accessible, easy to use, it emphasizes UX concepts in mind to provide an easy and beautiful experience to our users.

The web app also provides a density map to COVID-19 cases in Egypt with its different governorates. It also provide a Drug Alarm feature that allows the users to set time(s) to take their medications.

- The site is NOT responsive and was designed to work primarily on Desktop devices. There is a mobile version of the same app available at this [repo](https://github.com/Tabib-Team/Android-Repo)
- You can checkout a high-quality video of the site [here](https://drive.google.com/file/d/1EmzyzufTUv0rPlFhklgs2Z9RnRQR3TND/view?usp=sharing) that shows the complete features of the site. Unfortunately, there is no way to host the back-end code online to make it available. However, here is its code for the curious. It's built with Django REST framekwork. The AI model code that predicts the disease is [here](https://github.com/Tabib-Team/AI-Repo)

### Built With

This app was built using the following technologies:

- [Bootstrap](https://getbootstrap.com)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Material-UI](https://material-ui.com/)
- [React](https://reactjs.org)
- [RxJS](https://rxjs.dev/)
- [react-material-ui-form-validator](https://github.com/NewOldMax/react-material-ui-form-validator)
- [esri](https://developers.arcgis.com/)


It uses React state and prop drilling for app-level state with hooks. It uses a mix of class & functional comoponents. It uses `react-material-ui-form-validator` for form inputs and validation. `Axios` is used for the data fetching and `React Router DOM` for routing. It uses `esri` API for web to integrate the COVID-19 density map into the app(you can view it at /coronamap). It also uses `React-Content-Loader` for loading content and `React-Toastify` for notifications.

## Getting-Started

The instructions below show how you can install and run the project

### Prerequisites

You need both [NodeJS](https://nodejs.org) and [NPM](https://npmjs.org) installed.

### Installation

1. Clone the repo

```sh
  git clone https://github.com/ParrotStone/Tabib-Web-Application.git
```

2. Install `Yarn` package manager

```sh
  npm install -g yarn
```

3. Navigate to the project directory and type the following commands:

- Install the project dependencies

```sh
yarn install
```

4. Edit the file `config.js` in the `src` folder and add their respective API urls

5. You can then either run the project or build it for deployment

- Runs the app in the development mode - Open http://localhost:3000 to view it in the browser.

```sh
  yarn start
```

- Builds the app for production to the build folder.

```sh
  yarn build
```

<!-- Screenshot examples -->

## Screenshots

![Landing-page-tabib-bot](Screenshots/landing-page-tabib-bot.png)

![Landing-page-map](Screenshots/landing-page-map.png)

![Sign-in-page](Screenshots/signin-page.png)

![Register-page](Screenshots/register-page.png)

![Homepage](Screenshots/homepage.png)

![COVID-density-map](Screenshots/covid-19-density-map-egypt.png)

![Disease-info-search](Screenshots/disease-info-search.png)

![disesae-more-info](Screenshots/disease-more-info.png)

![Skin detection demo-result](Screenshots/skin-result-example.png)

![Set single alarm](Screenshots/set-single-alarm.png)

![Set multiple alarm](Screenshots/set-multiple-alarms.png)

<!-- Roadmap -->

## Roadmap

See the [open issues](https://github.com/ParrotStone/Tabib-Web-Application/issues) for a list of known bugs and suggested/intended-fixes and features.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Abdulrahman Ali - [Twitter](https://twitter.com/abdoalihuss) - [Email](mailto:ParrotStone@gmail.com)

Project Link: [https://github.com/ParrotStone/Tabib-Web-Application](https://github.com/parrotstone/tabib-website)

[contributors-shield]: https://img.shields.io/github/contributors/parrotstone/tabib-web-application.svg?style=flat-square
[contributors-url]: https://github.com/parrotstone/tabib-web-application/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/parrotstone/tabib-web-application.svg?style=flat-square
[forks-url]: https://github.com/parrotstone/tabib-website/network/members
[stars-shield]: https://img.shields.io/github/stars/parrotstone/tabib-web-application.svg?style=flat-square
[stars-url]: https://github.com/parrotstone/tabib-website/stargazers
[issues-shield]: https://img.shields.io/github/issues/parrotstone/tabib-web-application.svg?style=flat-square
[issues-url]: https://github.com/parrotstone/tabib-website/issues
[license-shield]: https://img.shields.io/github/license/parrotstone/tabib-web-application.svg?style=flat-square
[license-url]: https://github.com/parrotstone/tabib-web-application/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/abdulrahman-ali
