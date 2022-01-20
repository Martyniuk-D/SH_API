using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SH_API.Data.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text{ get; set; }
        public string Author { get; set; }
        public int PostId { get; set; }
        [ForeignKey("PostId")]
        public Post Post { get; set; }

    }
}
