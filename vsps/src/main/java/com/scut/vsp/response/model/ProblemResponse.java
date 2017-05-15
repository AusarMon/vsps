package com.scut.vsp.response.model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
import com.scut.vsp.code.evaluation.model.TestCase;
import com.scut.vsp.model.IOItem;
import com.scut.vsp.model.Problem;

/**
 * Created by HL on 10/05/2017.
 */
public class ProblemResponse {
    String id;
    String name;
    String description;
    int state;
    IOItem[] inpus;
    IOItem output;
    String structInfo;
    TestCase[] testCases;


    @Expose(serialize = false)
    private static Gson gson;

    static {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gson = gsonBuilder.setPrettyPrinting().create();
    }

    public ProblemResponse(Problem problem) {
        this.id = problem.getId();
        this.name = problem.getName();
        this.description = problem.getDescription();
        this.state = problem.getState();
        this.structInfo = problem.getStructInfo();
        this.inpus = gson.fromJson(problem.getInput(), IOItem[].class);
        this.output = gson.fromJson(problem.getOutput(), IOItem.class);
        this.testCases = gson.fromJson(problem.getTestCases(), TestCase[].class);
    }

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

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public IOItem[] getInpus() {
        return inpus;
    }

    public void setInpus(IOItem[] inpus) {
        this.inpus = inpus;
    }

    public IOItem getOutput() {
        return output;
    }

    public void setOutput(IOItem output) {
        this.output = output;
    }

    public String getStructInfo() {
        return structInfo;
    }

    public void setStructInfo(String structInfo) {
        this.structInfo = structInfo;
    }

    public TestCase[] getTestCases() {
        return testCases;
    }

    public void setTestCases(TestCase[] testCases) {
        this.testCases = testCases;
    }
}
