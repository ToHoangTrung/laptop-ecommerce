package tht.closure.operator.service.main;

import java.util.List;

public interface PageResult<T> {

    long getTotalElements();

    List<T> getContent();

    PagePaging getPagePaging();
}
