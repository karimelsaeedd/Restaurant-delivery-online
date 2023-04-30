using Core.Entites;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IMenuRepository
    {
        Task<IReadOnlyList<Menu>> GetMenuAsync(int RestaurantId);
    }
}
