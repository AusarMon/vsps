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


}
