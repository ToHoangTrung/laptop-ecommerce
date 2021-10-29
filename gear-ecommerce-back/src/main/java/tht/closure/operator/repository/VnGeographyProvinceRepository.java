package tht.closure.operator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tht.closure.operator.model.entity.VnGeographyProvince;

@Repository
public interface VnGeographyProvinceRepository extends JpaRepository<VnGeographyProvince, Long> {
}
