using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RestaurantController : BaseApiController
    {
        private readonly IRestaurantRepository _restaurantRepo;

        public RestaurantController(IRestaurantRepository restaurantRepo)
        {
            _restaurantRepo = restaurantRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Restaurant>>> GetRestaurants()
        {
            var restaurants = await _restaurantRepo.GetAllRestaurantAsync();
            return Ok(restaurants);
        }
    }
}
