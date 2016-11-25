package com.scut.vsp.exception;

import java.util.List;

/**
 * Created by ASH on 2016/11/25.
 */
public class FieldLackException extends Exception {
    String lackField;

    public FieldLackException(String lackField) {
        this.lackField = lackField;
    }

    public String getLackField() {
        return lackField;
    }
}
