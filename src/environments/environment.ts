// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	//* Angular Firebase Set up
	firebaseAPIKey: 'AIzaSyAvXBjkILL17sNq9ys8S1X51Nkld4AsX3A',
	firebaseConfig : {
		apiKey: "AIzaSyAvXBjkILL17sNq9ys8S1X51Nkld4AsX3A",
		authDomain: "atos-community-upgrade.firebaseapp.com",
		databaseURL: "https://atos-community-upgrade-default-rtdb.firebaseio.com",
		projectId: "atos-community-upgrade",
		storageBucket: "atos-community-upgrade.appspot.com",
		messagingSenderId: "806304666512",
		appId: "1:806304666512:web:78203b44c10f6ec87c9915"
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
