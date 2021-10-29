package tht.closure.operator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tht.closure.operator.model.entity.SubCatalog;

import java.util.List;

@Repository
public interface SubCatalogRepository extends JpaRepository<SubCatalog, Long> {

    List<SubCatalog> getByCatalog_Id(Long id);
}
