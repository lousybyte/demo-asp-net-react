import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/Auth';

interface Props {
title?: string;
children: React.ReactNode;
}

export const Page = ({ children }: Props) => {

  const { isAuthenticated, user, loading } = useAuth();

  return (
    <div>
      <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg blur blur-rounded top-1 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
              <div className="container-fluid">
                <Link className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " to="/">
              Demo React
                </Link>
                <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon mt-2">
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </span>
                </button>
                <div className="collapse navbar-collapse" id="navigation">
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                      <Link className="nav-link d-flex align-items-center me-2 active" aria-current="page" to="/">
                        <i className="fa fa-chart-pie opacity-6 text-dark me-1"></i>
                    Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link me-2" to="/products">
                        <i className="fa fa-list opacity-6 text-dark me-1"></i>
                      Products
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link me-2" to="/privacy">
                        <i className="fa fa-user-secret opacity-6 text-dark me-1"></i>
                      Privacy
                      </Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav">
                    {!loading && (!isAuthenticated ? (
                      <li className="nav-item">
                        <Link className="btn btn-sm btn-round mb-0 me-1 bg-gradient-dark mt-4 mt-lg-0 " to="/signin">SIGN IN</Link>
                      </li>
                    ) : (
                      <React.Fragment>
                        <li className="nav-item">
                          <Link id="manage" className="nav-link text-dark" to="/Account/Manage/Index" title="Manage">Hello {user!.name}</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link me-2" to="/signout">
                            <i className="fas fa-user-circle opacity-6 text-dark me-1"></i>
                            Logout
                          </Link>
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <section className="h-99-vh mb-1">
        {children}
      </section>  <footer className="footer py-5 mt-6">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4 mx-auto text-center small">
              <Link to="" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2" rel="noreferrer">
            Company
              </Link>
              <Link to="" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2" rel="noreferrer">
            About Us
              </Link>
              <Link to="/privacy" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
            Privacy
              </Link>
            </div>
            <div className="col-lg-6 mx-auto text-center mb-4 mt-2">
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mx-auto text-center">
              <Link to="/" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2 small">
            Copyright &copy; {new Date().getFullYear()} Demo Company
              </Link>
            </div>
            <div className="col-lg-6 mx-auto text-center mb-4 mt-2">
              <Link to="" target="_blank" className="text-secondary me-xl-4 me-4" rel="noreferrer">
                <span className="text-lg fab fa-dribbble"></span>
              </Link>
              <Link to="" target="_blank" className="text-secondary me-xl-4 me-4" rel="noreferrer">
                <span className="text-lg fab fa-twitter"></span>
              </Link>
              <Link to="" target="_blank" className="text-secondary me-xl-4 me-4" rel="noreferrer">
                <span className="text-lg fab fa-instagram"></span>
              </Link>
              <Link to="" target="_blank" className="text-secondary me-xl-4 me-4" rel="noreferrer">
                <span className="text-lg fab fa-pinterest"></span>
              </Link>
              <Link to="" target="_blank" className="text-secondary me-xl-4 me-4" rel="noreferrer">
                <span className="text-lg fab fa-github"></span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
