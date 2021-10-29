package tht.closure.operator.model.dto.main;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class PaginationCriterion {

    @NotNull
    private Long limit;

    @NotNull
    private Long offset;
}
