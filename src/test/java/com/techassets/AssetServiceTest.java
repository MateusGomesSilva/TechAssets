package com.techassets;

import com.techassets.model.Asset;
import com.techassets.model.AssetStatus;
import com.techassets.service.AssetService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Suíte de Testes do Serviço de Ativos (TechAssets MVP)")
public class AssetServiceTest {

    private AssetService assetService;

    @BeforeEach
    void setUp() {
        assetService = new AssetService();
    }

    @Test
    @DisplayName("US-01: Deve cadastrar um ativo com sucesso e gerar Tag patrimonial única")
    void testRegisterAssetSuccess() {
        Asset asset = new Asset(null, "Notebook Dell Latitude", "Notebooks", "SN-DELL-1234", "Carlos TI", "Matriz", AssetStatus.DISPONIVEL);
        Asset registered = assetService.registerAsset(asset);

        assertNotNull(registered.getTag(), "A Tag patrimonial deve ser gerada automaticamente.");
        assertTrue(registered.getTag().startsWith("TAG-2026-"), "A Tag deve ter o prefixo padrão TAG-2026-.");
        assertEquals(1, assetService.count());
    }

    @Test
    @DisplayName("US-01 / CA01.2: Deve rejeitar cadastro com Número de Série duplicado")
    void testRegisterAssetDuplicateSerialNumberThrowsException() {
        Asset asset1 = new Asset(null, "Monitor ThinkVision", "Monitores", "SN-LNV-9999", "Suporte", "Matriz", AssetStatus.DISPONIVEL);
        assetService.registerAsset(asset1);

        Asset asset2 = new Asset(null, "Monitor LG 24", "Monitores", "SN-LNV-9999", "Almoxarifado", "Matriz", AssetStatus.DISPONIVEL);

        Exception exception = assertThrows(IllegalStateException.class, () -> assetService.registerAsset(asset2));
        assertTrue(exception.getMessage().contains("Já existe um ativo cadastrado com o Número de Série"));
    }

    @Test
    @DisplayName("US-01 / CA01.1: Deve rejeitar cadastro com nome ou número de série em branco")
    void testRegisterAssetInvalidFieldsThrowsException() {
        Asset assetWithoutName = new Asset(null, "", "Notebooks", "SN-1111", "Suporte", "Matriz", AssetStatus.DISPONIVEL);
        assertThrows(IllegalArgumentException.class, () -> assetService.registerAsset(assetWithoutName));

        Asset assetWithoutSerial = new Asset(null, "Teclado USB", "Periféricos", "", "Suporte", "Matriz", AssetStatus.DISPONIVEL);
        assertThrows(IllegalArgumentException.class, () -> assetService.registerAsset(assetWithoutSerial));
    }

    @Test
    @DisplayName("US-02 / CA02.2: Deve filtrar ativos por Status")
    void testFindByStatus() {
        Asset a1 = new Asset(null, "MacBook Pro", "Notebooks", "SN-MAC-01", "Dev 1", "Matriz", AssetStatus.EM_USO);
        Asset a2 = new Asset(null, "Servidor HP", "Servidores", "SN-HP-02", "Infra", "Datacenter", AssetStatus.DISPONIVEL);
        Asset a3 = new Asset(null, "Nobreak APC", "Infraestrutura", "SN-APC-03", "Infra", "Datacenter", AssetStatus.MANUTENCAO);

        assetService.registerAsset(a1);
        assetService.registerAsset(a2);
        assetService.registerAsset(a3);

        List<Asset> disponiveis = assetService.findByStatus(AssetStatus.DISPONIVEL);
        assertEquals(1, disponiveis.size());
        assertEquals("Servidor HP", disponiveis.get(0).getName());

        List<Asset> emManutencao = assetService.findByStatus(AssetStatus.MANUTENCAO);
        assertEquals(1, emManutencao.size());
    }

    @Test
    @DisplayName("US-03 / CA03.1: Deve realizar transferência de responsável e atualizar localização")
    void testTransferAsset() {
        Asset asset = new Asset(null, "iPad Air 5", "Tablets", "SN-APPLE-100", "Carlos TI", "Matriz", AssetStatus.DISPONIVEL);
        Asset registered = assetService.registerAsset(asset);
        String tag = registered.getTag();

        boolean transferred = assetService.transferAsset(tag, "Ana Paula RH", "Filial Extrema");
        assertTrue(transferred);

        Optional<Asset> updatedOpt = assetService.findByTag(tag);
        assertTrue(updatedOpt.isPresent());
        assertEquals("Ana Paula RH", updatedOpt.get().getResponsible());
        assertEquals("Filial Extrema", updatedOpt.get().getLocation());
        assertEquals(AssetStatus.EM_USO, updatedOpt.get().getStatus());
    }
}
