package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.AbstractDto;
import tht.closure.operator.model.entity.VnGeographyProvince;

@Getter
@Setter
public class UserAddressDto extends AbstractDto {

    private VnGeographyDistrictDto district;

    private VnGeographyProvinceDto province;

    private VnGeographyWardDto ward;

    private String street;

    private String phone;

    private String name;

    private String email;

}
