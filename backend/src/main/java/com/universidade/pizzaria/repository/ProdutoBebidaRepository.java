package com.universidade.pizzaria.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.universidade.pizzaria.entity.ProdutoBebida;

@Repository
public interface ProdutoBebidaRepository extends JpaRepository<ProdutoBebida,Long>{
    
}
