namespace ITDeskServer.DTOs;

public sealed record LoginDto(
    string UserNameOrEmail,
    string Password,
    bool IsRememberMe=false);
