/**
 * Authentication storage - Mode Front-Only (Production)
 * 
 * Système d'authentification géré entièrement côté client.
 * Utilise un hash SHA-256 pour sécuriser le mot de passe.
 * Session avec expiration configurable.
 */

const SESSION_KEY = 'bewize_session';

// ============================================
// CONFIGURATION ADMIN
// ============================================
// Email admin en clair
const ADMIN_EMAIL = 'admin@bewize.com';

// Hash SHA-256 du mot de passe (généré avec: npx tsx scripts/generate-password-hash.ts)
// Mot de passe actuel: "Bewize@2024!"
const ADMIN_PASSWORD_HASH = '726b1be3b7fbf7e70c3f0cfe9c6f8f312e03fd9088d3df8feed2e66be4a8d26b';

// Durée de session en millisecondes (7 jours)
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

// ============================================
// Types
// ============================================
interface Session {
  email: string;
  expiresAt: number;
  signature: string;
}

// ============================================
// Hash utilities
// ============================================

/**
 * Hash une chaîne avec SHA-256
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + ADMIN_EMAIL); // Salt avec l'email
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Génère une signature de session
 */
async function generateSessionSignature(email: string, expiresAt: number): Promise<string> {
  const data = `${email}:${expiresAt}:bewize-secret`;
  return hashPassword(data);
}

// ============================================
// Credential validation
// ============================================

/**
 * Vérifie les credentials admin
 */
export async function validateCredentials(email: string, password: string): Promise<boolean> {
  if (email !== ADMIN_EMAIL) {
    return false;
  }
  
  const passwordHash = await hashPassword(password);
  return passwordHash === ADMIN_PASSWORD_HASH;
}

// ============================================
// Session management
// ============================================

/**
 * Crée une nouvelle session
 */
export async function createSession(email: string): Promise<void> {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const signature = await generateSessionSignature(email, expiresAt);
  
  const session: Session = {
    email,
    expiresAt,
    signature,
  };
  
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Error creating session:', error);
  }
}

/**
 * Récupère et valide la session courante
 */
export async function getValidSession(): Promise<Session | null> {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    
    const session: Session = JSON.parse(stored);
    
    // Vérifier l'expiration
    if (Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }
    
    // Vérifier la signature (intégrité)
    const expectedSignature = await generateSessionSignature(session.email, session.expiresAt);
    if (session.signature !== expectedSignature) {
      clearSession();
      return null;
    }
    
    return session;
  } catch {
    clearSession();
    return null;
  }
}

/**
 * Vérifie si une session valide existe (sync version pour checks rapides)
 */
export function hasSession(): boolean {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return false;
    
    const session: Session = JSON.parse(stored);
    return Date.now() < session.expiresAt;
  } catch {
    return false;
  }
}

/**
 * Récupère l'utilisateur de la session (sync)
 */
export function getStoredUser(): { email: string } | null {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    
    const session: Session = JSON.parse(stored);
    if (Date.now() > session.expiresAt) return null;
    
    return { email: session.email };
  } catch {
    return null;
  }
}

/**
 * Supprime la session
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
}

// ============================================
// Legacy exports (compatibilité baseApi)
// ============================================
export function getStoredToken(): string | null {
  return hasSession() ? 'front-session-active' : null;
}

export function setStoredToken(_token: string): void {
  // No-op en mode front-only
}

export function removeStoredToken(): void {
  clearSession();
}

// ============================================
// Utilitaire pour générer un nouveau hash
// ============================================
// Usage dans la console: 
// import { hashPassword } from '@/shared/storage/authStorage'
// hashPassword('MonNouveauMotDePasse').then(console.log)
