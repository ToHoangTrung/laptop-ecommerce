package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "t_brand")
@Getter
@Setter
public class Brand extends AbstractEntity{

    @Column
    private String name;

    @Column
    private String logoUrl;

    @OneToMany(mappedBy = "brand")
    private List<Product> products = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column
    private Type type;

    public enum Type {
        LAPTOP_MACBOOK,
        PHONE_TABLET
    }
}
