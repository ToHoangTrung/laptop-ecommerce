package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.VnGeographyDistrictDto;
import tht.closure.operator.model.dto.main.AbstractDto;

@Getter
@Setter
public class VnGeographyWardDto extends AbstractDto {

    private String name;

    private String prefix;

    private VnGeographyDistrictDto district;
}
