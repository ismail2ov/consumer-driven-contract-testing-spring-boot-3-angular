package com.paradigmadigital.catalog.domain;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductBy(Long id) {
        return this.productRepository.findById(id);
    }

    public void create(Product product) {
        productRepository.save(product);
    }

    public void updateProduct(Long id, Product product) {
        Optional<Product> currentProduct = getProductBy(id);
        if (currentProduct.isEmpty()) {
            throw new ProductNotFoundException(id);
        }

        product.setId(currentProduct.get().getId());
        productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Optional<Product> currentProduct = getProductBy(id);
        if (currentProduct.isEmpty()) {
            throw new ProductNotFoundException(id);
        } else {
            productRepository.deleteById(id);
        }
    }
}
