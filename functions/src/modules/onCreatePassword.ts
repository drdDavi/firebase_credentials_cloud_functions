import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onCreatePassword = functions.firestore.document('users_update_password/{ID}').onCreate(async (snapshot) => {
	if (!snapshot.data()!.password || !snapshot.data()!.userUid) {
		console.log('Error');
	} else {
		const data = snapshot.data();
		const password = data!.password;
		const userUid = data!.userUid;

		const val = await admin.auth().updateUser(userUid, {
			password: password
		});

		if (val) console.log('Password Updated');
	}
});
