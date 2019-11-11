import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const onCreateUser = functions.firestore.document('users_registrations/{userID}').onCreate(async (snapshot) => {
	if (!snapshot.data()!.email || !snapshot.data()!.password) {
		console.log('Error');
	} else {
		const data = snapshot.data();
		const name = data!.name;
		const email = data!.email;
		const password = data!.email;
		const isAdmin = data!.isAdmin == null ? false : data!.isAdmin;

		const fbUser = await admin.auth().createUser({ email: email, password: password });

		if (fbUser) {
			await db
				.collection('users')
				.doc(fbUser.uid)
				.set(
					{
						email: email,
						name: name,
						isAdmin: isAdmin
					},
					{ merge: true }
				)
				.then((_) => {
					console.log('User Created');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}
});
