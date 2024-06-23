import { getStorage } from '@firebase/storage';
import firebaseApp from '@/lib/firebase';

const storage = getStorage(firebaseApp);
export default storage;
