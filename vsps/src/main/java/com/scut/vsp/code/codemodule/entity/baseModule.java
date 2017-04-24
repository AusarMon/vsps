package com.scut.vsp.code.codemodule.entity;

import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

public class baseModule {
    public String getId() {
        return id;
    }

    private String id;

    public String generateJavascript() throws IOException {
        return "";
    }
    protected void init(Map<String, Object> jsonMap) {
        //this.id = StringEscapeUtils.unescapeHtml4((String) jsonMap.get("id"));
        System.out.println(jsonMap);
        this.id = ((String) jsonMap.get("id"));
    }
}
