package tht.closure.operator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tht.closure.operator.model.entity.VnGeographyWard;

import java.util.List;

@Repository
public interface VnGeographyWardRepository extends JpaRepository<VnGeographyWard, Long> {

    List<VnGeographyWard> getByDistrict_Id(Long id);
}
