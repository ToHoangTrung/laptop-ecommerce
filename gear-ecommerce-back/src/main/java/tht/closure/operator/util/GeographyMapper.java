package tht.closure.operator.util;

import tht.closure.operator.model.dto.VnGeographyWardDto;
import tht.closure.operator.model.dto.VnGeographyDistrictDto;
import tht.closure.operator.model.dto.VnGeographyProvinceDto;
import tht.closure.operator.model.entity.VnGeographyDistrict;
import tht.closure.operator.model.entity.VnGeographyProvince;
import tht.closure.operator.model.entity.VnGeographyWard;

public class GeographyMapper {

    public static VnGeographyProvinceDto provinceToProvinceDto(VnGeographyProvince entity) {
        VnGeographyProvinceDto dto = new VnGeographyProvinceDto();
        dto.setId(entity.getId());
        dto.setCode(entity.getCode());
        dto.setName(entity.getName());
        return dto;
    }

    public static VnGeographyDistrictDto districtToDistrictDto(VnGeographyDistrict entity) {
        VnGeographyDistrictDto dto = new VnGeographyDistrictDto();
        dto.setId(entity.getId());
        dto.setPrefix(entity.getPrefix());
        dto.setName(entity.getName());
        return dto;
    }

    public static VnGeographyWardDto wardToWardDto(VnGeographyWard entity) {
        VnGeographyWardDto dto = new VnGeographyWardDto();
        dto.setId(entity.getId());
        dto.setPrefix(entity.getPrefix());
        dto.setName(entity.getName());
        return dto;
    }
}
