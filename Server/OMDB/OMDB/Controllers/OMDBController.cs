using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.Extensions.Caching.Memory;

namespace OMDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OMDBController : ControllerBase
    {
        private string apiKey = "k_lgjjrvw4";
        private string url = "https://imdb-api.com/API/";
        private IMemoryCache _memoryCache;



        public OMDBController(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        [HttpPost("getMovieByFreeText")]
        public async Task<IActionResult> GetAsync([FromBody] JObject data)
        {
            try
            {
                string query = data["query"].ToObject<string>();
                string searchValue = data["searchValue"].ToObject<string>();
                string urlParameters = $"?{query}={searchValue}";
                AdvancedSearchData apiResponse = null;

                if (_memoryCache.TryGetValue(urlParameters, out apiResponse))
                {
                    return Ok(apiResponse);
                }

       
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(url+ "AdvancedSearch/" + apiKey);


                // Add an Accept header for JSON format.
                client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

                // List data response.
                HttpResponseMessage response = client.GetAsync(urlParameters).Result;  // Blocking call! Program will wait here until a response is received or a timeout occurs.

                // Dispose once all HttpClient calls are complete. This is not necessary if the containing object will be disposed of; for example in this case the HttpClient instance will be disposed automatically when the application terminates so the following call is superfluous.
                client.Dispose();
                apiResponse = await response.Content.ReadAsAsync<AdvancedSearchData>();

                // Set cache options
                var cacheOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromSeconds(300));

                _memoryCache.Set(urlParameters, apiResponse, cacheOptions);

                return Ok(apiResponse);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex);
            }
         
        }
    }
}
