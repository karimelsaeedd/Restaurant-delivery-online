using Core.Entites;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IOrderRepository
    {
        Task<Order> AddOrderAsync(Order order);
        Task<User> AddUserAsync(User user);
        Task<OrderItems> AddOrderItemsAsync(OrderItems orderItems);

    }
}
