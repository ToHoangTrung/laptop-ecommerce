package tht.closure.operator.util;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import org.hibernate.Hibernate;
import tht.closure.operator.model.dto.ProductDetailDto;
import tht.closure.operator.model.dto.ProductDto;
import tht.closure.operator.model.dto.UserDto;
import tht.closure.operator.model.dto.raw.NewProductDto;
import tht.closure.operator.model.entity.Product;
import tht.closure.operator.model.entity.ProductDetail;
import tht.closure.operator.model.entity.ProductImage;

import java.util.stream.Collectors;

public class ProductMapper {

    public static ProductDto productToProductDto(Product entity) {
        ProductDto dto = new ProductDto();
        dto.setId(entity.getId());
        dto.setVersion(entity.getVersion());
        dto.setName(entity.getName());
        dto.setAmount(entity.getAmount());
        dto.setDescriptionContentUrl(entity.getDescriptionContentUrl());
        dto.setPrice(entity.getPrice());
        dto.setSku(entity.getSku());
        dto.setImageUrls(entity.getProductImages().stream().map(ProductImage::getImageUrl).collect(Collectors.toList()));
        dto.setNumPurchased(entity.getNumPurchased());
        dto.setRating(entity.getRating());
        dto.setNumRating(entity.getNumRating());
        if (entity.getStatus() != null) {
            dto.setStatus(new ProductDto.StatusDto(entity.getStatus().label, entity.getStatus().name()));
        }
        if (Hibernate.isInitialized(entity.getProductDetail())) {
            dto.setDetail(productToProductDetailDto(entity));
        }
        if (Hibernate.isInitialized(entity.getDiscount())) {
            dto.setDiscount(DiscountMapper.discountToDiscountDto(entity.getDiscount()));
        }
        return dto;
    }

    public static ProductDetailDto productToProductDetailDto(Product entity) {
        ProductDetailDto dto = new ProductDetailDto();
        dto.setCpu(entity.getProductDetail().getCpu().label);
        dto.setRam(entity.getProductDetail().getRam().label);
        if (entity.getProductDetail().getRom() != null) {
            dto.setRom(entity.getProductDetail().getRom().label);
        }
        dto.setScreen(entity.getProductDetail().getScreen().label);
        dto.setGraphicsChip(entity.getProductDetail().getGraphicsChip().label);
        return dto;
    }

    public static Product newProductDtoToProduct(NewProductDto dto) {
        Product entity = new Product();
        entity.setName(dto.getName());
        entity.setAmount(dto.getAmount());
        entity.setDescriptionContentUrl(dto.getDescriptionContentUrl());
        entity.setPrice(dto.getPrice());
        entity.setSku(dto.getSku());
        entity.setGuaranteeTime(dto.getGuaranteeTime());
        entity.setDescriptionContentUrl(dto.getDescriptionContentUrl());
        ProductDetail detail = new ProductDetail();
        if (StringUtils.isNotBlank(dto.getCpu())) {
            detail.setCpu(ProductDetail.Cpu.valueOf(dto.getCpu()));
        }
        if (StringUtils.isNotBlank(dto.getRam())) {
            detail.setRam(ProductDetail.Ram.valueOf(dto.getRam()));
        }
        if (StringUtils.isNotBlank(dto.getRom())) {
            detail.setRom(ProductDetail.Rom.valueOf(dto.getRom()));
        }
        if (StringUtils.isNotBlank(dto.getScreen())) {
            detail.setScreen(ProductDetail.Screen.valueOf(dto.getScreen()));
        }
        if (StringUtils.isNotBlank(dto.getGraphicsChip())) {
            detail.setGraphicsChip(ProductDetail.GraphicsChip.valueOf(dto.getGraphicsChip()));
        }
        entity.setProductDetail(detail);
        detail.setProduct(entity);
        return entity;
    }
}
