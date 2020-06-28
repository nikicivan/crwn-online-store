import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB74HzxCNHUKnfgIm702Jf-6xy_GusAm5U",
    authDomain: "online-store-7125a.firebaseapp.com",
    databaseURL: "https://online-store-7125a.firebaseio.com",
    projectId: "online-store-7125a",
    storageBucket: "online-store-7125a.appspot.com",
    messagingSenderId: "285196803365",
    appId: "1:285196803365:web:0e990dd491d6feb8a8cecc",
    measurementId: "G-HMG38CSQP0"  
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if(!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if(!snapShot.exist) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName, 
				email,
				createdAt,
				...additionalData
			})
		}
		catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
} 

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title, 
			items
		}
	});
	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {})
} 

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;