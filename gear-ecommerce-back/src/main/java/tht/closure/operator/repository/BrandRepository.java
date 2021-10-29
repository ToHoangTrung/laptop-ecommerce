package tht.closure.operator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tht.closure.operator.model.entity.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
}
