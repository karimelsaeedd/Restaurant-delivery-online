using Core.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Restaurant : BaseEntity
    {
        public string Name { get; set; }
        public string City { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public string ImgUrl { get; set; }
        public Menu Menu { get; set; }
    }
}
