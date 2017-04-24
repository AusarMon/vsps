package com.scut.vsp.config.security;

import org.springframework.http.HttpMethod;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by ASH on 24/04/2017.
 */
public class CorsProcessingFilter extends CorsFilter {
    private CorsConfigurationSource selfConfigSource;

    public CorsProcessingFilter(CorsConfigurationSource configSource) {
        super(configSource);
        selfConfigSource = configSource;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        System.out.println("isCorsRequest: " + CorsUtils.isCorsRequest(request));
//        System.out.println("getCorsConfiguration: " + selfConfigSource.getCorsConfiguration(request));
//        System.out.println("isPreFlightRequest: " + CorsUtils.isPreFlightRequest(request));
        super.doFilterInternal(request, response, filterChain);
    }
}
