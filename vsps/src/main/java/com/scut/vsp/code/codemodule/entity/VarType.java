package com.scut.vsp.code.codemodule.entity;

import java.util.HashMap;
import java.util.Map;

public enum VarType {
    immediate("immediate"),
    VAR("VAR");
    public String name;
    public static Map<String, VarType> StringMap = new HashMap<>();

    static {
        StringMap.put("immediate", VarType.immediate);
        StringMap.put("VAR", VarType.VAR);
    }


    private VarType(String name) {
        this.name = name;
    }
}
