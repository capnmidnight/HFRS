
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

using ServiceStack.Stripe;

namespace HFRS.Pages
{
    public class StripeRequest
    {
        public object? StripeToken { get; set; }
        public string? StripeTokenType { get; set; }
        public string? StripeEmail { get; set; }
    }

    public class DownloadsModel : PageModel
    {
        public string? StripePublicKey { get; private set; }
        private string? StripePrivateKey { get; set; }

        public Dictionary<string, StoreItem?> Downloads { get; private set; }

        public DownloadsModel(IConfiguration config)
        {
            var stripe = config.GetSection("Stripe");
            if (stripe is not null)
            {
                StripePrivateKey = stripe.GetValue<string>("PrivateKey");
                StripePublicKey = stripe.GetValue<string>("PublicKey");
            }

            Downloads = StoreItem.GetItemDictionary();
        }

        public IActionResult OnGet([FromRoute]string? id)
        {
            if (id is null)
            {
                return Page();
            }

            return SendFile(id);
        }

        private IActionResult SendFile(string id)
        {
            var entry = Downloads.Get(id);
            if (entry?.File?.Exists != true
                || entry.Amount is not null)
            {
                return NotFound();
            }

            return File(entry.File.OpenRead(), entry.ContentType, entry.File.Name);
        }

        public async Task<IActionResult> OnPost([FromRoute]string id, [FromBody] StripeRequest stripeRequest)
        {
            if(id is null 
                || stripeRequest is null 
                || stripeRequest.StripeToken is null
                || stripeRequest.StripeTokenType is null
                || stripeRequest.StripeEmail is null)
            {
                return NotFound();
            }

            var gateway = new StripeGateway(StripePrivateKey);

            var customer = await gateway.PostAsync(new CreateStripeCustomer
            {
                Email = stripeRequest.StripeEmail,
                Source = new ServiceStack.Stripe.Types.StripeCard
                {
                    
                }
            });
            return Page();
        }
    }
}
