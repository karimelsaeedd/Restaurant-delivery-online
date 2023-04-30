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
    public class BasketRepository : IBasketRepository
    {
        private readonly RestaurantContext _context;

        public BasketRepository(RestaurantContext context)
        {
            _context = context;
        }


        public async Task<Order> AddOrderAsync(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<OrderItems> AddOrderItemsAsync(OrderItems orderItems)
        {
            await _context.OrderItems.AddAsync(orderItems);
            await _context.SaveChangesAsync();
            return orderItems;
        }

        public async Task<User> GetUserAsync(int UserId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
        }
    }
}
