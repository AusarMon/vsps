package com.scut.vsp.config.security.model;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

/**
 * 
 * @author vladimir.stankovic
 *
 * Aug 4, 2016
 */
public class UserContext {
    private final String username;
    private final Collection<? extends GrantedAuthority> authorities;

    private UserContext(String username, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.authorities = authorities;
    }
    
    public static UserContext create(String username, Collection<? extends GrantedAuthority> authorities) {
        if (StringUtils.isBlank(username)) throw new IllegalArgumentException("Username is blank: " + username);
        return new UserContext(username, authorities);
    }

    public String getUsername() {
        return username;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
