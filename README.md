# Web Application built using React
Web Application Project using React, Redux  for building user interface for large Scale Applications development


node version - v12.12.0
Npm version - 6.11.3


To build use npm run-script build
To run use npm run-script start

## Base Folder Structure

Folder Structure is very important for maintaining large scale applications. Folder Structure should be clean and good enough for the developers to understand the application.

Create a folder react-redux-graphql in your project workspace . In the base folder create the below folders/files

node_modules/

public/

src/

package.json

README.md

**node_modules** - Folder to store all the npm modules downloaded during npm install. All the npm modules required for the project are specified in the package.json file.

**package-lock.json** - It is a auto generated file in the base directory when you run the npm install to install the required modules. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees. It facilitates greater visibility of tree changes through readable source file differences.

**README.md** - It is used for documentation and to display the html summary in the GitHub/Bitbucket page.

**public** - Folder to store any images.To store any javascript that cannot be bundled inside the application. To place incompatible library with WebPack and include it as a <script> tag



##  Source Folder Structure

Folder Structure under /src for large scale applications

react-redux-graphql

 ├── src                   
  ├── components     
      ├──TextField
         ├──locales
         ├──TextField.jsx      
         ├──index.js
         ├──TextField.css
      ├──ListView
         ├──components
           ├──ListViewBar
              ├──locales
              ├──ListViewBar.jsx         
              ├──index.js                     
              ├──ListViewBar.css         
         ├──locales
         ├──ListView.jsx         
         ├──index.js                     
         ├──ListView.css   
  ├──features
     ├──Login
        ├──components
           ├──LoginButton
              ├──images
              ├──locales
              ├──index.js
        ├──action.js
        ├──reducer.js
        ├──index.js
    ├──HomePage
       ├──components
          ├──HomePageBar
             ├──images
             ├──locales
             ├──index.js
       ├──features
         ├──DashBoard
            ├──index.js
            ├──action.js
            ├──reducer.js
         ├──Widgets
            ├──index.js
            ├──action.js
            ├──reducer.js
       ├──index.js
       ├──action.js
       ├──reducer.js
├──services
    ├──api
├──index.js
├──store.js      
└── README.md

## General Guidelines on the Folder Structure

### Components

 - Components that are defined at the root level of the project are global and can be used anywhere in your application.
 - If any new component is defined inside another component (nesting), this new component can only be used in its direct parent.

**Example**

 - TextField can be used anywhere in the application.
 - ListView can also be used anywhere in the application. ListView component defines a component ListViewBar. You cannot use ListViewBar anywhere else other than ListView component.
 - ListViewBar can use TextField internally because TextField is defined at the root level of components.

### Features

Features are the pages/ modules of the application.

Like how the components can be nested, features can also be nested into a feature. Components also can be built under features. Any component defined under features, can be used in that feature only.

**Example**

 - Login feature has a component LoginButton. LoginButton component can only be used by the Login feature.
 - HomePage feature has a component HomePageBar. HomePageBar component can be used only by HomePage, DashBoard or Widgets features, or by any components defined under those features.
 - DashBoard feature uses HomePageBar internally, this is authorised because HomePageBar is defined by the parent HomePage feature.
 - DashBoard feature cannot use any of the components defined in Widgets feature, but it can use the HomePageBar component.

### Services

Services act as a bridge/ an adapter between the server API and the view layer (features and components) of the application. It can take care of network calls the app will make, get and post content, and transform payloads as needed before being sent or saved in the store of the app (such as Redux). The features and components will only dispatch actions, read the store and update themselves based on the new changes.

## General Guidelines/Standards that should be followed

 - Containers should be stateful. Containers manage data or are connected to the state and generally don’t have styling associated with them. Features are the container components of the application.
 - Components should be stateless. Components have styling associated with them and aren’t responsible for any data or state management. Basically, containers (features) are responsible for how things work, and components are responsible for how things look. As a result, you can confidently go in and edit your components without worrying about your data structures getting messed up, and you can edit your containers without worrying about the styling getting messed up.
 - Use Styled components and co- locate the styles of a component in the corresponding component folder.
 - Business rules should bubble towards the top. UI and semantics should sink towards the bottom.
 - A feature must have everything it needs to work on its own. It must also have a limited scope and ideally no awareness of the entire app. Of course you can nest features into features as long as they stay as much standalone as possible and the nested ones get only used by their direct parent.
 - Features and nested features can have its own actions and reducers.
 - The structure of you entire Redux state tree can follow the folder structure of the features.
 - There shouldn’t be any logic in your reducers as they need to stay pure. If you tend to have logical code, you should create another action instead.
 - Selectors are important if you’d like to filter your state before using them in your container components. You can define them in the reducer.js file as they are bound to the same chunk of state.
 - All the network request should be defined in single file api.js.
 - Since features are standalone with their own actions and reducers, you need to assemble them by applying the concept of reducer composition, where a reducer is called by another reducer.

## General Guidelines for MicroFrontEnd exposure

1) Add in package.json   "homepage": "./remote-bmart-catalogue",
2) In package.json scripts add the below
"postbuild": "cp -Rf build/ /tmp/microfrontend/remote-bmart-catalogue"
3) In the webpack.config.js add the below

new ModuleFederationPlugin(
        {
          name: 'MFE1',
          filename:
            'bmart-catalogue-mf.js',
          exposes: {
            './bmart-catalogue':
              './src/components/Button',
          },
        }
      )

4) In the /tmp/microfrontend directory do the below

    python -m http.server 3001