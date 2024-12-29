
using Server.Integrations.OpenCageApi.Models;

namespace Server.Integrations.OpenCageApi.Contracts;

public sealed class GeoDataResponse
{
    public GeoModel[] Results { get; init; } = [];
}




