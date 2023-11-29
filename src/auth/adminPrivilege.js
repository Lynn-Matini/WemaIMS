// import { useContext } from 'react';
// import { AuthContext } from '../components/auth';
// import { db } from '../firebase/config';
// import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

// export const copyUserData = (sourceUserId, destinationUserId) => {
//   // Get the current user
//   //   const { currentUser } = useContext(AuthContext);

//   // Assuming 'users' is your main collection
//   const sourceUserRef = collection(db, 'trial', sourceUserId);
//   const destinationUserRef = collection(db, 'trial', destinationUserId);

//   // Fetch data from the source user
//   sourceUserRef.get().then((snapshot) => {
//     if (snapshot.exists) {
//       const userData = snapshot.data();

//       // Update data for the destination user
//       destinationUserRef
//         .set(userData)
//         .then(() => {
//           console.log('User data copied successfully');
//         })
//         .catch((error) => {
//           console.error('Error copying user data:', error);
//         });
//     } else {
//       console.error('Source user does not exist');
//     }
//   });
// };

// // Example usage
// const sourceUserId = 's75jlIEyvv163i6hyLQN';
// const destinationUserId = 'BmIW6cNuEcfVeR5pdeSi';
// copyUserData(sourceUserId, destinationUserId);

// console.log(userData);
