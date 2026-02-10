import { useState } from 'react';
import { Button } from '@/shared/components/atoms/button';
import { FormField } from '@/shared/components/molecules/form-field/Form_Field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/atoms/card/Card';
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { login } from '@/features/auth/services/authService'
import { Alert } from '@/shared/components/atoms/alert/alert';


export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useAppDispatch()
   const { loading, error } = useAppSelector((state: { auth: any; }) => state.auth)

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('L\'adresse e-mail est requise');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Adresse e-mail invalide');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Le mot de passe est requis');
      return false;
    }
    if (value.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    setPasswordError('');
    return true;
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  const isEmailValid = validateEmail(email)
  const isPasswordValid = validatePassword(password)

  if (!isEmailValid || !isPasswordValid) return

  dispatch(login(email, password))
}


  return (
    <Card className="w-full gap-0 pb-3 ">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          Bon retour 👋
        </CardTitle>
        <CardDescription className='text-sm'>
          Accédez à votre tableau de bord et gérez vos données facilement.
        </CardDescription>
      </CardHeader>

      <CardContent className='pb-3'>
        <form onSubmit={handleSubmit} className="space-y-5">

          {error && (
            <Alert variant="destructive" showIcon>
              {error}
            </Alert>
          )}
          {/* Champ Email */}
          <FormField
            id="email"
            label="Adresse e-mail"
            type="email"
            placeholder="Entrez votre adresse e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            onBlur={(e) => validateEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            disabled={loading}
            required
          />

          {/* Champ Mot de passe */}
          <FormField
            id="password"
            label="Mot de passe"
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) validatePassword(e.target.value);
            }}
            onBlur={(e) => validatePassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            disabled={loading}
            required
          />

          {/* Bouton de connexion */}
          <Button
            type="submit"
            className="w-full text-sm mt-3"
            disabled={loading}
            size="lg">

            {loading ? 'Connexion...' : 'Se connecter'}
            
            </Button>

  
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;