package tht.closure.operator.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tht.closure.operator.model.dto.BrandDto;
import tht.closure.operator.model.dto.CartDto;
import tht.closure.operator.security.service.CurrentUser;
import tht.closure.operator.security.service.UserPrincipal;
import tht.closure.operator.service.BrandService;

import java.util.List;

@RestController
@RequestMapping("/api/brand")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping("/get-all-brand")
    public ResponseEntity<List<BrandDto>> getAllBrand() {
        List<BrandDto> brands = brandService.getAllBrand();
        return ResponseEntity.ok().body(brands);
    }
}
