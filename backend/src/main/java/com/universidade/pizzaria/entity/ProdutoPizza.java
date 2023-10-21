package com.universidade.pizzaria.entity;
import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@DiscriminatorValue(value = "pizza")
public class ProdutoPizza extends Produto {
    
    private String descricao;
    private List<String> tamanho;

}
