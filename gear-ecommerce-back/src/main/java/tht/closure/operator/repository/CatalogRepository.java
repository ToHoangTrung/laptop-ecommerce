package tht.closure.operator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tht.closure.operator.model.entity.Catalog;
import tht.closure.operator.repository.custom.CategoryRepositoryCustom;

@Repository
public interface CatalogRepository extends JpaRepository<Catalog, Long>, CategoryRepositoryCustom {
}
