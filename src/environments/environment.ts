// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultauth: 'fackbackend',
  backEndConfig:{
    api_url:'http://localhost:3000/api/v1/',
    ws_url:'http://localhost:3000',
    companyId:'1254863933218p0ppp',
    // apiUrl: 'https://devapibhs.k-media.vn',
    // apiUrl:'http://178.128.111.191:8091',
    apiUrl: 'http://localhost:8080',
    // apiPayment :'http://178.128.111.191:8081',
    apiPayment :'http://localhost:8081',
    pageApi:'http://localhost:3001',
  },
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
