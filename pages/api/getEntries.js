import firebase_app from "../../firebase/config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)

// export default async function getDoument(collection, id) {
//     let docRef = doc(db, collection, id);

//     let result = null;
//     let error = null;

//     try {
//         result = await getDoc(docRef);
//     } catch (e) {
//         error = e;
//     }

//     return { result, error };
// }

export default async function handler(req, res) {
    const querySnapshot = await getDocs(collection(db, "Entries"));
    const response = [];
    querySnapshot.forEach((doc) => {
        response.push({id: doc.id, ...doc.data()})
    })
    res.status(200).json({ entries: response })
}
