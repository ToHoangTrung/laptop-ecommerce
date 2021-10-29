package tht.closure.operator.repository.custom.imp;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Service;
import tht.closure.operator.model.entity.*;
import tht.closure.operator.repository.custom.CategoryRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class CategoryRepositoryCustomImpl implements CategoryRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    QCatalog catalog = QCatalog.catalog;
    QSubCatalog subCatalog = QSubCatalog.subCatalog;
    QProductType productType = QProductType.productType;

    @Override
    public List<Catalog> getCatalogHierarchical() {

        JPAQuery<Catalog> query = new JPAQuery<Catalog>(em)
                .from(catalog).distinct()
                .leftJoin(catalog.subCatalogs, subCatalog)
                .fetchJoin()
                .leftJoin(subCatalog.productTypes)
                .fetchJoin();
        return query.fetch();
    }

}
