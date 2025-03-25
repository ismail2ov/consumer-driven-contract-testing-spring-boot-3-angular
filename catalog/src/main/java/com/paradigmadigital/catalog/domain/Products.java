package com.paradigmadigital.catalog.domain;

import java.util.List;
import lombok.Data;

@Data
public class Products {

    private final List<Product> products;

    public Products(List<Product> products) {
        this.products = products;
    }
}
