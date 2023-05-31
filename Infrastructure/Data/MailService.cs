using Core.DTOs;
using Core.Interfaces;
using Core.Settings;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

namespace Infrastructure.Data
{
    public class MailService : IMailService
    {
        private readonly IConfiguration _config;

        public MailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(MailRequestDto dto)
        {
            //var email = new MimeMessage()
            //{
                
            //    Sender = MailboxAddress.Parse(_mailSettings.Email),
            //    Subject = subject
            //};
            //email.To.Add(MailboxAddress.Parse(mailTo));
            //email.Body = new TextPart(body);

            //var builder = new BodyBuilder();

            //builder.TextBody = body;

            //email.Body = builder.ToMessageBody();

            //email.From.Add(new MailboxAddress(_mailSettings.DisplayName, _mailSettings.Email));

            //using var smtp = new SmtpClient();
            //smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            //smtp.Authenticate(_mailSettings.Email, _mailSettings.Password);
            //await smtp.SendAsync(email);

            //smtp.Disconnect(true);




                //try
                //{
                   //string test = _config.GetSection("Email").Value;

                    var RestaurantEmail = new MimeMessage();
                    RestaurantEmail.From.Add(MailboxAddress.Parse(_config.GetSection("Email").Value));
                    RestaurantEmail.To.Add(MailboxAddress.Parse(dto.EmailToRestaurant));
                    RestaurantEmail.Subject = dto.RestaurantSubject;
                    RestaurantEmail.Body = new TextPart(TextFormat.Html) { Text = dto.RestaurantBody };

                    using var smtp1 = new SmtpClient();
                    smtp1.Connect(_config.GetSection("Host").Value, 587, SecureSocketOptions.StartTls);
                    smtp1.Authenticate(_config.GetSection("Email").Value, _config.GetSection("Password").Value);
                    smtp1.Send(RestaurantEmail);
                    smtp1.Disconnect(true);


                    var ClientEmail = new MimeMessage();
                    ClientEmail.From.Add(MailboxAddress.Parse(_config.GetSection("Email").Value));
                    ClientEmail.To.Add(MailboxAddress.Parse(dto.EmailToClient));
                    ClientEmail.Subject = dto.ClientSubject;
                    ClientEmail.Body = new TextPart(TextFormat.Html) { Text = dto.ClientBody };

                    using var smtp2 = new SmtpClient();
                    smtp2.Connect(_config.GetSection("Host").Value, 587, SecureSocketOptions.StartTls);
                    smtp2.Authenticate(_config.GetSection("Email").Value, _config.GetSection("Password").Value);
                    smtp2.Send(ClientEmail);
                    smtp2.Disconnect(true);

                    //return Ok();
                //}
                //catch (Exception ex)
                //{
                //    // Log or handle the exception accordingly
                //    return 
                //}

        }
    }
}
