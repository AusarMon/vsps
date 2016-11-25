package com.scut.vsp.request.model;

/**
 * Created by ASH on 2016/11/25.
 */
public class ModifyPswRequest {
    private String oldPassword;
    private String newPassword;

    public ModifyPswRequest() {

    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
