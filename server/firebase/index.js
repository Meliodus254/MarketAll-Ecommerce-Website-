const admin = require("firebase-admin");

const serviceAccount = require("../config/fbServiceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.app();  // Use the default app if already initialized
}

module.exports = admin;