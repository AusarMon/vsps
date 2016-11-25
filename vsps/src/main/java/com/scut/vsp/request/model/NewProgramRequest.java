package com.scut.vsp.request.model;

/**
 * Created by ASH on 2016/11/25.
 */
public class NewProgramRequest {
    private String name;
    private String structInfo;

    public NewProgramRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStructInfo() {
        return structInfo;
    }

    public void setStructInfo(String structInfo) {
        this.structInfo = structInfo;
    }
}
