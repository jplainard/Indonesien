/**
 * Script de test pour l'API d'authentification
 */

const BASE_URL = 'http://localhost:3001';

async function testRegister() {
  console.log('🧪 Test inscription...');
  
  const userData = {
    email: 'test@example.com',
    password: 'MotDePasseSecurise123!',
    firstName: 'Jean',
    lastName: 'Dupont'
  };

  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', data);

    if (response.ok) {
      console.log('✅ Inscription réussie !');
      return data.user;
    } else {
      console.log('❌ Erreur inscription:', data.error);
      return null;
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message);
    return null;
  }
}

async function testLogin() {
  console.log('\n🧪 Test connexion...');
  
  const loginData = {
    email: 'test@example.com',
    password: 'MotDePasseSecurise123!'
  };

  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', data);

    if (response.ok) {
      console.log('✅ Connexion réussie !');
      return data;
    } else {
      console.log('❌ Erreur connexion:', data.error);
      return null;
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message);
    return null;
  }
}

async function testMe() {
  console.log('\n🧪 Test vérification utilisateur...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include', // Pour inclure les cookies
    });

    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', data);

    if (response.ok) {
      console.log('✅ Vérification réussie !');
      return data.user;
    } else {
      console.log('❌ Erreur vérification:', data.error);
      return null;
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message);
    return null;
  }
}

async function runTests() {
  console.log('🚀 Démarrage des tests d\'authentification...\n');
  
  // Test inscription
  const user = await testRegister();
  
  if (user) {
    // Test connexion
    await testLogin();
    
    // Test vérification
    await testMe();
  }
  
  console.log('\n✨ Tests terminés !');
}

// Attendre que le serveur soit prêt
setTimeout(runTests, 2000);
