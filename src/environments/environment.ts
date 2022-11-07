// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	//* Angular Firebase Set up
	// firebaseAPIKey: 'AIzaSyAvXBjkILL17sNq9ys8S1X51Nkld4AsX3A',
	firebase : {
		apiKey: "AIzaSyCVDKeGCwKd_O4CtdZp-BOS-5us066Qtyo",
		authDomain: "dummy-profile-76979.firebaseapp.com",
		projectId: "dummy-profile-76979",
		storageBucket: "dummy-profile-76979.appspot.com",
		messagingSenderId: "439593482012",
		appId: "1:439593482012:web:4d7552b2c041e7e01c6cd9"
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
