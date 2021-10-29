package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "t_vn_geography_district")
@Getter
@Setter
public class VnGeographyDistrict extends  AbstractEntity {

    private String name;

    private String prefix;

    @ManyToOne
    @JoinColumn
    private VnGeographyProvince province;

    @OneToMany(mappedBy = "district")
    private List<VnGeographyWard> wards = new ArrayList<>();

}
