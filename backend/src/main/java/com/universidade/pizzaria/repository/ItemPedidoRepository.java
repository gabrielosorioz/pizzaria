package com.universidade.pizzaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.universidade.pizzaria.entity.ItemPedido;

@Repository
public interface ItemPedidoRepository extends JpaRepository<ItemPedido,Long> {
    
}
