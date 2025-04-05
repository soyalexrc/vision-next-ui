import { getAnalytics } from '@firebase/analytics';
import firebaseApp from '@/lib/firebase';

const analytics = getAnalytics(firebaseApp);
export default analytics;
