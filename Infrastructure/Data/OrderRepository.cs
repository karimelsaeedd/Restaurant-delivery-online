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
    public class OrderRepository : IOrderRepository
    {
        private readonly RestaurantContext _context;

        public OrderRepository(RestaurantContext context)
        {
            _context = context;
        }


        public async Task<Order> AddOrderAsync(Order order, OrderItems orderItems, User user)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            await _context.OrderItems.AddAsync(orderItems);
            await _context.SaveChangesAsync();

            await _context.Users.AddAsync(user);

            return order;
        }

        //public async Task<OrderItems> AddOrderItemsAsync(OrderItems orderItems)
        //{
        //    await _context.OrderItems.AddAsync(orderItems);
        //    await _context.SaveChangesAsync();
        //    return orderItems;
        //}

        //public async Task<User> AddUserAsync(User user)
        //{
        //    await _context.Users.AddAsync(user);
        //    return user;
        //}
    }
}
