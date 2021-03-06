using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{

   
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository _repo, IConfiguration config, IMapper mapper)
        {
            this._config = config;
           _mapper = mapper;
            this.repo = _repo;

        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDTO userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await repo.userExists(userForRegisterDto.Username))
                return BadRequest("El usuario ya existe.Intente con otro nombre de usuario.");

            var userToCreate = _mapper.Map<User>(userForRegisterDto);
            var createdUser = await repo.Register(userToCreate, userForRegisterDto.Password);
var userToReturn = _mapper.Map<UserForDetailDTO>(createdUser);
            return CreatedAtRoute("GetUsers", new {controller = "Users",id = createdUser.Id},userToReturn );
        }

        
        [HttpPost("login")]
        public async Task<IActionResult> login(UserForLoginDTO userRegisterDTO)
        {
            
            var userFromRepo = await repo.Login(userRegisterDTO.Username.ToLower(), userRegisterDTO.Password);

            if (userFromRepo == null)
            {
                return Unauthorized();
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserForListDTO>(userFromRepo);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }

    }
}