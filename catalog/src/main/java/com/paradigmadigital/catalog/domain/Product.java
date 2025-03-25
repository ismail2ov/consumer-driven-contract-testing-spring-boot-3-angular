package com.paradigmadigital.catalog.domain;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String name;

    @Convert(converter = PriceConverter.class)
    private Price price;

}
