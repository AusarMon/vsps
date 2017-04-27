package com.scut.vsp.service;

import java.io.IOException;

/**
 * Created by sosoo on 2017/3/3.
 */
public interface CodeGeneraServiceProviderInterface {
    String generateCode(String jsonString);
    String generateTestCode(String jsonString) throws IOException;
}
