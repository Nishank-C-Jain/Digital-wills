const axios = require('axios');

async function runTests() {
  const baseURL = 'http://localhost:5000/api';
  console.log("Starting API Integration Tests...");
  
  try {
    // 1. Register a test user
    const email = `testuser_${Date.now()}@test.com`;
    console.log(`\n1. Registering user: ${email}`);
    try {
      await axios.post(`${baseURL}/auth/register`, {
        name: "Test User",
        email: email,
        password: "password123"
      });
      console.log("✅ Registration successful");
    } catch (err) {
      console.error("❌ Registration failed:", err.response?.data || err.message);
      return;
    }

    // 2. Login
    console.log(`\n2. Logging in...`);
    let token = '';
    try {
      const res = await axios.post(`${baseURL}/auth/login`, {
        email: email,
        password: "password123"
      });
      token = res.data.token;
      console.log("✅ Login successful. Token received.");
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      return;
    }

    // 3. Create a Will
    console.log(`\n3. Creating a new Digital Will...`);
    let willId = '';
    try {
      const res = await axios.post(`${baseURL}/wills/create`, {
        title: "Test Will " + Date.now(),
        content: "This is my highly confidential test will. I am leaving everything to my dog.",
        beneficiaries: [{ name: "Rover", relationship: "Dog", role: "Nominee" }]
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      willId = res.data.will._id;
      console.log("✅ Will created successfully!");
      console.log("   AI Analysis Result:", res.data.will.aiAnalysis);
      console.log("   Blockchain Hash:", res.data.will.blockchainHash);
    } catch (err) {
      console.error("❌ Will creation failed:", err.response?.data || err.message);
      return;
    }

    // 4. Fetch the Will (to verify decryption)
    console.log(`\n4. Fetching Wills to verify decryption...`);
    try {
      const res = await axios.get(`${baseURL}/wills/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const will = res.data.find(w => w._id === willId);
      if (will && will.content === "This is my highly confidential test will. I am leaving everything to my dog.") {
         console.log("✅ Fetch successful! Content was successfully encrypted in DB and decrypted on read.");
      } else {
         console.error("❌ Fetch failed or content mismatched.");
      }
    } catch (err) {
      console.error("❌ Fetch wills failed:", err.response?.data || err.message);
      return;
    }

    console.log("\n🎉 All tests passed successfully!");

  } catch (error) {
    console.error("Unexpected Error:", error);
  }
}

runTests();
