package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "t_product_type")
@Getter
@Setter
public class ProductType extends AbstractEntity{

    @Column
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private SubCatalog subCatalog;

    @OneToMany(mappedBy = "productType")
    private List<GroupTypeProduct> groupTypeProducts = new ArrayList<>();
}
