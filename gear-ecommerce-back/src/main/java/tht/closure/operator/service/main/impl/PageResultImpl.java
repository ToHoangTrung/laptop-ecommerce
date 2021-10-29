package tht.closure.operator.service.main.impl;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import tht.closure.operator.service.main.PagePaging;
import tht.closure.operator.service.main.PageResult;

import java.util.ArrayList;
import java.util.List;

public class PageResultImpl<T> implements PageResult<T> {

    private final List<T> results = new ArrayList<>();
    private Long totalElements = 0L;
    private PagePaging pagePaging = new PagePagingImp(0,1000);

    @JsonCreator
    public PageResultImpl(@JsonProperty("content") List<T> results, @JsonProperty("totalElements") Long totalElements, PagePaging pagePaging) {
        this.results.addAll(results);
        this.totalElements = totalElements;
        this.pagePaging = pagePaging;
    }

    @Override
    public long getTotalElements() {
        return totalElements;
    }

    @Override
    public List<T> getContent() {
        return this.results;
    }

    @Override
    public PagePaging getPagePaging() {
        return pagePaging;
    }

}
