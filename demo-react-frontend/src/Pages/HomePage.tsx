import { Page } from './Page';

export const HomePage = () => {

  return (
    <Page>
      <div className="page-header align-items-start section-height-40 pt-5 pb-11 m-3 border-radius-lg" style={{backgroundImage: "url('/img/curved-images/curved6.png')", backgroundPosition:"top"}}>
        <span className="mask bg-gradient-dark opacity-1"></span>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 text-center mx-auto">
              <h1 className="text-white mb-2 mt-5">Welcome!</h1>
              <p className="text-lead text-white">A simple demo project using ASP.NET Core Api and React</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mt-lg-n10 mt-md-n11 mt-n10">
          <main role="main">
            <div className="col-xl-12 col-lg-12 col-md-12 mx-auto">
              <div className="card z-index-0 outline-dark">
                <div className="card-header text-center pt-4">
                  <h2 className="text-dark">Features</h2>
                </div>
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-md-9">
                      <div className="card card-background move-on-hover-left">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="oblique-left position-absolute top-0 h-100 d-md-block  me-n1">
                                <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0" style={{backgroundImage: "url('/img/curved-images/curved2.png')"}}></div>
                              </div>
                            </div>
                            <div className="col-md-8">
                              <h4 className="text-primary"><i className="fa fa-code text-primary pr-3"></i> ASP.NET Core API 5</h4>
                              <ul className="opacity-9 text-dark">
                                <li>Custom Logging Provider (<i className="icon-serilog"></i> Serilog)</li>
                                <li>Structured Logging Aggregator (<i className="icon-seq"></i> Seq)</li>
                                <li>Background Jobs (<i className="icon-quartz"></i> Quartz)</li>
                                <li>Custom Middleware</li>
                                <li>Custom Data Annotations</li>
                                <li>Custom Validation</li>
                                <li>Strongly Typed Configurations (POCO)</li>
                                <li>Custom URL format</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-9">
                      <div className="card card-background move-on-hover-right">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-8">
                              <h4 className="text-dark"><i className="fa fa-database text-dark pr-3"></i> Database</h4>
                              <ul className="opacity-9 text-dark">
                                <li><i className="icon-dapper"></i> Dapper <span className="small"><code>(multi mapping (N+1), multi results, data paging, etc)</code></span></li>
                                <li><i className="icon-azure"></i> Azure SQL</li>
                                <li>Code First Migrations (DbUp)</li>
                                <li>Concurrency Tokens</li>
                              </ul>
                            </div>
                            <div className="col-md-4">
                              <div className="oblique position-absolute top-0 h-100 d-md-block  me-n1">
                                <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0" style={{backgroundImage:"url('/img/curved-images/curved14.png')"}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-9">
                      <div className="card card-background move-on-hover-left">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="oblique-left position-absolute top-0 h-100 d-md-block  me-n1">
                                <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0" style={{backgroundImage:"url('/img/curved-images/curved1.png')"}}>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-8">
                              <h4 className="text-warning"><i className="fa fa-lock text-warning pr-3"></i> Security</h4>
                              <ul className="opacity-9 text-dark">
                                <li>External Authentication via Auth0 OIDC</li>
                                <li>Secure Cookies</li>
                                <li>HTTP Security Headers <span className="small"><code>(x-xss, referrer-policy, nosniff, x-powered-by, x-frame-options, etc)</code></span></li>
                                <li>Content Security Policy <span className="small"><code>(self, script-src, style-src, upgrade-insecure-requests, block-all-mixed-content, nonce, etc)</code></span></li>
                                <li>CRSF</li>
                                <li>CORS</li>
                                <li>HSTS</li>
                                <li>Custom HTTP Headers</li>
                                <li>Custom Cookies</li>
                                <li>Request Rate Limiter</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3"></div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-9">
                      <div className="card card-background move-on-hover-right">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-8">
                              <h4 className="text-success"><i className="fa fa-stream text-success pr-3"></i> Miscellaneous</h4>
                              <ul className="opacity-9 text-dark">
                                <li>React</li>
                                <li>React Routing</li>
                                <li>Redux</li>
                                <li>Typescript</li>
                                <li><i className="icon-azure"></i> Azure App Services</li>
                                <li><i className="icon-sass"></i> SASS/SCSS</li>
                                <li>Bundler/Minifier (HTML/CSS/JS)</li>
                                <li>Server Response Compression</li>
                                <li>Swagger</li>
                                <li>OpenAPI</li>
                                <li>Continuos Integration/Delivery (<i className="icon-github"></i> GitHub Actions)</li>
                                <li>Unit Tests</li>
                                <li>Integration Tests</li>
                              </ul>
                            </div>
                            <div className="col-md-4">
                              <div className="oblique position-absolute top-0 h-100 d-md-block  me-n1">
                                <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0" style={{backgroundImage:"url('/img/curved-images/curved4.png')"}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Page>
  );
};
