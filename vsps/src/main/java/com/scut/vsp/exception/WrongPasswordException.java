package com.scut.vsp.exception;

/**
 * Created by ASH on 2016/11/25.
 */
public class WrongPasswordException extends Exception {
    public WrongPasswordException(String message) {
        super(message);
    }
}
