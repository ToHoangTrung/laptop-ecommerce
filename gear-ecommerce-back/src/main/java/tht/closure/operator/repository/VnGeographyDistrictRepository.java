package tht.closure.operator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tht.closure.operator.model.entity.VnGeographyDistrict;

import java.util.List;

@Repository
public interface VnGeographyDistrictRepository extends JpaRepository<VnGeographyDistrict, Long> {

    List<VnGeographyDistrict> getByProvince_Id(Long id);
}
