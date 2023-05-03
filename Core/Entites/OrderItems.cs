using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entites
{
    public class OrderItems : BaseEntity
    {
        public string Name { get; set; }
        //public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImgUrl { get; set; }
        public int Quantity { get; set; }
        public int Total { get; set; }
        //public int MenuItemId { get; set; }
        //public MenuItem MenuItem { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
