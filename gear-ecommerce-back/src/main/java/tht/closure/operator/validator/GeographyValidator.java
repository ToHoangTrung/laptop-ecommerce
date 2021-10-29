package tht.closure.operator.validator;

import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tht.closure.operator.model.entity.VnGeographyDistrict;
import tht.closure.operator.model.entity.VnGeographyProvince;
import tht.closure.operator.model.entity.VnGeographyWard;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;
import tht.closure.operator.repository.VnGeographyDistrictRepository;
import tht.closure.operator.repository.VnGeographyProvinceRepository;
import tht.closure.operator.repository.VnGeographyWardRepository;

@Component
public class GeographyValidator {

    @Autowired
    private VnGeographyProvinceRepository geographyProvinceRepository;

    @Autowired
    private VnGeographyDistrictRepository geographyDistrictRepository;

    @Autowired
    private VnGeographyWardRepository geographyWardRepository;

    public VnGeographyWard getWardIfExist(Long id) {
        return geographyWardRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Ward", "id", id)
        );
    }

    public VnGeographyDistrict getDistrictIfExist(Long id) {
        return geographyDistrictRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("District", "id", id)
        );
    }

    public VnGeographyProvince getProvinceIfExist(Long id) {
        return geographyProvinceRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Province", "id", id)
        );
    }
}
