# Gen 1 Pokedex

----

### Environment

Setting up the environment, run the following commands. (Use yarn to install packages)
nvm install v14.18.0
yarn install expo-cli@5.4.11

clone the repo and navigate to pokedex (the parent directory with package.json)

from here, use the command, yarn install to import all the modules for the project. (NOTE: this is an older boilerplate
project, so it'll have some unused imports)

finally, run expo start to run the app and point it to either a "LAN" or "Tunnel" connection.

To test the app on a local device, download expo go app, create an account with username and password, select the project from
the Development servers list and you should be able to run the app on your mobile device.

### API
I use graphql-pokeapi for my data. The github link is https://github.com/mazipan/graphql-pokeapi.
You can look at data types and test endpoints at https://graphql-pokeapi.vercel.app/api/graphql.

