package com.scut.vsp.response.model;

import com.google.common.base.MoreObjects;

/**
 * Created by ASH on 2016/11/17.
 */
public class Error {
    private int code;
    private String message;

    public Error(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {

        return code;
    }

    public String getMessage() {

        return message;
    }

    @Override
    public String toString() {
        return MoreObjects
                .toStringHelper(this)
                .add("code", this.code)
                .add("message", this.message)
                .toString();
    }
}

