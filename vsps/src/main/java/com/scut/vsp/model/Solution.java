package com.scut.vsp.model;

/**
 * Created by HL on 09/05/2017.
 */
public class Solution {
    String problemId;
    String userId;
    int state;
    double passRate;
    String structInfo;

    public static final int FRESH = 0;
    public static final int PROCCESSING = 1;
    public static final int ACCEPT = 2;
    public static final int FAIL = 3;

    public String getProblemId() {
        return problemId;
    }

    public void setProblemId(String problemId) {
        this.problemId = problemId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public double getPassRate() {
        return passRate;
    }

    public void setPassRate(double passRate) {
        this.passRate = passRate;
    }

    public String getStructInfo() {
        return structInfo;
    }

    public void setStructInfo(String structInfo) {
        this.structInfo = structInfo;
    }
}
