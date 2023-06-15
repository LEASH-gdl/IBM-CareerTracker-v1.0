# Frontend for IBM Career Tracker
This create-react-app contains the frontend for IBM Career Tracker, developed using the IBM Carbon library. Its dependencies are:
- @carbon/react
- @carbon/charts
- bcryptjs
- csvtojson
- json-2-csv
- react
- react-dom
- sass (a dependency of @carbon/react)
- serve (for deploying production builds)

as shown on the package.json file. The steps for running the frontend are:
1. Install the Node Package Manager (NPM)
2. Navigate to this directory on your local machine
3. Execute `npm install`

For running a development version

4. Run `npm start`

For running a production version

4. Run `npm run build`
5. Run `npx serve -l [target port] build`
