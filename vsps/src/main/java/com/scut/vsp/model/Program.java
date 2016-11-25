package com.scut.vsp.model;

import com.google.common.base.MoreObjects;

/**
 * Created by ASH on 2016/11/25.
 */
public class Program {
    private String programId;
    private String username;
    private String name;
    private String structInfo;

    public Program() {
    }

    public Program(String programId, String username, String name, String structInfo) {
        this.programId = programId;
        this.username = username;
        this.name = name;
        this.structInfo = structInfo;
    }

    public String getProgramId() {
        return programId;
    }

    public String getUsername() {
        return username;
    }

    public String getName() {
        return name;
    }

    public String getStructInfo() {
        return structInfo;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStructInfo(String structInfo) {
        this.structInfo = structInfo;
    }

    @Override
    public String toString() {
        return MoreObjects
                .toStringHelper(this.getClass())
                .add("programId", this.programId)
                .add("username", this.username)
                .add("name", this.name)
                .add("structInfo", this.structInfo)
                .toString();
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Program)) {
            return false;
        }
        Program p = (Program) obj;

        return this.programId.equals(p.getProgramId())
                && this.username.equals(p.getUsername())
                && this.name.equals(p.getName())
                && this.structInfo.equals(p.getStructInfo());
    }
}
