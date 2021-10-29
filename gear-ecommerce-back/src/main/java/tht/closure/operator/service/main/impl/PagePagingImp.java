package tht.closure.operator.service.main.impl;

import tht.closure.operator.service.main.PagePaging;

public class PagePagingImp implements PagePaging {

    private long offset = 0L;
    private long limit = 1000L;

    public PagePagingImp(long offset, long limit) {
        this.offset = offset;
        this.limit = limit;
    }

    @Override
    public long getLimit() {
        return limit;
    }

    @Override
    public long getOffset() {
        return offset;
    }
}
