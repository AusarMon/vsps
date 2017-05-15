package com.scut.vsp.request.model;

import com.scut.vsp.code.evaluation.model.TestCase;
import com.scut.vsp.model.IOItem;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * Created by HL on 10/05/2017.
 */
public class NewProblemRequest {
    String name;
    String description;
    @JsonProperty("inputs")
    IOItem[] inputs;
    IOItem output;
    String structInfo;
    TestCase[] testCases;

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

    public IOItem[] getInputs() {
        return inputs;
    }

    public void setInputs(IOItem[] inputs) {
        this.inputs = inputs;
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
