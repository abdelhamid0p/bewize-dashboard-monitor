import { Button } from "@/shared/components/atoms/button";
import { FormField } from "@/shared/components/molecules/form-field/Form_Field";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/atoms/card/Card";
import { Alert } from "@/shared/components/atoms/alert/alert";
import { Text } from "@/shared/components/atoms/text/text";

interface LoginFormOrganismProps {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  error: string | null;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onEmailBlur: (value: string) => void;
  onPasswordBlur: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginFormOrganism = ({
  email,
  password,
  emailError,
  passwordError,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onEmailBlur,
  onPasswordBlur,
  onSubmit,
}: LoginFormOrganismProps) => {
  return (
    <Card className="w-full gap-0 pb-3">
      <CardHeader className="pt-4">
        <CardTitle className="flex items-center gap-2">
          <Text variant="title">Bon retour 👋</Text>
        </CardTitle>

        <CardDescription>
          <Text variant="body-sm">
            Accédez à votre tableau de bord et gérez vos données facilement.
          </Text>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          {error && (
            <Alert variant="destructive" showIcon>
              {error}
            </Alert>
          )}

          <FormField
            id="email"
            label="Adresse e-mail"
            type="email"
            placeholder="Entrez votre adresse e-mail"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            onBlur={(e) => onEmailBlur(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            disabled={loading}
            required
          />

          <FormField
            id="password"
            label="Mot de passe"
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            onBlur={(e) => onPasswordBlur(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            disabled={loading}
            required
          />

          <Button
            type="submit"
            className="w-full text-sm mt-3"
            disabled={loading}
            size="lg"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
