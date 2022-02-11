using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HFRS.Pages
{
    public class StatusModel : PageModel
    {
        public int? MyStatusCode { get; private set; }
        public void OnGet([FromRoute] int statusCode)
        {
            MyStatusCode = statusCode;
        }
    }
}
