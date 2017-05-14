package com.scut.vsp.response.model;

import com.scut.vsp.model.Problem;
import com.scut.vsp.model.Solution;

/**
 * Created by HL on 14/05/2017.
 */
public class ProblemForUser {
    String id;
    String name;
    String desc;
    String structInfo;
    int state;
    double rate;

    public ProblemForUser(Solution solution, Problem problem) {
        this.id = problem.getId();
        this.name = problem.getName();
        this.desc = problem.getDescription();
        this.structInfo = problem.getStructInfo();
        if (solution != null) {
            this.state = solution.getState();
            this.rate = solution.getPassRate();
        } else {
            this.state = 0;
            this.rate = 0;
        }
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

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getStructInfo() {
        return structInfo;
    }

    public void setStructInfo(String structInfo) {
        this.structInfo = structInfo;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }
}
