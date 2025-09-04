// plugins/firebase.client.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // 檢查 auth 物件是否成功建立
  if (!auth) {
    console.error("Firebase Auth could not be initialized.");
    return;
  }

  nuxtApp.vueApp.provide("firebaseAuth", auth);
  nuxtApp.provide("firebaseAuth", auth);
});