import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import serviceAccount from "./node-app-film-firebase-adminsdk-5kxac-bc37dc776b.json";

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const Accounts = db.collection("accounts");
const Films = db.collection("films");

export { db, Accounts, Films };

//* update fb
// await Accounts.doc(id).update(data);
//* delete fb
// await Accounts.doc(id).delete();
