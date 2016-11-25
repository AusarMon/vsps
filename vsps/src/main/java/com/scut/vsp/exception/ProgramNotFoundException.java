package com.scut.vsp.exception;

/**
 * Created by ASH on 2016/11/25.
 */
public class ProgramNotFoundException extends Exception {
    private String id;

    public ProgramNotFoundException(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
