package com.scut.vsp.request.model;

import com.scut.vsp.code.evaluation.model.TestCase;

/**
 * Created by HL on 10/05/2017.
 */
public class ModifyProblemRequest {
    String id;
    String name;
    String description;
    int state;
    TestCase[] testCases;

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

    public TestCase[] getTestCases() {
        return testCases;
    }

    public void setTestCases(TestCase[] testCases) {
        this.testCases = testCases;
    }
}
