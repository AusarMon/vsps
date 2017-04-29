package com.scut.vsp.response.model;

import com.google.common.base.MoreObjects;

/**
 * Created by ASH on 2016/11/25.
 */
public class ProgramBasicInfo {
    private String programId;
    private String name;
    private String description;

    public ProgramBasicInfo() {
    }

    public String getProgramId() {
        return programId;
    }

    public void setProgramId(String programId) {
        this.programId = programId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return MoreObjects
                .toStringHelper(this.getClass())
                .add("programId", programId)
                .add("name", name)
                .add("description", description)
                .toString();
    }
}
