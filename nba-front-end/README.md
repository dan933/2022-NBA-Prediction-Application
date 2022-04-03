# Base page for the react document is index.tsx

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

this file is mostly boilerplate. in this file, we call the reactDOM.render, which 'writes to the page' a react object (this is the only place we need to do this), create a browser-router which is boilerplate for the routing/multiple page functionality, then most importantly call the App component which is defined in App.tsx.

## app.tsx

currently, mostly boilerplate, though more is often done in here
we call the RouteConfig component (from './routes/routes.tsx')

## routes/routes.tsx

this sets up the different pages within the app. 
<Route path="login" element={<LoginPage />} />
for example, says that e.g. localhost:3000/login should load the LoginPage component (/components/loginPage/LoginPage.tsx)

these routes are nested. 
<Route path="dashboard" element={<Dashboard />}>
    <Route path="players" element={<PlayerDataGridPage />} />
</Route>
for example, says that e.g. localhost:3000/dashboard should load the Dashboard component (/components/Menu.tsx)
the nested component is called from within menu.tsx in the <Outlet/> tag, which then loads the PlayerDataGridPage (components/playerDataGrid/playerDataGridPage)

## page setup

the top image is set in components/Base.tsx, then calls the <Outlet/>

the dashboard side and top menu are then set up in components/Menu.tsx.
the bulk of this is based on https://github.com/mui/material-ui/tree/v5.5.2/docs/data/material/getting-started/templates/dashboard
the content of the side-bar is set in components/listItems.tsx
Menu has another <Outlet/> for displaying e.g. the players screen, the teams screen etc.

components/playerDataGrid folder holds the players page
components/teamsPage holds the teams page


## services

api calls are made using the axios library 
example of this is in PlayerTableLoader:

useEffect(() => {
    setAppState({ loading: true, playerList: [] });
    api.get('Players/get-all').subscribe((resp) => {
        setAppState({ loading: false, playerList: resp as Player[] });
      });
  }, [setAppState]);

# ------- Default readme from Create-React-App setup -------
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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
