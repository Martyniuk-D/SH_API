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
    public class CommentController : ControllerBase
    {
        public CommentService _commentService;
        public CommentController(CommentService commentService)
        {
            _commentService = commentService;
        }
        [HttpGet("get-all-comments")]
        public IActionResult GetAllComments()
        {
            var allComments = _commentService.GetAllComments();
            return Ok(allComments);
        }
        [HttpPost("add-comment")]
        public IActionResult AddNewComment([FromBody] Comment comment)
        {
            Comment newComment = new()
            {
                Text = comment.Text,
                Author = comment.Author,
                PostId = comment.PostId
            };
            Console.WriteLine($"NEW Comment ID: {newComment.Id}");
            _commentService.AddNewComment(newComment);

            return Ok();
        }
    }
}
