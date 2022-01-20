using SH_API.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SH_API.Data.Services
{
    public class LikeService
    {
        private readonly AppDbContext _context;

        public LikeService(AppDbContext context)
        {
            _context = context;
        }

        public List<Like> GetAllLikes() => _context.Likes.ToList();
        public void AddNewLike(Like like)
        {
            _context.Likes.Add(like);
            _context.SaveChanges();
        }
        public void RemoveLike(Like like)
        {
            Console.WriteLine("ID: " + like.Id);
            Like tmpLike = _context.Likes.Where(l => l.Id == like.Id).FirstOrDefault();
            if (tmpLike != null)
            {
                _context.Likes.Remove(tmpLike);
                _context.SaveChanges();
            }
            else
            {
                Console.WriteLine("LIKE NULL");
            }
        }
    }
}
