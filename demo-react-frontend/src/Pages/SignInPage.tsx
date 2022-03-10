import { Page } from './Page';
import { useAuth } from '../Auth/Auth';

type SigninAction = 'signin' | 'signin-callback';

interface Props {
  action: SigninAction;
}

export const SignInPage = ({ action }: Props) => {
  const { signIn } = useAuth();
  if (action === 'signin') {
    signIn();
  }

  return (
    <Page title="Sign In">
      <p>Signing in ...</p>
    </Page>
  );
};
