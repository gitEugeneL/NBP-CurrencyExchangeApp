using Refit;
using Server.Integrations.OpenCageApi.Contracts;

namespace Server.Integrations.OpenCageApi;

public interface IOpenCageEndpoints
{
    
    [Get("/v1/json?q={latitude}+{longitude}&key={key}")]
    Task<GeoDataResponse> GetGeoData(string latitude, string longitude, string key);
}