# SpookySpots

## **Find haunted places and talk about spooky stuff with others**

Explore haunted places (SpookySpots), learn about ghost types, possibility to save SpookySpots in your own list and of course a great community fullfills a ghost fan's every wish!

---

## **About this project**

This is a school assignment for Fullstack Developer students at Chas Academy. The aim of the assignment was to go from an idea to a finished product with a code base in MERN-stack and TypeScript. The app's content is developed based on a user analysis, personas and user stories have their basis in the analysis. SpookySpots is the result. This is the frontend part of the project. This frontend is deployed at [Netlify](https://spookyspots.netlify.app/).

You find the backend source code (Node, Express, MongoDB, TypeScript) [here](https://github.com/louisehedman/spooky-spots-be) which is deployed at [Render](https://spooky-spots.onrender.com/). Instructions for how to set up the backend part of this project can be found in the backend repo.

---

## **Role-Based System**
In the application users can be of type website user (no account or not signed in), registered user and admin.

A website user has access to: 
- Read about SpookySpots
- Read about ghost types
- See own location and SpookySpots location on map
- Read archived newsletters
- Search SpookySpots in navbar search box and perform advanced search on SpookySpots page
- Register
- Sign in
- Subscribe to newsletter
- Read about page

A registered user who has forgotten password can receive a password reset email. 

A registered signed in user has access to:
- Personal dashboard
- Save a SpookySpot (+ write an optional note and specify whether has visited or not) to SpookySpotList 
- On dashboard see saved SpookySpots in SpookySpotList and perform CRUD on the list
- Community and there read and create threads, posts and comments. Delete own posts and comments  
- Change email and password on dashboard
- Sign out

An admin can do all above and: 
- On dashboard get a list of all users and perform CRUD on them (edit user role, edit email and delete a user)
- On dashboard receive a list of all emails in newsletter subscription list and create and send out newsletters by email
- In community delete any post or comment 

---

## **Tech Stack**

**Client:** React, TypeScript, Bootstrap   
**Server:** Node, Express, MongoDB, Mongoose, TypeScript, NodeMailer

## **Compability**

## Devices
- Laptop devices
- Mobile devices
---
## Browsers
- Chrome
- Firefox
- Safari
- Edge
---

## PWA
The whole app is a PWA supported by both Android and iOS. It can also be used offline since it's saving cache to use at such occasions, with some limitations in functionality as it cannot make calls to API in offline mode. The cache saving has benefits in online mode too, the app will load much faster.

--- 

## **Project Setup**
Clone the project and navigate to the root folder in your terminal. Run `npm install` to install dependencies. 

### Environment Variables 

To run this project, you will also need to create a `.env` file and add the following environment variable:

`REACT_APP_API_URL=`*`"backend-URL"`*

### Run locally

To start the server run `$ npm start` in terminal

## Visit deployed app

Visit the deployed app at Netlify [here](http://spookyspots.netlify.app/)

---
## Documentation

- [Project idea](https://docs.google.com/document/d/1xlA0KhgWXEDwzU2vBi10hzIoo3GTTcoM4uRHSIlAMRo/edit?usp=sharing)
- [User analysis](https://docs.google.com/document/d/14jzJ80gSEh5xJ8M9CejJ5BoPfHvjv1ODgnNp2ICRifM/edit?usp=sharing)
- [Personas](https://docs.google.com/presentation/d/1vXBdDpWg93oUyjTk0OPy3TePZUFMP931PTgRTl7yLP0/edit?usp=sharing)
- [User stories](https://docs.google.com/document/d/1BDR_mWRZHppKYLYWMY7V96VUQ1t_vBZZHrExCKLeXRM/edit?usp=sharing)
- [Wireframes](<https://docs.google.com/document/d/1dHvbatFPZrLj2D7db1ZHIhfPU_jsDvV8MmIrfX-0hU8/edit?usp=sharing>)
- [Figma](<https://www.figma.com/file/10mZYkxzzgh3iFCNoKC1WU/U09-SpookySpots?node-id=0%3A1>)
- [Sitemap](<https://docs.google.com/document/d/1pF7VYL4ZE50rU6XKTsq1u0SwSGDQJDSqxn-DVt6zFcM/edit?usp=sharing>)

---
## **API reference**

Full API documentation is found here: [https://spookyspots-api.netlify.app/](<https://spookyspots-api.netlify.app/>)

---


## License

[MIT](https://choosealicense.com/licenses/mit/)

---

## 👻 **Author**

Louise Hedman [@louisehedman](https://www.github.com/louisehedman)

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
