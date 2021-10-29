package tht.closure.operator.service.impl;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tht.closure.operator.model.dto.UserAddressDto;
import tht.closure.operator.model.dto.VnGeographyWardDto;
import tht.closure.operator.model.dto.VnGeographyDistrictDto;
import tht.closure.operator.model.dto.VnGeographyProvinceDto;
import tht.closure.operator.model.entity.*;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;
import tht.closure.operator.model.exception.main.ResourceNotMatchException;
import tht.closure.operator.repository.*;
import tht.closure.operator.security.service.UserPrincipal;
import tht.closure.operator.service.GeographyService;
import tht.closure.operator.util.GeographyMapper;
import tht.closure.operator.validator.AuthValidator;
import tht.closure.operator.validator.GeographyValidator;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GeographyServiceImpl implements GeographyService {

    @Autowired
    private VnGeographyProvinceRepository geographyProvinceRepository;

    @Autowired
    private VnGeographyDistrictRepository geographyDistrictRepository;

    @Autowired
    private VnGeographyWardRepository geographyWardRepository;

    @Autowired
    private UserAddressRepository userAddressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthValidator authValidator;

    @Autowired
    private GeographyValidator geographyValidator;

    @Override
    public List<VnGeographyProvinceDto> getProvinceList() {
        List<VnGeographyProvince> provinceList = geographyProvinceRepository.findAll();
        return provinceList.stream().map(GeographyMapper::provinceToProvinceDto).collect(Collectors.toList());
    }

    @Override
    public List<VnGeographyDistrictDto> getDistrictList() {
        List<VnGeographyDistrict> districtList = geographyDistrictRepository.findAll();
        return districtList.stream().map(GeographyMapper::districtToDistrictDto).collect(Collectors.toList());
    }

    @Override
    public List<VnGeographyWardDto> getWardList() {
        List<VnGeographyWard>wardList = geographyWardRepository.findAll();
        return wardList.stream().map(GeographyMapper::wardToWardDto).collect(Collectors.toList());
    }

    @Override
    public List<VnGeographyDistrictDto> getDistrictByProvince(Long id) {
        List<VnGeographyDistrict> districtList = geographyDistrictRepository.getByProvince_Id(id);
        return districtList.stream().map(GeographyMapper::districtToDistrictDto).collect(Collectors.toList());
    }

    @Override
    public List<VnGeographyWardDto> getWardByDistrict(Long id) {
        List<VnGeographyWard>wardList = geographyWardRepository.getByDistrict_Id(id);
        return wardList.stream().map(GeographyMapper::wardToWardDto).collect(Collectors.toList());
    }

}
