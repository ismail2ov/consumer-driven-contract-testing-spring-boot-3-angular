This is a simple example of how to use Spring Cloud Contract to create a contract between a Spring Boot 3  application (_which is the **Producer**_) and an Angular application (_which is the **Consumer**_).

## Producer

We have created a simple application with Spring Boot that does not yet have an implementation, but we have the contracts to be able to create the contracts.

### Create the stubs

- Go to the catalog folder
``` shell
 cd catalog
```

- Compile and package the code skipping the tests because we don't have any logic implemented yet
``` shell
 mvn clean package -DskipTests
```
