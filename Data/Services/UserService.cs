using SH_API.Data.Models;
using SH_API.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SH_API.Data.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public List<User> GetAllUsers() => _context.Users.ToList();
        public void AddNewUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        //public User Verification(UserVM user)
        //{
        //    return _context.Users.Where(u => u.Nickname == user.Nickname && u.Password == user.Password).FirstOrDefault();
        //}
    }
}
