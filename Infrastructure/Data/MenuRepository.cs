using Core.Entites;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class MenuRepository : IMenuRepository
    {
        private readonly RestaurantContext _context;

        public MenuRepository(RestaurantContext context)
        {
            _context = context;
        }
        public async Task<IReadOnlyList<Menu>> GetMenuAsync(int RestaurantId)
        {
            return await _context.Menus.Where(x => x.RestaurantId == RestaurantId).Include(restaurant => restaurant.MenuItems).ToListAsync();
        }
    }
}
