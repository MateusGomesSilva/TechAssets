package com.techassets.service;

import com.techassets.model.Asset;
import com.techassets.model.AssetStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * Serviço responsável pelas regras de negócio de Ativos de TI (MVP TechAssets).
 */
public class AssetService {
    private final List<Asset> assets = new ArrayList<>();
    private final AtomicInteger tagSequence = new AtomicInteger(1000);

    /**
     * Cadastra um novo ativo aplicando as regras de validação (US-01).
     */
    public Asset registerAsset(Asset asset) {
        if (asset.getName() == null || asset.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("O nome do ativo é obrigatório.");
        }
        if (asset.getSerialNumber() == null || asset.getSerialNumber().trim().isEmpty()) {
            throw new IllegalArgumentException("O número de série é obrigatório.");
        }
        
        // Validação de Duplicidade de Número de Série (CA01.2)
        boolean exists = assets.stream()
                .anyMatch(a -> a.getSerialNumber().equalsIgnoreCase(asset.getSerialNumber()));
        if (exists) {
            throw new IllegalStateException("Já existe um ativo cadastrado com o Número de Série: " + asset.getSerialNumber());
        }

        // Geração automática de Tag Patrimonial Única (CA01.3)
        if (asset.getTag() == null || asset.getTag().trim().isEmpty()) {
            asset.setTag("TAG-2026-" + tagSequence.incrementAndGet());
        }

        assets.add(asset);
        return asset;
    }

    /**
     * Retorna todos os ativos cadastrados.
     */
    public List<Asset> getAllAssets() {
        return new ArrayList<>(assets);
    }

    /**
     * Consulta ativos filtrados por Status (US-02 / CA02.2).
     */
    public List<Asset> findByStatus(AssetStatus status) {
        return assets.stream()
                .filter(a -> a.getStatus() == status)
                .collect(Collectors.toList());
    }

    /**
     * Busca um ativo pelo código da Tag Patrimonial.
     */
    public Optional<Asset> findByTag(String tag) {
        return assets.stream()
                .filter(a -> a.getTag().equalsIgnoreCase(tag))
                .findFirst();
    }

    /**
     * Registra a movimentação / alteração de responsável (US-03).
     */
    public boolean transferAsset(String tag, String newResponsible, String newLocation) {
        Optional<Asset> assetOpt = findByTag(tag);
        if (assetOpt.isPresent()) {
            Asset asset = assetOpt.get();
            asset.setResponsible(newResponsible);
            if (newLocation != null && !newLocation.trim().isEmpty()) {
                asset.setLocation(newLocation);
            }
            if (asset.getStatus() == AssetStatus.DISPONIVEL) {
                asset.setStatus(AssetStatus.EM_USO);
            }
            return true;
        }
        return false;
    }

    /**
     * Retorna a quantidade total de ativos cadastrados.
     */
    public int count() {
        return assets.size();
    }
}
