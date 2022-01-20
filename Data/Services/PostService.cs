using Microsoft.EntityFrameworkCore;
using SH_API.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SH_API.Data.Services
{
    public class PostService
    {
        private readonly AppDbContext _context;

        public PostService(AppDbContext context)
        {
            _context = context;
        }

        public List<Post> GetAllPosts() => _context.Posts.ToList();
        public void AddNewPost(Post post)
        {
            _context.Posts.Add(post);
            //_context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Posts ON;");
            _context.SaveChanges();
        }
        //public void UpdatePost(Post post)
        //{
        //    foreach (var it in _context.Posts)
        //    {
        //        if (it.Id == post.Id)
        //        {
        //            it.Likes = post.Likes;
        //            break;
        //        }
        //    }
        //    _context.SaveChanges();
        //}
    }
}
