namespace Core.DTOs
{
    public class MailRequestDto
    {
        public string EmailToRestaurant { get; set; } = string.Empty;
        public string RestaurantSubject { get; set; } = string.Empty;
        public string RestaurantBody { get; set; } = string.Empty;
        public string EmailToClient { get; set; } = string.Empty;
        public string ClientSubject { get; set; } = string.Empty;
        public string ClientBody { get; set; } = string.Empty;
    }
}
