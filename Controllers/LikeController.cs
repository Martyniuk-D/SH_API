using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SH_API.Data.Models;
using SH_API.Data.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SH_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        public LikeService _likeService;
        public LikeController(LikeService likeService)
        {
            _likeService = likeService;
        }
        [HttpGet("get-all-likes")]
        public IActionResult GetAllLikes()
        {
            var allLikes = _likeService.GetAllLikes();
            return Ok(allLikes);
        }
        [HttpPost("add-like")]
        public IActionResult AddNewLike([FromBody] Like like)
        {
            Like newLike = new()
            {
               PostId = like.PostId,
               UserId = like.UserId
            };
  
            _likeService.AddNewLike(newLike);

            return Ok();
        }
        [HttpDelete("remove")]
        public IActionResult Remove([FromBody] Like like)
        {
            Console.WriteLine("Controller" + like.Id);
            _likeService.RemoveLike(like);
            return Ok();
        }
    }
}
