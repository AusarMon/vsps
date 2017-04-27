package com.scut.vsp.config.security.json;

import com.scut.vsp.config.security.model.UserContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

/**
 * Created by ASH on 2016/11/18.
 */

@Component
public class JsonAuthenticationProvider implements AuthenticationProvider {
    private final BCryptPasswordEncoder encoder;
    private final UserDetailsService userDetailsService;

    @Autowired
    public JsonAuthenticationProvider(BCryptPasswordEncoder encoder, UserDetailsService userDetailsService) {
        this.encoder = encoder;
        this.userDetailsService = userDetailsService;
    }


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        Assert.notNull(authentication, "No authentication data provided");

        String username = (String) authentication.getPrincipal();
        String password = (String) authentication.getCredentials();

        UserDetails user = userDetailsService.loadUserByUsername(username);

        if (user == null) {
            throw new BadCredentialsException("Authentication Failed. Username or Password not valid.");
        }

        if (!user.getPassword().equals(password)) {
            throw new BadCredentialsException("Authentication Failed. Username or Password not valid.");
        }

        if (user.getAuthorities().isEmpty()) {
            throw new InsufficientAuthenticationException("User has no roles assigned");
        }

        UserContext userContext = UserContext.create(user.getUsername(), user.getAuthorities());

        return new UsernamePasswordAuthenticationToken(userContext, null, userContext.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
