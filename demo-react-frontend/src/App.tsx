import { HomePage } from './Pages/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { ProductsPage } from './Pages/ProductsPage';
import { PrivacyPage } from './Pages/PrivacyPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './Store';
import { SignInPage } from './Pages/SignInPage';
import { SignOutPage } from './Pages/SignOutPage';
import { AuthProvider } from './Auth/Auth';
import { AuthorizedPage } from './Pages/AuthorizedPage';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={
                <AuthorizedPage>
                  <ProductsPage />
                </AuthorizedPage>
              } />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/signin" element={<SignInPage action="signin" />} />
              <Route path="/signin-callback" element={<SignInPage action="signin-callback" />} />
              <Route path="/signout" element={<SignOutPage action="signout" />} />
              <Route path="/signout-callback" element={<SignOutPage action="signout-callback" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
