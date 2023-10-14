package com.universidade.pizzaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.universidade.pizzaria.entity.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido,Long> {
    
}
