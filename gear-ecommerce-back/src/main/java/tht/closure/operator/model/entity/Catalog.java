package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Entity(name = "t_catalog")
@Getter
@Setter
public class Catalog extends AbstractEntity{

    @Column
    private String name;

    @Column
    private String logo;

    @OneToMany(mappedBy = "catalog")
    @OrderBy("id")
    private Set<SubCatalog> subCatalogs = new LinkedHashSet<>();
}
