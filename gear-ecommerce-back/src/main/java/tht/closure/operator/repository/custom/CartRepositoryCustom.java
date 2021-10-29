package tht.closure.operator.repository.custom;

import tht.closure.operator.model.entity.Cart;

public interface CartRepositoryCustom {

    Cart getCartByUser_Id(Long id);
}
