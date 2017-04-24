package com.scut.vsp.code.codemodule.entity;

import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Created by sosoo on 2016/11/28.
 */

public class VARIABLE extends variableModule {
    private String moduleType = "VARIABLE";
    private VarType varType;
    private String value;

    private VarType getVarType() {
        return varType;
    }

    private String getValue() {
        return value;
    }


    public VARIABLE() {
    }

    @Override
    public void init(Map<String, Object> jsonMap) {
        super.init(jsonMap);
        this.value = (String) jsonMap.get("value");
        this.varType = VarType.StringMap.get(jsonMap.get("initType"));
    }

    @Override
    public Document modifyHtml(Document html) {
        return html;
    }


    @Override
    public String generateJavascript() {
        String javaScriptCode = "";
        switch (this.getVarType()) {
            case VAR:
                javaScriptCode += "var " + this.getName() + "=" + this.getValue() + ";\n";
                break;
            case immediate:
                switch (getDtype()) {
                    case ArrayType:
                        javaScriptCode += "var " + this.getName() + "=new Array();\n";
                        String[] rawArray = value.split(",");
                        int index = 0;
                        for (String arrayValue : rawArray) {
                            javaScriptCode += this.getName() + "[" + index + "]=" + arrayValue + ";\n";
                        }
                        break;
                    case BoolType:
                        assert (this.getValue().equals("true") || this.getValue().equals("false"));
                        javaScriptCode += "var " + this.getName() + "=" + this.getValue() + ";\n";
                        break;
                    case NumberType:
                        javaScriptCode += "var " + this.getName() + "=" + this.getValue() + ";\n";
                        break;
                }
                break;
        }
        return javaScriptCode;
    }
}
