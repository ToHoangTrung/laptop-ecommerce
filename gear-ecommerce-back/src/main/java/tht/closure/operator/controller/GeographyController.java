package tht.closure.operator.controller;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tht.closure.operator.model.dto.UserAddressDto;
import tht.closure.operator.model.dto.VnGeographyWardDto;
import tht.closure.operator.model.dto.VnGeographyDistrictDto;
import tht.closure.operator.model.dto.VnGeographyProvinceDto;
import tht.closure.operator.model.entity.UserAddress;
import tht.closure.operator.security.service.CurrentUser;
import tht.closure.operator.security.service.UserPrincipal;
import tht.closure.operator.service.GeographyService;

import java.util.List;

@RestController
@RequestMapping("/api/geography")
public class GeographyController extends AbstractController {

    @Autowired
    private GeographyService geographyService;

    @GetMapping("/get-province-list")
    public ResponseEntity<List<VnGeographyProvinceDto>> getProvinceList() {
        List<VnGeographyProvinceDto> provinces = geographyService.getProvinceList();
        return ResponseEntity.ok().body(provinces);
    }

    @GetMapping("/get-district-list")
    public ResponseEntity<List<VnGeographyDistrictDto>> getDistrictList() {
        List<VnGeographyDistrictDto> districts = geographyService.getDistrictList();
        return ResponseEntity.ok().body(districts);
    }

    @GetMapping("/get-district-by-province/{id}")
    public ResponseEntity<List<VnGeographyDistrictDto>> getDistrictByProvince(@PathVariable Long id) {
        List<VnGeographyDistrictDto> districts = geographyService.getDistrictByProvince(id);
        return ResponseEntity.ok().body(districts);
    }

    @GetMapping("/get-ward-list")
    public ResponseEntity<List<VnGeographyWardDto>> getWardList() {
        List<VnGeographyWardDto> wards = geographyService.getWardList();
        return ResponseEntity.ok().body(wards);
    }

    @GetMapping("/get-ward-by-district/{id}")
    public ResponseEntity<List<VnGeographyWardDto>> getWardByDistrict(@PathVariable Long id) {
        List<VnGeographyWardDto> wards = geographyService.getWardByDistrict(id);
        return ResponseEntity.ok().body(wards);
    }

}
