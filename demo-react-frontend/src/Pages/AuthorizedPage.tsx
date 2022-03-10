import React from 'react';
import { Page } from './Page';
import { useAuth } from '../Auth/Auth';

export const AuthorizedPage: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return (
      <Page>
        <div className="page-header align-items-start section-height-40 pt-5 pb-11 m-3 border-radius-lg" style={{ backgroundImage: "url('/img/curved-images/curved3.png')"}}>
          <span className="mask bg-gradient-dark opacity-1"></span>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 text-center mx-auto">
                <h1 className="text-white mb-2 mt-5">Not Authorized</h1>
                <p className="text-lead text-white">You are not authorized to view this page</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-lg-n10 mt-md-n11 mt-n10 mb-2">
            <div className="col-xl-8 col-lg-9 col-md-9 mx-auto">
              <div className="card z-index-0">
                <div className="card-header text-center pt-4">
                </div>
                <div className="card-body pt-0 text-center">
                  <p>You need to be logged in to access this page.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }

};
