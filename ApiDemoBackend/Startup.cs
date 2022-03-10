using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiDemoBackend.Data;
using AspNetCoreRateLimit;
using DbUp;
using Hellang.Middleware.ProblemDetails;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Quartz;

namespace ApiDemoBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Config = configuration;
        }

        public IConfiguration Config { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMemoryCache();
            services.AddHttpClient();
            services.AddHttpContextAccessor();

            services.Configure<IpRateLimitOptions>(Config.GetSection("IpRateLimiting"));
            services.Configure<IpRateLimitPolicies>(Config.GetSection("IpRateLimitPolicies"));
            services.Configure<ClientRateLimitOptions>(Config.GetSection("ClientRateLimiting"));
            services.Configure<ClientRateLimitPolicies>(Config.GetSection("ClientRateLimitPolicies"));
            services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
            services.AddSingleton<IClientPolicyStore, MemoryCacheClientPolicyStore>();
            services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();

            var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
            EnsureDatabase.For.SqlDatabase(connectionString);
            Dapper.SqlMapper.AddTypeMap(typeof(string), System.Data.DbType.AnsiString);
            var upgrader = DeployChanges.To.SqlDatabase(connectionString, null)
                .WithScriptsEmbeddedInAssembly(System.Reflection.Assembly.GetExecutingAssembly())
                .WithTransaction()
                .LogToConsole()
                .Build();

            if (upgrader.IsUpgradeRequired())
            {
                upgrader.PerformUpgrade();
            }

            services.AddScoped<IDataRepository, DataRepository>();
            services.AddSingleton<IProductCache, ProductCache>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = Config["Auth0:Authority"];
                options.Audience = Config["Auth0:Audience"];
            });

            services.AddAuthorization();

            services.AddControllers(options =>
                options.SuppressAsyncSuffixInActionNames = false
            );
            services.AddProblemDetails();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ApiDemoBackend", Version = "v1" });
            });

            services.Configure<RouteOptions>(options =>
            {
                options.AppendTrailingSlash = true;
                options.LowercaseUrls = true;
                options.LowercaseQueryStrings = false;
            });

            services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();

            services.Configure<QuartzOptions>(Config.GetSection("Quartz"));
            services.AddQuartz(q =>
            {
                q.UseMicrosoftDependencyInjectionScopedJobFactory();

                //var jobKey = new JobKey("Email Quartz Job");
                //q.AddJob<EmailJob>(opts => opts.WithIdentity(jobKey));
                //q.AddTrigger(opts => opts
                //    .ForJob(jobKey)
                //    .WithIdentity(jobKey.Name + " trigger")
                //    .StartNow()
                //    .WithSimpleSchedule(x => x
                //        .WithInterval(TimeSpan.FromMinutes(1))
                //        .RepeatForever()
                //    )
                //);
            });
            services.AddQuartzHostedService(options =>
            {
                options.WaitForJobsToComplete = true;
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseProblemDetails();

            app.UseIpRateLimiting();
            app.UseClientRateLimiting();

            app.UseSecurityHeaders(policies =>
                policies
                    .AddFrameOptionsDeny()
                    .AddXssProtectionBlock()
                    .AddContentTypeOptionsNoSniff()
                    //.AddStrictTransportSecurityMaxAgeIncludeSubDomains(maxAgeInSeconds: 60 * 60 * 24 * 365) // maxage = one year in seconds
                    .RemoveServerHeader()
                    .AddReferrerPolicyNoReferrer()
                    .AddContentSecurityPolicyReportOnly(builder =>
                    {
                        builder.AddUpgradeInsecureRequests();
                        builder.AddBlockAllMixedContent();
                    })
                    .AddCustomHeader("X-Demo-React", "=^.^=")
            );

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ApiDemoBackend v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(builder => builder
                .WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader());
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
