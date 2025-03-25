package com.paradigmadigital.catalog.domain;

import io.micrometer.common.util.StringUtils;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class PriceConverter implements AttributeConverter<Price, String> {

    private static final String SEPARATOR = ",";

    @Override
    public String convertToDatabaseColumn(Price price) {
        if (price == null) {
            return null;
        }

        StringBuilder sb = new StringBuilder();
        if (price.currency() != null && !price.currency()
            .isEmpty()) {
            sb.append(price.currency());
            sb.append(SEPARATOR);
        }

        if (price.amount() != null && !price.amount().isEmpty()) {
            sb.append(price.amount());
        }

        return sb.toString();
    }

    @Override
    public Price convertToEntityAttribute(String dbPrice) {
        if (StringUtils.isBlank(dbPrice)) {
            return null;
        }

        String[] pieces = dbPrice.split(SEPARATOR);

        if (pieces.length == 0) {
            return null;
        }

        String firstPiece = !pieces[0].isEmpty() ? pieces[0] : null;

        if (!dbPrice.contains(SEPARATOR)) {
            return new Price(firstPiece, null);
        }

        if (pieces.length < 2 || StringUtils.isBlank(pieces[1])) {
            return new Price(null, firstPiece);
        }

        return new Price(pieces[1], firstPiece);
    }
}
