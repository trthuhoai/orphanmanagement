import { getStorage} from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCMkcwp_4S8yW6VRG7jj7bWNoLu27PKS7c",
  authDomain: "cyfcenter-323a8.firebaseapp.com",
  projectId: "cyfcenter-323a8",
  storageBucket: "cyfcenter-323a8.appspot.com",
  messagingSenderId: "1051390481405",
  appId: "1:1051390481405:web:03f6522be785aab703ff94",
  measurementId: "G-496VLNP17P"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

