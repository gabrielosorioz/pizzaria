package com.universidade.pizzaria.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private int quantidade;
    private String tamanho;

    @ManyToOne
    @JoinColumn(name = "id_pedido")
    private Pedido pedido;
}
