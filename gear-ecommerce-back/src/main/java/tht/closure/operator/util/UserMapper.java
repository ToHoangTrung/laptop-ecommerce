package tht.closure.operator.util;

import tht.closure.operator.model.dto.UserAddressDto;
import tht.closure.operator.model.dto.UserDto;
import tht.closure.operator.model.entity.User;
import tht.closure.operator.model.entity.UserAddress;

public class UserMapper {

    public static UserDto userToUserDto(User entity) {
        UserDto dto = new UserDto();
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setUsername(entity.getUsername());
        dto.setPhone(entity.getPhone());
        dto.setVersion(entity.getVersion());
        dto.setRole(entity.getRole().label);
        dto.setName(entity.getName());
        dto.setImageUrl(entity.getImageUrl());
        dto.setBirthday(entity.getBirthday());
        if (entity.getGender() != null) {
            dto.setGender(new UserDto.GenderDto(entity.getGender().label, entity.getGender().name()));
        }
        dto.setAddress(userAddressToUserAddressDto(entity.getAddress()));
        return dto;
    }

    public static UserAddressDto userAddressToUserAddressDto(UserAddress entity) {
        UserAddressDto dto = new UserAddressDto();
        dto.setEmail(entity.getEmail());
        dto.setName(entity.getName());
        dto.setPhone(entity.getPhone());
        dto.setStreet(entity.getStreet());
        if (entity.getProvince() != null) {
            dto.setProvince(GeographyMapper.provinceToProvinceDto(entity.getProvince()));
        }
        if (entity.getDistrict() != null) {
            dto.setDistrict(GeographyMapper.districtToDistrictDto(entity.getDistrict()));
        }
        if (entity.getWard() != null) {
            dto.setWard(GeographyMapper.wardToWardDto(entity.getWard()));
        }
        return dto;
    }

    public static User userDtoToUser(UserDto dto) {
        User entity = new User();
        entity.setPhone(dto.getPhone());
        entity.setBirthday(dto.getBirthday());
        entity.setGender(User.Gender.valueOf(dto.getGender().getValue()));
        entity.setVersion(dto.getVersion());
        return entity;
    }

}
