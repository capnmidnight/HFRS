using Juniper.Services;

namespace HFRS
{
    public class Program
    {
        private static readonly DefaultConfiguration.PortOptions ports = new()
        {
            HttpPort = 80,
            HttpsPort = 443
        };

        public static IHostBuilder CreateHostBuilder(string[] args) =>
                Host.CreateDefaultBuilder(args)
                    .ConfigureJuniperHost<Program>(ports);
        public static void Main(string[] args) =>
            CreateHostBuilder(args)
                .Build()
                .Run();

        private IWebHostEnvironment Environment { get; }

        private IConfiguration Configuration { get; }

        public Program(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            Environment = env;
        }

        public void ConfigureServices(IServiceCollection services) =>
            services.ConfigureDefaultServices(Environment);

        public void Configure(IApplicationBuilder app) =>
            app.ConfigureRequestPipeline(Environment, Configuration, ports);
    }
}
