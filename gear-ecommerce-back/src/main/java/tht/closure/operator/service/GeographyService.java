package tht.closure.operator.service;

import tht.closure.operator.model.dto.UserAddressDto;
import tht.closure.operator.model.dto.VnGeographyWardDto;
import tht.closure.operator.model.dto.VnGeographyDistrictDto;
import tht.closure.operator.model.dto.VnGeographyProvinceDto;
import tht.closure.operator.model.entity.UserAddress;
import tht.closure.operator.security.service.UserPrincipal;

import java.util.List;

public interface GeographyService {
    List<VnGeographyProvinceDto> getProvinceList();

    List<VnGeographyDistrictDto> getDistrictList();

    List<VnGeographyWardDto> getWardList();

    List<VnGeographyDistrictDto> getDistrictByProvince(Long id);

    List<VnGeographyWardDto> getWardByDistrict(Long id);

}
