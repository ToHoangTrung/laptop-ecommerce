package tht.closure.operator.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tht.closure.operator.model.dto.*;
import tht.closure.operator.model.dto.main.CustomFilter;
import tht.closure.operator.model.entity.*;
import tht.closure.operator.repository.CatalogRepository;
import tht.closure.operator.repository.ProductTypeRepository;
import tht.closure.operator.repository.SubCatalogRepository;
import tht.closure.operator.service.CategoryService;
import tht.closure.operator.util.CategoryMapper;
import tht.closure.operator.util.ConstantItem;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CatalogRepository catalogRepository;

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private SubCatalogRepository subCatalogRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Override
    public List<CatalogDto> getCatalogHierarchical() {
        List<Catalog> catalogs = catalogRepository.getCatalogHierarchical();
        return catalogs.stream().map(CategoryMapper::catalogToCatalogDto).collect(Collectors.toList());
    }

    @Override
    public List<CatalogDto> getAllCatalog() {
        List<Catalog> catalogs = catalogRepository.findAll();
        return catalogs.stream().map(CategoryMapper::catalogToCatalogDto).collect(Collectors.toList());
    }

    @Override
    public List<SubCatalogDto> getAllSubCatalog() {
        List<SubCatalog> subCatalogs = subCatalogRepository.findAll();
        return subCatalogs.stream().map(CategoryMapper::subCatalogToSubCatalogDto).collect(Collectors.toList());
    }

    @Override
    public List<SubCatalogDto> getSubCatalogByCatalog(Long id) {
        List<SubCatalog> subCatalogs = subCatalogRepository.getByCatalog_Id(id);
        return subCatalogs.stream().map(CategoryMapper::subCatalogToSubCatalogDto).collect(Collectors.toList());
    }

    @Override
    public List<ProductTypeDto> getAllProductType() {
        List<ProductType> productTypes = productTypeRepository.findAll();
        return productTypes.stream().map(CategoryMapper::productTypeToProductTypeDto).collect(Collectors.toList());
    }

    @Override
    public List<ProductTypeDto> getProductTypeBySubCatalog(Long id) {
        List<ProductType> productTypes = productTypeRepository.getBySubCatalog_Id(id);
        return productTypes.stream().map(CategoryMapper::productTypeToProductTypeDto).collect(Collectors.toList());
    }

    @Override
    public List<FilterTemplateDto> getSubCatalogFilterByCatalog(Long id) {
        Catalog catalog = catalogRepository.findById(id).orElse(null);
        if (catalog != null) {
            List<FilterTemplateDto> subCatalogFilters = new ArrayList<>();
            for (SubCatalog subCatalog : catalog.getSubCatalogs()) {
                FilterTemplateDto subCatalogFilter = new FilterTemplateDto();
                subCatalogFilter.setLabel(subCatalog.getName());
                subCatalogFilter.setType(ConstantItem.PRODUCT_SEARCH_CRITERIA_SUB_CATALOG_ID);
                for (ProductType productType : subCatalog.getProductTypes()) {
                    subCatalogFilter.getValueList().add(new CustomFilter(productType.getName(), productType.getId().toString()));
                }
                subCatalogFilters.add(subCatalogFilter);
            }
            return subCatalogFilters;
        } else {
            return new ArrayList<>();
        }

    }

    @Override
    public List<FilterTemplateDto> getProductDetailFiltersBySubCatalog(Long id) {
        SubCatalog subCatalog = subCatalogRepository.findById(id).orElse(null);
        if (subCatalog != null) {
            List<FilterTemplateDto> productDetailFilters = new ArrayList<>();
            FilterTemplateDto productTypeFilter = new FilterTemplateDto();
            productTypeFilter.setLabel(messageSource.getMessage("product-filter.type", null, "", new Locale("")));
            productTypeFilter.setType(ConstantItem.PRODUCT_SEARCH_CRITERIA_PRODUCT_TYPE_ID);
            for (ProductType productType : subCatalog.getProductTypes()) {
                productTypeFilter.getValueList().add(new CustomFilter(productType.getName(), productType.getId().toString()));
            }
            productDetailFilters.add(productTypeFilter);
            productDetailFilters.addAll(getProductDetailFiltersBySubCatalogType(subCatalog.getType()));
            return new ArrayList<>(new LinkedHashSet<>(productDetailFilters));

        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public List<FilterTemplateDto> getAllFilterProductDetail() {
        List<FilterTemplateDto> productDetailFilters = new ArrayList<>();
        SubCatalog.getAllSubCatalogType().forEach(e -> {
            productDetailFilters.addAll(getProductDetailFiltersBySubCatalogType(SubCatalog.Type.valueOf(e)));
        });
        return new ArrayList<>(new LinkedHashSet<>(productDetailFilters));
    }

    private List<FilterTemplateDto> getProductDetailFiltersBySubCatalogType(SubCatalog.Type type) {

       List<FilterTemplateDto> productDetailFilters = new ArrayList<>();

        if ((type.equals(SubCatalog.Type.LAPTOP_MACBOOK) || type.equals(SubCatalog.Type.PHONE_TABLET))) {
            FilterTemplateDto ramFilter = new FilterTemplateDto();
            ramFilter.setLabel(messageSource.getMessage("product-filter.ram", null, "", new Locale("")));
            ramFilter.setType(ConstantItem.PRODUCT_SEARCH_CRITERIA_PRODUCT_DETAIL_RAM);
            ProductDetail.getAllRamLabelAndName().forEach((key, value) -> ramFilter.getValueList().add(new CustomFilter(key, value)));

            productDetailFilters.add(ramFilter);
        }

        if (type.equals(SubCatalog.Type.LAPTOP_MACBOOK)) {

            FilterTemplateDto cpuFilter = new FilterTemplateDto();
            cpuFilter.setLabel(messageSource.getMessage("product-filter.cpu", null, "", new Locale("")));
            cpuFilter.setType(ConstantItem.PRODUCT_SEARCH_CRITERIA_PRODUCT_DETAIL_CPU);
            ProductDetail.getAllCpuLabelAndName().forEach((key, value) -> cpuFilter.getValueList().add(new CustomFilter(key, value)));

            productDetailFilters.add(cpuFilter);

        }

        else if (type.equals(SubCatalog.Type.PHONE_TABLET)){

            FilterTemplateDto romFilter = new FilterTemplateDto();
            romFilter.setLabel(messageSource.getMessage("product-filter.rom", null, "", new Locale("")));
            romFilter.setType(ConstantItem.PRODUCT_SEARCH_CRITERIA_PRODUCT_DETAIL_ROM);
            ProductDetail.getAllRomLabelAndName().forEach((key, value) -> romFilter.getValueList().add(new CustomFilter(key, value)));

            productDetailFilters.add(romFilter);
        }

        return productDetailFilters;
    }

}
