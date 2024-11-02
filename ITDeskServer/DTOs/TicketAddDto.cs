namespace ITDeskServer.DTOs;

public sealed record TicketAddDto(
   string Subject,
   List<IFormFile>? Files);