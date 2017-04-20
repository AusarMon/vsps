package com.scut.vsp.code.codemodule.entity;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

public class baseModule {
    public String getId() {
        return id;
    }

    private String id;

    public baseModule() {
    }
    public String generateJavascript() throws IOException {
        return "";
    }
    protected void init(Map<String, Object> jsonMap) {
        this.id = (String) jsonMap.get("id");
    }
}
