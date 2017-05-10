package com.scut.vsp.exception;

/**
 * Created by ASH on 2016/11/25.
 */
public class ItemNotFoundException extends Exception {
    private String id;

    public ItemNotFoundException(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
