/**
 * Script pour générer le hash SHA-256 d'un mot de passe admin
 * 
 * Usage: npx tsx scripts/generate-password-hash.ts "MonMotDePasse"
 */

const ADMIN_EMAIL = 'admin@bewize.com';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + ADMIN_EMAIL);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function main() {
  const password = process.argv[2];
  
  if (!password) {
    console.log('Usage: npx tsx scripts/generate-password-hash.ts "MonMotDePasse"');
    console.log('');
    console.log('Exemple:');
    console.log('  npx tsx scripts/generate-password-hash.ts "Bewize@2024!"');
    process.exit(1);
  }

  const hash = await hashPassword(password);
  
  console.log('');
  console.log('='.repeat(60));
  console.log('HASH GÉNÉRÉ');
  console.log('='.repeat(60));
  console.log('');
  console.log(`Email:    ${ADMIN_EMAIL}`);
  console.log(`Password: ${password}`);
  console.log(`Hash:     ${hash}`);
  console.log('');
  console.log('Copiez ce hash dans authStorage.ts :');
  console.log(`const ADMIN_PASSWORD_HASH = '${hash}';`);
  console.log('');
}

main().catch(console.error);
