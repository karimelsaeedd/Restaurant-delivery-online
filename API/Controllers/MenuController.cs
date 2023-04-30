using Core.Entites;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MenuController : BaseApiController
    {
        private readonly IMenuRepository _menuRepo;

        public MenuController(IMenuRepository MenuRepo)
        {
            _menuRepo = MenuRepo;
        }

        [HttpGet("RestaurantId")]
        public async Task<ActionResult<IReadOnlyList<Menu>>> GetMenu(int RestaurantId)
        {
            var menu = await _menuRepo.GetMenuAsync(RestaurantId);
            return Ok(menu);
        }

    }
}
