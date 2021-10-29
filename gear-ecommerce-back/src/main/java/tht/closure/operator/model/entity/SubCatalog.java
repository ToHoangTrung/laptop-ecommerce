package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.IndexColumn;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity(name = "t_sub_catalog")
@Getter
@Setter
public class SubCatalog extends AbstractEntity{

    @Column
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Catalog catalog;

    @OneToMany(mappedBy = "subCatalog")
    @OrderBy("id")
    private Set<ProductType> productTypes = new LinkedHashSet<>();

    @Enumerated(EnumType.STRING)
    @Column
    private Type type;

    public enum Type {
        LAPTOP_MACBOOK,
        PHONE_TABLET
    }

    public static List<String> getAllSubCatalogType() {
        return Stream.of(SubCatalog.Type.values()).map(SubCatalog.Type::name).collect(Collectors.toList());
    }
}
