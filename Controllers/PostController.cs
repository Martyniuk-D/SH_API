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
    public class PostController : ControllerBase
    {
        public PostService _postService;
        public PostController(PostService postService)
        {
            _postService = postService;
            Console.WriteLine("Work");
        }
        [HttpGet("get-all-posts")]
        public IActionResult GetAllPosts()
        {
            var allPosts = _postService.GetAllPosts();
            return Ok(allPosts);
        }
        [HttpPost("add-post")]
        public IActionResult AddNewPost([FromBody] Post post)
        {
            Post newPost = new()
            {
                Name=post.Name,
                Description=post.Description,
                Author=post.Author,
                Image=post.Image,
                Video=post.Video
            };
            Console.WriteLine($"NEW POST ID: {newPost.Id}");
            _postService.AddNewPost(newPost);

            return Ok();
        }
    }
}
