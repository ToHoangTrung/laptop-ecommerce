package tht.closure.operator.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tht.closure.operator.model.dto.ProductDto;
import tht.closure.operator.model.dto.criterion.ProductCriterion;
import tht.closure.operator.model.dto.raw.NewProductDto;
import tht.closure.operator.service.ProductService;
import tht.closure.operator.service.main.PageResult;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/product")
public class ProductController extends AbstractController{

    @Autowired
    private ProductService productService;

    @PostMapping("/search")
    public ResponseEntity<PageResult<ProductDto>> getProductByCriterion(@RequestBody ProductCriterion criterion) {
        PageResult<ProductDto> productDtoPageResult = productService.getProductByCriterion(criterion);
        return ResponseEntity.ok().body(productDtoPageResult);
    }

    @PostMapping("/count")
    public ResponseEntity<Integer> countProductByCriterionNoLimitOffset(@RequestBody ProductCriterion criterion) {
        Integer amount = productService.countProductByCriterionNoLimitOffset(criterion);
        return ResponseEntity.ok().body(amount);
    }

    @GetMapping("/get-detail/{id}")
    public ResponseEntity<ProductDto> getProductDetail(@PathVariable Long id) {
        ProductDto product = productService.getProductDetail(id);
        return ResponseEntity.ok().body(product);
    }

    @PostMapping("/create-new")
    public ResponseEntity<String> createNewProduct(@RequestBody @Valid NewProductDto newProductDto) {
        productService.createNewProduct(newProductDto);
        return ResponseEntity.ok().body("Create new product successfully");
    }

}
