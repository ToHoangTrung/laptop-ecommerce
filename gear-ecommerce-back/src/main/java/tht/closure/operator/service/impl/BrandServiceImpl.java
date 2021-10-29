package tht.closure.operator.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tht.closure.operator.model.dto.BrandDto;
import tht.closure.operator.model.entity.Brand;
import tht.closure.operator.repository.BrandRepository;
import tht.closure.operator.service.BrandService;
import tht.closure.operator.util.BrandMapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<BrandDto> getAllBrand() {
        List<Brand> brands = brandRepository.findAll();
        return brands.stream().map(BrandMapper::brandToBrandDto).collect(Collectors.toList());
    }
}
