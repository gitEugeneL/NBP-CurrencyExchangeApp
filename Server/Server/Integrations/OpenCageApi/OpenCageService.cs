namespace Server.Integrations.OpenCageApi;


public interface IOpenCageService
{
    Task<string> GetGeoModel(string latitude, string longitude);
} 

public class OpenCageService(IOpenCageEndpoints cageEndpoints, IConfiguration configuration) : IOpenCageService
{
    public async Task<string> GetGeoModel(string latitude, string longitude)
    {
        try
        {
            var key = configuration.GetSection("OpenCageDataIntegration:Key").Value!;
            var response = await cageEndpoints.GetGeoData(latitude, longitude, key);
            return response.Results[0].Formatted;
        }
        catch (Exception e)
        {
            return string.Empty;
        }
    }
}