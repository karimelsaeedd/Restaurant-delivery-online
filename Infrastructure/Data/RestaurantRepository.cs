using Core.DTOs;
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
    public class RestaurantRepository : IRestaurantRepository
    {
        private readonly RestaurantContext _context;

        public RestaurantRepository(RestaurantContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<RestaurantToReturnDTO>> GetAllRestaurantAsync()
        {
            var restaurants = await _context.Restaurants.ToListAsync();

            var restaurantsToReturn = restaurants
                .Select(restaurant => new RestaurantToReturnDTO
            {
                Id = restaurant.Id,
                Name = restaurant.Name,
                Description = restaurant.Description,
                City = restaurant.City,
                ImgUrl = restaurant.ImgUrl,
                Email = restaurant.Email
            })
                .ToList();

            return restaurantsToReturn;

        }
    }
}
