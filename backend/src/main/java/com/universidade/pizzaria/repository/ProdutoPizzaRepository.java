package com.universidade.pizzaria.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.universidade.pizzaria.entity.ProdutoPizza;

@Repository
public interface ProdutoPizzaRepository extends JpaRepository<ProdutoPizza,Long>{
    
}
