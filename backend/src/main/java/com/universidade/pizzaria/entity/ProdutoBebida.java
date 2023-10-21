package com.universidade.pizzaria.entity;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@DiscriminatorValue(value = "bebida")
public class ProdutoBebida extends Produto  {
    
    private String sabor;
    private String descricao; 

}
