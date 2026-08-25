package com.techassets.model;

/**
 * Enumeração representando os possíveis estados de um Ativo de TI.
 */
public enum AssetStatus {
    DISPONIVEL("Disponível para uso"),
    EM_USO("Alocado a um colaborador"),
    MANUTENCAO("Em assistência técnica"),
    BAIXADO("Descartado/Inativo");

    private final String descricao;

    AssetStatus(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
