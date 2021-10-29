package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.AbstractDto;

@Getter
@Setter
public class VnGeographyProvinceDto extends AbstractDto {

    private String name;

    private String code;
}
