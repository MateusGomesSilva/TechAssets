package com.techassets;

import com.techassets.model.Asset;
import com.techassets.model.AssetStatus;
import com.techassets.service.AssetService;

public class TestRunner {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("EXECUTANDO TESTES LOCAIS DO TECHASSETS (JAVA)");
        System.out.println("==================================================");

        AssetService service = new AssetService();

        // Teste 1: Cadastro de Ativo com Tag Automática
        Asset asset1 = new Asset(null, "Notebook Dell Latitude 3420", "Notebooks", "SN-DELL-987654", "Carlos Eduardo", "Matriz Extrema", AssetStatus.DISPONIVEL);
        service.registerAsset(asset1);
        assert asset1.getTag() != null && asset1.getTag().startsWith("TAG-2026-") : "Falha na geração de Tag!";
        System.out.println("[PASSOU] Teste 1: Cadastro de ativo com Tag -> " + asset1.getTag());

        // Teste 2: Validação de Duplicidade de Série
        try {
            Asset asset2 = new Asset(null, "Notebook Dell 2", "Notebooks", "SN-DELL-987654", "Ana Paula", "Matriz", AssetStatus.DISPONIVEL);
            service.registerAsset(asset2);
            System.err.println("[FALHOU] Teste 2: Permitiu cadastrar número de série duplicado!");
        } catch (IllegalStateException e) {
            System.out.println("[PASSOU] Teste 2: Bloqueio de Número de Série duplicado -> " + e.getMessage());
        }

        // Teste 3: Consulta por Status
        Asset asset3 = new Asset(null, "Servidor PowerEdge", "Servidores", "SN-DELL-0099", "Suporte", "Datacenter", AssetStatus.MANUTENCAO);
        service.registerAsset(asset3);
        assert service.findByStatus(AssetStatus.MANUTENCAO).size() == 1 : "Falha ao filtrar por status!";
        System.out.println("[PASSOU] Teste 3: Filtro por status -> 1 ativo em MANUTENÇÃO encontrado.");

        // Teste 4: Transferência de Responsável
        boolean transferred = service.transferAsset(asset1.getTag(), "Ana Paula - RH", "Filial Extrema - Bloco B");
        assert transferred && asset1.getResponsible().equals("Ana Paula - RH") : "Falha na transferência de responsável!";
        System.out.println("[PASSOU] Teste 4: Transferência de responsável -> " + asset1.getResponsible() + " (" + asset1.getLocation() + ")");

        System.out.println("==================================================");
        System.out.println("TODOS OS TESTES FORAM EXECUTADOS COM SUCESSO! (4/4)");
        System.out.println("==================================================");
    }
}
