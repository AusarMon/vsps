package com.scut.vsp.code.evaluation.model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.HashMap;

/**
 * Created by HL on 09/05/2017.
 */
public class TestCase {
    HashMap<String, Object> inputs;
    Object expect;

    public HashMap<String, Object> getInputs() {
        return inputs;
    }

    public void setInputs(HashMap<String, Object> inputs) {
        this.inputs = inputs;
    }

    public Object getExpect() {
        return expect;
    }

    public void setExpect(Object expect) {
        this.expect = expect;
    }

    public static void main(String[] args) {

        GsonBuilder gsonBuilder = new GsonBuilder();
        Gson gson = gsonBuilder.setPrettyPrinting().create();

        TestCase testCase = new TestCase();
        HashMap<String, Object> in = new HashMap<>();
        in.put("a", 1);
        in.put("b", "2");
        testCase.setInputs(in);
        testCase.setExpect("2");

        System.out.println(gson.toJson(testCase));
    }
}
