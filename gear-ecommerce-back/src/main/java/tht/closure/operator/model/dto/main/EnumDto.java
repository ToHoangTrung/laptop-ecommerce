package tht.closure.operator.model.dto.main;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnumDto {

    private String label;

    private String value;

    public EnumDto(String label, String value) {
        this.label = label;
        this.value = value;
    }
}
