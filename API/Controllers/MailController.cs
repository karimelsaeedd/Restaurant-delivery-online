using Core.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MailController : BaseApiController
    {
        private readonly IMailService mailService;
        public MailController(IMailService mailService)
        {
            this.mailService = mailService;
        }
        [HttpPost]
        public async Task<IActionResult> SendMail(MailRequestDto dto)
        {
                await mailService.SendEmailAsync(dto);
                return Ok();
        }
    }
}
