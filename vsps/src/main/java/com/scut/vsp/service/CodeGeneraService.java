package com.scut.vsp.service;

import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * Created by sosoo on 2017/2/27.
 */

@Service
public class CodeGeneraService {

    private CodeGeneraServiceProviderInterface serviceProvider;

    public String generateCode(String jsonString) throws NullPointerException {
        if (serviceProvider == null)
            throw new NullPointerException("No CodeGeneraServiceProviderInterface");
        return serviceProvider.generateCode(jsonString);
    }
    public String generateTestCode(String jsonString) throws NullPointerException, IOException {
        if (serviceProvider == null)
            throw new NullPointerException("No CodeGeneraServiceProviderInterface");
        return serviceProvider.generateTestCode(jsonString);
    }

    public void setServiceProvider(CodeGeneraServiceProviderInterface serviceProvider) {
        this.serviceProvider = serviceProvider;
    }
}
