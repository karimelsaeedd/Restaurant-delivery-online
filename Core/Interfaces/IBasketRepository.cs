using Core.Entites;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
        Task<User> GetUserAsync(int UserId);
        Task<Order> AddOrderAsync(Order order);
        Task<OrderItems> AddOrderItemsAsync(OrderItems orderItems);

    }
}
