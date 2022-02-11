using Juniper.Services;

namespace Yarrow.Server
{
    public class Program
    {
        public static void Main(string[] args) => 
            CreateHostBuilder(args)
                .Build()
                .Run();

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureJuniperHost<Program>(new DefaultConfiguration.PortOptions
                {
                    HttpPort = 80,
                    HttpsPort = 443
                });

        private IWebHostEnvironment Environment { get; }
        public IConfiguration Configuration { get; }

        public Program(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            Environment = env;
        }

        public void ConfigureServices(IServiceCollection services) => 
            services.ConfigureDefaultServices(Environment);

        public void Configure(IApplicationBuilder app) => 
            app.ConfigureRequestPipeline(Environment, Configuration);
    }
}
