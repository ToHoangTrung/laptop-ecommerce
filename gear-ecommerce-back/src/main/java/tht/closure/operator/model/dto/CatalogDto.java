package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.AbstractDto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class CatalogDto extends AbstractDto {

    private String name;

    private String logo;

    private List<SubCatalogDto> subCatalogs = new ArrayList<>();
}
