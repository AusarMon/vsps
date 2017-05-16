package com.scut.vsp.code.evaluation.model;

/**
 * Created by HL on 09/05/2017.
 */
public class EvaluationResult {

    public static final int FRESH = 0;
    public static final int PROCCESSING = 1;
    public static final int ACCEPT = 2;
    public static final int FAIL = 3;

    int state;
    double passRate;
    String err;

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

    public String getErr() {
        return err;
    }

    public void setErr(String err) {
        this.err = err;
    }
}
