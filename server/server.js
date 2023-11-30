const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
const serviceAccount = require('path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-firebase-project.firebaseio.com',
});

// Get the user UID whose custom claims you want to read
const userUid = import.meta.env.VITE_ADMIN_UID;

// Get the user record from Firebase Authentication
admin
  .auth()
  .getUser(userUid)
  .then((userRecord) => {
    // Access custom claims
    const customClaims = userRecord.customClaims;
    console.log('Custom Claims:', customClaims);
  })
  .catch((error) => {
    console.error('Error fetching user data:', error);
  });
