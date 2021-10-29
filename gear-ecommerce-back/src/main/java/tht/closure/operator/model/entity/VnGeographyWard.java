package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "t_vn_geography_ward")
@Getter
@Setter
public class VnGeographyWard extends AbstractEntity {

    private String name;

    private String prefix;

    @ManyToOne
    @JoinColumn
    private VnGeographyDistrict district;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private VnGeographyProvince province;
}
