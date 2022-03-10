import { Page } from './Page';
import { useAuth } from '../Auth/Auth';

type SignoutAction = 'signout' | 'signout-callback';

interface Props {
  action: SignoutAction;
}

export const SignOutPage = ({ action }: Props) => {
  let message = 'Signing out ...';
  const { signOut } = useAuth();

  switch (action) {
    case 'signout':
      signOut();
      break;
    case 'signout-callback':
      message = 'You successfully signed out!';
      break;
  }

  return (
    <Page title="Sign out">
      <p>{message}</p>
    </Page>
  );
};
