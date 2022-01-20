using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SH_API.Data.Services
{
    public class JwtService
    {
        private string securityKey = "0dCuDe3VIl2vfuI4m6BBMDe-mJTJ8KhvrE4YS-o-341oxEjRp9wdm2L9aUwRQs_C0CYGvuwkX4by1i_V08JjwBG5CO7NTkmWmQuhaPfsDiTPRpgSb6hWRiPpT3plvr8xebuCGlu5K5fklmzDtOzjC8F4Ns";

        public string Generate(int id)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);
            var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.Today.AddDays(1));
            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
    }
}
