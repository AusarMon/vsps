package com.scut.vsp.utils;

import com.scut.vsp.config.security.jwt.JwtAuthenticationToken;
import com.scut.vsp.config.security.model.UserContext;
import com.scut.vsp.model.User;

import java.security.Principal;

/**
 * Created by ASH on 2016/11/25.
 */
public class PrincipalTransform {
    public static UserContext transform(Principal principal) {
        JwtAuthenticationToken token = (JwtAuthenticationToken) principal;
        return (UserContext) token.getPrincipal();
    }
}
