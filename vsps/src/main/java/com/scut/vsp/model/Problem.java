package com.scut.vsp.model;

/**
 * Created by HL on 09/05/2017.
 */
public class Problem {
    String id;
    String name;
    String description;
    String input;
    String output;
    int state;
    String structInfo;
    String testCases;

    public static final int OEPN = 1;
    public static final int CLOSE = 2;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getStructInfo() {
        return structInfo;
    }

    public void setStructInfo(String structInfo) {
        this.structInfo = structInfo;
    }

    public String getTestCases() {
        return testCases;
    }

    public void setTestCases(String testCases) {
        this.testCases = testCases;
    }
}
