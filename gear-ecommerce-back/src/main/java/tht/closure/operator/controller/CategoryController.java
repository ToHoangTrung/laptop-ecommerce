package tht.closure.operator.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tht.closure.operator.model.dto.CatalogDto;
import tht.closure.operator.model.dto.FilterTemplateDto;
import tht.closure.operator.model.dto.ProductTypeDto;
import tht.closure.operator.model.dto.SubCatalogDto;
import tht.closure.operator.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/get-hierarchical/catalog")
    public ResponseEntity<List<CatalogDto>> getCatalogHierarchical() {
        List<CatalogDto> catalogs = categoryService.getCatalogHierarchical();
        return ResponseEntity.ok().body(catalogs);
    }

    @GetMapping("/get-all/catalog")
    public ResponseEntity<List<CatalogDto>> getAllCatalog() {
        List<CatalogDto> catalogs = categoryService.getAllCatalog();
        return ResponseEntity.ok().body(catalogs);
    }

    @GetMapping("/get-all/sub-catalog")
    public ResponseEntity<List<SubCatalogDto>> getAllSubCatalog() {
        List<SubCatalogDto> subCatalogs = categoryService.getAllSubCatalog();
        return ResponseEntity.ok().body(subCatalogs);
    }

    @GetMapping("/get-all/product-type")
    public ResponseEntity<List<ProductTypeDto>> getAllProductType() {
        List<ProductTypeDto> productTypes = categoryService.getAllProductType();
        return ResponseEntity.ok().body(productTypes);
    }

    @GetMapping("/get-by-catalog/sub-catalog/{id}")
    public ResponseEntity<List<SubCatalogDto>> getSubCatalogByCatalog(@PathVariable Long id) {
        List<SubCatalogDto> subCatalogs = categoryService.getSubCatalogByCatalog(id);
        return ResponseEntity.ok().body(subCatalogs);
    }

    @GetMapping("/get-by-sub-catalog/product-type/{id}")
    public ResponseEntity<List<ProductTypeDto>> getProductTypeBySubCatalog(@PathVariable Long id) {
        List<ProductTypeDto> productTypes = categoryService.getProductTypeBySubCatalog(id);
        return ResponseEntity.ok().body(productTypes);
    }

    @GetMapping("/get-filter-by-catalog/sub-catalog/{id}")
    public ResponseEntity<List<FilterTemplateDto>> getSubCatalogFilters(@PathVariable Long id) {
        List<FilterTemplateDto> subCatalogFilters = categoryService.getSubCatalogFilterByCatalog(id);
        return ResponseEntity.ok().body(subCatalogFilters);
    }

    @GetMapping("/get-filter-by-sub-catalog/product-detail/{id}")
    public ResponseEntity<List<FilterTemplateDto>> getProductDetailFilters(@PathVariable Long id) {
        List<FilterTemplateDto> productDetailFilters = categoryService.getProductDetailFiltersBySubCatalog(id);
        return ResponseEntity.ok().body(productDetailFilters);
    }

    @GetMapping("/get-all-filter/product-detail")
    public ResponseEntity<List<FilterTemplateDto>> getAllFilterProductDetail() {
        List<FilterTemplateDto> productDetailFilters = categoryService.getAllFilterProductDetail();
        return ResponseEntity.ok().body(productDetailFilters);
    }
}
