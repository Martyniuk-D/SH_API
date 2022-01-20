using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SH_API.Data.Models;
using SH_API.Data.Services;
using SH_API.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SH_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserService _userService;
        private readonly JwtService _jwtService;
        public UserController(UserService userService, JwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }
        [HttpGet("get-all-users")]
        public IActionResult GetAllUsers()
        {
            var allUsers = _userService.GetAllUsers();
            return Ok(allUsers);
        }
        [HttpPost("add-user")]
        public IActionResult AddNewUser([FromBody]User user)
        {
            User newUser = new()
            {
                FullName = user.FullName,
                Nickname = user.Nickname,
                Password =  user.Password,
                Email = user.Email,
                BirthDate = user.BirthDate,
            };
            Console.WriteLine($"NEW USER with ID: {newUser.Id}");
            _userService.AddNewUser(newUser);

            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok();
        }

        //[HttpGet("get-user-verify")]
        //public IActionResult Verification([FromBody]UserVM user)
        //{
        //    if (_userService.Verification(user) == null)
        //    {
        //        return BadRequest();
        //    }
        //    else
        //    {
        //        return Ok(_userService.Verification(user));
        //    }
        //}

    }
}
