package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.AbstractDto;
import tht.closure.operator.model.dto.main.EnumDto;
import tht.closure.operator.model.entity.UserAddress;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
public class UserDto extends AbstractDto {

    private String username;

    private String email;

    private String password;

    private String phone;

    private String name;

    private String imageUrl;

    private LocalDate birthday;

    private GenderDto gender;

    public static class GenderDto extends EnumDto {
        public GenderDto(String label, String value) {
            super(label, value);
        }
    }

    public UserDto(String username, String password, String email){
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public UserDto(){

    }

    private String role;

    private UserAddressDto address;
}
