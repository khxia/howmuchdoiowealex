import firebase_app from "../../firebase/config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
    if (req.method === 'POST') {
        const body = JSON.parse(req.body);
        const docRef = await addDoc(collection(db, "Entries"), body)
        res.status(200).json({ message: "Document written with id: " + docRef.id })
    }
    
}
