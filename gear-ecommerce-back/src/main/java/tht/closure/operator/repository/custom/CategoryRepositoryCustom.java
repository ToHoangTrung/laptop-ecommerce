package tht.closure.operator.repository.custom;

import tht.closure.operator.model.entity.Catalog;

import java.util.List;

public interface CategoryRepositoryCustom {

    List<Catalog> getCatalogHierarchical();
}
