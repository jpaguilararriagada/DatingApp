using System.Linq;
using AutoMapper;
using DatingApp.API.DTO;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDTO>()
                    .ForMember(dest => dest.PhotoUrl, opt =>
                    {
                        opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.isMain).Url);
                    })
                    .ForMember(dest => dest.Age, opt => opt.ResolveUsing(d => d.DateOfBirth.calculateAge()));
            CreateMap<User, UserForDetailDTO>()
                       .ForMember(dest => dest.PhotoUrl, opt =>
                       {
                           opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.isMain).Url);
                       })
                         .ForMember(dest => dest.Age, opt => opt.ResolveUsing(d => d.DateOfBirth.calculateAge()));
            CreateMap<PhotoForCreationDTO, Photo>();
            CreateMap<Photo, PhotoForReturnDTO>();
            CreateMap<Photo, PhotosForDetailDTO>();
            CreateMap<UserForUpdateDTO, User>();
            CreateMap<UserRegisterDTO, User>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message,MessageToReturnDto>()
            .ForMember(x=> x.SenderPhotoUrl, opt => opt.MapFrom(x=> x.Sender.Photos.FirstOrDefault(p=>p.isMain).Url))
            .ForMember(x=> x.RecipientPhotoUrl, opt => opt.MapFrom(x=> x.Recipient.Photos.FirstOrDefault(p=>p.isMain).Url));
        }
    }
}